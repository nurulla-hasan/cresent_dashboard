/* eslint-disable no-unused-vars */
import { Table, Tag, Button, Input, Dropdown, Menu, DatePicker } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProfileTables from "../ProfileTables";
import PendingApproval from "../PendingApproval";

const AllUsers = () => {
  const [searchText, setSearchText] = useState("");

  // ----------- Static Table Data -----------
  const data = [
    {
      key: "1",
      name: "Josh Bill",
      email: "josh@gmail.com",
      lastActive: "12 Dec 2023 09:30 PM",
      role: "Business",
      status: "Pending",
    },
    {
      key: "2",
      name: "HFL Foundation",
      email: "contact@hflfoundation.org",
      lastActive: "12 Dec 2023 09:30 PM",
      role: "Organization",
      status: "Active",
    },
    {
      key: "3",
      name: "Josh Adam",
      email: "joshadam@gmail.com",
      lastActive: "12 Dec 2023 09:30 PM",
      role: "Donor",
      status: "Suspended",
    },
    {
      key: "4",
      name: "Fajar Surya",
      email: "fajar@gmail.com",
      lastActive: "12 Dec 2023 09:30 PM",
      role: "Donor",
      status: "Active",
    },
    {
      key: "5",
      name: "Linda Blair",
      email: "lindablair@gmail.com",
      lastActive: "12 Dec 2023 09:30 PM",
      role: "Donor",
      status: "Active",
    },
  ];

  // ----------- Table Columns -----------
  const columns = [
    {
      title: "Name/Email",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <p className="font-medium">{record.name}</p>
          <p className="text-gray-500 text-sm">{record.email}</p>
        </div>
      ),
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          color={
            role === "Donor" ? "purple" : role === "Business" ? "blue" : "green"
          }
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Active"
              ? "green"
              : status === "Pending"
              ? "gold"
              : status === "Suspended"
              ? "red"
              : "default"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-2">
          <Button type="text">👁</Button>
          <Button type="text">✏️</Button>
          <Button type="text">🗑</Button>
        </div>
      ),
    },
  ];

  // ----------- Dropdown Filter Menu -----------
  const menu = (
    <Menu>
      <Menu.Item>Sort A - Z</Menu.Item>
      <Menu.Item>Sort Z - A</Menu.Item>
      <Menu.Item>Recent First</Menu.Item>
      <Menu.Item>Oldest First</Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ---------- Top Title ---------- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-neutral-400">
            Manage users, organizations, and businesses in one place.
          </p>
        </div>
        <button className="bg-white px-4 py-2 rounded-3xl border flex justify-between items-center gap-2">
          <FaArrowDown /> Export
        </button>
      </div>

      {/* ---------- Stats Cards ---------- */}
      <div className="bg-white p-6 rounded-3xl my-10 border">
        <div>
          <h1 className="text-2xl font-semibold mb-12">
            Total Registered Profiles
          </h1>
          <h1 className="text-4xl font-bold mb-6">
            145,230{" "}
            <span className="text-green-500 text-sm font-normal">+8.2% </span>{" "}
            <span className="text-gray-400 text-sm font-normal">
              vs last month
            </span>{" "}
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-8 ">
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Donors</p>
                <p className="text-neutral-400 ">
                  {" "}
                  <span className="text-green-500">+5.2%</span> vs last month
                </p>
              </div>
              <Link to="/donationQuickLink">
                <div className="bg-white rounded-full h-10 w-10 p-1 flex justify-center items-center">
                  <BsArrowUpRight />
                </div>
              </Link>
            </div>

            <h2 className="text-2xl font-semibold">
              120,340{" "}
              <span className="text-sm text-gray-400 ml-2">
                active profiles
              </span>
            </h2>
          </div>
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Organizations</p>
                <p className="text-neutral-400 ">
                  {" "}
                  <span className="text-green-500">+5.2%</span> vs last month
                </p>
              </div>
              <div className="bg-white rounded-full h-10 w-10 p-1 flex justify-center items-center">
                <BsArrowUpRight />
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              120,340{" "}
              <span className="text-sm text-gray-400 ml-2">
                active profiles
              </span>
            </h2>
          </div>
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Businesses</p>
                <p className="text-neutral-400 ">
                  {" "}
                  <span className="text-red-500">-5.2%</span> vs last month
                </p>
              </div>
              <div className="bg-white rounded-full h-10 w-10 p-1 flex justify-center items-center">
                <BsArrowUpRight />
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              120
              <span className="text-sm text-gray-400 ml-2">
                active profiles
              </span>
            </h2>
          </div>
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Pending Approvals</p>
                {/* <p className="text-neutral-400 ">
                  {" "}
                  <span className="text-red-500">-5.2%</span> vs last month
                </p> */}
              </div>
              <div className="bg-white rounded-full h-10 w-10 p-1 flex justify-center items-center">
                <BsArrowUpRight />
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              1
              <span className="text-sm text-gray-400 ml-2">
                pending profiles
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* ---------- Profiles Table ---------- */}
      <ProfileTables />

      <PendingApproval />
    </div>
  );
};

export default AllUsers;
