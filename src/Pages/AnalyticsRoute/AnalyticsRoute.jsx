/* eslint-disable no-unused-vars */
import Title from "antd/es/skeleton/Title";
import React, { useMemo, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BarChart, ResponsiveContainer, Tooltip } from "recharts";
import { DownloadOutlined } from "@ant-design/icons";
import {
  Bar,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { Button, Checkbox, Divider, Modal, Select, Space } from "antd";
import { FaArrowDown, FaFilter } from "react-icons/fa";
import { useGetUserEngagementQuery, useGetDonationChartQuery } from "../../redux/feature/user/userApis";
const { Option } = Select;
const AnalyticsRoute = () => {
  const [active, setActive] = useState("Today");

  const { data: userEngagementData, isLoading: userEngagementLoading } = useGetUserEngagementQuery();

  const [donationType, setDonationType] = useState("all");
  const [year, setYear] = useState(new Date().getFullYear());

  const { data: donationChart, isLoading: donationLoading } = useGetDonationChartQuery({ 
    donationType: donationType === "all" ? undefined : donationType, 
    year 
  });

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dataChart = useMemo(() => {
    const list = donationChart?.data?.monthlyDonations || [];
    const byMonth = new Map(list.map((m) => [m.month, m]));
    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const item = byMonth.get(month);
      return {
        name: monthNames[i],
        totalAmount: item?.totalAmount || 0,
        count: item?.count || 0,
      };
    });
  }, [donationChart]);

  const getFilteredData = () => {
    switch (active) {
      case "Today":
        return { message: "Showing today's data" };
      case "This Week":
        return { message: "Showing this week's data" };
      case "This Month":
        return { message: "Showing this month's data" };
      default:
        return { message: "No data" };
    }
  };
  const data = getFilteredData();
  const btnClass = (label) =>
    `px-6 py-3 rounded-3xl border transition ${
      active === label ? "bg-black text-white" : "bg-white text-black"
    }`;
  const PALETTE = {
    org: "#6ee7b7", 
    biz: "#93c5fd", 
    donor: "#fbcfe8",
    pie: ["#c7d2fe", "#bae6fd", "#fde68a", "#fecaca", "#e9d5ff", "#d1fae5"],
  };
  const causes = [
    {
      id: "c1",
      name: "Backpacks & Books",
      since: "Jan 2025 – Ongoing",
      percent: 55,
      color: PALETTE.pie[1],
    },
    {
      id: "c2",
      name: "Digital Dreams",
      since: "Feb 2025 – Ongoing",
      percent: 18,
      color: PALETTE.pie[2],
    },
    {
      id: "c3",
      name: "Warmth in Winter",
      since: "Aug 2025 – Ongoing",
      percent: 12,
      color: PALETTE.pie[3],
    },
    {
      id: "c4",
      name: "Every Child, Every Meal",
      since: "Mar 2025 – Ongoing",
      percent: 8,
      color: PALETTE.pie[4],
    },
    {
      id: "c5",
      name: "Other causes",
      since: "—",
      percent: 7,
      color: PALETTE.pie[5],
    },
  ];
  const dataChartStaticRemoved = null;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userTypes, setUserTypes] = useState(["Organizations"]);
  const [causeCategory, setCauseCategory] = useState("Emergency Relief");
  const [donationTypes, setDonationTypes] = useState(["Recurring"]);

  const userOptions = ["Donors", "Organizations", "Businesses"];
  const donationOptions = ["Round-up", "Recurring", "One-time"];
  const causeOptions = ["Emergency Relief", "Education", "Refugee Support"];

  const handleClear = () => {
    setUserTypes([]);
    setCauseCategory("Emergency Relief");
    setDonationTypes([]);
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <div className="w-full md:w-[70%]">
          <h1 className="text-xl md:text-3xl font-semibold my-3">Analytics</h1>
          <p className="text-gray-500 mb-10">
            Track donor trends, popular causes, and user activity across the
            platform.
          </p>
        </div>
        <div className="w-full md:w-[40%] flex justify-start items-center gap-5">
          <button
            onClick={() => setIsModalVisible(true)}
            className="bg-white px-6 py-2 rounded-3xl flex items-center gap-2"
          >
            <FaFilter />
            Filter
          </button>
          <button
            className={btnClass("Today")} 
            onClick={() => setActive("Today")}
          >
            Today
          </button>
          <button
            className={btnClass("This Week")}
            onClick={() => setActive("This Week")}
          >
            This Week
          </button>
          <button
            className={btnClass("This Month")}
            onClick={() => setActive("This Month")}
          >
            This Month
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl my-10 border">
        <div>
          <div className="mb-12">
            <h1 className="text-2xl font-semibold ">User Engagement</h1>
            <p className="text-gray-500">
              Track how users (donors, organizations, and businesses) are
              engaging with Crescent Change.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8 ">
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Active Users</p>
                <p className="text-neutral-400 ">
                  {userEngagementData?.data?.activeUsersChangeText ? (
                    <span className={userEngagementData.data.activeUsersChangeText.includes('+') ? "text-green-500" : "text-red-500"}>
                      {userEngagementData.data.activeUsersChangeText} vs last month
                    </span>
                  ) : (
                    <span className="text-gray-500">No change data</span>
                  )}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              {userEngagementLoading ? "Loading..." : userEngagementData?.data?.totalActiveUsers || 0}{" "}
              <span className="text-sm text-gray-400 ml-2">active Users</span>
            </h2>
          </div>
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">New Sign-ups</p>
                <p className="text-neutral-400 ">
                  {userEngagementData?.data?.newUsersChangeText ? (
                    <span className={userEngagementData.data.newUsersChangeText.includes('+') ? "text-green-500" : "text-red-500"}>
                      {userEngagementData.data.newUsersChangeText} vs last month
                    </span>
                  ) : (
                    <span className="text-gray-500">No change data</span>
                  )}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              {userEngagementLoading ? "Loading..." : userEngagementData?.data?.totalNewUsers || 0}{" "}
              <span className="text-sm text-gray-400 ml-2">New Sign-ups</span>
            </h2>
          </div>
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Returning Users</p>
                <p className="text-neutral-400 ">
                  {userEngagementData?.data?.returningUsersChangeText ? (
                    <span className={userEngagementData.data.returningUsersChangeText.includes('+') ? "text-green-500" : "text-red-500"}>
                      {userEngagementData.data.returningUsersChangeText} vs last month
                    </span>
                  ) : (
                    <span className="text-gray-500">No change data</span>
                  )}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              {userEngagementLoading ? "Loading..." : userEngagementData?.data?.totalReturningUsers || 0}{" "}
              <span className="text-sm text-gray-400 ml-2">
                Returning Users
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Donations Trend */}
      <div className="bg-white p-6 rounded-3xl border ">
        <div className="h-[460px] w-full py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-medium">Donation Trend</h1>
            <div className="flex items-center gap-3">
              <Select
                size="middle"
                value={donationType}
                onChange={(v) => setDonationType(v)}
                style={{ width: 150 }}
              >
                <Option value="all">All Types</Option>
                <Option value="one-time">One-time</Option>
                <Option value="recurring">Recurring</Option>
                <Option value="round-up">Round-up</Option>
              </Select>
              <Select
                size="middle"
                value={year}
                onChange={(v) => setYear(v)}
                style={{ width: 120 }}
              >
                {Array.from({ length: 5 }, (_, idx) => new Date().getFullYear() - idx).map((y) => (
                  <Option key={y} value={y}>{y}</Option>
                ))}
              </Select>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="100%" Title="Donation Trend">
            <BarChart data={dataChart} barSize={35}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <RechartsTooltip />
              <Legend verticalAlign="bottom" height={36} />
              <Bar dataKey="totalAmount" name="Total Amount" fill={PALETTE.org} radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>

          {donationLoading && <div className="text-gray-500 mt-2">Loading donation data...</div>}
        </div>
      </div>

      {/* Top Causes + Pie */}
      <div className="bg-white p-6 rounded-3xl my-6 border">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5">
          <div className="">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-medium">Top Causes</h1>
                <p className="text-gray-400">
                  {" "}
                  Which causes are receiving the most support.
                </p>
              </div>
              <Link to="#" className="text-xs text-blue-600 hover:underline">
                View all causes
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {causes.map((c) => (
                <div key={c.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.since}</div>
                    </div>
                  </div>
                  <div className="text-right font-semibold">{c.percent}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Pie Chart */}
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <RechartsTooltip />
                <Pie
                  data={causes}
                  dataKey="percent"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="100%"
                  innerRadius={0}
                  paddingAngle={1}
                  cornerRadius={6}
                >
                  {causes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl my-6 border flex justify-between items-center gap-5">
        <div>
          <h1 className="text-2xl font-medium">Export Analytics Data</h1>
          <p className="text-gray-400">
            Download a full report of filtered analytics.
          </p>
        </div>
        <button className="px-6 py-3 rounded-3xl bg-black text-white flex justify-center items-center gap-2">
          Export <FaArrowDown />
        </button>
      </div>

      <Modal
        title="Filter"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <Space>
            <Button onClick={handleClear}>Clear All</Button>
            <Button type="primary" onClick={() => setIsModalVisible(false)}>
              Apply Filter
            </Button>
          </Space>
        }
        centered
        width={560}
      >
        <p className="text-gray-400 mb-6">
          Filter insights by time, user type, or cause.
        </p>
        <div className="mb-4">
          <label className="block mb-2 font-medium">User Type</label>
          <Checkbox.Group
            options={userOptions}
            value={userTypes}
            onChange={(checkedValues) => setUserTypes(checkedValues)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Cause Categories</label>
          <Select
            value={causeCategory}
            onChange={(value) => setCauseCategory(value)}
            style={{ width: "100%" }}
          >
            {causeOptions.map((cause) => (
              <Option key={cause} value={cause}>
                {cause}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Donation Type</label>
          <Checkbox.Group
            options={donationOptions}
            value={donationTypes}
            onChange={(checkedValues) => setDonationTypes(checkedValues)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AnalyticsRoute;
