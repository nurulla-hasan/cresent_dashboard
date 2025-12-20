
import { useState } from "react";
import {
  Input,
  Table,
  Tag,
  Drawer,
  Divider,
  Descriptions,
  Space,
  DatePicker,
  Spin,
} from "antd";
import {
  FaCheckCircle,
} from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { BsExclamationCircle, BsShieldCheck } from "react-icons/bs";
import { Check, Trash2 } from "lucide-react";
import {
  SearchOutlined,
  LinkOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import icon from "../../assets/image/leaf.png";

import useSmartFetchHook from "../../Components/hooks/useSmartFetchHook.ts";
import { useGetBusinessesReportQuery } from "../../redux/feature/business/businessApis";
import {
  useChangeUserStatusMutation,
  useDeleteUserMutation,
} from "../../redux/feature/user/userApis";

const COVER =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop";

const BusinessPortfolio = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(null);
  const {
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    data,
    pagination,
    isLoading,
    setFilterParams,
  } = useSmartFetchHook(useGetBusinessesReportQuery, { limit: 10 });
  
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [rowLoadingId, setRowLoadingId] = useState(null);

  const [changeUserStatus] = useChangeUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();


  const handleAccept = async (record) => {
    if (!record?.authId) return;

    try {
      setRowLoadingId(record.authId);
      await changeUserStatus({ id: record.authId, status: "verified" }).unwrap();
    } finally {
      setRowLoadingId(null);
    }
  };

  const handleSuspend = async (record) => {
    if (!record?.authId) return;

    try {
      setRowLoadingId(record.authId);
      await changeUserStatus({ id: record.authId, status: "suspended" }).unwrap();
    } finally {
      setRowLoadingId(null);
    }
  };

  const handleDelete = async (record) => {
    if (!record?.authId) return;

    try {
      setRowLoadingId(record.authId);
      await deleteUser(record.authId).unwrap();
    } finally {
      setRowLoadingId(null);
    }
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    setDateRange(dates);
    const newParams = {};
    if (dates && dates[0] && dates[1]) {
      newParams.startDate = dateStrings[0];
      newParams.endDate = dateStrings[1];
    }
    setFilterParams(newParams);
  };

  const openProfile = (record) => {
    setSelectedBusiness(record);
    setIsProfileOpen(true);
  };

  const renderStatus = (status, isActive) => {
    if (!isActive) {
      return (
        <Tag color="red" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
          <RxCrossCircled /> Inactive
        </Tag>
      );
    }

    if (status === "pending") {
      return (
        <Tag color="gold" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
          <BsExclamationCircle /> Pending
        </Tag>
      );
    }

    if (status === "suspended") {
      return (
        <Tag color="red" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
          <RxCrossCircled /> Suspended
        </Tag>
      );
    }

    return (
      <Tag color="green" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
        <FaCheckCircle /> Verified
      </Tag>
    );
  };

  const columns = [
    {
      title: "Business",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.icon || icon}
            alt={record.name}
            className="object-contain w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{record.name}</span>
            <span className="text-sm text-gray-500">{record.email || "—"}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (createdAt) => (
        <span className="text-sm">
          {createdAt ? new Date(createdAt).toLocaleDateString() : "—"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_status, record) => renderStatus(record.status, record.isActive),
    },
    {
      title: "Action",
      align:'center',
      key: "action",
      render: (_, record) => {
        const isRowLoading = rowLoadingId === record?.authId;
        const hasAuthId = Boolean(record?.authId);
        const isPending = record?.status === "pending";
        const isSuspended = record?.status === "suspended";

        return (
          <div className="flex items-center justify-center gap-3 text-lg">
            <div
              onClick={() => openProfile(record)}
              className="flex items-center justify-center w-8 h-8 p-1 rounded-full cursor-pointer bg-neutral-100"
              title="View"
            >
              <VscEye />
            </div>

            {isPending ? (
              <>
                <div
                  onClick={() => {
                    if (!isRowLoading && hasAuthId) handleSuspend(record);
                  }}
                  className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${
                    !isRowLoading && hasAuthId
                      ? "cursor-pointer bg-neutral-100"
                      : "cursor-not-allowed bg-neutral-50 opacity-50"
                  }`}
                  title={
                    !hasAuthId
                      ? "Missing user id"
                      : isRowLoading
                      ? "Processing..."
                      : "Suspend"
                  }
                >
                  {isRowLoading ? <LoadingOutlined /> : <RxCross2 />}
                </div>
                <div
                  onClick={() => {
                    if (!isRowLoading && hasAuthId) handleAccept(record);
                  }}
                  className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${
                    !isRowLoading && hasAuthId
                      ? "cursor-pointer bg-neutral-100"
                      : "cursor-not-allowed bg-neutral-50 opacity-50"
                  }`}
                  title={
                    !hasAuthId
                      ? "Missing user id"
                      : isRowLoading
                      ? "Processing..."
                      : "Accept"
                  }
                >
                  {isRowLoading ? <LoadingOutlined /> : <Check size={18} />}
                </div>
              </>
            ) : (
              <div
                onClick={() => {
                  if (!isRowLoading && hasAuthId) {
                    if (isSuspended) handleAccept(record);
                    else handleSuspend(record);
                  }
                }}
                className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${
                  !isRowLoading && hasAuthId
                    ? "cursor-pointer bg-neutral-100"
                    : "cursor-not-allowed bg-neutral-50 opacity-50"
                }`}
                title={
                  !hasAuthId
                    ? "Missing user id"
                    : isRowLoading
                    ? "Processing..."
                    : isSuspended
                    ? "Unblock"
                    : "Block"
                }
              >
                {isRowLoading ? (
                  <LoadingOutlined />
                ) : isSuspended ? (
                  <Check size={18} />
                ) : (
                  <RxCross2 />
                )}
              </div>
            )}

            <div
              onClick={() => {
                if (!isRowLoading && hasAuthId) handleDelete(record);
              }}
              className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${
                !isRowLoading && hasAuthId
                  ? "cursor-pointer bg-neutral-100"
                  : "cursor-not-allowed bg-neutral-50 opacity-50"
              }`}
              title={
                !hasAuthId
                  ? "Missing user id"
                  : isRowLoading
                  ? "Processing..."
                  : "Delete"
              }
            >
              {isRowLoading ? <LoadingOutlined /> : <Trash2 size={16} />}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 mb-10 bg-white shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Business Portfolio</h2>
        <div className="flex items-center gap-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
            allowClear
            disabled={isLoading}
          />
          <RangePicker
            placeholder={["Start date", "End date"]}
            onChange={handleDateRangeChange}
            value={dateRange}
            disabled={isLoading}
          />
        </div>
      </div>

      <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
        <Table
          columns={columns}
          dataSource={Array.isArray(data)
            ? data.map((b) => ({
                key: b?._id,
                authId: b?.auth?._id || b?.auth?.id,
                name: b?.name,
                email: b?.auth?.email,
                status: b?.auth?.status,
                isActive: b?.auth?.isActive,
                createdAt: b?.createdAt,
                updatedAt: b?.updatedAt,
                icon,
              }))
            : []}
          rowKey="key"
          onChange={(tablePagination, _filters, sorter) => {
            setCurrentPage(tablePagination.current);

            const newParams = {};
            if (sorter?.field) {
              newParams.sortBy = sorter.field;
              newParams.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
            }
            setFilterParams(newParams);
          }}
          pagination={{
            current: pagination.page || 1,
            pageSize: pagination.limit || 10,
            total: pagination.total || 0,
            showTotal: (total) => `Total ${total} items`,
            showSizeChanger: false,
            position: ["bottomRight"],
          }}
        />
      </Spin>

      {/* Right-side Profile Drawer */}
      <Drawer
        title="Business Profile"
        placement="right"
        width={520}
        
        onClose={() => setIsProfileOpen(false)}
        open={isProfileOpen}
        destroyOnClose
      >
        {selectedBusiness && (
          <div className="p-4">
            <div className="mb-4 overflow-hidden rounded-xl">
              <img src={COVER} alt="cover" className="object-cover w-full h-40" />
            </div>

            <div className="flex items-center gap-3 mb-2">
              <img
                src={selectedBusiness.icon}
                alt={selectedBusiness.name}
                className="object-cover w-12 h-12 rounded-full ring-1 ring-gray-200"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold">{selectedBusiness.name}</span>
                  {selectedBusiness.verified && (
                    <span
                      title="Verified"
                      className="inline-flex items-center gap-1 text-xs font-medium text-green-600"
                    >
                      <BsShieldCheck /> Verified
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">Sydney, Australia</span>
              </div>
            </div>

            <p className="mb-3 text-sm text-gray-600">
              {selectedBusiness.overview || "No overview provided."}
            </p>

            <Divider />

            <Descriptions column={1} labelStyle={{ fontWeight: 600 }} size="small" colon={false}>
              <Descriptions.Item label="Email">
                <Space>
                  <MailOutlined />
                  <a href={`mailto:${selectedBusiness.email}`}>
                    {selectedBusiness.email}
                  </a>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Mobile">
                <Space>
                  <PhoneOutlined />
                  <a href={`tel:${selectedBusiness.phone || ""}`}>
                    {selectedBusiness.phone || "—"}
                  </a>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Website">
                <Space>
                  <LinkOutlined />
                  {selectedBusiness.website ? (
                    <a
                      href={selectedBusiness.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedBusiness.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    "—"
                  )}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <Space>
                  <EnvironmentOutlined />
                  {selectedBusiness.address || "—"}
                </Space>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div className="mb-2 font-semibold">Offered Rewards</div>
            <p className="text-sm text-gray-600">
              {selectedBusiness.offeredRewards || "No rewards listed."}
            </p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default BusinessPortfolio;
