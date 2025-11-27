import { useState } from "react";
import AnanlyticsCharts from "../../Components/Dashboard/AnalyticsInfo/AnanlyticsCharts";
// import BarChartComponents from "../../Components/Dashboard/AnalyticsInfo/BarChartComponents";
import QuickLinks from "../../Components/Dashboard/AnalyticsInfo/QuickLinks";
import TopDonors from "../../Components/Dashboard/AnalyticsInfo/TopDonors";
import DonationChart from "../../Components/Dashboard/AnalyticsInfo/DonationChart";
import SubscriptionChart from "../../Components/Dashboard/AnalyticsInfo/SubscriptionChart";
import { useGetDashboardDataQuery } from "../../redux/feature/dashboard/dashboardApis";

const Analytics = () => {
  const [active, setActive] = useState("Today");

  const getTimeFilterValue = (label) => {
    if (label === "Today") return "today";
    if (label === "This Week") return "week";
    if (label === "This Month") return "month";
    return "today";
  };

  const timeFilter = getTimeFilterValue(active);

  const { data: apiRes, isLoading, isError, isFetching } = useGetDashboardDataQuery({ timeFilter });
  const stats = apiRes?.data || {};

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
          {isLoading || isFetching ? (
            <div className="p-10 bg-white border rounded-2xl flex justify-center items-center">
              <div className="h-10 w-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
            </div>
          ) : isError ? (
            <div className="p-6 bg-white border rounded-2xl text-red-500">Failed to load dashboard data.</div>
          ) : (
            <>
              <AnanlyticsCharts
                totalDonation={stats.totalDonation}
                donationAmountChangeText={stats.donationAmountChangeText}
                totalActiveOrganizations={stats.totalActiveOrganizations}
                organizationChangeText={stats.organizationChangeText}
              />
              <DonationChart monthlyData={stats.donationGrowthMonthly} />
              <SubscriptionChart monthlyData={stats.subscriptionDonationGrowthMonthly} />
              {/* <BarChartComponents data={[]} /> */}
            </>
          )}
        </div>
        <div className="hidden md:block w-[30%]">
          <QuickLinks />
          {!isLoading && !isError && (
            <TopDonors
              topDonors={stats.topDonors}
              recentDonorDocs={stats.recentDonorDocs}
              donationsByCause={stats.donationsByCause}
              totalDonation={stats.totalDonation}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
