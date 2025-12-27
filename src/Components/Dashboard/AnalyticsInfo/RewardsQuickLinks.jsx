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
        className="flex items-center justify-center gap-2 px-4 py-2 mb-6 bg-white border rounded-full"
      >
        <SlArrowLeft /> Back
      </button>
      <div className="flex items-center justify-between gap-5 mb-6">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Rewards Management</h1>
          <p className="text-base text-gray-500">Create and manage donor rewards.</p>
        </div>
      </div>

      <div>
        <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-6 bg-white border rounded-3xl">
              <p className="text-sm font-semibold text-gray-900">Active Rewards</p>
              <div className="mt-10">
                <p className="text-3xl font-semibold">
                  {rewardStats?.currentMonthActiveRewards ?? 0}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  <span
                    className={rewardStats?.rewardPercentageIncrease ? "text-green-600" : "text-red-500"}
                  >
                    {(rewardStats?.rewardPercentageIncrease ? "+" : "-")}
                    {Math.abs(rewardStats?.rewardPercentageChange ?? 0)}%
                  </span>{" "}
                  <span>vs last month</span>
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border rounded-3xl">
              <p className="text-sm font-semibold text-gray-900">Rewards Redeemed</p>
              <div className="mt-10">
                <p className="text-3xl font-semibold">
                  {redeemStats?.currentMonthRedeemedRewards ?? 0}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  <span
                    className={redeemStats?.redeemedRewardPercentageIncrease ? "text-green-600" : "text-red-500"}
                  >
                    {(redeemStats?.redeemedRewardPercentageIncrease ? "+" : "-")}
                    {Math.abs(redeemStats?.redeemedRewardPercentageChange ?? 0)}%
                  </span>{" "}
                  <span>vs last month</span>
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border rounded-3xl">
              <p className="text-sm font-semibold text-gray-900">Popular Reward</p>
              <div className="mt-10">
                <p className="text-sm text-gray-500">🏆</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {topReward?.title || "-"}
                </p>
              </div>
            </div>
          </div>
        </Spin>
        <div className="p-6 my-6 bg-white border rounded-3xl">
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
