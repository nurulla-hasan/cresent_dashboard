import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  DatePicker,
  Input,
  Modal,
  Table,
} from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import user from "../../assets/image/user.png";
import { Check, Trash2 } from "lucide-react";
import useSmartFetchHook from "../hooks/useSmartFetchHook.ts";
import { useGetUserReportQuery } from "../../redux/feature/user/userApis.js";
import { baseApi } from "../../redux/feature/baseApi";

const ProfileTables = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(null);
  const dispatch = useDispatch();
  const [rowLoadingId, setRowLoadingId] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { 
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    data: apiResponse,
    pagination,
    isLoading,
    setFilterParams,
  } = useSmartFetchHook(useGetUserReportQuery);

  // Extract users array from API response
  const data = apiResponse || [];

  const handleView = (record) => {
    setSelectedUser(record);
    setIsViewOpen(true);
  };

  const handleAccept = async (record) => {
    try {
      setRowLoadingId(record._id);
      await dispatch(
        baseApi.endpoints.changeUserStatus.initiate({ id: record._id, status: "verified" })
      ).unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      setRowLoadingId(null);
    }
  };

  const handleSuspend = async (record) => {
    try {
      setRowLoadingId(record._id);
      await dispatch(
        baseApi.endpoints.changeUserStatus.initiate({ id: record._id, status: "suspended" })
      ).unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      setRowLoadingId(null);
    }
  };

  const handleDelete = async (record) => {
    try {
      setRowLoadingId(record._id);
      await dispatch(
        baseApi.endpoints.deleteUser.initiate(record._id)
      ).unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      setRowLoadingId(null);
    }
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    setDateRange(dates);

    // Update filter params with date range
    const newFilterParams = {};

    if (dates && dates[0] && dates[1]) {
      newFilterParams.startDate = dateStrings[0];
      newFilterParams.endDate = dateStrings[1];
    }

    setFilterParams(newFilterParams);
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <div className="flex items-center gap-2">
          <img
            src={user}
            alt={email}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{email}</p>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Verified", value: "verified" },
        { text: "Pending", value: "pending" },
        { text: "Suspended", value: "suspended" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <span
          className={`px-4 py-1 rounded-2xl text-sm font-medium ${status === "verified"
              ? "bg-green-100 text-green-600"
              : status === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-200 text-gray-600"
            }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Verified by OTP",
      dataIndex: "isVerifiedByOTP",
      key: "isVerifiedByOTP",
      filters: [
        { text: "Yes", value: true },
        { text: "No", value: false },
      ],
      onFilter: (value, record) => record.isVerifiedByOTP === value,
      render: (isVerified) => (
        <span
          className={`px-4 py-1 rounded-2xl text-sm font-medium ${isVerified
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
            }`}
        >
          {isVerified ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (isActive) => (
        <span
          className={`px-4 py-1 rounded-2xl text-sm font-medium ${isActive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
            }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <p className="font-medium">
          {createdAt ? new Date(createdAt).toLocaleString() : "-"}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => {
        const isRowLoading = rowLoadingId === record?._id;
        const isPending = record?.status === "pending";
        const isSuspended = record?.status === "suspended";
        return (
          <div className="flex items-center justify-center gap-3 text-lg">
            <div
              onClick={() => handleView(record)}
              className="flex items-center justify-center w-8 h-8 p-1 rounded-full cursor-pointer bg-neutral-100"
              title="View"
            >
              <VscEye />
            </div>
            {isPending ? (
              <>
                <div
                  onClick={() => { if (!isRowLoading) handleSuspend(record); }}
                  className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${!isRowLoading ? "cursor-pointer bg-neutral-100" : "cursor-not-allowed bg-neutral-50 opacity-50"}`}
                  title={isRowLoading ? "Processing..." : "Suspend"}
                >
                  {isRowLoading ? <LoadingOutlined /> : <RxCross2 />}
                </div>
                <div
                  onClick={() => { if (!isRowLoading) handleAccept(record); }}
                  className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${!isRowLoading ? "cursor-pointer bg-neutral-100" : "cursor-not-allowed bg-neutral-50 opacity-50"}`}
                  title={isRowLoading ? "Processing..." : "Accept"}
                >
                  {isRowLoading ? <LoadingOutlined /> : <Check size={18} />}
                </div>
              </>
            ) : (
              <div
                onClick={() => { if (!isRowLoading) (isSuspended ? handleAccept(record) : handleSuspend(record)); }}
                className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${!isRowLoading ? "cursor-pointer bg-neutral-100" : "cursor-not-allowed bg-neutral-50 opacity-50"}`}
                title={isRowLoading ? "Processing..." : (isSuspended ? "Unblock" : "Block")}
              >
                {isRowLoading ? <LoadingOutlined /> : (isSuspended ? <Check size={18} /> : <RxCross2 />)}
              </div>
            )}
            <div
              onClick={() => { if (!isRowLoading) handleDelete(record); }}
              className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${!isRowLoading ? "cursor-pointer bg-neutral-100" : "cursor-not-allowed bg-neutral-50 opacity-50"}`}
              title={isRowLoading ? "Processing..." : "Delete"}
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
        <h2 className="text-lg font-semibold">Profiles</h2>
        <div className="flex items-center gap-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
          />
          <RangePicker
            placeholder={["Start date", "End date"]}
            onChange={handleDateRangeChange}
            value={dateRange}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onChange={(pagination, filters, sorter) => {
          setCurrentPage(pagination.current);

          const newFilterParams = {};

          if (sorter?.field) {
            newFilterParams.sortBy = sorter.field;
            newFilterParams.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
          }

          Object.keys(filters).forEach((key) => {
            if (filters[key]) {
              newFilterParams[key] = filters[key][0];
            }
          });

          setFilterParams(newFilterParams);
        }}
        pagination={{
          current: pagination.page || 1,
          pageSize: pagination.limit || 5,
          total: pagination.total || 0,
          showTotal: (total) => `Total ${total} items`,
          showSizeChanger: false,
          position: ['bottomRight'],
        }}
        rowKey="_id"
      />

      {/* View User Modal */}
      <Modal
        title="User Details"
        open={isViewOpen}
        onCancel={() => setIsViewOpen(false)}
        footer={null}
        centered
        width={600}
      >
        {selectedUser ? (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <span className="text-xl font-bold text-white">
                  {selectedUser.firstName?.charAt(0)?.toUpperCase() || selectedUser.email?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-xl font-semibold text-gray-900">
                  {selectedUser.firstName && selectedUser.lastName 
                    ? `${selectedUser.firstName} ${selectedUser.lastName}` 
                    : selectedUser.email?.split('@')[0] || 'Unknown User'}
                </h3>
                <p className="text-sm text-gray-600">{selectedUser.email}</p>
              </div>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-xs font-semibold text-blue-600">S</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-blue-700 uppercase">Status</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedUser.status === "verified" ? "bg-green-500" :
                    selectedUser.status === "pending" ? "bg-yellow-500" :
                    selectedUser.status === "suspended" ? "bg-red-500" : "bg-gray-400"
                  }`}></div>
                  <p className="text-sm font-semibold text-gray-900 capitalize">
                    {selectedUser.status || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                    <span className="text-xs font-semibold text-green-600">A</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-green-700 uppercase">Active</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedUser.isActive ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedUser.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>

              <div className="p-4 border border-purple-100 rounded-lg bg-purple-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                    <span className="text-xs font-semibold text-purple-600">V</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-purple-700 uppercase">OTP Verified</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedUser.isVerifiedByOTP ? "bg-green-500" : "bg-gray-400"
                  }`}></div>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedUser.isVerifiedByOTP ? "Verified" : "Not Verified"}
                  </p>
                </div>
              </div>

              <div className="p-4 border border-orange-100 rounded-lg bg-orange-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                    <span className="text-xs font-semibold text-orange-600">D</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-orange-700 uppercase">Joined</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "-"}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-4 rounded-lg bg-gray-50">
              <h4 className="mb-3 text-sm font-medium text-gray-700">Additional Information</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">Full Name</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedUser.firstName && selectedUser.lastName 
                      ? `${selectedUser.firstName} ${selectedUser.lastName}` 
                      : "Not specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">Mobile</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedUser.mobile || "Not specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">User ID</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedUser._id?.slice(-8) || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">Full Created Date</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default ProfileTables;
