// import { FaArrowDown } from "react-icons/fa";
import BusinessPortfolio from "./BusinessPortfolio";
import RewardsManagementTable from "./RewardsManagementTable";

const BusinessAdmin = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <div className="w-full md:w-[70%]">
          <h1 className="mb-3 text-xl font-semibold md:text-3xl">
            Business App Management
          </h1>
          <p className="mb-10 text-gray-500">
            Manage donor details, badges, goals, and rewards for the donor app.
          </p>
        </div>
        {/* <div className="w-full md:w-[30%] flex justify-end items-center gap-5">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border rounded-3xl">
            <FaArrowDown /> Export
          </button>
        </div> */}
      </div>
      <BusinessPortfolio />
      <RewardsManagementTable/>
    </div>
  );
};

export default BusinessAdmin;
