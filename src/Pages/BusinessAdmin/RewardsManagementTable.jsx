/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Upload,
  Tag,
  Dropdown,
  Menu,
} from "antd";
import {
  FaEye,
  FaImage,
  FaPencilAlt,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import { RxCrossCircled, RxDotsVertical } from "react-icons/rx";
import { BsExclamationCircle } from "react-icons/bs";
import icon from "../../assets/image/leaf.png";
import icon1 from "../../assets/image/edu.png";
import icon2 from "../../assets/image/health.png";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

const RewardsManagementTable = () => {
  const [searchText, setSearchText] = useState("");
  const originalData = [
    {
      key: "1",
      rewardName: "10% Off Meals",
      tier: "Bronze",
      redemptions: "120",
      name: "Green Bites",
      email: "hello@greenbites.com",
      icon: icon,
      sector: "Food & Dining",
      status: "Active",
    },
    {
      key: "2",
      rewardName: "Free Coding Course",
      tier: "Silver",
      redemptions: "80",
      name: "EduTech",
      email: "info@edutech.com",
      icon: icon1,
      sector: "Education",
      status: "Pending",
    },
    {
      key: "3",
      rewardName: "Health Checkup Kit",
      tier: "Gold",
      redemptions: "200",
      name: "Health First",
      email: "support@hflabs.org",
      icon: icon2,
      sector: "Healthcare",
      status: "Inactive",
    },
  ];

  const [data, setData] = useState(originalData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [form] = Form.useForm();

  const handleBeforeUpload = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    form.setFieldsValue({ icon: file });
    return false;
  };

  const handleEdit = (record) => {
    setSelectedBusiness(record);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      sector: record.sector,
      status: record.status,
    });
    setPreviewImage(record.icon);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setPreviewImage(null);
  };

  const handleSave = (values) => {
    const updatedData = data.map((item) =>
      item.key === selectedBusiness.key
        ? { ...item, ...values, icon: previewImage || item.icon }
        : item
    );
    setData(updatedData);
    setIsModalVisible(false);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const renderStatus = (status) => {
    switch (status) {
      case "Active":
        return (
          <Tag color="green" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            <FaCheckCircle /> Active
          </Tag>
        );
      case "Pending":
        return (
          <Tag color="gold" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            <BsExclamationCircle /> Pending
          </Tag>
        );
      default:
        return (
          <Tag color="red" className="flex items-center gap-1 px-2 py-1 rounded-full w-fit">
            <RxCrossCircled /> Inactive
          </Tag>
        );
    }
  };

  const columns = [
     {
      title: "Reward Name",
      dataIndex: "rewardName",
      key: "rewardName",
    },
    {
      title: "Business",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.icon}
            alt={record.name}
            className="h-10 w-10 object-contain rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{record.name}</span>
            <span className="text-gray-500 text-sm">{record.email}</span>
          </div>
        </div>
      ),
    },
   
    {
      title: "Tier",
      dataIndex: "tier",
      key: "tier",
    },
    {
      title: "Redemptions",
      dataIndex: "redemptions",
      key: "redemptions",
    },
  
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => renderStatus(status),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3 text-lg">
          <div
            onClick={() => handleEdit(record)}
            className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer"
          >
            <FaEye />
          </div>
          <div
            onClick={() => handleEdit(record)}
            className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer"
          >
            <FaPencilAlt />
          </div>
          <div
            onClick={() => handleDelete(record.key)}
            className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer text-red-500"
          >
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
        <h2 className="text-lg font-semibold">Rewards Management</h2>
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
          <button className="flex justify-center items-center gap-2 bg-white px-6 py-2 rounded-3xl border">
            <FaPlus /> Add
          </button>
          <RxDotsVertical />
        </div>
      </div>

      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} rowKey="key" />

      {/* ✨ Edit Modal */}
      <Modal
        title="Edit Business"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form layout="vertical" form={form} onFinish={handleSave}>
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
                    <p className="text-gray-400 text-sm mt-2">Upload Icon</p>
                  </>
                )}
              </div>
            </Upload>
          </div>

          <Form.Item name="name" label="Business Name" rules={[{ required: true }]}>
            <Input placeholder="Enter business name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item name="sector" label="Sector" rules={[{ required: true }]}>
            <Input placeholder="Enter sector" />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Input placeholder="Active / Pending / Inactive" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RewardsManagementTable;
