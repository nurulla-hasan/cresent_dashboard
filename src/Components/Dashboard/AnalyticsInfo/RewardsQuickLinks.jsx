import { Pagination, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import DonorRewards from "./DonorRewards";
import { SlArrowLeft } from "react-icons/sl";
import { useGetRewardStateQuery } from "../../../redux/feature/reward/rewardApis";

const RewardsQuickLinks = () => {

  const { data: rewardStateResponse, isLoading } = useGetRewardStateQuery();

  const rewardStats = rewardStateResponse?.data?.reward;
  const redeemStats = rewardStateResponse?.data?.redeem;
  const topReward = rewardStateResponse?.data?.topRewards;

  const handleBack = () => {
    window.history.back();
  };
  return (
    <div>
      <button
        onClick={handleBack}
        className="flex items-center justify-center gap-2 px-4 py-3 mb-4 bg-white rounded-3xl"
      >
        <SlArrowLeft /> Back
      </button>
      <div className="flex items-center justify-between gap-5">
        <div>
          <h1 className="mb-4 text-3xl font-bold">Rewards Management</h1>
          <p className="mb-4 text-lg text-gray-600">
            Generate, track, and export your donation insights.
          </p>
        </div>
      </div>

      <div>
        <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
          <div className="grid items-center justify-center grid-cols-1 gap-3 md:grid-cols-3">
            <div className="p-6 bg-white border rounded-3xl">
              <p className="text-lg font-medium">Active Rewards</p>
              <div className="mt-20 space-y-2">
                <h1 className="mt-10 text-2xl font-medium">
                  {rewardStats?.currentMonthActiveRewards ?? 0}
                </h1>
                <p
                  className={`text-sm ${rewardStats?.rewardPercentageIncrease ? "text-green-400" : "text-red-400"}`}
                >
                  {(rewardStats?.rewardPercentageIncrease ? "+" : "-")}
                  {Math.abs(rewardStats?.rewardPercentageChange ?? 0)}%{" "}
                  <span className="text-sm text-gray-400">vs last month</span>{" "}
                </p>{" "}
              </div>
            </div>
            <div className="p-6 bg-white border rounded-3xl">
              <p className="text-lg font-medium">Rewards Redeemed</p>
              <div className="mt-20 space-y-2">
                <h1 className="mt-10 text-2xl font-medium">
                  {redeemStats?.currentMonthRedeemedRewards ?? 0}
                </h1>
                <p
                  className={`text-sm ${redeemStats?.redeemedRewardPercentageIncrease ? "text-green-400" : "text-red-400"}`}
                >
                  {(redeemStats?.redeemedRewardPercentageIncrease ? "+" : "-")}
                  {Math.abs(redeemStats?.redeemedRewardPercentageChange ?? 0)}%{" "}
                  <span className="text-sm text-gray-400">vs last month</span>{" "}
                </p>{" "}
              </div>
            </div>
            <div className="p-6 bg-white border rounded-3xl">
              <p className="text-lg font-medium">Popular Rewards</p>
              <div className="mt-20 space-y-2">
                <p>🏆</p>
                <p className="text-3xl font-semibold">{topReward?.title || "-"}</p>
                <p className="text-sm text-gray-500">{topReward?.category || ""}</p>
              </div>
            </div>
          </div>
        </Spin>
        <div className="p-6 my-6 bg-white border rounded-3xl">
          <div className="flex items-center justify-between gap-5">
            <h1 className="text-xl font-medium">
              Create and manage donor rewards
            </h1>
          </div>
          <DonorRewards />

          <div className="flex items-center justify-end my-10">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsQuickLinks;
