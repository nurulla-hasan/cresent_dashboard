/* eslint-disable no-unused-vars */
import { message, Modal } from "antd";
import { useState } from "react";
import { FaArrowDown, FaPlus, FaTrash } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import AddSubscription from "../../Components/SubscriptionManagement/AddSubscription/AddSubscription";
import MessageCost from "./MessageCost/MessageCost";
import EditSubscription from "../../Components/SubscriptionManagement/EditSubscription/EditSubscription";
import OrganizationSubscription from "../../Components/ManageSubscription/OrganizationSubscription";
import DonorsSubscription from "../../Components/ManageSubscription/DonorsSubscription";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Subscription = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDelet = () => {
    message.success("Deleted Successfully");
  };

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
        <button className="bg-white px-4 py-2 rounded-3xl border flex justify-between items-center gap-2">
          <FaArrowDown /> Export
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8 ">
        <div className="bg-gray-100 p-6 rounded-3xl">
          <div className="flex justify-between items-center gap-2 mb-8">
            <div>
              <p className="text-xl font-semibold mb-20">Overview</p>
              <p className="text-neutral-400 text-2xl">
                1,420
                <span className="text-green-500 text-sm">Active</span>{" "}
                <span className="text-sm ">
                  {" "}
                  subscriptions across donors, businesses, and organizations.
                </span>
              </p>
            </div>
            <Link to="/donationQuickLink">
              <div className="bg-white rounded-full h-10 w-10 p-1 flex justify-center items-center">
                <BsArrowUpRight />
              </div>
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-3xl">
          <p className="text-xl font-semibold mb-20">Breakdown</p>
          <div className="my-6 flex justify-center items-center gap-2">
            <div className="h-10 w-[50%] bg-pink-200 rounded-xl"></div>
            <div className="h-10 w-[25%] bg-blue-200 rounded-xl"></div>
            <div className="h-10 w-[25%] bg-green-200 rounded-xl"></div>
          </div>
          <div className="flex justify-between items-center gap-3">
            <div>
              <div className="flex justify-center items-center gap-1">
                <div className="h-2 w-2 bg-pink-200"></div>
                <p>Donor</p>
              </div>
              <h1 className="text-2xl font-bold">500</h1>
            </div>
           <div>
              <div className="flex justify-center items-center gap-1">
                <div className="h-2 w-2 bg-blue-200"></div>
                <p>Business</p>
              </div>
              <h1 className="text-2xl font-bold">500</h1>
            </div>
            <div>
              <div className="flex justify-center items-center gap-1">
                <div className="h-2 w-2 bg-green-200"></div>
                <p>Organization</p>
              </div>
              <h1 className="text-2xl font-bold">500</h1>
            </div>
          </div>
        </div>
      </div>

      <OrganizationSubscription />
      <DonorsSubscription />
    </div>
  );
};

export default Subscription;
