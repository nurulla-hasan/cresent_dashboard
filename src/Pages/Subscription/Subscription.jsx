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
      <OrganizationSubscription />
      <DonorsSubscription />
    </div>
  );
};

export default Subscription;
