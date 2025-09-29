import { useState } from "react";
import { Pagination, Select } from "antd";
import { Table } from "antd";
import { Input } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { RiRestartLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";
import { DownOutlined } from "@ant-design/icons";
import user from "../../../assets/image/user.png";
import Chnage from "../../../assets/image/Change.png";
import Gift from "../../../assets/image/Gift.png";
import Calendar from "../../../assets/image/Calendar.png";
import { SlArrowLeft } from "react-icons/sl";
const DonationQuickLink = () => {
  const [active, setActive] = useState("Today");
  const { Search } = Input;
  const { Option } = Select;
  const onSearch = (value) => {
    console.log("Search input: ", value);
  };

  const [sortOrder, setSortOrder] = useState({
    name: "ascend",
    dateTime: "descend",
    amount: "descend",
    donationType: "ascend",
  });

  const data = [
    {
      key: "1",
      name: "Josh Bill",
      email: "johnnb@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Round Up",
      donationMessage: "-",
      amount: 34.5,
    },
    {
      key: "2",
      name: "M Karim",
      email: "kkkarim@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Recurring",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 62.75,
    },
    {
      key: "3",
      name: "Josh Adam",
      email: "jadddam@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "One Time",
      donationMessage: "-",
      amount: 15.2,
    },
    {
      key: "4",
      name: "Fajar Surya",
      email: "fjsurya@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "One Time",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 47.3,
    },
    {
      key: "5",
      name: "Linda Blair",
      email: "lindablair98@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Recurring",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 23.9,
    },
  ];

  const handleSort = (key, order) => {
    setSortOrder({ ...sortOrder, [key]: order });
    // Update sorting logic here based on the selected filters
    data.sort((a, b) => {
      if (key === "amount") {
        return order === "ascend" ? a.amount - b.amount : b.amount - a.amount;
      } else if (key === "name") {
        return order === "ascend"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (key === "dateTime") {
        return order === "ascend"
          ? new Date(a.dateTime) - new Date(b.dateTime)
          : new Date(b.dateTime) - new Date(a.dateTime);
      } else {
        return 0;
      }
    });
  };

  const columns = [
    {
      title: (
        <div className="flex items-center gap-2">
          Name/Email
          <Select
            defaultValue="ascend"
            style={{ width: 80 }}
            onChange={(value) => handleSort("name", value)}
            suffixIcon={<DownOutlined />}
          >
            <Option value="ascend">Ascend</Option>
            <Option value="descend">Descend</Option>
          </Select>
        </div>
      ),
      dataIndex: "email",
      key: "email",
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
      title: (
        <div className="flex items-center gap-2">
          Amount
          <Select
            defaultValue="descend"
            style={{ width: 80 }}
            onChange={(value) => handleSort("amount", value)}
            suffixIcon={<DownOutlined />}
          >
            <Option value="ascend">Lowest</Option>
            <Option value="descend">Highest</Option>
          </Select>
        </div>
      ),
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <p className="font-medium"> ${amount.toFixed(2)}</p>,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          Date & Time
          <Select
            defaultValue="descend"
            style={{ width: 80 }}
            onChange={(value) => handleSort("dateTime", value)}
            suffixIcon={<DownOutlined />}
          >
            <Option value="ascend">Oldest</Option>
            <Option value="descend">Recent</Option>
          </Select>
        </div>
      ),
      dataIndex: "dateTime",
      key: "dateTime",
      render: (dateTime) => <p className="font-medium"> ${dateTime}</p>,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          Donation Type
          <Select
            defaultValue="One Time"
            style={{ width: 120 }}
            onChange={(value) => handleSort("donationType", value)}
            suffixIcon={<DownOutlined />}
          >
            <Option value="One Time">One Time</Option>
            <Option value="Recurring">Recurring</Option>
            <Option value="Round Up">Round Up</Option>
          </Select>
        </div>
      ),
      dataIndex: "donationType",
      key: "donationType",
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
          <RiRestartLine className="h-5 w-5" />
        </div>
      ),
    },
  ];
  const btnClass = (label) =>
    `px-6 py-3 rounded-3xl border transition ${
      active === label ? "bg-black text-white" : "bg-white text-black"
    }`;
    const handleBack=()=>{
       window.history.back();
    }
  return (
    <div>
      <button onClick={handleBack} className="bg-white px-4 py-3 rounded-3xl flex justify-center items-center gap-2 mb-4"> 
        <SlArrowLeft /> Back</button>
      <div className="flex justify-between items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold mb-4">Donations Overview</h1>
          <p className="text-lg text-gray-600 mb-4">
            Filter, review, and manage receipts with ease.
          </p>
        </div>
        <div className="w-full md:w-[30%] flex justify-start items-center gap-5">
          <button
            className={btnClass("Today")}
            onClick={() => setActive("Today")}
          >
            Today
          </button>
          <button
            className={btnClass("This Week")}
            onClick={() => setActive("This Week")}
          >
            This Week
          </button>
          <button
            className={btnClass("This Month")}
            onClick={() => setActive("This Month")}
          >
            This Month
          </button>
        </div>
        {/* <div className="flex justify-start items-center gap-5 mb-5">
          {["All Donors", "Export"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-3xl ${
                activeTab === tab ? "bg-black text-white" : "bg-white border"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div> */}
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center  items-center gap-3">
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Total Donations</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 4000{" "}
              <span className="text-sm text-green-400">+8.2% </span>{" "}
              <span className="text-gray-400 text-sm">vs last month</span>{" "}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Avg. Donation</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 400{" "}
              <span className="text-sm text-gray-400">per user</span>{" "}
            </h1>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Total Donors</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 4000{" "}
              <span className="text-sm text-green-500">5.4%</span>{" "}
            </h1>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border my-6">
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-xl font-medium">Donation History</h1>

            <div className="flex items-center gap-3">
              <div className="mt-4 md:mt-0">
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  enterButton
                />
              </div>

              <div className="mt-4 md:mt-0">
                <Select defaultValue="selected" style={{ width: 120 }}>
                  <Option value="selected">Selected</Option>
                  <Option value="all">All</Option>
                </Select>
              </div>

              <div className="mt-4 md:mt-0">
                <button className="px-3 py-2 border rounded-md text-sm text-gray-700">
                  Monthly
                </button>
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
            dataSource={data}
            pagination={{ pageSize: 5 }}
            style={{ marginTop: 20 }}
          />

          <div className="flex justify-end items-center my-10">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationQuickLink;
