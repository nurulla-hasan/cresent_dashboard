import { useEffect, useState } from "react";
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
  Drawer,
  Table,
  Tag,
  Space,
  Spin,
  DatePicker,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  MailOutlined,
  PhoneOutlined,
  QrcodeOutlined,
  WifiOutlined,
  AppstoreOutlined,
  BellOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import muffin from "../../../assets/image/muffin.png";
import free from "../../../assets/image/free.png";
import entire from "../../../assets/image/entire.png";
import qr from "../../../assets/image/qr.png";
import nfc from "../../../assets/image/nfc.png";
import manual from "../../../assets/image/manual.png";
// import { FaPlus } from "react-icons/fa6";
import RewardExport from "./RewardExport";
import useSmartFetchHook from "../../hooks/useSmartFetchHook.ts";
import { useGetRewardReportQuery } from "../../../redux/feature/reward/rewardApis";

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

// Mock redemption data
const redemptionData = [
  {
    key: "1",
    name: "Josh Bill",
    email: "joshb@gmail.com",
    status: "Claimed",
    date: "18 Aug 2025",
    time: "03:00 PM",
  },
  {
    key: "2",
    name: "M Karim",
    email: "mkarim@gmail.com",
    status: "Redeemed",
    date: "14 Aug 2025",
    time: "03:00 PM",
  },
  {
    key: "3",
    name: "Fajar Surya",
    email: "fsurya@gmail.com",
    status: "Claimed",
    date: "12 Aug 2025",
    time: "03:00 PM",
  },
  {
    key: "4",
    name: "Linda Blair",
    email: "lindablair@gmail.com",
    status: "Redeemed",
    date: "12 Aug 2025",
    time: "03:00 PM",
  },
];

const DonorRewards = () => {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(null);

  const { data: rewardList, isLoading, searchTerm, setSearchTerm, setFilterParams } = useSmartFetchHook(
    useGetRewardReportQuery,
    { limit: 12 }
  );

  const [rewards, setRewards] = useState(initialRewards);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editReward, setEditReward] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  useEffect(() => {
    if (!Array.isArray(rewardList)) return;

    const mapped = rewardList.map((r) => {
      const category = r?.category;
      const iconByCategory =
        category === "food"
          ? muffin
          : category === "groceries"
          ? free
          : category === "travel"
          ? entire
          : free;

      const redeem = [];
      if (r?.inStoreRedemptionMethods?.staticCode) redeem.push(manual);
      if (r?.inStoreRedemptionMethods?.qrCode) redeem.push(qr);
      if (r?.inStoreRedemptionMethods?.nfcTap) redeem.push(nfc);

      return {
        id: r?._id,
        title: r?.title,
        description: r?.business?.name || "",
        redemptions: r?.redeemedCount ?? r?.redemptions ?? 0,
        expires: r?.expiryDate ? new Date(r.expiryDate).toLocaleDateString() : "-",
        icon: iconByCategory,
        offeredBy: r?.business?.name || "-",
        redeem,
        _raw: r,
      };
    });

    setRewards(mapped);
  }, [rewardList]);

  const handleDateRangeChange = (dates, dateStrings) => {
    setDateRange(dates);
    const newParams = {};
    if (dates && dates[0] && dates[1]) {
      newParams.fromDate = dateStrings[0];
      newParams.toDate = dateStrings[1];
    }
    setFilterParams(newParams);
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

  const openDrawer = (reward) => {
    setSelectedReward(reward);
    setDrawerVisible(true);
  };

  const columns = [
    {
      title: "Name/Email",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <p className="font-medium">{record.name}</p>
          <p className="text-sm text-gray-500">{record.email}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "Redeemed" ? (
          <Tag color="green">{status}</Tag>
        ) : (
          <Tag color="orange">{status}</Tag>
        ),
    },
    {
      title: "Start Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <span>
          {record.date} <br />
          <span className="text-sm text-gray-500">{record.time}</span>
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "Claimed" ? (
          <Button
            type="link"
            size="small"
            icon={<BellOutlined />}
            className="text-gray-600"
          >
            Send Reminder
          </Button>
        ) : (
          <Button
            type="link"
            size="small"
            icon={<RedoOutlined />}
            className="text-gray-600"
          >
            Resend Reward
          </Button>
        ),
    },
  ];

  const rewardMenu = (reward) => (
    <Menu>
      <Menu.Item onClick={() => openEditModal(reward)} icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item
        onClick={() => handleDeleteReward(reward.id)}
        icon={<DeleteOutlined />}
      >
        Delete
      </Menu.Item>
      <Menu.Item onClick={() => openDrawer(reward)} icon={<EllipsisOutlined />}>
        View Detail
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Rewards</h2>
          <p className="text-sm text-gray-500">Search and filter rewards</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search rewards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60"
            disabled={isLoading}
          />
          <RangePicker
            placeholder={["From date", "To date"]}
            onChange={handleDateRangeChange}
            value={dateRange}
            disabled={isLoading}
          />
        </div>
      </div>
      <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
        <div className="grid grid-cols-1 gap-6 mb-3 sm:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => (
            <div key={reward.id} className="p-6 space-y-6 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center justify-center gap-2 mb-6 text-2xl font-semibold">
                  <img src={reward.icon} alt="" />
                  <h1>{reward.title}</h1>
                </div>
                <Dropdown overlay={rewardMenu(reward)} trigger={["click"]}>
                  <Button type="link" icon={<EllipsisOutlined />} />
                </Dropdown>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-gray-400">Expires: {reward.expires}</p>
                <div className="flex items-center justify-between gap-2">
                  <p>Active</p> <Switch />
                </div>
              </div>
              <div>
                <p className="text-gray-400">Offered by:</p>
                <p>{reward.description}</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-2xl font-semibold">{reward.redemptions}</p>
                  <p className="text-gray-400">Redemptions</p>
                </div>
                <div>
                  <p className="">Redeem Via</p>
                  <div className="flex items-end gap-2 mt-2 justify-emd">
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
        {/* <div className="flex flex-col items-center justify-center mt-5 text-gray-400 bg-white border rounded-md cursor-pointer ">
          <FaPlus
            onClick={() => setIsAddModalVisible(true)}
            className="w-8 h-8"
          />
          <p>Add New Reward</p>
        </div> */}
        </div>
      </Spin>
      <RewardExport />

      {/* Reward Detail Drawer */}
      <Drawer
        title={null}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
        className="px-2"
        
      >
        {selectedReward && (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <img src={selectedReward.icon} alt="" className="w-10 h-10" />
              <div>
                <h2 className="text-lg font-semibold">{selectedReward.title}</h2>
                <p className="text-sm text-gray-500">
                  Enjoy a freshly brewed coffee, free of charge, at any{" "}
                  {selectedReward.offeredBy} location. Valid once per donor until
                  expiry.
                </p>
              </div>
            </div>

            {/* Offered By */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Offered By</p>
              <p className="font-medium">{selectedReward.offeredBy}</p>
            </div>

            {/* Contact Info */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Contact Information</p>
              <div className="flex items-center gap-2 mt-1">
                <MailOutlined /> <span>hello@greenobites.com</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <PhoneOutlined /> <span>+61 234 567 890</span>
              </div>
            </div>

            {/* Reward Code & Redeem Options */}
            <div className="flex items-center justify-between p-3 mb-6 border rounded-md">
              <p className="font-medium">#RW-20345</p>
              <Space size="large">
                <QrcodeOutlined className="text-xl" />
                <WifiOutlined className="text-xl" />
                <AppstoreOutlined className="text-xl" />
              </Space>
            </div>

            {/* Redemption Stats */}
            <h3 className="mb-2 font-semibold">Redemption Stats</h3>
            <Table
              columns={columns}
              dataSource={redemptionData}
              pagination={{ pageSize: 5 }}
              size="middle"
            />
          </>
        )}
      </Drawer>

      {/* Add Modal */}
      {/* <Modal
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
      </Modal> */}

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
