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
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewRecord, setViewRecord] = useState(null);

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

  const handleExport = () => {
    const rowsHtml = (data || [])
      .map((r) => {
        const firstCause = Array.isArray(r.causes) && r.causes.length > 0 ? r.causes[0]?.name : "-";
        const created = r.createdAt ? new Date(r.createdAt).toLocaleString() : "-";
        const status = r?.auth?.status || "-";
        return `<tr>
                  <td style="padding:8px;border:1px solid #ddd;">${r.name || "-"}</td>
                  <td style="padding:8px;border:1px solid #ddd;">${r.email || "-"}</td>
                  <td style="padding:8px;border:1px solid #ddd;">${firstCause}</td>
                  <td style="padding:8px;border:1px solid #ddd;">${r.serviceType || "-"}</td>
                  <td style="padding:8px;border:1px solid #ddd;">${created}</td>
                  <td style="padding:8px;border:1px solid #ddd;">${status}</td>
                </tr>`;
      })
      .join("");
    const html = `<!doctype html>
      <html><head><meta charset='utf-8'><title>Organizations</title>
      <style>table{border-collapse:collapse;width:100%;font:14px system-ui} th,td{border:1px solid #ddd;padding:8px} th{background:#f3f4f6;text-align:left}</style>
      </head><body>
      <h2>Organizations</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Cause Name</th><th>Service Type</th><th>Created At</th><th>Status</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <script>window.onload=()=>window.print()</script>
      </body></html>`;
    const w = window.open("", "_blank");
    if (w) {
      w.document.open();
      w.document.write(html);
      w.document.close();
    }
  };

  const handleView = (record) => {
    setViewRecord(record);
    setIsViewOpen(true);
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
        <div className="flex items-center gap-2">
          <img
            src={user}
            alt={record.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{record.name}</p>
            <p className="text-sm text-gray-400">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Cause Name",
      dataIndex: "causes",
      key: "causeName",
      render: (causes) => {
        const first = Array.isArray(causes) && causes.length > 0 ? causes[0] : null;
        return first?.name || <span className="text-sm text-gray-400">No cause</span>;
      },
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (value) => (
        <div className="flex items-center gap-2 px-4 py-2 rounded-3xl">
          {value === "non-profit" && (
            <div className="flex items-center gap-1 px-4 py-1 text-green-600 bg-green-100 rounded-2xl">
              <GoOrganization className="w-5 h-5" /> Non-profit
            </div>
          )}
          {value === "Charity" && (
            <div className="flex items-center gap-1 px-4 py-1 text-purple-600 bg-purple-100 rounded-2xl">
              <FaUsers className="w-5 h-5" /> Charity
            </div>
          )}
          {value === "Mosque" && (
            <div className="flex items-center gap-1 px-4 py-1 text-indigo-600 bg-indigo-100 rounded-2xl">
              <GoOrganization className="w-5 h-5" /> Mosque
            </div>
          )}
          {!["non-profit", "Charity", "Mosque"].includes(value) && (
            <div className="flex items-center gap-1 px-4 py-1 text-gray-600 bg-gray-100 rounded-2xl">
              {value}
            </div>
          )}
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
        <div className="flex items-center justify-center gap-3 text-lg">
          <div className="flex items-center justify-center w-8 h-8 p-1 rounded-full cursor-pointer bg-neutral-100" onClick={() => handleView(record)}>
            <VscEye />
          </div>
          {/* <div
            onClick={() => handleEdit(record)}
            className="flex items-center justify-center w-8 h-8 p-1 rounded-full cursor-pointer bg-neutral-100"
          >
            <FaPencilAlt />
          </div> */}
          {/* <div className="flex items-center justify-center w-8 h-8 p-1 rounded-full cursor-pointer bg-neutral-100">
            <RxCrossCircled />
          </div> */}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 mb-10 bg-white shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-4">
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
          <Button onClick={handleExport}>Export</Button>
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

      <Modal
        title="Organization Details"
        open={isViewOpen}
        onCancel={() => setIsViewOpen(false)}
        footer={null}
        centered
        width={600}
      >
        {viewRecord && (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <span className="text-xl font-bold text-white">
                  {viewRecord.name?.charAt(0)?.toUpperCase() || "O"}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-xl font-semibold text-gray-900">
                  {viewRecord.name}
                </h3>
                <p className="text-sm text-gray-600">{viewRecord.email}</p>
              </div>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-xs font-semibold text-blue-600">ST</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-blue-700 uppercase">Service Type</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{viewRecord.serviceType || "Not specified"}</p>
              </div>

              <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                    <span className="text-xs font-semibold text-green-600">S</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-green-700 uppercase">Status</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    viewRecord?.auth?.status === "verified" ? "bg-green-500" :
                    viewRecord?.auth?.status === "pending" ? "bg-yellow-500" :
                    viewRecord?.auth?.status === "suspended" ? "bg-red-500" : "bg-gray-400"
                  }`}></div>
                  <p className="text-sm font-semibold text-gray-900 capitalize">
                    {viewRecord?.auth?.status || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="p-4 border border-purple-100 rounded-lg bg-purple-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                    <span className="text-xs font-semibold text-purple-600">C</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-purple-700 uppercase">Cause</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {Array.isArray(viewRecord.causes) && viewRecord.causes[0]?.name 
                    ? viewRecord.causes[0].name 
                    : "No cause assigned"}
                </p>
              </div>

              <div className="p-4 border border-orange-100 rounded-lg bg-orange-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                    <span className="text-xs font-semibold text-orange-600">D</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-orange-700 uppercase">Created</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {viewRecord.createdAt ? new Date(viewRecord.createdAt).toLocaleDateString() : "-"}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-4 rounded-lg bg-gray-50">
              <h4 className="mb-3 text-sm font-medium text-gray-700">Additional Information</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">Full Created Date</span>
                  <span className="text-sm font-medium text-gray-900">
                    {viewRecord.createdAt ? new Date(viewRecord.createdAt).toLocaleString() : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">Organization ID</span>
                  <span className="text-sm font-medium text-gray-900">
                    {viewRecord._id?.slice(-8) || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrganizationTable;
