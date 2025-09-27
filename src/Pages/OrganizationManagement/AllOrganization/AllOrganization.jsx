import { FaArrowDown, FaPlus } from "react-icons/fa";
import OrganizationTable from "../OrganizationTable";

const AllOrganization = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ---------- Top Title ---------- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Subscription & Payments</h1>
          <p className="text-neutral-400">
            Track all subscriptions, manage invoices, and export payment data.
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <button className="bg-white px-4 py-2 rounded-3xl border flex justify-between items-center gap-2">
            <FaPlus /> Add Organization
          </button>
          <button className="bg-white px-4 py-2 rounded-3xl border flex justify-between items-center gap-2">
            <FaArrowDown /> Export
          </button>
        </div>
      </div>
<OrganizationTable></OrganizationTable>
    </div>
  );
};

export default AllOrganization;
