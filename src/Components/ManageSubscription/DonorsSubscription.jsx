import { message, Modal } from "antd";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import EditSubscription from "../SubscriptionManagement/EditSubscription/EditSubscription";
import { useState } from "react";

import AddPrice from "./AddPrice";

const DonorsSubscription = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showModal, setShowModal] = useState(false);


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
                    Donors Subscription
                </h3>
                <button onClick={handleShowModal} className="flex items-center gap-2 bg-primary text-center w-full md:w-auto  p-2 font-semibold text-white px-10 py-2 rounded-xl shadow-lg"><FaPlus></FaPlus> Set Price</button>

            </div>
            <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-xl border border-primary">
                    <div className="flex items-center justify-between mb-2">
                        <h1>Basic Subscription</h1>
                        <div className="flex items-center gap-2">
                            <button onClick={() => hndleShowEditModal()} >
                                <FaRegPenToSquare className="text-primary " />
                            </button>


                            <button onClick={() => handleDelet()} >
                                <FaTrash className="text-red-500 " /></button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p>Price</p>
                        <p className="text-primary">90$</p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p>Validity</p>
                        <p className="text-primary">1 Year</p>
                    </div>
                    <div>
                        <h1>Feature list</h1>
                        {/* bullet list */}
                        <ul className="list-disc list-inside flex flex-col gap-2  text-neutral-500">
                            <li>up to 50+ appointment</li>
                            <li>Unlimited video cal </li>
                            <li>Unlimited Audio call</li>
                        </ul>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-primary">
                    <div className="flex items-center justify-between mb-2">
                        <h1>Basic Subscription</h1>
                        <div className="flex items-center gap-2">
                            <button onClick={() => hndleShowEditModal()} >
                                <FaRegPenToSquare className="text-primary " />
                            </button>


                            <button onClick={() => handleDelet()} >
                                <FaTrash className="text-red-500 " /></button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p>Price</p>
                        <p className="text-primary">90$</p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p>Validity</p>
                        <p className="text-primary">1 Year</p>
                    </div>
                    <div>
                        <h1>Feature list</h1>
                        {/* bullet list */}
                        <ul className="list-disc list-inside flex flex-col gap-2  text-neutral-500">
                            <li>up to 50+ appointment</li>
                            <li>Unlimited video cal </li>
                            <li>Unlimited Audio call</li>
                        </ul>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-primary">
                    <div className="flex items-center justify-between mb-2">
                        <h1>Basic Subscription</h1>
                        <div className="flex items-center gap-2">
                            <button onClick={() => hndleShowEditModal()} >
                                <FaRegPenToSquare className="text-primary " />
                            </button>


                            <button onClick={() => handleDelet()} >
                                <FaTrash className="text-red-500 " /></button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p>Price</p>
                        <p className="text-primary">90$</p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <p>Validity</p>
                        <p className="text-primary">1 Year</p>
                    </div>
                    <div>
                        <h1>Feature list</h1>
                        {/* bullet list */}
                        <ul className="list-disc list-inside flex flex-col gap-2  text-neutral-500">
                            <li>up to 50+ appointment</li>
                            <li>Unlimited video cal </li>
                            <li>Unlimited Audio call</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Add Subscription Modal */}
            <Modal title="Add price" open={showModal} onCancel={handleCancel} footer={null}>
                <AddPrice />
            </Modal>
            {/* Edit Subscription Modal */}
            <Modal title="Edit Price" open={showEditModal} onCancel={handleCancelEdit} footer={null}>
                <EditSubscription />
            </Modal>

        </div>
    );
};

export default DonorsSubscription;