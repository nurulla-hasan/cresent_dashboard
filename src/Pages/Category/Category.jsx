/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, message, Space, Table } from "antd";
import { useState } from "react";

import { Button, Modal } from "antd";
import { FaCalendar, FaPlus, FaStopwatch, FaTrash } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { LiaUserSlashSolid } from "react-icons/lia";

import { FaRegPenToSquare } from "react-icons/fa6";
import { AllImages } from "../../assets/image/AllImages";
import AddCategory from "../../Components/Category/AddCategory/AddCategory";
const Category = () => {
    const userData = [
        {
            id: "#1239",
            name: "Mr. Mahmud",
            email: "mr101@mail.ru",
            category_name: "Cardiologist",
            date: '05/10/2025'
        },
        {
            id: "#1238",
            name: "Lily",
            email: "xterris@gmail.com",
            total_appointment: 20,
            category_name: "Cardiologist",
            date: '05/10/2025'
        },
        {
            id: "#1237",
            name: "Kathry",
            email: "irnabela@gmail.com",
            total_appointment: 20,
            category_name: "Cardiologist",
            date: '05/10/2025'
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [status, setStatus] = useState({});


    const showModal = (record) => {
        setSelectedUser(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSearch = () => {
        // refetc();
    };





    const columns = [
        {
            title: 'Sl No',
            dataIndex: 'slno',
            key: 'slno',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Category Name',
            dataIndex: 'category_name',
            key: 'category_name',

        },
        {
            title: 'Category Image',
            key: 'category_image',
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <Avatar size={40} className="shadow-md" src={record?.category_image || AllImages.icon1} />
                </div>
            ),

        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <ConfigProvider theme={{
                    components: {
                        "Button": {
                            "defaultHoverBorderColor": "rgb(47,84,235)",
                            "defaultHoverColor": "rgb(47,84,235)",
                            "defaultBorderColor": "rgb(47,84,235)"
                        }
                    }
                }}>
                    <Space size="middle">
                        <button onClick={() => showModal(record)} >
                            <FaRegPenToSquare className="text-primary " /></button>
                        <button onClick={() => showModal(record)} >
                            <FaTrash className="text-red-500 " /></button>
                    </Space>
                </ConfigProvider>
            ),
        }
    ];


    return (
        <div className="">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
                    Category
                </h3>
                <button onClick={showModal} className="flex items-center gap-2 bg-primary text-center w-full md:w-auto  p-2 font-semibold text-white px-10 py-2 rounded-xl shadow-lg"><FaPlus></FaPlus> Add Category</button>

            </div>
            <div className="bg-white overflow-x-auto">
                <Table columns={columns} dataSource={userData || []} pagination={false} rowKey="id" />
            </div>
            {/* Add Category */}



            <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                {selectedUser && (
                    <AddCategory selectedUser={selectedUser} handleCancel={handleCancel} />
                )}
            </Modal>
            {/* <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                {selectedUser && (
                    <div className="p-2">
                        <div className="bg-[#e9d69a] py-5 text-center">
                            <Avatar size={200} src={selectedUser?.profileImage || AllImages.user} />
                            <h2 className="text-2xl font-bold mt-4 text-textColor">Doctor: {selectedUser.name}</h2>
                            <h2 className="text-xl mt-4 text-textColor">{selectedUser.specialization}</h2>
                        </div>
                        <div className="my-6">

                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Email :</p>
                                <p>{selectedUser.email}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Contact No :</p>
                                <p>{selectedUser?.contact || 'N/A'}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Address :</p>
                                <p>{selectedUser?.address || 'N/A'}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Date of birth :</p>
                                <p>{selectedUser?.dob || 'N/A'}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Experience :</p>
                                <p>{selectedUser?.experience || 'N/A'}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Subscription :</p>
                                <p className="text-primary">{selectedUser?.subscription || 'N/A'}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">CV & Certification:</p>
                                <p className="text-primary cursor-pointer">View</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Availablity:</p>
                                <p className="flex gap-2 justify-start items-center"><FaCalendar className="text-primary" /> Mon-Fri </p>
                                <p className="flex gap-2 justify-start items-center" ><FaStopwatch className="text-primary" /> 10:00 AM - 6:00 PM</p>
                            </div>



                        </div>
                    </div>
                )}
            </Modal> */}
        </div>
    );
};

export default Category;
