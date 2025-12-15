import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Table,
  Upload,
} from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import user from "../../assets/image/user.png";
import { FaImage } from "react-icons/fa";
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
  // Hide pending users from this table view
  // const filteredData = Array.isArray(data) ? data.filter((u) => u?.status !== "pending") : [];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();

  const handleBeforeUpload = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    form.setFieldsValue({ profileImage: file });
    return false;
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setPreviewImage(null);
  };

  const handleSave = (_values) => {
    setIsModalVisible(false);
  };

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

      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form layout="vertical" form={form} onFinish={handleSave}>
          <p className="mb-3 text-gray-400">
            Update profile information of the user.{" "}
          </p>
          <div className="flex justify-center mb-4">
            <Upload
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              accept="image/*"
            >
              <div className="flex flex-col items-center p-4 border border-gray-300 border-dashed rounded-full cursor-pointer">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="object-cover w-24 h-24 rounded-full"
                  />
                ) : (
                  <>
                    <FaImage className="w-8 h-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-400">Upload Image</p>
                  </>
                )}
              </div>
            </Upload>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="w-[50%]">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </div>
            <div className="w-[50%]">
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="mobile" label="Mobile" rules={[{ required: true }]}>
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="password" label="Update Password">
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-white border rounded-3xl"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-black border rounded-3xl"
            >
              Apply Changes
            </button>
          </div>
        </Form>
      </Modal>

      {/* View User Modal */}
      <Modal
        title="User Details"
        open={isViewOpen}
        onCancel={() => setIsViewOpen(false)}
        footer={null}
        centered
      >
        {selectedUser ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={user} alt="avatar" className="w-12 h-12 rounded-full" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium capitalize">{selectedUser.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Verified by OTP</p>
                <p className="font-medium">{selectedUser.isVerifiedByOTP ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="font-medium">{selectedUser.isActive ? "Active" : "Inactive"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : "-"}</p>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default ProfileTables;
