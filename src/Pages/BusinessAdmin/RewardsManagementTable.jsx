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
      >
        {selectedReward ? (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Title</p>
              <p className="font-medium">{selectedReward.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Business</p>
              <p className="font-medium">{selectedReward.business?.name || "-"}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{selectedReward.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{selectedReward.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Points Cost</p>
                <p className="font-medium">{selectedReward.pointsCost}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div>{renderStatus(selectedReward.status)}</div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium">{selectedReward.description || "-"}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{selectedReward.startDate ? new Date(selectedReward.startDate).toLocaleString() : "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="font-medium">{selectedReward.expiryDate ? new Date(selectedReward.expiryDate).toLocaleString() : "-"}</p>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default RewardsManagementTable;
