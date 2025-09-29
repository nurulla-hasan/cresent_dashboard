/* eslint-disable no-unused-vars */
import { useState } from "react";
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
import user from "../../assets/image/user.png";
import { MdOtherHouses } from "react-icons/md";
import { FaImage, FaPencilAlt, FaUsers } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";

const ProfileTables = () => {
  const { Option } = Select;

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
      donationMessage: "Sending love & hope to everyone you’re helping",
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
      donationMessage: "Sending love & hope to everyone you’re helping",
      amount: 47.3,
      status: "Active",
    },
    {
      key: "5",
      name: "Linda Blair",
      email: "lindablair98@gmail.com",
      dateTime: "18 Dec 2023 01:00 PM",
      donationType: "Business",
      donationMessage: "Sending love & hope to everyone you’re helping",
      amount: 23.9,
      status: "Pending",
    },
  ];

  const [data, setData] = useState(originalData);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [form] = Form.useForm();

  const handleBeforeUpload = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    form.setFieldsValue({ profileImage: file });
    return false;
  };

  const handleEdit = (record) => {
    setSelectedProfile(record);
    form.setFieldsValue({
      firstName: record.name.split(" ")[0],
      lastName: record.name.split(" ")[1],
      email: record.email,
      mobile: "+61 470 292 023",
      password: "********",
    });
    setPreviewImage(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setPreviewImage(null);
  };

  const handleSave = (values) => {
    console.log("Updated values:", values);
    setIsModalVisible(false);
  };

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
      setData(originalData.filter((item) => item.donationType === role));
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
            <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-4 py-1 rounded-2xl">
              <MdOtherHouses className="h-5 w-5" /> Business
            </div>
          )}
          {value === "Organization" && (
            <div className="flex items-center gap-1 bg-green-100 text-green-600 px-4 py-1 rounded-2xl">
              <GoOrganization className="h-5 w-5" /> Organization
            </div>
          )}
          {value === "Donor" && (
            <div className="flex items-center gap-1 bg-pink-100 text-pink-600 px-4 py-1 rounded-2xl">
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
      render: (status) => (
        <span
          className={`px-4 py-1 rounded-2xl text-sm font-medium ${
            status === "Active"
              ? "bg-green-100 text-green-600"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status}
        </span>
      ),
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
            onClick={() => handleEdit(record)}
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

      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form layout="vertical" form={form} onFinish={handleSave}>
          <p className="text-gray-400 mb-3">
            Update profile information of the user.{" "}
          </p>
          <div className="flex justify-center mb-4">
            <Upload
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              accept="image/*"
            >
              <div className="border border-dashed border-gray-300 p-4 rounded-full cursor-pointer flex flex-col items-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <>
                    <FaImage className="text-gray-400 h-8 w-8" />
                    <p className="text-gray-400 text-sm mt-2">Upload Image</p>
                  </>
                )}
              </div>
            </Upload>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="w-[50%]">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </div>
            <div className="w-[50%]">
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="mobile" label="Mobile" rules={[{ required: true }]}>
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="password" label="Update Password">
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="bg-white px-4 py-2 rounded-3xl border"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-3xl border"
            >
              Apply Changes
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileTables;
