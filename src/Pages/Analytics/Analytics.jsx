import { useState } from "react";
import AnanlyticsCharts from "../../Components/Dashboard/AnalyticsInfo/AnanlyticsCharts";
import BarChartComponents from "../../Components/Dashboard/AnalyticsInfo/BarChartComponents";
import QuickLinks from "../../Components/Dashboard/AnalyticsInfo/QuickLinks";
import TopDonors from "../../Components/Dashboard/AnalyticsInfo/TopDonors";

const Analytics = () => {
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
    <div className="">
      <div className="flex justify-between items-center gap-5">
        <div className="w-full md:w-[70%]">
          <h1 className="text-xl md:text-3xl font-semibold my-3">Dashboard</h1>
          <p className="text-gray-500 mb-10">
            Track donation patterns, donor behavior, and how contributions are
            shaping results.
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

      <div className="flex justify-between items-start gap-5">
        <div className=" w-full md:w-[70%]">
          {/* {TODO: there will need to pass the data} */}
          {/* <AnalyticsCard filter={active} data={data} /> */}
          <AnanlyticsCharts filter={active} data={data} />
          <BarChartComponents filter={active} data={data} />
        </div>
        <div className="hidden md:block w-[30%]">
          <QuickLinks />
          <TopDonors filter={active} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
