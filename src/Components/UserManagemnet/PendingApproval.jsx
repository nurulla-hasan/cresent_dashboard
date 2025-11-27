import { useState } from "react";
import { DatePicker, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import user from "../../assets/image/user.png";
import { RxCross2 } from "react-icons/rx";
import useSmartFetchHook from "../hooks/useSmartFetchHook.ts";
import { useGetUserPendingReportQuery } from "../../redux/feature/user/userApis.js";
import { Check } from "lucide-react";

const PendingApproval = () => {
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
  } = useSmartFetchHook(useGetUserPendingReportQuery, { limit: 5 });

  const data = apiResponse?.pendingUsers || [];

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
          className={`px-4 py-1 rounded-2xl text-sm font-medium ${
            isVerified
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
          className={`px-4 py-1 rounded-2xl text-sm font-medium ${
            isActive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Verified", value: "verified" },
        { text: "Suspended", value: "suspended" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        return (
          <span
            className={`px-4 py-1 rounded-2xl text-sm font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-600"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-600"
                : status === "Suspended"
                ? "bg-gray-200 text-gray-600"
                : ""
            }`}
          >
            {status}
          </span>
        );
      },
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
      render: () => (
        <div className="flex justify-center items-center gap-3 text-lg">
          <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center">
            <VscEye className="cursor-pointer" />
          </div>
          <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center">
            <RxCross2 className="cursor-pointer" />
          </div>
          <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center">
            <Check size={18} className="cursor-pointer" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Pending Approvals</h2>
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
          pageSize: pagination.limit || 10,
          total: pagination.total || 0,
          showTotal: (total) => `Total ${total} items`,
          showSizeChanger: false,
          position: ['bottomRight'],
        }}
        rowKey="_id"
      />
    </div>
  );
};

export default PendingApproval;
