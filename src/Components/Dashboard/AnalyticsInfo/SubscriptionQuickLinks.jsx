
import { Table, DatePicker } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import useSmartFetchHook from "../../hooks/useSmartFetchHook.ts";
import { VscEye } from "react-icons/vsc";
import user from "../../../assets/image/user.png";

import { SlArrowLeft } from "react-icons/sl";
import { TfiDownload } from "react-icons/tfi";
import { RxCrossCircled } from "react-icons/rx";
import DonorsSubscription from "../../ManageSubscription/SubscriptionAndPaymentExport";
import { useGetSubscriptionDataQuery } from "../../../redux/feature/subscription/subscriptionApis.js";
import Search from "antd/es/input/Search";
const SubscriptionQuickLinks = () => {
  const { RangePicker } = DatePicker;

  const {
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    data: donationRes,
    pagination,
    isLoading,
    // isError,
    setFilterParams,
  } = useSmartFetchHook(useGetSubscriptionDataQuery);

  const apiData = donationRes?.subscriptionDonationHistory || [];

  const tableData =
    apiData.map((item, idx) => ({
      key: item?.createdAt || String(idx),
      name: item?.donor?.name || "-",
      email: item?.organization?.name || "-",
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
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (text, record) => (
        <div className="flex gap-1">
          <img
            src={user}
            alt={record.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-medium">{record.name}</p>
            <p className="text-gray-400">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "donationType",
      key: "donationType",
      render: (value) => (
        <span className="px-3 py-1 rounded-2xl bg-blue-50 text-blue-600 text-sm capitalize">
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
            status === "Active"
              ? "bg-green-100 text-green-600 px-2 py-1 rounded-3xl text-center"
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
      render: () => (
        <div className="flex justify-center items-center gap-2 bg-">
          <div className="bg-neutral-100 h-12 w-12 p-3 flex items-center justify-center rounded-full">
            <VscEye className="h-5 w-5" />
          </div>
          <div className="bg-neutral-100 h-12 w-12 p-3 flex items-center justify-center rounded-full">
            <TfiDownload className="h-5 w-5" />
          </div>
          <div className="bg-neutral-100 h-12 w-12 p-3 flex items-center justify-center rounded-full">
            <RxCrossCircled className="h-5 w-5" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="bg-white px-4 py-3 rounded-3xl flex justify-center items-center gap-2 mb-4"
      >
        <SlArrowLeft /> Back
      </button>
      <div className="flex justify-between items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold mb-4">Subscriptions Overview</h1>
          <p className="text-lg text-gray-600 mb-4">
            Track activity, view invoices, and keep renewals healthy.
          </p>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center  items-center gap-3">
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Active Subscriptions</p>
            <h1 className="text-2xl font-medium mt-10">
              {donationRes?.totalActiveSubscriptions ?? 0}
              {/* API does not provide change text vs last month */}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Canceled Subscriptions</p>
            <h1 className="text-2xl font-medium mt-10">
              {donationRes?.totalCancelledSubscriptions ?? 0}
              {/* <span className="text-gray-400 text-sm">vs last month</span> */}
            </h1>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Renewal Rate</p>
            <h1 className="text-2xl font-medium mt-10">
              {donationRes?.monthlyRenewalRate ?? 0}%
              {/* <span className="text-gray-400 text-sm">vs last month</span> */}
            </h1>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border my-6">
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-xl font-medium">Subscription Listing</h1>

            <div className="flex items-center gap-3">
              <div className="mt-4 md:mt-0">
                <Search
                  placeholder="input search text"
                  allowClear
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="mt-4 md:mt-0">
                <RangePicker
                  placeholder={["Start date", "End date"]}
                  onChange={(dates, dateStrings) => {
                    if (dates && dates.length === 2) {
                      setFilterParams(prev => ({
                        ...prev,
                        startDate: dateStrings[0],
                        endDate: dateStrings[1]
                      }));
                    } else {
                      // Clear date range
                      setFilterParams(prev => {
                        const newParams = { ...prev };
                        delete newParams.startDate;
                        delete newParams.endDate;
                        return newParams;
                      });
                    }
                  }}
                />
              </div>

              <div className="relative group mt-4 md:mt-0 inline-block">
                <MoreOutlined className="text-xl cursor-pointer" />
                <button className="absolute -left-5 bottom-10 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-500 text-white px-4 py-2 rounded">
                  Export
                </button>
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={tableData}
            loading={isLoading}
            onChange={(pagination, filters, sorter) => {
              // Update page
              setCurrentPage(pagination.current);
              const newFilterParams = {};
              // Handle sorting
              if (sorter?.field) {
                newFilterParams.sortBy = sorter.field;
                newFilterParams.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
              }
              // Handle filters
              Object.keys(filters).forEach((key) => {
                if (filters[key]) {
                  newFilterParams[key] = filters[key][0];
                }
              });

              setFilterParams(newFilterParams);
            }}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: pagination.total,
              showTotal: (total) => `Total ${total} items`,
            }}
            style={{ marginTop: 20 }}
          />
        </div>
      </div>
      <DonorsSubscription />
    </div>
  );
};

export default SubscriptionQuickLinks;
