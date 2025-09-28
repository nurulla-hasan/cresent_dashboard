import { FaArrowDown } from "react-icons/fa";
import BusinessPortfolio from "./BusinessPortfolio";
import RewardsManagementTable from "./RewardsManagementTable";

const BusinessAdmin = () => {
  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <div className="w-full md:w-[70%]">
          <h1 className="text-xl md:text-3xl font-semibold my-3">
            Business App Management
          </h1>
          <p className="text-gray-500 mb-10">
            Manage donor details, badges, goals, and rewards for the donor app.
          </p>
        </div>
        <div className="w-full md:w-[30%] flex justify-end items-center gap-5">
          <button className="bg-white px-6 py-3 rounded-3xl flex justify-center items-center gap-2 border">
            <FaArrowDown /> Export
          </button>
        </div>
      </div>
      <BusinessPortfolio />
      <RewardsManagementTable/>
    </div>
  );
};

export default BusinessAdmin;
