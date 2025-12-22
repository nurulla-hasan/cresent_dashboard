import { Table, Input, Drawer } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import user from "../../../assets/image/user.png";
import Chnage from "../../../assets/image/Change.png";
import Gift from "../../../assets/image/Gift.png";
import Calendar from "../../../assets/image/Calendar.png";
import { SlArrowLeft } from "react-icons/sl";
import { useGetDonationHistoryQuery } from "../../../redux/feature/donation/donationApis";
import useSmartFetchHook from "../../hooks/useSmartFetchHook.ts";
import { useState } from "react";
const DonationQuickLink = () => {
  const { Search } = Input;

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const {
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    data: donationRes,
    pagination,
    isLoading,
    isError,
    setFilterParams,
  } = useSmartFetchHook(useGetDonationHistoryQuery);

  const apiData = donationRes?.donationHistory || [];
  const toTitleDonationType = (type) => {
    if (!type) return "-";
    const map = {
      "round-up": "Round Up",
      "one-time": "One Time",
      recurring: "Recurring",
    };
    return map[type] || type;
  };

  const renderDonationTypeBadge = (value) => (
    <div className="flex items-center gap-2">
      {value === "Round Up" && (
        <div className="flex items-center gap-1 px-4 py-1 text-blue-600 bg-blue-100 rounded-2xl">
          <img src={Chnage} alt="" /> Round Up
        </div>
      )}
      {value === "Recurring" && (
        <div className="flex items-center gap-1 px-4 py-1 text-green-600 bg-green-100 rounded-2xl">
          <img src={Calendar} alt="" />
          Recurring
        </div>
      )}
      {value === "One Time" && (
        <div className="flex items-center gap-1 px-4 py-1 text-pink-600 bg-pink-100 rounded-2xl">
          <img src={Gift} alt="" /> One Time
        </div>
      )}
      {value !== "Round Up" && value !== "Recurring" && value !== "One Time" ? (
        <div className="px-3 py-1 text-gray-700 bg-gray-100 rounded-2xl">{value || "-"}</div>
      ) : null}
    </div>
  );

  const tableData = apiData.map((item, idx) => ({
    key: item?.createdAt || String(idx),
    _id: item?._id,
    donorName: item?.donor?.name || "-",
    donorEmail: item?.donor?.email || "-",
    organizationName: item?.organization?.name || "-",
    organizationEmail: item?.organization?.email || "-",
    causeId: item?.cause || "-",
    donationTypeRaw: item?.donationType,
    donationType: toTitleDonationType(item?.donationType),
    dateTime: item?.createdAt,
    donationMessage: item?.specialMessage || "-",
    amount: Number(item?.amount) || 0,
  })) || [];

  const handleOpenView = (record) => {
    setSelectedDonation(record);
    setIsViewOpen(true);
  };

  const columns = [
    {
      title: "Name/Email",
      dataIndex: "donorName",
      key: "name",
      sorter: true,
      render: (text, record) => (
        <div className="flex gap-1">
          {/* Assuming 'user' is the image URL */}
          <img
            src={user}
            alt={record.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{record.donorName}</p>
            <p className="text-gray-400">{record.donorEmail}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      render: (amount) => <p className="font-medium"> ${Number(amount || 0).toFixed(2)}</p>,
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      sorter: true,
      render: (dateTime) => (
        <p className="font-medium">{dateTime ? new Date(dateTime).toLocaleString() : "-"}</p>
      ),
    },
    {
      title: "Donation Type",
      dataIndex: "donationType",
      key: "donationType",
      filters: [
        { text: "One Time", value: "one-time" },
        { text: "Recurring", value: "recurring" },
        { text: "Round Up", value: "round-up" },
      ],
      render: (value) => (
        <div className="flex items-center gap-2 px-4 py-2 rounded-3xl">
          {renderDonationTypeBadge(value)}
        </div>
      ),
    },

    {
      title: "Donation Message",
      dataIndex: "donationMessage",
      key: "donationMessage",
      render: (donationMessage) => (
        <p className="font-medium"> {donationMessage}</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleOpenView(record)}
            className="flex items-center justify-center"
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
      <button onClick={() => window.history.back()} className="flex items-center justify-center gap-2 px-4 py-3 mb-4 bg-white rounded-3xl">
        <SlArrowLeft /> Back
      </button>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="mb-4 text-3xl font-bold">Donations Overview</h1>
          <p className="mb-4 text-lg text-gray-600">
            Filter, review, and manage receipts with ease.
          </p>
        </div>

        <div className="grid items-center justify-center grid-cols-1 gap-3 md:grid-cols-3">
          <div className="p-6 bg-white border rounded-3xl">
            <p className="text-lg font-medium">Total Donations</p>
            <h1 className="mt-10 text-2xl font-medium">
              <span className="text-gray-400">$</span> {Number(donationRes?.totalDonation || 0).toFixed(2)}
              <span className="text-sm text-green-600"> {donationRes?.totalDonationChangeText || ""}</span>
            </h1>
          </div>

          <div className="p-6 bg-white border rounded-3xl">
            <p className="text-lg font-medium">Avg. Donation</p>
            <h1 className="mt-10 text-2xl font-medium">
              <span className="text-gray-400">$</span> {Number(donationRes?.avgDonationAmount || 0).toFixed(2)}
              <span className="text-sm text-gray-400"> {donationRes?.avgDonationChangeText || ""}</span>
            </h1>
          </div>
          <div className="p-6 bg-white border rounded-3xl">
            <p className="text-lg font-medium">Total Donors</p>
            <h1 className="mt-10 text-2xl font-medium">
              {donationRes?.totalDonors || 0}
              <span className="text-sm text-green-500"> {donationRes?.totalDonorsChangeText || ""}</span>
            </h1>
          </div>
        </div>

        <div className="p-6 my-6 bg-white border rounded-3xl">
          <div className="flex items-center justify-between gap-5">
            <h1 className="text-xl font-medium">Donation History</h1>

            <div className="flex items-center gap-3 mb-4">
              <div>
                <Search
                  placeholder="Search by name or email"
                  allowClear
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* <div>
                <Select defaultValue="selected" style={{ width: 120 }}>
                  <Option value="selected">Selected</Option>
                  <Option value="all">All</Option>
                </Select>
              </div> */}

              {/* <div>
                <Button>
                  Monthly
                </Button>
              </div> */}

              <div className="relative inline-block group">
                <MoreOutlined className="text-xl cursor-pointer" />
                <button className="absolute px-4 py-2 text-xs text-white transition-opacity duration-200 bg-gray-500 rounded opacity-0 -left-5 bottom-10 group-hover:opacity-100">
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
              setCurrentPage(pagination.current);
              const newFilterParams = {};
              // Handle sorting
              if (sorter.field) {
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
              // showSizeChanger: true,
              // pageSizeOptions: ["5", "10", "20", "50"],
              showTotal: (total) => `Total ${total} items`,
            }}
            scroll={{
              x: true,
            }}
          />
          {isError && (
            <div className="mt-2 text-red-500">Failed to load donation history.</div>
          )}
        </div>
      </div>

      <Drawer
        title="Donation Details"
        open={isViewOpen}
        onClose={() => {
          setIsViewOpen(false);
          setSelectedDonation(null);
        }}
        placement="right"
        width={420}
      >
        {selectedDonation ? (
          <div className="space-y-4">
            <div className="p-4 border rounded-xl bg-gray-50">
              <p className="text-xs text-gray-500">Donor</p>
              <p className="text-base font-semibold text-gray-900">{selectedDonation.donorName}</p>
              <p className="text-sm text-gray-600">{selectedDonation.donorEmail}</p>
            </div>

            <div className="p-4 border rounded-xl bg-gray-50">
              <p className="text-xs text-gray-500">Organization</p>
              <p className="text-base font-semibold text-gray-900">{selectedDonation.organizationName}</p>
              <p className="text-sm text-gray-600">{selectedDonation.organizationEmail}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 border rounded-xl">
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-lg font-bold text-gray-900">${Number(selectedDonation.amount || 0).toFixed(2)}</p>
              </div>
              <div className="p-4 border rounded-xl">
                <p className="text-xs text-gray-500">Type</p>
                <div className="mt-1">{renderDonationTypeBadge(selectedDonation.donationType || "-")}</div>
              </div>
            </div>

            <div className="p-4 border rounded-xl">
              <p className="text-xs text-gray-500">Cause</p>
              <p className="text-sm font-semibold text-gray-900 break-all">
                {selectedDonation.causeId || "-"}
              </p>
            </div>

            <div className="p-4 border rounded-xl">
              <p className="text-xs text-gray-500">Date & Time</p>
              <p className="text-sm font-semibold text-gray-900">
                {selectedDonation.dateTime ? new Date(selectedDonation.dateTime).toLocaleString() : "-"}
              </p>
            </div>

            <div className="p-4 border rounded-xl">
              <p className="text-xs text-gray-500">Donation Message</p>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {selectedDonation.donationMessage || "-"}
              </p>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default DonationQuickLink;
