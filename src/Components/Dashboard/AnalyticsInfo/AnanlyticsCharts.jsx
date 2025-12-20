
import { BsArrowUpRight } from "react-icons/bs";

const AnanlyticsCharts = ({
  totalDonation,
  donationAmountChangeText,
  totalActiveOrganizations,
  organizationChangeText,
}) => {
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
              <span className="text-gray-400">$</span>
              {Number(totalDonation ?? 0).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </h1>
            {donationAmountChangeText ? (
              <p className="text-gray-400 mt-2">{donationAmountChangeText}</p>
            ) : null}
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
              {Number(totalActiveOrganizations ?? 0).toLocaleString()}
            </h1>
            {organizationChangeText ? (
              <p className="text-gray-400 mt-2">{organizationChangeText}</p>
            ) : null}
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default AnanlyticsCharts;
