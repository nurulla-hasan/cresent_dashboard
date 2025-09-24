// import oneTime from "../../assets/images/one-time.png";
// import recurring from "../../assets/images/recurring.png";
// import rounup from "../../assets/images/roundup.png";

import { BsArrowUpRight } from "react-icons/bs";

const AnanlyticsCharts = () => {
  return (
    <div className=" my-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white border p-6 rounded-2xl relative">
          <div className="flex justify-between items-start mb-6 h-20">
            <div className="flex justify-between items-center gap-2">
              <p className=" text-xl font-medium">Total Donated</p>
            </div>
            <BsArrowUpRight />
          </div>
          <div className="">
            <h1 className="text-3xl font-bold">
              <span className="text-gray-400">$</span>40,000
            </h1>
            <p className="text-gray-400 mt-2">
              <span className="text-green-500"> +8.2% </span>vs last month
            </p>
          </div>
        </div>
        <div className="bg-white border p-6 rounded-2xl relative">
          <div className="flex justify-between items-start  mb-6 h-20">
            <div>
              <p className=" text-xl font-medium">Active Organizations</p>
           
            </div>
            <BsArrowUpRight />
          </div>
          <div className="">
            <h1 className="text-3xl font-bold">
              <span className="text-gray-400">$</span>40,000
            </h1>
            <p className="text-gray-400 mt-2">
              <span className="text-green-500"> +8.2% </span>vs last month
            </p>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default AnanlyticsCharts;
