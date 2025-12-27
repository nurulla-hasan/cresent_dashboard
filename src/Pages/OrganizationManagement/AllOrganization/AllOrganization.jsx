// import { FaArrowDown } from "react-icons/fa";
import OrganizationTable from "../OrganizationTable";
import CauseManagement from "../CauseManagement"; 

const AllOrganization = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------- Top Title ---------- */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organization Management</h1>
          <p className="mt-2 text-sm text-gray-500">
            Track donor trends, popular causes, and user activity across the platform.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          {/* <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white border rounded-3xl">
            <FaPlus /> Add Organization
          </button> */}
          {/* <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white border rounded-3xl">
            <FaArrowDown /> Export
          </button> */}
        </div>
      </div>
      <OrganizationTable/>
      <CauseManagement />
    </div>
  );
};

export default AllOrganization;
