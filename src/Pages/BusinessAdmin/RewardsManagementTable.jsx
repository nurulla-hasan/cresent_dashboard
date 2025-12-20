/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Upload,
  Tag,
  DatePicker,
  Spin,
} from "antd";
import {
  FaEye,
  FaImage,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import { RxCrossCircled, RxDotsVertical } from "react-icons/rx";
import { BsExclamationCircle } from "react-icons/bs";
import icon from "../../assets/image/leaf.png";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";

import useSmartFetchHook from "../../Components/hooks/useSmartFetchHook.ts";
import { useGetRewardReportQuery } from "../../redux/feature/reward/rewardApis";

const RewardsManagementTable = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    data: apiResponse,
    pagination,
    isLoading,
    setFilterParams,
  } = useSmartFetchHook(useGetRewardReportQuery);

  const [form] = Form.useForm();

  const handleView = (record) => {
    setSelectedReward(record);
    setIsViewModalOpen(true);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "active":
        return (
          <Tag color="green" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            <FaCheckCircle /> active
          </Tag>
        );
      case "inactive":
        return (
          <Tag color="red" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            <RxCrossCircled /> inactive
          </Tag>
        );
      case "expired":
        return (
          <Tag color="default" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            expired
          </Tag>
        );
      case "upcoming":
        return (
          <Tag color="blue" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            upcoming
          </Tag>
        );
      case "sold-out":
        return (
          <Tag color="gold" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            <BsExclamationCircle /> sold-out
          </Tag>
        );
      default:
        return (
          <Tag className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            {status || "-"}
          </Tag>
        );
    }
  };

  const columns = [
     {
      title: "Reward Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Business",
      dataIndex: "business",
      key: "business",
      render: (business) => (
        <div className="flex items-center gap-3">
          <img
            src={icon}
            alt={business?.name}
            className="object-contain w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{business?.name || "-"}</span>
            <span className="text-sm text-gray-500">{business?._id || "-"}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Points",
      dataIndex: "pointsCost",
      key: "pointsCost",
    },
    {
      title: "Redemptions",
      dataIndex: "redeemedCount",
      key: "redeemedCount",
      render: (_v, record) => record.redeemedCount ?? record.redemptions ?? 0,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => renderStatus(status),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3 text-lg">
          <div
            onClick={() => handleView(record)}
            className="flex items-center justify-center w-8 h-8 p-1 rounded-full cursor-pointer bg-neutral-100"
          >
            <FaEye />
          </div>
        </div>
      ),
    },
  ];


  const handleDateRangeChange = (dates, dateStrings) => {
    setDateRange(dates);
    const newParams = {};
    if (dates && dates[0] && dates[1]) {
      newParams.fromDate = dateStrings[0];
      newParams.toDate = dateStrings[1];
    }
    setFilterParams(newParams);
  };

  return (
    <div className="p-6 mb-10 bg-white shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Rewards Management</h2>
        <div className="flex items-center gap-2">
          <Input 
            prefix={<SearchOutlined />}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
          />
          <RangePicker
            placeholder={["From date", "To date"]}
            onChange={handleDateRangeChange}
            value={dateRange}
          />
          {/* <button className="flex items-center justify-center gap-2 px-6 py-2 bg-white border rounded-3xl">
            <FaPlus /> Add
          </button> */}
          {/* <RxDotsVertical /> */}
        </div>
      </div>

      <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
        <Table
          columns={columns}
          dataSource={apiResponse}
          loading={isLoading}
          rowKey="_id"
          onChange={(tablePagination, filters, sorter) => {
            setCurrentPage(tablePagination.current);
            const newParams = {};
            if (sorter?.field) {
              newParams.sortBy = sorter.field;
              newParams.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
            }
            Object.keys(filters).forEach((key) => {
              if (filters[key]) {
                newParams[key] = filters[key][0];
              }
            });
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

      <Modal
        title="Reward Details"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        centered
        width={600}
      >
        {selectedReward ? (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {selectedReward.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">by</span>
                  <span className="text-sm font-medium text-gray-700">
                    {selectedReward.business?.name || "Unknown Business"}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {renderStatus(selectedReward.status)}
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="mb-2 text-sm font-medium text-gray-700">Description</p>
              <p className="text-sm leading-relaxed text-gray-600">
                {selectedReward.description || "No description provided"}
              </p>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-xs font-semibold text-blue-600">C</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-blue-700 uppercase">Category</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{selectedReward.category}</p>
              </div>

              <div className="p-4 border border-purple-100 rounded-lg bg-purple-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                    <span className="text-xs font-semibold text-purple-600">T</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-purple-700 uppercase">Type</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{selectedReward.type}</p>
              </div>

              <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                    <span className="text-xs font-semibold text-green-600">P</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-green-700 uppercase">Points Cost</p>
                </div>
                <p className="text-lg font-bold text-gray-900">{selectedReward.pointsCost}</p>
              </div>

              <div className="p-4 border border-orange-100 rounded-lg bg-orange-50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                    <span className="text-xs font-semibold text-orange-600">D</span>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-orange-700 uppercase">Duration</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {selectedReward.startDate ? new Date(selectedReward.startDate).toLocaleDateString() : "-"}
                  </p>
                  <p className="text-xs text-gray-500">to</p>
                  <p className="font-medium text-gray-900">
                    {selectedReward.expiryDate ? new Date(selectedReward.expiryDate).toLocaleDateString() : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="pt-4 border-t">
              <h4 className="mb-3 text-sm font-medium text-gray-700">Timeline</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedReward.startDate ? new Date(selectedReward.startDate).toLocaleString() : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                  <span className="text-sm text-gray-600">Expiry Date</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedReward.expiryDate ? new Date(selectedReward.expiryDate).toLocaleString() : "-"}
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

export default RewardsManagementTable;
