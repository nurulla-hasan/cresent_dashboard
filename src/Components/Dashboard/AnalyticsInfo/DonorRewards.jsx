import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Dropdown,
  Menu,
  Switch,
  Drawer,
  Table,
  Tag,
  Space,
  Spin,
  DatePicker,
  message,
} from "antd";
import {
  EllipsisOutlined,
  QrcodeOutlined,
  WifiOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import muffin from "../../../assets/image/muffin.png";
import free from "../../../assets/image/free.png";
import entire from "../../../assets/image/entire.png";
import qr from "../../../assets/image/qr.png";
import nfc from "../../../assets/image/nfc.png";
import manual from "../../../assets/image/manual.png";
// import { FaPlus } from "react-icons/fa6";
import useSmartFetchHook from "../../hooks/useSmartFetchHook.ts";
import {
  useGetRewardReportQuery,
  useGetSingleRewardQuery,
  useUpdateRewardStatusMutation,
} from "../../../redux/feature/reward/rewardApis";

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
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(null);

  const { data: rewardList, isLoading, searchTerm, setSearchTerm, setFilterParams } = useSmartFetchHook(
    useGetRewardReportQuery,
    { limit: 12 }
  );

  const [rewards, setRewards] = useState(initialRewards);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [selectedRewardId, setSelectedRewardId] = useState(null);
  const [updatingRewardId, setUpdatingRewardId] = useState(null);

  const [updateRewardStatus] = useUpdateRewardStatusMutation();

  const {
    data: singleRewardResponse,
    isLoading: isSingleRewardLoading,
  } = useGetSingleRewardQuery(selectedRewardId, {
    skip: !selectedRewardId,
  });

  const rewardDetails = singleRewardResponse?.data?.reward;
  const redemptionList = singleRewardResponse?.data?.redeemtionList || [];

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
        isActive: !!r?.isActive,
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


  const openDrawer = (reward) => {
    setSelectedReward(reward);
    setSelectedRewardId(reward?.id);
    setDrawerVisible(true);
  };

  const handleToggleActive = async (rewardId, nextActive) => {
    if (!rewardId) return;

    const prevRewards = rewards;
    setUpdatingRewardId(rewardId);

    setRewards((current) =>
      current.map((r) => (r.id === rewardId ? { ...r, isActive: nextActive } : r))
    );

    try {
      await updateRewardStatus({ id: rewardId, isActive: nextActive }).unwrap();
      message.success("Status updated");
    } catch {
      setRewards(prevRewards);
      message.error("Failed to update status");
    } finally {
      setUpdatingRewardId(null);
    }
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedReward(null);
    setSelectedRewardId(null);
  };

  const redemptionColumns = [
    {
      title: "Name/Email",
      dataIndex: "name",
      key: "name",
      render: (_text, record) => (
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
      render: (status) => (
        <Tag
          color={
            status === "redeemed"
              ? "green"
              : status === "claimed"
              ? "orange"
              : "default"
          }
          className="capitalize"
        >
          {status || "-"}
        </Tag>
      ),
    },
    {
      title: "Claimed At",
      dataIndex: "claimedAt",
      key: "claimedAt",
      render: (_text, record) => (
        <span>
          {record.date} <br />
          <span className="text-sm text-gray-500">{record.time}</span>
        </span>
      ),
    },
    {
      title: "Method",
      dataIndex: "redemptionMethod",
      key: "redemptionMethod",
      render: (v) => <span className="capitalize">{v || "-"}</span>,
    },
    {
      title: "Code",
      dataIndex: "assignedCode",
      key: "assignedCode",
      render: (code) => <span className="font-medium">{code || "-"}</span>,
    },
  ];

  const rewardMenu = (reward) => (
    <Menu>
      <Menu.Item onClick={() => openDrawer(reward)}>
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
                  <p>Active</p>
                  <Switch
                    checked={!!reward.isActive}
                    disabled={updatingRewardId === reward.id}
                    loading={updatingRewardId === reward.id}
                    onChange={(checked) => handleToggleActive(reward.id, checked)}
                  />
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
        </div>
      </Spin>
      {/* <RewardExport /> */}

      {/* Reward Detail Drawer */}
      <Drawer
        title={null}
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={600}
        className="px-8"
        
      >
        {selectedReward && (
          <>
            {isSingleRewardLoading ? (
              <div className="py-10">
                <Spin
                  spinning
                  indicator={<LoadingOutlined spin />}
                  className="w-full"
                />
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img src={selectedReward.icon} alt="" className="w-10 h-10" />
                  <div>
                    <h2 className="text-lg font-semibold">{selectedReward.title}</h2>
                    <p className="text-sm text-gray-500">
                      {rewardDetails?.description || "-"}
                    </p>
                    <div className="mt-2">
                      <Tag
                        color={rewardDetails?.status === "active" ? "green" : "default"}
                        className="capitalize"
                      >
                        {rewardDetails?.status || "-"}
                      </Tag>
                      <Tag color={rewardDetails?.isActive ? "blue" : "default"}>
                        {rewardDetails?.isActive ? "Active" : "Inactive"}
                      </Tag>
                    </div>
                  </div>
                </div>

                {/* Offered By */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Offered By</p>
                  <p className="font-medium">{selectedReward.offeredBy}</p>
                </div>

                {/* Reward Code & Redeem Options */}
                <div className="flex items-center justify-between p-3 mb-6 border rounded-md">
                  <p className="font-medium">
                    {redemptionList?.[0]?.assignedCode
                      ? `#${redemptionList[0].assignedCode}`
                      : "-"}
                  </p>
                  <Space size="large">
                    {rewardDetails?.inStoreRedemptionMethods?.qrCode && (
                      <QrcodeOutlined className="text-xl" />
                    )}
                    {rewardDetails?.inStoreRedemptionMethods?.nfcTap && (
                      <WifiOutlined className="text-xl" />
                    )}
                    {rewardDetails?.inStoreRedemptionMethods?.staticCode && (
                      <AppstoreOutlined className="text-xl" />
                    )}
                  </Space>
                </div>

                {/* Redemption Stats */}
                <h3 className="mb-2 font-semibold">Redemption Stats</h3>
                <Table
                  columns={redemptionColumns}
                  dataSource={redemptionList.map((item) => ({
                    key: item?._id,
                    name: item?.user?.name || "-",
                    email: item?.user?.auth?.email || "-",
                    status: item?.status,
                    redemptionMethod: item?.redemptionMethod,
                    assignedCode: item?.assignedCode,
                    date: item?.claimedAt
                      ? new Date(item.claimedAt).toLocaleDateString()
                      : item?.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "-",
                    time: item?.claimedAt
                      ? new Date(item.claimedAt).toLocaleTimeString()
                      : item?.createdAt
                      ? new Date(item.createdAt).toLocaleTimeString()
                      : "-",
                  }))}
                  pagination={{ pageSize: 5 }}
                  size="middle"
                />
              </>
            )}
          </>
        )}
      </Drawer>
    </div>
  );
};

export default DonorRewards;
