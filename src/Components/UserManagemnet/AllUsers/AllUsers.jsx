
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
    <div className="min-h-screen bg-gray-50">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-neutral-400">
            Manage users, organizations, and businesses in one place.
          </p>
        </div>
        <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white border rounded-3xl">
          <FaArrowDown /> Export
        </button>
      </div>

   
      <div className="p-6 my-10 bg-white border rounded-3xl">
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          
          <div className="p-6 bg-gray-100 rounded-3xl">
            <div className="flex items-center justify-between gap-2 mb-8">
              <div>
                <p className="font-semibold tetx-xl">Organizations</p>
                <p className="text-neutral-400 ">
                  
                  <span className="text-green-500">{stats.organizationsChangeText || "+0.0%"}</span> vs last month
                </p>
              </div>
               <Link to="/organization-management">
              <div className="flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full">
                <BsArrowUpRight />
              </div>
              </Link>
            </div>

            <h2 className="text-2xl font-semibold">
              {stats.totalOrganizations ?? 0}{" "}
              <span className="ml-2 text-sm text-gray-400">
                active profiles
              </span>
            </h2>
          </div>
          <div className="p-6 bg-gray-100 rounded-3xl">
            <div className="flex items-center justify-between gap-2 mb-8">
              <div>
                <p className="font-semibold tetx-xl">Businesses</p>
                <p className="text-neutral-400 ">
                  
                  <span className={`text-${stats.businessesChangeColor || "red"}-500`}>{stats.businessesChangeText || "-0.0%"}</span> vs last month
                </p>
              </div>
               <Link to="/business-admin">
              <div className="flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full">
                <BsArrowUpRight />
              </div>
              </Link>
            </div>

            <h2 className="text-2xl font-semibold">
              {stats.totalBusinesses ?? 0}
              <span className="ml-2 text-sm text-gray-400">
                active profiles
              </span>
            </h2>
          </div>
          <div className="p-6 bg-gray-100 rounded-3xl">
            <div className="flex items-center justify-between gap-2 mb-8">
              <div>
                <p className="font-semibold tetx-xl">Clients</p>
                <p className="text-neutral-400 ">
                  
                  <span className="text-green-500">{stats.clientsChangeText || "+0.0%"}</span> vs last month
                </p>
              </div>
              <Link to="/client-management">
                <div className="flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full">
                  <BsArrowUpRight />
                </div>
              </Link>
            </div>

            <h2 className="text-2xl font-semibold">
              {stats.totalClients ?? 0}{" "}
              <span className="ml-2 text-sm text-gray-400">
                active profiles
              </span>
            </h2>
          </div>
          <div className="p-6 bg-gray-100 rounded-3xl">
            <div className="flex items-center justify-between gap-2 mb-8">
              <div>
                <p className="font-semibold tetx-xl">Pending Approvals</p>
                <p className="text-neutral-400 ">
                  
                  <span className="text-yellow-500">{stats.pendingChangeText || "+0.0%"}</span> vs last month
                </p>
              </div>
              <div onClick={handlePendingApproval} className="flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer">
                <BsArrowUpRight />
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              {stats.pendingApprovals ?? 0}
              <span className="ml-2 text-sm text-gray-400">
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
