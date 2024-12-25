import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { FaRegEyeSlash, } from "react-icons/fa";

import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
const Newpass = () => {
    const [showpassword, setShowpassword] = useState("false");
    const [showConfirmpassword, setShowConfirmPassword] = useState("false");
    const togglePasswordVisibility = () => {
        setShowpassword(!showpassword);
    };
    const toggoleConfirmPasswordVisible = () => {
        setShowConfirmPassword(!showConfirmpassword);
    };



    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };
    return (
        <div className="bg-white">
            <div className="container mx-auto">
                <div className="w-full md:max-w-screen-md mx-auto flex flex-col md:flex-row justify-between items-center gap-20  ">
                    <div className="w-full md:w-[50%] order-2  md:order-1 ">
                        <div className="md:h-[100vh] w-full flex items-center justify-center ">
                            <Form
                                name="login"
                                initialValues={{ remember: true }}
                                style={{ maxWidth: 550 }}
                                onFinish={onFinish}
                                layout="vertical"
                                className=" bg-white py-14 md:py-28 mx-4 md:mx-0 px-6 md:px-10 rounded-2xl w-[450px] border-2 shadow-xl"
                            >
                                <div className="mb-4 text-center">
                                    <h2
                                        className=" text-center text-2xl md:text-3xl font-bold mb-6"
                                    >
                                        Set a new password
                                    </h2>

                                </div>


                                <Form.Item name="new-password" label={<p className=" text-md">New Password</p>}>

                                    <div className="flex justify-between items-center relative">
                                        <Input
                                            required
                                            style={{ padding: "6px" }}
                                            className=" text-md"
                                            type={showpassword ? "password" : "text"}
                                            placeholder="kkk!@#1578525"
                                        />
                                        <div className="flex items-center absolute right-0 px-2">
                                            <button onClick={togglePasswordVisibility} type="button">
                                                {showpassword ? (
                                                    <FaRegEye className="" />
                                                ) : (
                                                    <FaRegEyeSlash className="" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </Form.Item>
                                <Form.Item name="confirm-password" label={<p className=" text-md">Confirm Password</p>}>

                                    <div className="flex justify-between items-center relative">
                                        <Input
                                            required
                                            style={{ padding: "6px" }}
                                            className=" text-md"
                                            type={showConfirmpassword ? "password" : "text"}
                                            placeholder="kkk!@#1578525"
                                        />
                                        <div className="flex items-center absolute right-0 px-2">
                                            <button onClick={toggoleConfirmPasswordVisible} type="button">
                                                {showConfirmpassword ? (
                                                    <FaRegEye className="" />
                                                ) : (
                                                    <FaRegEyeSlash className="" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                </Form.Item>

                                <Form.Item className="text-center">
                                    <Link to="/continue-page">
                                        <button
                                            className="bg-primary text-center w-full  p-2 font-semibold  text-white   px-10 py-2 rounded-2xl shadow-lg"
                                            type="submit"
                                        >
                                            Confirm
                                        </button>
                                    </Link>
                                </Form.Item>
                            </Form>
                        </div>

                    </div>
                    <div className="w-full md:w-[50%] px-3 text-center  mt-20  md:mt-0">
                        <p className="text-neutral-500 flex justify-center items-center ">Create a new password.
                            insure it differs from previous one.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newpass;