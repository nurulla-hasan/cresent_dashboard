 
import { Table, DatePicker, Modal, Button } from "antd";
// import { MoreOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import user from "../../../assets/image/user.png";

import { SlArrowLeft } from "react-icons/sl";
import DonorsSubscription from "../../ManageSubscription/SubscriptionAndPaymentExport";
import { useGetSubscriptionDataQuery } from "../../../redux/feature/subscription/subscriptionApis.js";
import Search from "antd/es/input/Search";
import { useState } from "react";
const SubscriptionQuickLinks = () => {
  const { RangePicker } = DatePicker;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const queryArgs = {
    page: currentPage,
    limit: 10,
    searchTerm: searchTerm || undefined,
    startDate: dateRange?.[0] || undefined,
    endDate: dateRange?.[1] || undefined,
    sortBy: sortBy || undefined,
    sortOrder: sortOrder || undefined,
  };

  const { data: subscriptionRes, isLoading } = useGetSubscriptionDataQuery(queryArgs);

  const donationRes = subscriptionRes?.data;
  const apiData = donationRes?.subscriptionDonationHistory || [];
  const meta = donationRes?.meta;

  const handleOpenView = (record) => {
    setSelectedSubscription(record);
    setIsViewOpen(true);
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
    setSelectedSubscription(null);
  };

  const tableData =
    apiData.map((item, idx) => ({
      key: item?.createdAt || String(idx),
      donorName: item?.donor?.name || "-",
      organizationName: item?.organization?.name || "-",
      cause: item?.cause || "-",
      dateTime: item?.createdAt,
      amount: Number(item?.amount) || 0,
      status: item?.status || "-",
      donationType: item?.donationType || "-",
      specialMessage: item?.specialMessage || "-",
    })) || [];


  const columns = [
    {
      title: "Name/Email",
      dataIndex: "donorName",
      key: "donorName",
      sorter: true,
      render: (_text, record) => (
        <div className="flex gap-1">
          <img
            src={user}
            alt={record.donorName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{record.donorName}</p>
            <p className="text-gray-400">{record.organizationName}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "donationType",
      key: "donationType",
      render: (value) => (
        <span className="px-3 py-1 text-sm text-blue-600 capitalize rounded-2xl bg-blue-50">
          {value || "-"}
        </span>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      render: (amount) => (
        <p className="font-medium">${Number(amount || 0).toFixed(2)}</p>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      sorter: true,
      render: (dateTime) => (
        <p className="font-medium">
          {dateTime ? new Date(dateTime).toLocaleString() : "-"}
        </p>
      ),
    },
    {
      title: "Message",
      dataIndex: "specialMessage",
      key: "specialMessage",
      render: (msg) => <p className="font-medium">{msg}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <p
          className={
            status === "completed"
              ? "bg-green-100 text-green-600 px-2 py-1 rounded-3xl text-center"
              : status === "processing"
              ? "bg-blue-100 text-blue-700 px-2 py-1 rounded-3xl text-center"
              : "bg-gray-100 text-gray-600 px-2 py-1 rounded-3xl text-center"
          }
        >
          {status}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_text, record) => (
        <div className="flex items-center justify-center gap-2 bg-">
          <button
            type="button"
            onClick={() => handleOpenView(record)}
            className="flex items-center justify-center w-12 h-12 p-3 rounded-full bg-neutral-100"
            title="View Details"
          >
            <VscEye className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="flex items-center justify-center gap-2 px-4 py-3 mb-4 bg-white rounded-3xl"
      >
        <SlArrowLeft /> Back
      </button>
      <div className="flex items-center justify-between gap-5">
        <div>
          <h1 className="mb-4 text-3xl font-bold">Subscriptions Overview</h1>
          <p className="mb-4 text-lg text-gray-600">
            Track activity, view invoices, and keep renewals healthy.
          </p>
        </div>
      </div>

      <div>
        <div className="grid items-center justify-center grid-cols-1 gap-3 md:grid-cols-3">
          <div className="p-6 bg-white border rounded-3xl">
            <p className="text-lg font-medium">Active Subscriptions</p>
            <h1 className="mt-10 text-2xl font-medium">
              {donationRes?.totalActiveSubscriptions ?? 0}
              {/* API does not provide change text vs last month */}
            </h1>
          </div>

          <div className="p-6 bg-white border rounded-3xl">
            <p className="text-lg font-medium">Canceled Subscriptions</p>
            <h1 className="mt-10 text-2xl font-medium">
              {donationRes?.totalCancelledSubscriptions ?? 0}
              {/* <span className="text-sm text-gray-400">vs last month</span> */}
            </h1>
          </div>
          <div className="p-6 bg-white border rounded-3xl">
            <p className="text-lg font-medium">Renewal Rate</p>
            <h1 className="mt-10 text-2xl font-medium">
              {donationRes?.monthlyRenewalRate ?? 0}%
              {/* <span className="text-sm text-gray-400">vs last month</span> */}
            </h1>
          </div>
        </div>

        <div className="p-6 my-6 bg-white border rounded-3xl">
          <div className="flex items-center justify-between gap-5">
            <h1 className="text-xl font-medium">Subscription Listing</h1>

            <div className="flex items-center gap-3">
              <div className="mt-4 md:mt-0">
                <Search
                  placeholder="input search text"
                  allowClear
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="mt-4 md:mt-0">
                <RangePicker
                  placeholder={["Start date", "End date"]}
                  onChange={(dates, dateStrings) => {
                    if (dates && dates.length === 2) {
                      setDateRange([dateStrings[0], dateStrings[1]]);
                      setCurrentPage(1);
                      return;
                    }
                    setDateRange(null);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* <div className="relative inline-block mt-4 group md:mt-0">
                <MoreOutlined className="text-xl cursor-pointer" />
                <button className="absolute px-4 py-2 text-xs text-white transition-opacity duration-200 bg-gray-500 rounded opacity-0 -left-5 bottom-10 group-hover:opacity-100">
                  Export
                </button>
              </div> */}
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={tableData}
            loading={isLoading}
            onChange={(pagination, filters, sorter) => {
              setCurrentPage(pagination.current);
              if (sorter?.field) {
                setSortBy(sorter.field);
                setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
              } else {
                setSortBy(null);
                setSortOrder(null);
              }
            }}
            pagination={{
              current: meta?.page || currentPage,
              pageSize: meta?.limit || 10,
              total: meta?.total || 0,
              showTotal: (total) => `Total ${total} items`,
            }}
            style={{ marginTop: 20 }}
          />

          <Modal
            title="Subscription Details"
            open={isViewOpen}
            onCancel={handleCloseView}
            footer={[
              <Button key="close" onClick={handleCloseView}>
                Close
              </Button>,
            ]}
            width={600}
            centered
          >
            {selectedSubscription ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-xl bg-gray-50">
                  <p className="text-xs text-gray-500">Donor</p>
                  <p className="text-base font-semibold text-gray-900">{selectedSubscription.donorName}</p>
                  <p className="text-sm text-gray-600">Organization: {selectedSubscription.organizationName}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 border rounded-xl">
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-lg font-bold text-gray-900">${Number(selectedSubscription.amount || 0).toFixed(2)}</p>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize">{selectedSubscription.donationType || "-"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 border rounded-xl">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize">{selectedSubscription.status || "-"}</p>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <p className="text-xs text-gray-500">Date & Time</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedSubscription.dateTime ? new Date(selectedSubscription.dateTime).toLocaleString() : "-"}
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <p className="text-xs text-gray-500">Cause</p>
                  <p className="text-sm font-semibold text-gray-900 break-all">{selectedSubscription.cause || "-"}</p>
                </div>

                <div className="p-4 border rounded-xl">
                  <p className="text-xs text-gray-500">Message</p>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">
                    {selectedSubscription.specialMessage || "-"}
                  </p>
                </div>
              </div>
            ) : null}
          </Modal>
        </div>
      </div>
      <DonorsSubscription />
    </div>
  );
};

export default SubscriptionQuickLinks;
