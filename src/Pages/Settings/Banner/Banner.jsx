import { ConfigProvider, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import banner from "../../../assets/image/banner.png"
const Banner = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // form Modal
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 my-6">
                <p className="text-textColor md:text-xl font-bold">Banner</p>

                <button onClick={showModal} className="flex justify-center items-center gap-2 bg-primary px-4 py-2 rounded-md text-white ">
                    <FaPlus className="text-white" />
                    Add Banner
                </button>

            </div>
            <div className="my-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-1 bg-white rounded-md border border-primary">
                        <div className="relative">
                            <img src={banner} alt="" className="h-40 w-full " />
                            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-md font-bold">Meet Dr. Jane Doe – 10+ years of experience in Dermatology”.</p>
                        </div>
                        <div className="flex justify-between items-center my-2">
                            <button className=" text-center w-full md:w-auto  p-2 font-semibold text-red-500 px-10 py-2 rounded-xl shadow-lg border border-red-500">Delete</button>
                            <button className="bg-primary text-center w-full md:w-auto  p-2 font-semibold text-white px-10 py-2 rounded-xl shadow-lg">Edit</button>
                        </div>
                    </div>
                </div>
            </div>


            <ConfigProvider
                theme={{
                    components: {
                        "Button": {
                            "defaultHoverBorderColor": "rgb(47,84,235)",
                            "defaultHoverColor": "rgb(47,84,235)",
                            "defaultBorderColor": "rgb(47,84,235)"
                        }
                    }
                }}
            >
                <Modal title="Make Admin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} >
                    <Form
                        name="contact"
                        initialValues={{ remember: false }}
                        onFinish={onFinish}
                        layout="vertical"

                    >
                        <div className="">
                            <Form.Item
                                name="name"
                                label={<p className=" text-md">Full Name</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="John Doe"
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label={<p className=" text-md">E-mail</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="abcd@gmail.com"
                                />
                            </Form.Item>

                        </div>
                        <div className="">
                            <Form.Item
                                name="user_type"
                                label={<p className=" text-md">User Type</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="Admin"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label={<p className=" text-md">Password</p>}

                            >
                                <Input.Password
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="******"
                                />
                            </Form.Item>
                        </div>
                        <Form.Item >
                            <button

                                onClick={handleOk}
                                className=" w-full py-2 bg-primary text-white font-semiboldbold rounded-lg text-xl  shadow-lg"
                                type="submit"
                            >
                                Confirm
                            </button>
                        </Form.Item>
                    </Form>

                </Modal>
            </ConfigProvider>
        </div>
    );
};

export default Banner;