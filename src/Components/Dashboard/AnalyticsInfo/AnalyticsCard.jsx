import { BsArrowUpRight } from "react-icons/bs";


const AnalyticsCard = () => {
  return (
    <div className="bg-white border rounded-3xl p-6">
      <div className="flex justify-between items-start gap-5 my-5">
        <div>
          <h1 className="text-3xl font-bold">Total Donated</h1>
          <p className="text-gray-500 mb-12">+8.2% from last month</p>
          <div className="flex justify-start items-end gap-2">
            <p className="text-3xl md:text-5xl font-bold text-gray-400 ">
              $ <span className="text-black">40,000 </span>
            </p>
            <p className="text-gray-400">
              <span className="text-green-500">+8.2% </span>vs last month
            </p>
          </div>
        </div>
        <BsArrowUpRight className="h-5 w-5 cursor-pointer" />
      </div>
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-[#f7f2fa] px-6 py-8 rounded-3xl">
          <div className="flex justify-between items-start mb-12">
            <h1 className="text-xl font-medium ">Avg. Donation</h1>
          </div>
          <div className="flex justify-start items-end gap-2">
            <h1 className="text-2xl md:text-3xl text-black font-bold">
              <span className="text-gray-400"> $</span> 100{" "}
            </h1>
            <p className=" text-gray-400">per user</p>
          </div>
        </div>
        <div className="bg-[#f7f2fa] px-6 py-8 rounded-3xl">
          <div className="flex justify-between items-start mb-12">
            <h1 className="text-xl font-medium ">Total Donors</h1>
            <BsArrowUpRight className="h-5 w-5 cursor-pointer" />
          </div>
          <div className="flex justify-start items-end gap-2">
            <h1 className="text-2xl md:text-3xl text-gray-400 font-bold">
              <span className="text-black"> 34.2</span> K{" "}
            </h1>
            <p className=" text-green-500">5.4%</p>
          </div>
        </div>
        <div className="bg-[#f7f2fa] px-6 py-8 rounded-3xl">
          <div className="flex justify-between items-start mb-12">
            <h1 className="text-xl font-medium ">Top Cause</h1>
            <BsArrowUpRight className="h-5 w-5 cursor-pointer " />
          </div>
          <p className="underline text-xl font-medium cursor-pointer">
            Youth Education
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
