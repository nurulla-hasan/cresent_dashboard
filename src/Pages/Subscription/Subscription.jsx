/* eslint-disable no-unused-vars */
import { message, Modal } from "antd";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
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
  }
  const handleCancel = () => {
    setShowModal(false);
  }

  const handleDelet = () => {
    message.success('Deleted Successfully');
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
          Subscription
        </h3>
        {/* <button onClick={handleShowModal} className="flex items-center gap-2 bg-primary text-center w-full md:w-auto  p-2 font-semibold text-white px-10 py-2 rounded-xl shadow-lg"><FaPlus></FaPlus> Add Subscription</button> */}

      </div>
      <div>

      </div>
      <OrganizationSubscription />
      <DonorsSubscription />
    


    </div>
  );
};

export default Subscription;