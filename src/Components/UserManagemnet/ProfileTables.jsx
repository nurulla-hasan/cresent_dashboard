/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, DatePicker, Dropdown, Input, Menu, Select, Table } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import { RiRestartLine } from "react-icons/ri";
import user from "../../assets/image/user.png";
import { MdOtherHouses } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { FaPencil } from "react-icons/fa6";

const ProfileTables = () => {
  const { Option } = Select;

  // ✅ Added "status" field here
  const originalData = [
    {
      key: "1",
      name: "Josh Bill",
      email: "johnnb@gmail.com",
      dateTime: "12 Dec 2023 03:00 PM",
      donationType: "Business",
      donationMessage: "-",
      amount: 34.5,
      status: "Pending",
    },
    {
      key: "2",
      name: "M Karim",
      email: "kkkarim@gmail.com",
      dateTime: "10 Dec 2023 02:00 PM",
      donationType: "Donor",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 62.75,
      status: "Active",
    },
    {
      key: "3",
      name: "Josh Adam",
      email: "jadddam@gmail.com",
      dateTime: "08 Dec 2023 05:30 PM",
      donationType: "Organization",
      donationMessage: "-",
      amount: 15.2,
      status: "Suspended",
    },
    {
      key: "4",
      name: "Fajar Surya",
      email: "fjsurya@gmail.com",
      dateTime: "15 Dec 2023 09:00 AM",
      donationType: "Donor",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 47.3,
      status: "Active",
    },
    {
      key: "5",
      name: "Linda Blair",
      email: "lindablair98@gmail.com",
      dateTime: "18 Dec 2023 01:00 PM",
      donationType: "Business",
      donationMessage: "“Sending love & hope to everyone you’re helping”",
      amount: 23.9,
      status: "Pending",
    },
  ];

  const [data, setData] = useState(originalData);
  const [searchText, setSearchText] = useState("");

  const handleSort = (key, order) => {
    const sorted = [...data].sort((a, b) => {
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
      }
      return 0;
    });
    setData(sorted);
  };

  const handleRoleFilter = (role) => {
    if (role === "All") {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (item) => item.donationType === role
      );
      setData(filtered);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: (
        <div className="flex items-center gap-2">
          Name/Email
          <Select
            defaultValue="ascend"
            style={{ width: 90 }}
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
        <div className="flex gap-2 items-center">
          <img
            src={user}
            alt={record.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-medium">{record.name}</p>
            <p className="text-gray-400 text-sm">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          Last Active
          <Select
            defaultValue="descend"
            style={{ width: 100 }}
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
    },

    {
      title: (
        <div className="flex items-center gap-2">
          Role
          <Select
            defaultValue="All"
            style={{ width: 130 }}
            onChange={handleRoleFilter}
            suffixIcon={<DownOutlined />}
          >
            <Option value="All">All</Option>
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
            <div className="flex justify-center items-center gap-1 bg-blue-100 text-blue-600 px-4 py-1 rounded-2xl">
              <MdOtherHouses className="h-5 w-5" /> Business
            </div>
          )}
          {value === "Organization" && (
            <div className="flex justify-center items-center gap-1 bg-green-100 text-green-600 px-4 py-1 rounded-2xl">
              <GoOrganization className="h-5 w-5" /> Organization
            </div>
          )}
          {value === "Donor" && (
            <div className="flex justify-center items-center gap-1 bg-pink-100 text-pink-600 px-4 py-1 rounded-2xl">
              <FaUsers className="h-5 w-5" /> Donor
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <span
            className={`px-4 py-1 rounded-2xl text-sm font-medium 
          ${
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
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex justify-center items-center gap-3 text-lg">
          <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center">
            <VscEye className="cursor-pointer " />
          </div>
          <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center">
            <FaPencil className="cursor-pointer" />
          </div>
          <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center">
            <RxCrossCircled className="cursor-pointer" />
          </div>
        </div>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item>Sort A - Z</Menu.Item>
      <Menu.Item>Sort Z - A</Menu.Item>
      <Menu.Item>Recent First</Menu.Item>
      <Menu.Item>Oldest First</Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Profiles</h2>
        <div className="flex items-center gap-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
            className="w-60"
          />
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>
              Filter <DownOutlined />
            </Button>
          </Dropdown>
          <DatePicker placeholder="Select interval" />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />
    </div>
  );
};

export default ProfileTables;
