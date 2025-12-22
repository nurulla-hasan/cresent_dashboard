import { Avatar, Button, Card, ConfigProvider, Form, Input, Tabs, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { FaCamera, FaLockOpen } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import user from "../../assets/image/user.png";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

import {
    useChangePasswordMutation,
    useGetAuthProfileQuery,
    useUpdateSuperAdminMeMutation,
} from "../../redux/feature/profile/profileApis";

const AdminProfile = () => {
    const [profilePic, setProfilePic] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("edit");
    const [form] = Form.useForm();

    const [updateSuperAdminMe, { isLoading: isUpdateMeLoading }] = useUpdateSuperAdminMeMutation();
    const [changePassword, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation();

    const { data: profileRes, isLoading: isProfileLoading } = useGetAuthProfileQuery();

    const [userData, setUserData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
    });

    const authProfile = profileRes?.data;

    useEffect(() => {
        if (!authProfile) return;

        setUserData((prev) => ({
            ...prev,
            name: authProfile?.name || prev.name || "",
            address: authProfile?.address || prev.address || "",
            city: authProfile?.city || prev.city || "",
            state: authProfile?.state || prev.state || "",
            country: authProfile?.country || prev.country || "",
        }));

        if (authProfile?.profileImage) {
            setProfilePic(authProfile.profileImage);
        }

        if (isEditing) {
            form.setFieldsValue({
                name: authProfile?.name || "",
                address: authProfile?.address || "",
                city: authProfile?.city || "",
                state: authProfile?.state || "",
                country: authProfile?.country || "",
            });
        }
    }, [authProfile, form, isEditing]);

    const [currentPassword, setCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = (type) => {
        if (type === "current") setCurrentPassword(!currentPassword);
        else if (type === "new") setShowNewPassword(!showNewPassword);
        else setShowConfirmPassword(!showConfirmPassword);
    };

    const toggleEditMode = () => {
        const next = !isEditing;
        setIsEditing(next);
        if (next) {
            form.setFieldsValue(userData);
        }
    };

    const onFinish = async (values) => {
        try {
            const fd = new FormData();
            fd.append(
                "data",
                JSON.stringify({
                    name: values?.name,
                    address: values?.address,
                    city: values?.city,
                    state: values?.state,
                    country: values?.country,
                })
            );
            await updateSuperAdminMe(fd).unwrap();

            setUserData({
                name: values.name,
                address: values.address,
                city: values.city,
                state: values.state,
                country: values.country,
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
        fd.append("data", JSON.stringify({}));
        fd.append("adminImage", file);

        try {
            await updateSuperAdminMe(fd).unwrap();
            setProfilePic(URL.createObjectURL(file));
            message.success("Profile photo updated successfully!");
        } catch (err) {
            const msg = err?.data?.message || "Failed to update profile photo";
            message.error(msg);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="py-6">
                <Card className="border-0 shadow-sm" bodyStyle={{ padding: 0 }}>
                    <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
                        <div className="relative">
                            <Avatar size={120} src={profilePic} className="border-4 shadow-xl border-neutral-600" />
                            {isEditing ? (
                                <Upload
                                    showUploadList={false}
                                    onChange={handleProfilePhotoChange}
                                    className="absolute px-2 py-1 bg-white rounded-full cursor-pointer bottom-1 right-1"
                                >
                                    <FaCamera className="w-5 h-5 text-secondary" />
                                </Upload>
                            ) : null}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                {isProfileLoading ? "Loading..." : userData.name || authProfile?.auth?.email || "Admin"}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                                    {authProfile?.auth?.email || "-"}
                                </span>
                                <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                                    {authProfile?.auth?.role || "-"}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={toggleEditMode}
                                icon={isEditing ? <MdOutlineCancel /> : <FaUserEdit />}
                            >
                                {isEditing ? "Cancel" : "Edit"}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                    {
                        key: "edit",
                        label: "Edit Profile",
                        children: (
                            <Card className="border-0 shadow-sm" bodyStyle={{ padding: 20 }}>
                                {!isEditing ? (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div className="p-4 border rounded-lg bg-gray-50">
                                            <p className="text-xs text-gray-500">Name</p>
                                            <p className="text-sm font-semibold text-gray-900">{userData.name || "-"}</p>
                                        </div>
                                        <div className="p-4 border rounded-lg bg-gray-50">
                                            <p className="text-xs text-gray-500">City</p>
                                            <p className="text-sm font-semibold text-gray-900">{userData.city || "-"}</p>
                                        </div>
                                        <div className="p-4 border rounded-lg bg-gray-50">
                                            <p className="text-xs text-gray-500">Country</p>
                                            <p className="text-sm font-semibold text-gray-900">{userData.country || "-"}</p>
                                        </div>
                                        <div className="p-4 border rounded-lg bg-gray-50">
                                            <p className="text-xs text-gray-500">State</p>
                                            <p className="text-sm font-semibold text-gray-900">{userData.state || "-"}</p>
                                        </div>
                                        <div className="p-4 border rounded-lg bg-gray-50 sm:col-span-2">
                                            <p className="text-xs text-gray-500">Address</p>
                                            <p className="text-sm font-semibold text-gray-900">{userData.address || "-"}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <ConfigProvider>
                                        <Form
                                            form={form}
                                            initialValues={userData}
                                            onFinish={onFinish}
                                            layout="vertical"
                                            className="max-w-2xl mx-auto"
                                        >
                                            <Form.Item
                                                name="name"
                                                label={<p className="text-md">Name</p>}
                                                rules={[{ required: true, message: "Name is required" }]}
                                            >
                                                <Input placeholder="Your Name" />
                                            </Form.Item>
                                            <Form.Item
                                                name="country"
                                                label={<p className="text-md">Country</p>}
                                                rules={[{ required: true, message: "Country is required" }]}
                                            >
                                                <Input placeholder="Country" />
                                            </Form.Item>
                                            <Form.Item
                                                name="city"
                                                label={<p className="text-md">City</p>}
                                                rules={[{ required: true, message: "City is required" }]}
                                            >
                                                <Input placeholder="City" />
                                            </Form.Item>
                                            <Form.Item
                                                name="state"
                                                label={<p className="text-md">State</p>}
                                                rules={[{ required: true, message: "State is required" }]}
                                            >
                                                <Input placeholder="State" />
                                            </Form.Item>
                                            <Form.Item
                                                name="address"
                                                label={<p className="text-md">Address</p>}
                                                rules={[{ required: true, message: "Address is required" }]}
                                            >
                                                <Input placeholder="Address" />
                                            </Form.Item>

                                            <div className="flex justify-end gap-2">
                                                <Button onClick={toggleEditMode}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    loading={isUpdateMeLoading}
                                                    className="bg-black"
                                                >
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </Form>
                                    </ConfigProvider>
                                )}
                            </Card>
                        ),
                    },
                    {
                        key: "password",
                        label: "Change Password",
                        children: (
                            <Card className="border-0 shadow-sm" bodyStyle={{ padding: 20 }}>
                                <ConfigProvider>
                                    <Form
                                        onFinish={onChangePassword}
                                        layout="vertical"
                                        className="max-w-2xl mx-auto"
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

                                        <div className="flex justify-end">
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                loading={isChangePasswordLoading}
                                                className="bg-black"
                                            >
                                                Save Changes
                                            </Button>
                                        </div>
                                    </Form>
                                </ConfigProvider>
                            </Card>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default AdminProfile;
