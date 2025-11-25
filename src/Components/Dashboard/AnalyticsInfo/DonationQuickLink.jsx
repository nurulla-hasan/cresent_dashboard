import { Table, Input } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import user from "../../../assets/image/user.png";
import Chnage from "../../../assets/image/Change.png";
import Gift from "../../../assets/image/Gift.png";
import Calendar from "../../../assets/image/Calendar.png";
import { SlArrowLeft } from "react-icons/sl";
import { useGetDonationHistoryQuery } from "../../../redux/feature/donation/donationApis";
import useSmartFetchHook from "../../hooks/useSmartFetchHook.ts";
const DonationQuickLink = () => {
  const { Search } = Input;
  // const { Option } = Select;

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

  const tableData = apiData.map((item, idx) => ({
    key: item?.createdAt || String(idx),
    name: item?.donor?.name || "-",
    email: item?.donor?.email || "-",
    dateTime: item?.createdAt,
    donationType: toTitleDonationType(item?.donationType),
    donationMessage: item?.specialMessage || "-",
    amount: Number(item?.amount) || 0,
  })) || [];

  const columns = [
    {
      title: "Name/Email",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text, record) => (
        <div className="flex gap-1">
          {/* Assuming 'user' is the image URL */}
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
        <div className="px-4 py-2 rounded-3xl flex items-center gap-2">
          {value === "Round Up" && (
            <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-4 py-1 rounded-2xl">
              <img src={Chnage} alt="" /> Round Up
            </div>
          )}
          {value === "Recurring" && (
            <div className="flex items-center gap-1 bg-green-100 text-green-600 px-4 py-1 rounded-2xl">
              <img src={Calendar} alt="" />
              Recurring
            </div>
          )}
          {value === "One Time" && (
            <div className="flex items-center gap-1 bg-pink-100 text-pink-600 px-4 py-1 rounded-2xl">
              <img src={Gift} alt="" /> One Time
            </div>
          )}
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
      render: () => (
        <div className="flex justify-center items-center gap-2">
          <VscEye className="h-5 w-5" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <button onClick={() => window.history.back()} className="bg-white px-4 py-3 rounded-3xl flex justify-center items-center gap-2 mb-4">
        <SlArrowLeft /> Back
      </button>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold mb-4">Donations Overview</h1>
          <p className="text-lg text-gray-600 mb-4">
            Filter, review, and manage receipts with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 justify-center  items-center gap-3">
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Total Donations</p>
            <h1 className="text-2xl font-medium mt-10">
              <span className="text-gray-400">$</span> {Number(donationRes?.totalDonation || 0).toFixed(2)}
              <span className="text-sm text-green-600"> {donationRes?.totalDonationChangeText || ""}</span>
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Avg. Donation</p>
            <h1 className="text-2xl font-medium mt-10">
              <span className="text-gray-400">$</span> {Number(donationRes?.avgDonationAmount || 0).toFixed(2)}
              <span className="text-sm text-gray-400"> {donationRes?.avgDonationChangeText || ""}</span>
            </h1>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Total Donors</p>
            <h1 className="text-2xl font-medium mt-10">
              {donationRes?.totalDonors || 0}
              <span className="text-sm text-green-500"> {donationRes?.totalDonorsChangeText || ""}</span>
            </h1>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border my-6">
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-xl font-medium">Donation History</h1>

            <div className="flex items-center gap-3 mb-4">
              <div>
                <Search
                  placeholder="Search by name or email"
                  allowClear
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: 300,
                  }}
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

              <div className="relative group  inline-block">
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
            <div className="text-red-500 mt-2">Failed to load donation history.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationQuickLink;
