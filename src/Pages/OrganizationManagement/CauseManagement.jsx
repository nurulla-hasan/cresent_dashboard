/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Table,
  Upload,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { VscEye } from "react-icons/vsc";
import { FaImage, FaPencilAlt } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { BsPatchCheckFill } from "react-icons/bs";
import { ImHourGlass } from "react-icons/im";
import { CiPause1 } from "react-icons/ci";

import book from "../../assets/image/Book.png";
import phone from "../../assets/image/Phone.png";
import jacket from "../../assets/image/Jacket.png";
import user from "../../assets/image/user.png";

const { Option } = Select;

const CauseManagement = () => {
  const originalData = [
    {
      key: "1",
      name: "Backpacks & Books",
      email: "johnnb@gmail.com",
      dateTime: "June 2025 - Ongoing",
      category: "Education",
      donationMessage: "-",
      amount: 34.5,
      status: "Pending",
      img: book,
    },
    {
      key: "2",
      name: "Digital Dreams",
      email: "kkkarim@gmail.com",
      dateTime: "June 2025 - Ongoing",
      category: "Refugees",
      donationMessage: "Sending love & hope to everyone you’re helping",
      amount: 62.75,
      status: "Active",
      img: phone,
    },
    {
      key: "3",
      name: "Warmth in Winter",
      email: "jadddam@gmail.com",
      dateTime: "June 2025 - Ongoing",
      category: "Education",
      donationMessage: "-",
      amount: 15.2,
      status: "Suspended",
      img: jacket,
    },
  ];

  const [data, setData] = useState(originalData);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [form] = Form.useForm();

  /** 📁 Image Upload Preview */
  const handleBeforeUpload = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    form.setFieldsValue({ profileImage: file });
    return false;
  };

  /** ✏️ Edit Modal Open */
  const handleEdit = (record) => {
    setSelectedProfile(record);
    const [firstName, lastName = ""] = record.name.split(" ");
    form.setFieldsValue({
      firstName,
      lastName,
      email: record.email,
      mobile: "+61 470 292 023",
      password: "********",
    });
    setPreviewImage(user);
    setIsModalVisible(true);
  };

  /** ❌ Close Modal */
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setPreviewImage(null);
    setSelectedProfile(null);
  };

  /** 💾 Save Changes */
  const handleSave = (values) => {
    console.log("Updated values:", values);
    setIsModalVisible(false);
  };

  /** 🔍 Sort Handler */
  const handleSort = (key, order) => {
    const sorted = [...data].sort((a, b) => {
      if (key === "amount") return order === "ascend" ? a.amount - b.amount : b.amount - a.amount;
      if (key === "name") return order === "ascend" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      if (key === "dateTime") return order === "ascend" ? new Date(a.dateTime) - new Date(b.dateTime) : new Date(b.dateTime) - new Date(a.dateTime);
      return 0;
    });
    setData(sorted);
  };

  /** 🪄 Category Filter */
  const handleCategoryFilter = (category) => {
    setData(category === "All" ? originalData : originalData.filter((item) => item.category === category));
  };

  /** 🔎 Search Filter */
  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.email.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, data]
  );

  /** 🟢 Render Status with Icon */
  const renderStatus = (status) => {
    const map = {
      Active: {
        icon: <BsPatchCheckFill className="text-green-500" />,
        className: "bg-green-100 text-green-600 ",
      },
      Pending: {
        icon: <ImHourGlass className="text-yellow-500" />,
        className: "bg-yellow-100 text-yellow-600",
      },
      Suspended: {
        icon: <CiPause1 className="text-red-500" />,
        className: "bg-red-200 text-red-600",
      },
    };

    const { icon, className } = map[status] || map.Suspended;
    return (
      <span className={`px-4 py-1 rounded-2xl text-sm font-medium flex items-center gap-2 ${className}`}>
        {icon} {status}
      </span>
    );
  };

  /** 📊 Table Columns */
  const columns = [
    {
      title: (
        <div className="flex items-center gap-2">
          Cause Name
          <Select defaultValue="ascend" style={{ width: 100 }} onChange={(v) => handleSort("name", v)} suffixIcon={<DownOutlined />}>
            <Option value="ascend">A-Z</Option>
            <Option value="descend">Z-A</Option>
          </Select>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img src={record.img} alt={record.name} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="font-medium">{record.name}</p>
            <p className="text-gray-400 text-sm">{record.dateTime}</p>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          Category
          <Select defaultValue="All" style={{ width: 130 }} onChange={handleCategoryFilter} suffixIcon={<DownOutlined />}>
            <Option value="All">All</Option>
            <Option value="Education">Education</Option>
            <Option value="Refugees">Refugees</Option>
          </Select>
        </div>
      ),
      dataIndex: "category",
      key: "category",
      render: (value) => (
        <div className="px-4 py-2 rounded-3xl flex items-center gap-2">
          {value === "Education" && (
            <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-4 py-1 rounded-2xl">
              📚 Education
            </div>
          )}
          {value === "Refugees" && (
            <div className="flex items-center gap-1 bg-green-100 text-green-600 px-4 py-1 rounded-2xl">
              🧳 Refugees
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderStatus,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-3 text-lg">
          <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer">
            <VscEye />
          </div>
          <div onClick={() => handleEdit(record)} className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer">
            <FaPencilAlt />
          </div>
          <div className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer">
            <RxCrossCircled />
          </div>
        </div>
      ),
    },
  ];

  const menu = (
    <Menu
      items={[
        { key: "1", label: "Sort A - Z" },
        { key: "2", label: "Sort Z - A" },
        { key: "3", label: "Recent First" },
        { key: "4", label: "Oldest First" },
      ]}
    />
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
      {/* 🔎 Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Cause Management</h2>
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

      {/* 📊 Table */}
      <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 5 }} rowKey="key" />

      {/* ✏️ Edit Modal */}
      <Modal title="Edit Profile" open={isModalVisible} onCancel={handleCancel} footer={null} centered>
        <Form layout="vertical" form={form} onFinish={handleSave}>
          <div className="flex justify-center mb-4">
            <Upload showUploadList={false} beforeUpload={handleBeforeUpload} accept="image/*">
              <div className="border border-dashed border-gray-300 p-4 rounded-full cursor-pointer flex flex-col items-center">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="h-24 w-24 rounded-full object-cover" />
                ) : (
                  <>
                    <FaImage className="text-gray-400 h-8 w-8" />
                    <p className="text-gray-400 text-sm mt-2">Upload Image</p>
                  </>
                )}
              </div>
            </Upload>
          </div>

          <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
            <Input placeholder="Enter last name" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="mobile" label="Mobile" rules={[{ required: true }]}>
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="password" label="Update Password">
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCancel}>Discard Changes</Button>
            <Button type="primary" htmlType="submit">
              Apply Changes
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CauseManagement;
