import { Pagination, Select } from "antd";

import { Input } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import DonorRewards from "./DonorRewards";



const RewardsQuickLinks = () => {
  const { Search } = Input;
  const { Option } = Select;
  const onSearch = (value) => {
    console.log("Search input: ", value);
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold mb-4">Rewards Management</h1>
          <p className="text-lg text-gray-600 mb-4">
            Generate, track, and export your donation insights.
          </p>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center  items-center gap-3">
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Active Rewards</p>
            <div className="mt-20 space-y-2">
              <h1 className="text-2xl font-medium mt-10">
                {" "}
                <span className="text-gray-400">$</span> 4000{" "}
              </h1>
              <p className="text-sm text-green-400">
                +8.2%{" "}
                <span className="text-gray-400 text-sm">vs last month</span>{" "}
              </p>{" "}
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Rewards Redeemed</p>
            <div className="mt-20 space-y-2">
              <h1 className="text-2xl font-medium mt-10">
                {" "}
                <span className="text-gray-400">$</span> 4000{" "}
              </h1>
              <p className="text-sm text-green-400">
                +8.2%{" "}
                <span className="text-gray-400 text-sm">vs last month</span>{" "}
              </p>{" "}
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Popular Rewards</p>
            <div className="mt-20 space-y-2">
              <p>🏆</p>
              <p className="text-3xl font-semibold">Free Coffee ☕</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border my-6">
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-xl font-medium">Donation History</h1>

            <div className="flex items-center gap-3">
              <div className="mt-4 md:mt-0">
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  enterButton
                />
              </div>

              <div className="mt-4 md:mt-0">
                <Select defaultValue="selected" style={{ width: 120 }}>
                  <Option value="selected">Selected</Option>
                  <Option value="all">All</Option>
                </Select>
              </div>

              <div className="mt-4 md:mt-0">
                <button className="px-3 py-2 border rounded-md text-sm text-gray-700">
                  Monthly
                </button>
              </div>
              {/* export korte hobe */}
              <div className="group relative mt-4 md:mt-0">
                <MoreOutlined className="text-xl cursor-pointer" />
                <span className="absolute left-0 bottom-0 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Export
                </span>
              </div>
            </div>
          </div>
          <DonorRewards />

          <div className="flex justify-end items-center my-10">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsQuickLinks;
