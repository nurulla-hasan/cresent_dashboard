/* eslint-disable no-unused-vars */
import { message, Modal } from "antd";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import AddSubscription from "../../Components/SubscriptionManagement/AddSubscription/AddSubscription";

const Subscription = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  }
  const handleCancel = () => {
    setShowModal(false);
  }
  const hndleShowEditModal = () => {
    setShowEditModal(true);
  }
  const handleCancelEdit = () => {
    setShowEditModal(false);
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
        <button onClick={handleShowModal} className="flex items-center gap-2 bg-primary text-center w-full md:w-auto  p-2 font-semibold text-white px-10 py-2 rounded-xl shadow-lg"><FaPlus></FaPlus> Add Subscription</button>

      </div>
      <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-primary">
          <div className="flex items-center justify-between">
            <h1>Basic Subscription</h1>
            <div className="flex items-center gap-2">
              <button onClick={() => hndleShowEditModal()} >
                <FaRegPenToSquare className="text-primary " />
              </button>


              <button onClick={() => handleDelet()} >
                <FaTrash className="text-red-500 " /></button>
            </div>
          </div>
        </div>
      </div>


      {/* Add Subscription Modal */}

      <Modal open={showModal} onCancel={handleCancel} footer={null}>
        <AddSubscription />

      </Modal>

    </div>
  );
};

export default Subscription;