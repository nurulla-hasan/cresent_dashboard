// import { FaArrowDown, } from "react-icons/fa";
import DonorDataTable from "./DonorDataTable";
import BadgeTable from "./BadgeTable";
import BusinessReview from "./BusinessReview";

const DonorApp = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <div className="w-full md:w-[70%]">
          <h1 className="mb-3 text-xl font-semibold md:text-3xl">
            Donor App Management
          </h1>
          <p className="mb-10 text-gray-500">
            Manage donor details, badges, goals, and rewards for the donor app.
          </p>
        </div>
        <div className="w-full md:w-[30%] flex justify-end items-center gap-5">
          {/* <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border rounded-3xl">
            <FaPen></FaPen> Edit Rewards
          </button> */}
          {/* <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border rounded-3xl">
            <FaPlus></FaPlus> Add
          </button> */}
          {/* <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border rounded-3xl">
            <FaArrowDown /> Export
          </button> */}
        </div>
      </div>
      <DonorDataTable />
      <BadgeTable />
      <BusinessReview />
    </div>
  );
};

export default DonorApp;
