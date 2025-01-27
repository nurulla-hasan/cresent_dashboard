/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Input, Pagination, Space, Table } from "antd";
import { useState } from "react";

import { Button, Modal } from "antd";
import { FaEye } from "react-icons/fa";
import { AllImages } from "../../../assets/image/AllImages";
import { FiUserCheck } from "react-icons/fi";
import { LiaUserSlashSolid } from "react-icons/lia";
import { SearchOutlined } from "@ant-design/icons";
import { LuRefreshCcw } from "react-icons/lu";
const AllOrganization = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalPage = 100;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    const userData = [
        {
            id: "#1239",
            name: "Mr. Mahmud",
            email: "mr101@mail.ru",
            organization_name: "Organization 1",
            donation_amount: 20,
            contact: "(+33) 7 00 55 59 27",
            location: "Corona, Michigan",
            address: "76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris",
            dob: "17 Dec, 2024",
            gender: "Male",
            action: "↗",
            is_active: "true",
            subscription: "Premium",
            tfn_abn: "123456789",
            category: "Charity",
        },
        {
            id: "#1238",
            name: "Lily",
            email: "xterris@gmail.com",
            organization_name: "Organization 2",
            donation_amount: 20,
            contact: "(+33) 7 00 55 59 27",
            location: "Great Falls, Maryland",
            address: "123 Rue des Lilas, Paris, 75008",
            dob: "15 Jan, 2022",
            gender: "Female",
            action: "↗",
            is_active: "true",
            subscription: "Premium",
            tfn_abn: "123456789",
            category: "non-profit",

        },
        {
            id: "#1237",
            name: "Kathry",
            email: "irnabela@gmail.com",
            organization_name: "Organization 3",
            donation_amount: 20,
            contact: "(+33) 7 00 55 59 27",
            location: "Syracuse, Connecticut",
            address: "45 Avenue des Champs, Paris, 75001",
            dob: "11 Jul, 2021",
            gender: "Female",
            action: "↗",
            is_active: "true",
            subscription: "Premium",
            tfn_abn: "123456789",
            category: "Mosque"
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [email, setEmail] = useState("");


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

    const handleSession = (record) => {
        console.log(record);


    }

    const columns = [
        {
            title: 'Sl No',
            dataIndex: 'slno',
            key: 'slno',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Organization Name',
            key: 'organization_name',
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <Avatar size={40} className="shadow-md" src={record?.profileImage || AllImages.user} />
                    <span>{record.organization_name}</span>
                </div>
            ),
        },
        {
            title: 'Account Holder Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Contact No',
            key: 'contact',
            render: (_, record) => {
                const contact = record.contact || 'N/A';
                return (
                    <p>{contact}</p>
                )
            }
        },
        {
            title: 'Location',
            key: 'address',
            render: (_, record) => {
                const address = record?.address || 'N/A';
                return (
                    <p>{address}</p>
                )
            }
        },
        {
            title: 'TFN/ABN',
            key: 'tfn_abn',
            render: (_, record) => {
                const tfn_abnNo = record?.tfn_abn || 'N/A';
                return (
                    <p>{tfn_abnNo}</p>
                )
            }
        },
        {
            title: 'Donation Amount',
            key: 'donation_amount',
            render: (_, record) => {
                const totalBooking = record?.donation_amount || 'N/A';
                return (
                    <p>{totalBooking}</p>
                )
            }

        },
        {
            title: "Subscription",
            key: "subscription",
            render: (_, record) => {
                const totalBooking = record?.subscription || 'N/A';
                return (
                    <p>{totalBooking}</p>
                )
            }
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
                        <Button onClick={() => showModal(record)} icon={<FaEye className="text-primary" />} />

                        <Button
                            onClick={() => handleSession(record)}
                            icon={
                                record?.is_active === true ? (
                                    <FiUserCheck className="h-5 w-5 text-green-500" />

                                ) : (
                                    <LiaUserSlashSolid className="h-5 w-5 text-red-500" />
                                )
                            }
                        />
                    </Space>
                </ConfigProvider>
            ),
        }
    ];


    return (
        <div className="">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
                    All Organization
                </h3>
                <div className="mt-4 md:mt-0 flex justify-between items-center gap-2">
                    <div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        borderRadius: 0,
                                        hoverBorderColor: "none",
                                        activeBorderColor: "none",
                                    },
                                },
                            }}
                        >
                            <div className="flex gap-2 items-center relative">

                                <Input
                                    placeholder="Search by email"
                                    allowClear
                                    size="large"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onPressEnter={handleSearch}
                                    prefix={
                                        <SearchOutlined
                                            style={{ cursor: "pointer" }}
                                            onClick={handleSearch}
                                        />
                                    }
                                />


                                <button
                                    onClick={handleSearch}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primaryColor text-white p-2 rounded-r-lg"
                                >
                                    search
                                </button>
                            </div>
                        </ConfigProvider>
                    </div>

                </div>
            </div>
            <div className="bg-white overflow-x-auto ">
                <Table columns={columns} dataSource={userData || []} pagination={false} rowKey="id" />
            </div>
            <div className="flex justify-end items-end mt-5">
                <Pagination totalPage={totalPage} currentPage={currentPage} handlePageChange={handlePageChange}></Pagination>
            </div>

            <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                {selectedUser && (
                    <div className="p-2">
                        <div className="bg-secondary py-5 text-center">
                            <Avatar size={200} src={selectedUser?.profileImage || AllImages.user} />
                            <h2 className="text-2xl font-bold mt-4 text-textColor">Organization: {selectedUser.organization_name}</h2>
                        </div>
                        <div className="my-6">
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Account holder Name:</p>
                                <p>{selectedUser.name}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Email :</p>
                                <p>{selectedUser.email}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Contact No :</p>
                                <p>{selectedUser?.contact || 'N/A'}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Donation Amount:</p>
                                <p>{selectedUser?.donation_amount || 'N/A'}</p>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Address :</p>
                                <p>{selectedUser.address || 'N/A'}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Subscription:</p>
                                <p>{selectedUser?.subscription || 'N/A'}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Status:</p>
                                <p>{selectedUser?.is_active === true ? 'Active' : 'Inactive'}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">TFN/ABN:</p>
                                <p>{selectedUser?.tfn_abn || 'N/A'}</p>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <p className="text-gray-600 font-semibold">Category:</p>
                                <p>{selectedUser?.category || 'N/A'}</p>
                            </div>


                        </div>
                    </div>
                )}
            </Modal>
        </div >
    );
};

export default AllOrganization;
