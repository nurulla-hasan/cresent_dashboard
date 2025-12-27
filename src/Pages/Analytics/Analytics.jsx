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
    `px-5 py-2 rounded-full border text-sm font-medium transition ${
      active === label
        ? "bg-black text-white border-black"
        : "bg-white text-black border-gray-200 hover:bg-gray-50"
    }`;

  return (
    <div>
      <div className="flex items-start justify-between gap-6">
        <div className="w-full md:w-[70%]">
          <h1 className="mb-1 text-2xl font-semibold md:text-4xl">Dashboard</h1>
          <p className="mb-10 text-gray-500">
            Track donation patterns, donor behavior, and how contributions are
            shaping results.
          </p>
        </div>
        <div className="w-full md:w-[30%] flex justify-end items-center gap-3">
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

      <div className="flex items-start justify-between gap-6">
        <div className="w-full md:w-[70%]">
          {isLoading || isFetching ? (
            <div className="flex items-center justify-center p-10 bg-white border rounded-3xl">
              <div className="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin" />
            </div>
          ) : isError ? (
            <div className="p-6 text-red-500 bg-white border rounded-3xl">Failed to load dashboard data.</div>
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
