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
import { Button, Select } from "antd";
import { FaArrowDown } from "react-icons/fa";
import { useGetUserEngagementQuery, useGetDonationChartQuery } from "../../redux/feature/user/userApis";
const { Option } = Select;
const AnalyticsRoute = () => {
  const [active, setActive] = useState("Today");

  const userEngagementTimeFilter = useMemo(() => {
    if (active === "Today") return "today";
    if (active === "This Week") return "week";
    if (active === "This Month") return "month";
    return "month";
  }, [active]);

  const { data: userEngagementData, isLoading: userEngagementLoading } = useGetUserEngagementQuery({
    timeFilter: userEngagementTimeFilter,
    role: "CLIENT",
  });

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

  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <div className="w-full md:w-[70%]">
          <h1 className="my-3 text-xl font-semibold md:text-3xl">Analytics</h1>
          <p className="mb-10 text-gray-500">
            Track donor trends, popular causes, and user activity across the
            platform.
          </p>
        </div>
        <div className="w-full md:w-[40%] flex justify-end items-center gap-5">
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
      <div className="p-6 my-10 bg-white border rounded-3xl">
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
          <div className="p-6 bg-gray-100 rounded-3xl">
            <div className="flex items-center justify-between gap-2 mb-8">
              <div>
                <p className="font-semibold tetx-xl">Active Users</p>
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
              <span className="ml-2 text-sm text-gray-400">active Users</span>
            </h2>
          </div>
          <div className="p-6 bg-gray-100 rounded-3xl">
            <div className="flex items-center justify-between gap-2 mb-8">
              <div>
                <p className="font-semibold tetx-xl">New Sign-ups</p>
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
              <span className="ml-2 text-sm text-gray-400">New Sign-ups</span>
            </h2>
          </div>
          <div className="p-6 bg-gray-100 rounded-3xl">
            <div className="flex items-center justify-between gap-2 mb-8">
              <div>
                <p className="font-semibold tetx-xl">Returning Users</p>
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
              <span className="ml-2 text-sm text-gray-400">
                Returning Users
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Donations Trend */}
      <div className="p-6 bg-white border rounded-3xl ">
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

          {donationLoading && <div className="mt-2 text-gray-500">Loading donation data...</div>}
        </div>
      </div>

      {/* Top Causes + Pie */}
      <div className="p-6 my-6 bg-white border rounded-3xl">
        <div className="grid items-center justify-center grid-cols-1 gap-5 md:grid-cols-2">
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
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.since}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-right">{c.percent}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Pie Chart */}
          <div className="w-full h-full">
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

      <div className="flex items-center justify-between gap-5 p-6 my-6 bg-white border rounded-3xl">
        <div>
          <h1 className="text-2xl font-medium">Export Analytics Data</h1>
          <p className="text-gray-400">
            Download a full report of filtered analytics.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-black rounded-3xl">
          Export <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

export default AnalyticsRoute;
