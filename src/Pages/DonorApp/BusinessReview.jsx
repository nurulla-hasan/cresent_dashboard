/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Form, Input, Modal, Table, Upload } from "antd";
import { FaImage, FaPencilAlt } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import icon from "../../assets/image/leaf.png";
import icon1 from "../../assets/image/edu.png";
import icon2 from "../../assets/image/health.png";

const BusinessReview = () => {
  const originalData = [
    {
      key: "1",
      name: "Green Bites",
      icon: icon,
      activeRewards: 4,
      totalRedemptions: 1240,
      offer: "Free Coffee ☕",
    },
    {
      key: "2",
      name: "EduTech Hub",
      icon: icon1,
      activeRewards: 5,
      totalRedemptions: 1240,
      offer: "Free Coding Course",
    },
    {
      key: "3",
      name: "Health First",
      icon: icon2,
      activeRewards: 3,
      totalRedemptions: 1240,
      offer: "Health Checkup Kit",
    },
  ];

  const [data, setData] = useState(originalData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [form] = Form.useForm();

  const handleBeforeUpload = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    form.setFieldsValue({ icon: file });
    return false;
  };

  const handleEdit = (record) => {
    setSelectedBadge(record);
    form.setFieldsValue({
      name: record.name,
      activeRewards: record.activeRewards,
      totalRedemptions: record.totalRedemptions,
      offer: record.offer,
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
    title: "Business",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <img
          src={record.icon}
          alt={record.name}
          className="h-12 w-12 object-contain rounded-full"
        />
        <span className="font-semibold">{record.name}</span>
      </div>
    ),
  },
    {
      title: "Active Rewards",
      dataIndex: "activeRewards",
      key: "activeRewards",
    },
    {
      title: "Total Redemptions",
      dataIndex: "totalRedemptions",
      key: "totalRedemptions",
    },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "offer",
      render: (text) => <span className="">{text}</span>,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <div className="flex gap-3 text-lg">
    //       <div
    //         onClick={() => handleEdit(record)}
    //         className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer"
    //       >
    //         <FaPencilAlt />
    //       </div>
    //       <div
    //         onClick={() => handleDelete(record.key)}
    //         className="bg-neutral-100 h-8 w-8 rounded-full p-1 flex justify-center items-center cursor-pointer text-red-500"
    //       >
    //         <RxCrossCircled />
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">🏢 Business Rewards</h2>
        <Button type="primary">Add New</Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />

      {/* ✨ Edit Modal */}
      <Modal
        title="Edit Business Reward"
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
            label="Business Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter business name" />
          </Form.Item>

          <Form.Item
            name="activeRewards"
            label="Active Rewards"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter number of active rewards" />
          </Form.Item>

          <Form.Item
            name="totalRedemptions"
            label="Total Redemptions"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter total redemptions" />
          </Form.Item>

          <Form.Item
            name="offer"
            label="Offer"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter offer details" />
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

export default BusinessReview;
