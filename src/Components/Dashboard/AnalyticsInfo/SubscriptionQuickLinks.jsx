import { useState } from "react";
import { Pagination, Select, Tag } from "antd";
import { Table } from "antd";
import { Input } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { RiRestartLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";
import { DownOutlined } from "@ant-design/icons";
import user from "../../../assets/image/user.png";
import { FaArrowDownLong } from "react-icons/fa6";
import { SlArrowLeft } from "react-icons/sl";
import house from "../../../assets/image/house.png";
import org from "../../../assets/image/org.png";
import person from "../../../assets/image/person.png";
import { TfiDownload } from "react-icons/tfi";
import { RxCrossCircled } from "react-icons/rx";
import DonorsSubscription from "../../ManageSubscription/DonorsSubscription";
const SubscriptionQuickLinks = () => {
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
      donationType: "Business",
      donationMessage: "-",
      amount: 34.5,
      status: "Active",
    },
    {
      key: "2",
      name: "M Karim",
      email: "kkkarim@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Organization",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 62.75,
      plan: "Focus Plan",
      status: "Inactive",
    },
    {
      key: "3",
      name: "Josh Adam",
      email: "jadddam@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Donor",
      donationMessage: "-",
      amount: 15.2,
      plan: "Freedom Plan",
      status: "Active",
    },
    {
      key: "4",
      name: "Fajar Surya",
      email: "fjsurya@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Donor",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 47.3,
      plan: "Foundation Plan",
      status: "Inactive",
    },
    {
      key: "5",
      name: "Linda Blair",
      email: "lindablair98@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Donor",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 23.9,
      status: "Inactive",
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
          Type
          <Select
            defaultValue="Business"
            style={{ width: 120 }}
            onChange={(value) => handleSort("donationType", value)}
            suffixIcon={<DownOutlined />}
          >
            <Option value="Business">Business</Option>
            <Option value="Organization">Organization</Option>
            <Option value="Donor">Donor</Option>
          </Select>
        </div>
      ),
      dataIndex: "donationType",
      key: "donationType",
      render: (value) => (
        <div className="px-4 py-2 rounded-3xl flex items-center gap-2">
          {value === "Business" && (
            <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-4 py-1 rounded-2xl">
              <img src={house} alt="" /> Business
            </div>
          )}
          {value === "Organization" && (
            <div className="flex items-center gap-1 bg-green-100 text-green-600 px-4 py-1 rounded-2xl">
              <img src={org} alt="" />
              Organization
            </div>
          )}
          {value === "Donor" && (
            <div className="flex items-center gap-1 bg-pink-100 text-pink-600 px-4 py-1 rounded-2xl">
              <img src={person} alt="" /> Donor
            </div>
          )}
        </div>
      ),
    },

    {
      title: (
        <div className="flex items-center gap-2">
          Plan
          <Select
            defaultValue="Focus Plan"
            style={{ width: 80 }}
            onChange={(value) => handleSort("amount", value)}
            suffixIcon={<DownOutlined />}
          >
            <Option value="Focus Plan">Focus Plan</Option>
            <Option value="Foundation Plan">Foundation Plan</Option>
            <Option value="Freedom Plan">Freedom Plan</Option>
          </Select>
        </div>
      ),
      dataIndex: "plan",
      key: "plan",
      render: (plan) => <p className="font-medium">{plan}</p>,
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
      render: (dateTime) => <p className="font-medium">{dateTime}</p>,
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
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div>
      <button
        onClick={handleBack}
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
              {" "}
              <span className="text-gray-400">$</span> 4000{" "}
              <span className="text-sm text-green-400">+8.2% </span>{" "}
              <span className="text-gray-400 text-sm">vs last month</span>{" "}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Canceled Subscriptions</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 400{" "}
              <span className="text-gray-400 text-sm">vs last month</span>{" "}
            </h1>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Renewal Rate</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 4000{" "}
              <span className="text-sm text-green-500">5.4%</span>{" "}
              <span className="text-gray-400 text-sm">vs last month</span>{" "}
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

              <div className="group relative mt-4 md:mt-0">
                <MoreOutlined className="text-xl cursor-pointer" />
                <span className="absolute left-0 bottom-0 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Export
                </span>
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
      <DonorsSubscription />
    </div>
  );
};

export default SubscriptionQuickLinks;
