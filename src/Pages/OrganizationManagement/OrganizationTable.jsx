/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Button,
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
import { MdOtherHouses } from "react-icons/md";
import { FaImage, FaPencilAlt, FaUsers } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import useSmartFetchHook from "../../Components/hooks/useSmartFetchHook.ts";
import { useGetOrganizationReportQuery } from "../../redux/feature/organization/organizationApis.js";

const OrganizationTable = () => {
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
  } = useSmartFetchHook(useGetOrganizationReportQuery);

  const data = (apiResponse || []).map((org) => ({
    ...org,
    email: org?.auth?.email,
  }));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();

  //  Handle image upload
  const handleBeforeUpload = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    form.setFieldsValue({ profileImage: file });
    return false;
  };

  //  Open edit modal
  const handleEdit = () => {
   
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setPreviewImage(null);
  };

  const handleSave = (values) => {
    setIsModalVisible(false);
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    setDateRange(dates);
    const newFilterParams = {};
    if (dates && dates[0] && dates[1]) {
      newFilterParams.startDate = dateStrings[0];
      newFilterParams.endDate = dateStrings[1];
    }
    setFilterParams(newFilterParams);
  };

  const columns = [
    {
      title: "Name/Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <div className="flex gap-2 items-center">
          <img
            src={user}
            alt={record.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-medium">{record.name}</p>
            <p className="text-gray-400 text-sm">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span className="font-medium">{createdAt ? new Date(createdAt).toLocaleString() : "-"}</span>
      ),
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (value) => (
        <div className="px-4 py-2 rounded-3xl flex items-center gap-2">
          {value === "business" && (
            <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-4 py-1 rounded-2xl">
              <MdOtherHouses className="h-5 w-5" /> Business
            </div>
          )}
          {value === "non-profit" && (
            <div className="flex items-center gap-1 bg-green-100 text-green-600 px-4 py-1 rounded-2xl">
              <GoOrganization className="h-5 w-5" /> Organization
            </div>
          )}
          {value === "donor" && (
            <div className="flex items-center gap-1 bg-pink-100 text-pink-600 px-4 py-1 rounded-2xl">
              <FaUsers className="h-5 w-5" /> Donor
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: ["auth", "status"],
      key: "status",
      render: (status) => (
        <span
          className={`px-4 py-1 rounded-2xl text-sm font-medium ${status === "Active"
            ? "bg-green-100 text-green-600"
            : status === "verified"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-200 text-gray-600"
            }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: () => <div className="text-center">Action</div>,
      key: "action",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-3 text-lg">
          <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer">
            <VscEye />
          </div>
          <div
            onClick={() => handleEdit(record)}
            className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer"
          >
            <FaPencilAlt />
          </div>
          {/* <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer">
            <RxCrossCircled />
          </div> */}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Organization Table</h2>
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
        onChange={(paginationConfig, filters, sorter) => {
          setCurrentPage(paginationConfig.current);
          const newFilterParams = {};
          if (sorter?.field) {
            newFilterParams.sortBy = sorter.field;
            newFilterParams.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
          }
          Object.keys(filters || {}).forEach((key) => {
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
          position: ["bottomRight"],
        }}
        rowKey={(row) => row._id}
      />

      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form layout="vertical" form={form} onFinish={handleSave}>
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

          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
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
            <Button onClick={handleCancel}>Discard Changes</Button>
            <Button type="primary" htmlType="submit">
              Apply Changes
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default OrganizationTable;
