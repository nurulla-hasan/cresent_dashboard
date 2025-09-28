/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";

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
              <span className="text-sm text-gray-400 ml-2">Returning Users</span>
            </h2>
          </div>
        </div>
        {/* chart will be here  */}
      </div>
    </div>
  );
};

export default AnalyticsRoute;
