import { useMemo, useState } from "react";

import { Modal, message } from "antd";
import {
  useGetMyNotificationsQuery,
  useMarkNotificationSeenMutation,
} from "../../redux/feature/notification/notificationApis";

const Notifications = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const { data: res, isLoading } = useGetMyNotificationsQuery({ page, limit });
    const [markSeen] = useMarkNotificationSeenMutation();

    const meta = res?.data?.meta;
    const apiNotifications = res?.data?.data;

    const notifications = useMemo(() => {
        if (!Array.isArray(apiNotifications)) return [];
        return apiNotifications.map((n) => ({
            ...n,
            id: n?._id,
            details: n?.message,
            time: n?.createdAt,
        }));
    }, [apiNotifications]);

    const handleMarkSeen = async (notification) => {
        if (!notification?.id || notification?.isSeen) return;
        try {
            await markSeen(notification.id).unwrap();
        } catch (e) {
            const msg = e?.data?.message || "Failed to mark notification as seen";
            message.error(msg);
        }
    };

    const formatTime = (iso) => {
        if (!iso) return "-";
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return String(iso);
        return d.toLocaleString();
    };

    const handleOpenView = async (notification) => {
        setSelectedNotification(notification);
        setIsViewOpen(true);
        await handleMarkSeen(notification);
    };

  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="mb-4 text-2xl font-bold">Notifications</h1>

      {/* Notifications List */}
      <div className="border rounded-md shadow-sm">
        {isLoading ? (
          <div className="px-4 py-6 text-sm text-center text-gray-500">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="px-4 py-6 text-sm text-center text-gray-500">No notifications found</div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={notification.id}
              onClick={() => handleOpenView(notification)}
              className={`flex justify-between items-center px-4 py-3 border-b cursor-pointer ${notification?.isSeen
                ? index % 2 === 0
                  ? "bg-orange-50"
                  : "bg-white"
                : "bg-blue-50"
                } ${notification?.isSeen ? "opacity-80" : ""}`}
            >
              <div className="flex items-start gap-3">
                {!notification?.isSeen ? (
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                ) : (
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-transparent shrink-0" />
                )}
                <div>
                  <p className={`text-sm ${notification?.isSeen ? "font-semibold" : "font-bold"}`}>
                    {notification.title}
                  </p>
                <p className="text-sm text-gray-500">{notification.details}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-400">{formatTime(notification.time)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        title="Notification"
        open={isViewOpen}
        onCancel={() => {
          setIsViewOpen(false);
          setSelectedNotification(null);
        }}
        footer={null}
        centered
        width={600}
      >
        {selectedNotification ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {selectedNotification.title || "-"}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatTime(selectedNotification.createdAt || selectedNotification.time)}
                </p>
              </div>
              {!selectedNotification?.isSeen ? (
                <span className="px-2 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full">
                  New
                </span>
              ) : null}
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                {selectedNotification.details || selectedNotification.message || "-"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="p-3 bg-white border rounded-lg">
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-sm font-medium text-gray-900">
                  {selectedNotification.type || "-"}
                </p>
              </div>
              <div className="p-3 bg-white border rounded-lg">
                <p className="text-xs text-gray-500">Redirect ID</p>
                <p className="text-sm font-medium text-gray-900 break-all">
                  {selectedNotification.redirectId || "-"}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          className="text-sm text-gray-500 hover:underline"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <div className="flex items-center space-x-2">
          <button className="text-sm font-semibold text-primary">{meta?.page || page}</button>
          <span className="text-sm text-gray-500">/</span>
          <button className="text-sm text-gray-500">{meta?.totalPages || 1}</button>
        </div>
        <button
          className="text-sm text-gray-500 hover:underline"
          disabled={meta?.totalPages ? page >= meta.totalPages : notifications.length < limit}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Notifications;
