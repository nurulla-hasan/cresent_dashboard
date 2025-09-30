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
  Table,
  Upload,
} from "antd";
import { FaImage, FaPencilAlt } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import icon from "../../assets/image/b1.png";
import icon1 from "../../assets/image/b2.png";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { FaPlus } from "react-icons/fa6";
const BadgeTable = () => {
  const originalData = [
    {
      key: "1",
      name: "First Reward",
      icon: icon,
      Criteria: "Redeem first reward",
    },
    {
      key: "2",
      name: "Consistent Giver",
      icon: icon,
      Criteria: "Make donations consistently",
    },
    {
      key: "3",
      name: "Star Donor",
      icon: icon1,
      Criteria: "Donate over $500",
    },
  ];
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(originalData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [form] = Form.useForm();

  const handleBeforeUpload = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    form.setFieldsValue({ badgeIcon: file });
    return false;
  };

  const handleEdit = (record) => {
    setSelectedBadge(record);
    form.setFieldsValue({
      name: record.name,
      Criteria: record.Criteria,
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
      item.key === selectedBadge.key
        ? { ...item, ...values, icon: previewImage || item.icon }
        : item
    );
    setData(updatedData);
    setIsModalVisible(false);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "Badge Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Badge Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => (
        <img src={icon} alt="badge" className="h-12 w-12 object-contain" />
      ),
    },
    {
      title: "Criteria",
      dataIndex: "Criteria",
      key: "Criteria",
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
        <h2 className="text-lg font-semibold">🎖️ Badges Management</h2>
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
          <button className="flex justify-center items-center gap-2 bg-white px-4 py-2 rounded-3xl border">
            <FaPlus></FaPlus> Add
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />

      {/* ✨ Add Badge Modal */}
      <Modal
        title="Edit Badge"
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

          <Form.Item
            name="name"
            label="Badge Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter badge name" />
          </Form.Item>

          <Form.Item
            name="Criteria"
            label="Criteria"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter badge criteria" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>
      {/* edit */}
      <Modal
        title="Edit Badge"
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

          <Form.Item
            name="name"
            label="Badge Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter badge name" />
          </Form.Item>

          <Form.Item
            name="Criteria"
            label="Criteria"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter badge criteria" />
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

export default BadgeTable;
