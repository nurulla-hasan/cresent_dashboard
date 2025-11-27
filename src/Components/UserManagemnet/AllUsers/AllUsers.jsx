
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import PendingApproval from "../PendingApproval";
import { useRef } from "react";
import { useGetUserStateQuery } from "../../../redux/feature/user/userApis.js";
import ProfileTables from "../ProfileTables";
import { FaArrowDown } from "react-icons/fa";

const AllUsers = () => {
  const { data: userStateData } = useGetUserStateQuery();
  const stats = userStateData?.data || {};

  const pendingApprovalRef = useRef<HTMLDivElement | null>(null);
  const handlePendingApproval = () => {
    if (pendingApprovalRef.current) {
      pendingApprovalRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-neutral-400">
            Manage users, organizations, and businesses in one place.
          </p>
        </div>
        <button className="bg-white px-4 py-2 rounded-3xl border flex justify-between items-center gap-2">
          <FaArrowDown /> Export
        </button>
      </div>

   
      <div className="bg-white p-6 rounded-3xl my-10 border">
        <div>
          <h1 className="text-2xl font-semibold mb-12">
            Total Registered Profiles
          </h1>
          <h1 className="text-4xl font-bold mb-6">
            {stats.totalActiveUsers ?? 0}{" "}
            <span className="text-green-500 text-sm font-normal">{stats.activeUsersChangeText || ""}</span>{" "}
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-8 ">
          
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Donors</p>
                <p className="text-neutral-400 ">
                  {" "}
                  <span className="text-green-500">+5.2%</span> vs last month
                </p>
              </div>
              <Link to="/donationQuickLink">
                <div className="bg-white rounded-full h-10 w-10 p-1 flex justify-center items-center">
                  <BsArrowUpRight />
                </div>
              </Link>
            </div>

            <h2 className="text-2xl font-semibold">
              {stats.totalActiveUsers ?? 0}{" "}
              <span className="text-sm text-gray-400 ml-2">
                active profiles
              </span>
            </h2>
          </div>


          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Organizations</p>
                <p className="text-neutral-400 ">
                  {" "}
                  <span className="text-green-500">+5.2%</span> vs last month
                </p>
              </div>
               <Link to="/organization-management">
              <div className="bg-white rounded-full h-10 w-10 p-1 flex justify-center items-center">
                <BsArrowUpRight />
              </div>
              </Link>
            </div>

            <h2 className="text-2xl font-semibold">
              {stats.totalActiveUsers ?? 0}{" "}
              <span className="text-sm text-gray-400 ml-2">
                active profiles
              </span>
            </h2>
          </div>
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Businesses</p>
                <p className="text-neutral-400 ">
                  {" "}
                  <span className="text-red-500">-5.2%</span> vs last month
                </p>
              </div>
               <Link to="/business-admin">
              <div className="bg-white rounded-full h-10 w-10 p-1 flex justify-center items-center">
                <BsArrowUpRight />
              </div>
              </Link>
            </div>

            <h2 className="text-2xl font-semibold">
              {stats.totalActiveUsers ?? 0}
              <span className="text-sm text-gray-400 ml-2">
                active profiles
              </span>
            </h2>
          </div>
          <div className="bg-gray-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center gap-2 mb-8">
              <div>
                <p className="tetx-xl font-semibold">Pending Approvals</p>
          
              </div>
              <div onClick={handlePendingApproval} className="bg-white rounded-full h-10 w-10 p-1 flex justify-center items-center cursor-pointer">
                <BsArrowUpRight />
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              {stats.totalNewUsers ?? 0}
              <span className="text-sm text-gray-400 ml-2">
                pending profiles
              </span>
            </h2>
          </div>
        </div>
      </div>

      <ProfileTables/>

      <PendingApproval />
    </div>
  );
};

export default AllUsers;
