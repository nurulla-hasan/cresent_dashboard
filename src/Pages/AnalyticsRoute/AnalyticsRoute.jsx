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
import { Button, Divider } from "antd";
const AnalyticsRoute = () => {
  const [active, setActive] = useState("Today");

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
    org: "#6ee7b7", // green-300
    biz: "#93c5fd", // blue-300
    donor: "#fbcfe8", // pink-200
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
  const dataChart = [
    { name: "Jan", Organization: 10, Business: 10, Donor: 10 },
    { name: "Feb", Organization: 20, Business: 15, Donor: 15 },
    { name: "Mar", Organization: 15, Business: 10, Donor: 15 },
    { name: "Apr", Organization: 25, Business: 20, Donor: 25 },
    { name: "May", Organization: 30, Business: 30, Donor: 30 },
    { name: "Jun", Organization: 20, Business: 20, Donor: 20 },
    { name: "Jul", Organization: 25, Business: 25, Donor: 30 },
    { name: "Aug", Organization: 40, Business: 30, Donor: 30 },
    { name: "Sep", Organization: 25, Business: 25, Donor: 25 },
    { name: "Oct", Organization: 30, Business: 25, Donor: 30 },
    { name: "Nov", Organization: 35, Business: 30, Donor: 30 },
    { name: "Dec", Organization: 40, Business: 30, Donor: 30 },
  ];

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
        <div className="w-full md:w-[30%] flex justify-start items-center gap-5">
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
                  {" "}
                  <span className="text-green-500">+5.2%</span> vs last month
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              120,340{" "}
              <span className="text-sm text-gray-400 ml-2">active Users</span>
            </h2>
          </div>
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">New Sign-ups</p>
                <p className="text-neutral-400 ">
                  {" "}
                  <span className="text-green-500">+5.2%</span> vs last month
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              120,340{" "}
              <span className="text-sm text-gray-400 ml-2">New Sign-ups</span>
            </h2>
          </div>
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Returning Users</p>
                <p className="text-neutral-400 ">
                  {" "}
                  <span className="text-green-500">+5.2%</span> vs last month
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              120,340{" "}
              <span className="text-sm text-gray-400 ml-2">
                Returning Users
              </span>
            </h2>
          </div>
        </div>
        {/* chart will be here  */}
      </div>

      {/* Donations Trend */}
      <div className="bg-white p-6 rounded-3xl border ">
        <div className="h-[400px] w-full py-6">
          <h1 className="text-2xl font-medium mb-6">Donation Trend</h1>

          <ResponsiveContainer
            width="100%"
            height="100%"
            Title="Donation Trend"
          >
            <BarChart data={dataChart} barSize={150}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <RechartsTooltip />
              <Legend verticalAlign="bottom" height={36} />
              <Bar
                dataKey="Organization"
                stackId="a"
                fill={PALETTE.org}
                radius={[6, 6, 0, 0]}
              />
              <Bar dataKey="Business" stackId="a" fill={PALETTE.biz} />
              <Bar dataKey="Donor" stackId="a" fill={PALETTE.donor} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Causes + Pie */}
      <div className="bg-white p-6 rounded-3xl my-10 border">
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

      <div>
        <Title level={4} className="!mb-2">
          Export Analytics Data
        </Title>
        <p type="secondary">Download a full report of filtered analytics.</p>
        <Divider className="my-4" />
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          className="rounded-full"
        >
          Export
        </Button>
        <div className="mt-3 text-xs text-gray-500">
          The export includes current range (<b>{active}</b>) and all visible
          data.
        </div>
      </div>
    </div>
  );
};

export default AnalyticsRoute;
