/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import {
  Button,
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
import { FaImage, FaPencilAlt, FaPlus } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { BsPatchCheckFill } from "react-icons/bs";
import { ImHourGlass } from "react-icons/im";
import { CiPause1 } from "react-icons/ci";

import book from "../../assets/image/Book.png";
import phone from "../../assets/image/Phone.png";
import jacket from "../../assets/image/Jacket.png";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  /** 📸 Image Upload Preview */
  const handleBeforeUpload = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    form.setFieldsValue({ image: file });
    return false;
  };

  /** ➕ Add Cause */
  const handleAddCause = () => {
    form.resetFields();
    setPreviewImage(null);
    setIsEditing(false);
    setEditingRecord(null);
    setIsModalVisible(true);
  };

  /** ✏️ Edit Cause */
  const handleEditCause = (record) => {
    setIsEditing(true);
    setEditingRecord(record);
    form.setFieldsValue({
      subject: record.name,
      category: record.category,
      note: record.donationMessage,
    });
    setPreviewImage(record.img);
    setIsModalVisible(true);
  };

  /** ❌ Close Modal */
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setPreviewImage(null);
    setEditingRecord(null);
  };

  /** 💾 Save Cause */
  const handleSave = (values) => {
    const newCause = {
      key: editingRecord ? editingRecord.key : Date.now(),
      name: values.subject,
      category: values.category,
      donationMessage: values.note,
      email: "demo@example.com",
      dateTime: "Sep 2025 - Ongoing",
      amount: 0,
      status: "Pending",
      img: previewImage || book,
    };

    const updatedData = editingRecord
      ? data.map((item) => (item.key === editingRecord.key ? newCause : item))
      : [...data, newCause];

    setData(updatedData);
    handleCancel();
  };

  /** 🔍 Sort Handler */
  const handleSort = (key, order) => {
    const sorted = [...data].sort((a, b) => {
      if (key === "amount")
        return order === "ascend" ? a.amount - b.amount : b.amount - a.amount;
      if (key === "name")
        return order === "ascend"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      if (key === "dateTime")
        return order === "ascend"
          ? new Date(a.dateTime) - new Date(b.dateTime)
          : new Date(b.dateTime) - new Date(a.dateTime);
      return 0;
    });
    setData(sorted);
  };

  /** 🪄 Category Filter */
  const handleCategoryFilter = (category) => {
    setData(
      category === "All"
        ? originalData
        : originalData.filter((item) => item.category === category)
    );
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

  /** 🟢 Status Renderer */
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
      <span
        className={`px-4 py-1 rounded-2xl text-sm font-medium flex items-center gap-2 ${className}`}
      >
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
          <Select
            defaultValue="ascend"
            style={{ width: 100 }}
            onChange={(v) => handleSort("name", v)}
            suffixIcon={<DownOutlined />}
          >
            <Option value="ascend">A-Z</Option>
            <Option value="descend">Z-A</Option>
          </Select>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img
            src={record.img}
            alt={record.name}
            className="h-10 w-10 rounded-full object-cover"
          />
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
          <Select
            defaultValue="All"
            style={{ width: 130 }}
            onChange={handleCategoryFilter}
            suffixIcon={<DownOutlined />}
          >
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
          <div
            onClick={() => handleEditCause(record)}
            className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer"
          >
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
          <button
            onClick={handleAddCause}
            className="px-4 py-1 rounded-3xl border bg-white flex justify-center items-center gap-1"
          >
            <FaPlus /> Add Cause
          </button>
        </div>
      </div>

      {/* 📊 Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />

      {/* 🛠️ Add/Edit Cause Modal */}
      <Modal
        title={isEditing ? "Edit Cause" : "Add Cause"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <Form layout="vertical" form={form} onFinish={handleSave}>
          <Form.Item
            label="Cause Subject & Category"
            required
            style={{ marginBottom: 16 }}
          >
            <Input.Group compact>
              <Form.Item
                name="subject"
                noStyle
                rules={[
                  { required: true, message: "Please enter cause subject" },
                ]}
              >
                <Input
                  placeholder="Enter cause subject"
                  style={{ width: "65%" }}
                />
              </Form.Item>

              <Form.Item
                name="category"
                noStyle
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select placeholder="Select category" style={{ width: "35%" }}>
                  <Option value="Education">Education</Option>
                  <Option value="Refugees">Refugees</Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select category">
              <Option value="Education">Education</Option>
              <Option value="Refugees">Refugees</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="note"
            label="Donation Note"
            rules={[{ required: true, message: "Please enter donation note" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter donation note" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCancel}>Discard Changes</Button>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update Cause" : "Add Cause"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CauseManagement;
