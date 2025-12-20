import { Avatar, Upload, ConfigProvider, Input, Form, message } from "antd";
import { useState } from "react";
import { FaCamera, FaLockOpen } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import user from "../../assets/image/user.png";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

import {
    useChangePasswordMutation,
    useUpdateAuthDataMutation,
    useUpdateProfilePhotoMutation,
} from "../../redux/feature/profile/profileApis";

const AdminProfile = () => {
    const [profilePic, setProfilePic] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("Edit Profile");
    const [form] = Form.useForm();

    const [updateAuthData, { isLoading: isUpdateAuthLoading }] = useUpdateAuthDataMutation();
    const [changePassword, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation();
    const [updateProfilePhoto, { isLoading: isUpdatePhotoLoading }] = useUpdateProfilePhotoMutation();

    const [userData, setUserData] = useState({
        name: "John Doe",
        contact: "123-456-7890",
        address: "79/A Joker Vila, Gotham City",
    });

    const [currentPassword, setCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = (type) => {
        if (type === "current") setCurrentPassword(!currentPassword);
        else if (type === "new") setShowNewPassword(!showNewPassword);
        else setShowConfirmPassword(!showConfirmPassword);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const onFinish = async (values) => {
        try {
            await updateAuthData({
                name: values?.name,
                contact: values?.contact,
                address: values?.address,
            }).unwrap();

            setUserData({
                name: values.name,
                contact: values.contact,
                address: values.address,
            });

            setIsEditing(false);
            message.success("Profile updated successfully!");
        } catch (e) {
            const msg = e?.data?.message || "Failed to update profile";
            message.error(msg);
        }
    };

    const onChangePassword = async (values) => {
        if (!values?.currentPassword || !values?.newPassword) {
            message.error("Please provide current and new password");
            return;
        }

        try {
            await changePassword({
                oldPassword: values.currentPassword,
                newPassword: values.newPassword,
            }).unwrap();

            message.success("Password changed successfully!");
        } catch (e) {
            const msg = e?.data?.message || "Failed to change password";
            message.error(msg);
        }
    };

    const handleProfilePhotoChange = async (e) => {
        const file = e?.file?.originFileObj;
        if (!file) return;

        const isImage = file.type?.startsWith("image/");
        if (!isImage) {
            message.error("Please upload an image file");
            return;
        }

        const fd = new FormData();
        fd.append("profileImage", file);

        try {
            await updateProfilePhoto(fd).unwrap();
            setProfilePic(URL.createObjectURL(file));
            message.success("Profile photo updated successfully!");
        } catch (err) {
            const msg = err?.data?.message || "Failed to update profile photo";
            message.error(msg);
        }
    };

    return (
        <div className="mx-2">
            {/* Profile Header */}
            <div className="flex flex-col items-center justify-center py-5">
                <div className="flex flex-col items-center w-full py-6 mb-10 text-center bg-gray-200">
                    <div className="relative">
                        <Avatar
                            size={140}
                            src={profilePic}
                            className="border-4 shadow-xl border-neutral-600"
                        />
                        {isEditing && (
                            <Upload
                                showUploadList={false}
                                onChange={handleProfilePhotoChange}
                                className="absolute px-2 py-1 bg-white rounded-full cursor-pointer bottom-2 right-2"
                            >
                                <FaCamera className="w-5 h-5 text-secondary" />
                            </Upload>
                        )}
                    </div>
                    <h1 className="my-6 text-4xl font-bold">{userData.name}</h1>
                </div>
            </div>

            {/* Tabs for Edit Profile and Change Password */}
            <div className="flex items-center justify-center gap-5 my-6 text-xl font-semibold">
                <p
                    onClick={() => setActiveTab("Edit Profile")}
                    className={`cursor-pointer ${activeTab === "Edit Profile"
                        ? " border-b-2 border-gray-200 pb-1"
                        : ""
                        }`}
                >
                    Edit Profile
                </p>
                <p
                    onClick={() => setActiveTab("Change Password")}
                    className={`cursor-pointer ${activeTab === "Change Password"
                        ? " border-b-2 border-neutral-200 pb-1"
                        : ""
                        }`}
                >
                    Change Password
                </p>
            </div>
 
            {/* Content based on active tab */}
            {activeTab === "Edit Profile" && (
                <div className="p-5 bg-white rounded-md shadow-md">
                    <div className="flex items-center justify-center">
                        <p className="my-6 text-xl font-bold text-center text-gray-700">
                            Edit your Profile
                        </p>
                        <button
                            onClick={toggleEditMode}
                            className="px-4 py-2 ml-3 text-white bg-gray-400 rounded-md shadow-md hover:bg-primary-dark"
                        >
                            {isEditing ? (
                                <MdOutlineCancel className="h-6" />
                            ) : (
                                <FaUserEdit className="h-6" />
                            )}
                        </button>
                    </div>
                    {!isEditing ? (
                        <div className="w-[40%] mx-auto">
                            <p className="mb-2 text-md">
                                <strong>Name:</strong> {userData.name}
                            </p>
                            <p className="mb-2 text-md">
                                <strong>Contact:</strong> {userData.contact}
                            </p>
                            <p className="mb-2 text-md">
                                <strong>Address:</strong> {userData.address}
                            </p>
                        </div>
                    ) : (
                        <ConfigProvider>
                            <Form
                                form={form}
                                initialValues={userData}
                                onFinish={onFinish}
                                layout="vertical"
                                style={{ maxWidth: 800 }}
                                className="mx-auto"
                            >
                                <Form.Item name="name" label={<p className="text-md">Name</p>}>
                                    <Input required placeholder="Your Name" />
                                </Form.Item>
                                <Form.Item
                                    name="contact"
                                    label={<p className="text-md">Contact Number</p>}
                                >
                                    <Input required placeholder="Contact Number" />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label={<p className="text-md">Address</p>}
                                >
                                    <Input required placeholder="Address" />
                                </Form.Item>
                                <Form.Item className="text-center">
                                    <button
                                        type="submit"
                                        disabled={isUpdateAuthLoading || isUpdatePhotoLoading}
                                        className="w-full px-10 py-2 text-white bg-black rounded-md shadow-lg"
                                    >
                                        {isUpdateAuthLoading ? "Saving..." : "Save Changes"}
                                    </button>
                                </Form.Item>
                            </Form>
                        </ConfigProvider>
                    )}
                </div>
            )}

            {activeTab === "Change Password" && (
                <div className="p-5 bg-white rounded-md shadow-md">
                    <p className="my-6 text-xl font-bold text-center text-gray-700">
                        Change your Password
                    </p>
                    <ConfigProvider>
                        <Form
                            onFinish={onChangePassword}
                            layout="vertical"
                            style={{ maxWidth: 800 }}
                            className="mx-auto"
                        >
                            <Form.Item
                                name="currentPassword"
                                label={<p className="text-md">Current Password</p>}
                                rules={[{ required: true, message: "Current password is required" }]}
                            >
                                <div className="relative">
                                    <Input
                                        type={currentPassword ? "text" : "password"}
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("current")}
                                        className="absolute right-2 top-2"
                                    >
                                        {currentPassword ? <FaLockOpen /> : <IoIosLock />}
                                    </button>
                                </div>
                            </Form.Item>

                            <Form.Item
                                name="newPassword"
                                label={<p className="text-md">New Password</p>}
                                rules={[{ required: true, message: "New password is required" }]}
                            >
                                <div className="relative">
                                    <Input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("new")}
                                        className="absolute right-2 top-2"
                                    >
                                        {showNewPassword ? <FaLockOpen /> : <IoIosLock />}
                                    </button>
                                </div>
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                label={<p className="text-md">Confirm Password</p>}
                                dependencies={["newPassword"]}
                                rules={[
                                    { required: true, message: "Please confirm your new password" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("newPassword") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Passwords do not match"));
                                        },
                                    }),
                                ]}
                            >
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("confirm")}
                                        className="absolute right-2 top-2"
                                    >
                                        {showConfirmPassword ? <FaLockOpen /> : <IoIosLock />}
                                    </button>
                                </div>
                            </Form.Item>

                            <Form.Item className="text-center">
                                <button
                                    type="submit"
                                    disabled={isChangePasswordLoading}
                                    className="w-full px-10 py-2 text-white bg-black rounded-md shadow-lg hover:bg-primary-dark"
                                >
                                    {isChangePasswordLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
            )}
        </div>
    );
};

export default AdminProfile;
