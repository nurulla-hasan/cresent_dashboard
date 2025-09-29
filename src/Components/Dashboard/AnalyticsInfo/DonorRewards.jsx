import { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Dropdown,
  Menu,
  Switch,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import muffin from "../../../assets/image/muffin.png";
import free from "../../../assets/image/free.png";
import entire from "../../../assets/image/entire.png";
import qr from "../../../assets/image/qr.png";
import nfc from "../../../assets/image/nfc.png";
import manual from "../../../assets/image/manual.png";
import { FaPlus } from "react-icons/fa6";
import RewardExport from "./RewardExport";

// Data for the rewards (mock data as per your design)
const initialRewards = [
  {
    id: 1,
    title: "Free Coffee",
    description: " GreenO Bites",
    redemptions: 120,
    expires: "June 30, 2025",
    icon: free,
    offeredBy: "GreenO Bites",
    redeem: [manual, qr, nfc],
  },
  {
    id: 2,
    title: "Free Muffin",
    description: " Coffee Beans & Tea Leaf",
    redemptions: 86,
    expires: "June 30, 2025",
    icon: muffin,
    offeredBy: "GreenO Bites",
    redeem: [qr],
  },
  {
    id: 3,
    title: "Free Cookie",
    description: " Crumble",
    redemptions: 86,
    expires: "June 30, 2025",
    icon: muffin,
    offeredBy: "GreenO Bites",
    redeem: [qr],
  },
  {
    id: 4,
    title: "10% Off Entire Order",
    description: "Offered by: Burning Brownie",
    redemptions: 86,
    expires: "June 30, 2025",
    icon: entire,
    offeredBy: "GreenO Bites",
    redeem: [qr],
  },
];

const DonorRewards = () => {
  const [rewards, setRewards] = useState(initialRewards);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editReward, setEditReward] = useState(null);

  const handleAddReward = (values) => {
    const newReward = {
      id: rewards.length + 1,
      ...values,
    };
    setRewards([...rewards, newReward]);
    setIsAddModalVisible(false);
    notification.success({ message: "Reward Added Successfully!" });
  };

  const handleEditReward = (values) => {
    const updatedRewards = rewards.map((reward) =>
      reward.id === editReward.id ? { ...reward, ...values } : reward
    );
    setRewards(updatedRewards);
    setIsEditModalVisible(false);
    notification.success({ message: "Reward Updated Successfully!" });
  };

  const handleDeleteReward = (id) => {
    const filteredRewards = rewards.filter((reward) => reward.id !== id);
    setRewards(filteredRewards);
    notification.success({ message: "Reward Deleted Successfully!" });
  };

  const openEditModal = (reward) => {
    setEditReward(reward);
    setIsEditModalVisible(true);
  };

  const rewardMenu = (id) => (
    <Menu>
      <Menu.Item
        onClick={() =>
          openEditModal(rewards.find((reward) => reward.id === id))
        }
        icon={<EditOutlined />}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        onClick={() => handleDeleteReward(id)}
        icon={<DeleteOutlined />}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-3">
        {rewards.map((reward) => (
          <div key={reward.id} className="shadow-lg p-6 space-y-6">
            <div className="flex justify-between items-center gap-2">
              <div className="flex justify-center items-center gap-2 text-2xl font-semibold mb-6">
                <img src={reward.icon} alt="" />
                <h1>{reward.title}</h1>
              </div>
              <Dropdown overlay={rewardMenu(reward.id)} trigger={["click"]}>
                <Button type="link" icon={<EllipsisOutlined />} />
              </Dropdown>
            </div>
            <div className="flex justify-between items-center gap-2">
              <p className="text-gray-400">Expires: {reward.expires}</p>
              {/* todo: will make it active inactive */}
              <div className="flex justify-between items-center gap-2">
                <p>Active</p> <Switch />
              </div>
            </div>
            <div>
              <p className="text-gray-400">Offered by:</p>
              <p>{reward.description}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div>
                <p className="text-2xl font-semibold">{reward.redemptions}</p>
                <p className="text-gray-400">Redemptions</p>
              </div>
              <div>
                <p className="">Redeem Via</p>
                <div className="flex justify-emd items-end gap-2 mt-2">
                  {reward.redeem.map((method, index) => (
                    <img
                      key={index}
                      src={method}
                      alt="redeem option"
                      className="w-6 h-6"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className=" bg-white border rounded-md mt-5 flex flex-col justify-center items-center text-gray-400 cursor-pointer">
          <FaPlus
            onClick={() => setIsAddModalVisible(true)}
            className="h-8 w-8"
          ></FaPlus>
          <p>Add New Reward</p>
        </div>
      </div>
      <RewardExport />

      {/* Add Modal */}
      <Modal
        title="Add New Reward"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddReward} layout="vertical">
          <Form.Item
            label="Reward Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter reward title" />
          </Form.Item>
          <Form.Item
            label="Offered By"
            name="description"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter company or provider" />
          </Form.Item>
          <Form.Item
            label="Redemptions"
            name="redemptions"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} placeholder="Enter number of redemptions" />
          </Form.Item>
          <Form.Item
            label="Expiration Date"
            name="expires"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter expiration date" />
          </Form.Item>
          <div className="flex justify-between">
            <Button onClick={() => setIsAddModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add Reward
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Reward"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={handleEditReward}
          initialValues={editReward}
          layout="vertical"
        >
          <Form.Item
            label="Reward Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter reward title" />
          </Form.Item>
          <Form.Item
            label="Offered By"
            name="description"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter company or provider" />
          </Form.Item>
          <Form.Item
            label="Redemptions"
            name="redemptions"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} placeholder="Enter number of redemptions" />
          </Form.Item>
          <Form.Item
            label="Expiration Date"
            name="expires"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter expiration date" />
          </Form.Item>
          <div className="flex justify-between">
            <Button onClick={() => setIsEditModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update Reward
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default DonorRewards;
