/* eslint-disable no-unused-vars */
import { Button, DatePicker, Dropdown, Input, Menu, Table, Tag } from "antd";
import { useState } from "react";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
const PendingApproval = () => {
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
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </div>
    );
};

export default PendingApproval;