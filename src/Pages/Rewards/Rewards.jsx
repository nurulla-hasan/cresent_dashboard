import { message, Modal } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddSubscription from "../../Components/SubscriptionManagement/AddSubscription/AddSubscription";
import EditSubscription from "../../Components/SubscriptionManagement/EditSubscription/EditSubscription";
import redwardbanner from "../../assets/image/Placeholder Image.png"
import Profile from "../../assets/image/Profile.png"
import { Collapse } from 'antd';

const Rewards = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
    const items = [
        {
            key: '1',
            label: 'This is panel header 1',
            children: <p>{text}</p>,
        },
        {
            key: '2',
            label: 'This is panel header 2',
            children: <p>{text}</p>,
        },
        {
            key: '3',
            label: 'This is panel header 3',
            children: <p>{text}</p>,
        },
    ];
    const handleShowModal = () => {
        setShowModal(true);
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
    const handleCancel = () => {
        setShowModal(false);
    }
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
                    Rewards
                </h3>
                <button onClick={handleShowModal} className="flex items-center gap-2 bg-primary text-center w-full md:w-auto  p-2 font-semibold text-white px-10 py-2 rounded-xl shadow-lg"><FaPlus></FaPlus> Add Rewards</button>
            </div>


            {/* reward cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="my-10 bg-white p-5 rounded-md">
                    <div className="relative">
                        <img className="w-full h-60" src={redwardbanner} alt="" />
                        <img src={Profile} alt="" className="absolute top-36 left-5" />
                    </div>
                    <div className="mt-20">
                        <p className="text-textColor ">131 Eldridge Rd, Condell Park NSW 2200</p>
                        <h1 className="text-2xl font-bold my-2">Purple Parrot</h1>
                    </div>
                    <div className="bg-secondary p-2 mt-10 rounded-xl text-white">
                        <h1 className="text-2xl font-bold">Get 10% off your next purchase</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
                    </div>
                    <div className="mt-10">
                        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
                    </div>
                    <div className="mt-10 flex justify-between">
                        <button onClick={handleDelet} className="px-4 py-2 text-primary border border-primary rounded-xl">Delete</button>
                        <button onClick={hndleShowEditModal} className="flex items-center gap-2 bg-primary text-center w-full md:w-auto  p-2 font-semibold text-white px-10 py-2 rounded-xl shadow-lg">Edit</button>
                    </div>
                </div>
            </div>

            {/* Add Subscription Modal */}
            <Modal title="Add Subscription" open={showModal} onCancel={handleCancel} footer={null}>
                <AddSubscription />
            </Modal>
            {/* Edit Subscription Modal */}
            <Modal title="Edit Subscription" open={showEditModal} onCancel={handleCancelEdit} footer={null}>
                <EditSubscription />
            </Modal>
        </div>
    );
};

export default Rewards; 