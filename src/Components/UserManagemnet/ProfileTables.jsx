import { useState } from "react";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Table,
  Upload,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import user from "../../assets/image/user.png";
import { FaImage } from "react-icons/fa";
import useSmartFetchHook from "../hooks/useSmartFetchHook.ts";
import { useGetUserReportQuery } from "../../redux/feature/user/userApis.js";

const ProfileTables = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(null);

  const {
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    data: apiResponse,
    pagination,
    isLoading,
    setFilterParams,
  } = useSmartFetchHook(useGetUserReportQuery, { limit: 5 });

  // Extract users array from API response
  const data = apiResponse?.users || [];
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
        <div className="flex gap-2 items-center">
          <img
            src={user}
            alt={email}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-medium">{email}</p>
            <p className="text-gray-400 text-sm">{email}</p>
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
      render: (_, _record) => (
        <div className="flex justify-center items-center gap-3 text-lg">
          <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer">
            <VscEye />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
      <div className="flex justify-between items-center mb-4">
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
          <p className="text-gray-400 mb-3">
            Update profile information of the user.{" "}
          </p>
          <div className="flex justify-center mb-4">
            <Upload
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              accept="image/*"
            >
              <div className="border border-dashed border-gray-300 p-4 rounded-full cursor-pointer flex flex-col items-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <>
                    <FaImage className="text-gray-400 h-8 w-8" />
                    <p className="text-gray-400 text-sm mt-2">Upload Image</p>
                  </>
                )}
              </div>
            </Upload>
          </div>
          <div className="flex justify-between items-center gap-2">
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
              className="bg-white px-4 py-2 rounded-3xl border"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-3xl border"
            >
              Apply Changes
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileTables;
