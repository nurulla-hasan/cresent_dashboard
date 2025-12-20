import { useState } from "react";
import { useDispatch } from "react-redux";
import { DatePicker, Input, Table, Spin } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import user from "../../assets/image/user.png";
import { RxCross2 } from "react-icons/rx";
import useSmartFetchHook from "../hooks/useSmartFetchHook.ts";
import { useGetUserPendingReportQuery } from "../../redux/feature/user/userApis.js";
import { baseApi } from "../../redux/feature/baseApi";
import { Check } from "lucide-react";

const PendingApproval = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(null);
  const [rowLoadingId, setRowLoadingId] = useState(null);
  const dispatch = useDispatch();
  const {
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    data: apiResponse,
    pagination,
    isLoading,
    setFilterParams,
  } = useSmartFetchHook(useGetUserPendingReportQuery);

  const data = apiResponse || [];

  const handleAccept = async (record) => {
    if (record?.status !== "pending") return;
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
    if (record?.status !== "pending") return;
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
      render: (_,_record) => {
        const isPending = _record?.status === "pending";
        const isRowLoading = rowLoadingId === _record?._id;
        return (
          <div className="flex items-center justify-center gap-3 text-lg">
            <div
              onClick={() => { if (!isRowLoading) handleSuspend(_record); }}
              className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${isPending && !isRowLoading ? "cursor-pointer bg-neutral-100" : "cursor-not-allowed bg-neutral-50 opacity-50"}`}
              title={isPending ? (isRowLoading ? "Processing..." : "Suspend user") : "Only pending users can be suspended"}
            >
              {isRowLoading ? <LoadingOutlined /> : <RxCross2 />}
            </div>
            <div
              onClick={() => { if (!isRowLoading) handleAccept(_record); }}
              className={`flex items-center justify-center w-8 h-8 p-1 rounded-full ${isPending && !isRowLoading ? "cursor-pointer bg-neutral-100" : "cursor-not-allowed bg-neutral-50 opacity-50"}`}
              title={isPending ? (isRowLoading ? "Processing..." : "Accept user") : "Only pending users can be accepted"}
            >
              {isRowLoading ? <LoadingOutlined /> : <Check size={18} />}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 mb-10 bg-white shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Pending Approvals</h2>
        <div className="flex items-center gap-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
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
      </Spin>
    </div>
  );
};

export default PendingApproval;
