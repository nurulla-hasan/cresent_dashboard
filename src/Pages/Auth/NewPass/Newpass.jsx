import { ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/image/reset.png"; // Path to the image
import logo from "../../../assets/image/logo.png"; // Path to the logo
import { useNavigate } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";

const Newpass = () => {
  const neviaget = useNavigate();
  const onFinish = () => {};
  const handleResetPassword = () => {
    neviaget("/");
  };
  return (
    <div className="">
      <div className="relative grid grid-cols-1 md:grid-cols-2 justify-center items-center p-4">
        <div className="bg-white p-10">
          <img src={logo} alt="Logo" className="absolute top-5" />
          <div className="w-full max-w-sm mx-auto mt-20">
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    borderRadius: 0,
                  },
                  Input: {
                    borderRadius: 5,
                  },
                },
              }}
            >
              <Form
                name="login"
                initialValues={{ remember: false }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                layout="vertical"
              >
                <div className="mb-4 text-center">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                    Reset Your Password
                  </h2>
                  <p className="text-neutral-600 lg:text-lg pt-3 pb-6">
                    The password must be different than previous password.
                  </p>
                </div>

                {/* Email input field */}
                {/* <Form.Item
                  name="email"
                  label={<p className="text-md">Email</p>}
                >
                  <Input
                    required
                    className="text-md"
                    placeholder="Enter Email Address"
                  />
                </Form.Item> */}

                {/* Password input field */}
                <Form.Item
                  name="new-password"
                  label={
                    <p className="text-lg text-neutral-500">New Password</p>
                  }
                >
                  <Input.Password
                    required
                    className="text-neutral-500"
                    prefix={<MdLockOutline className="mr-2 h-5 w-5" />}
                    placeholder="********"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      height: "52px",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="confirm-password"
                  label={
                    <p className="text-lg text-neutral-500">Confirm Password</p>
                  }
                >
                  <Input.Password
                    required
                    className="text-neutral-500"
                    prefix={<MdLockOutline className="mr-2 h-5 w-5" />}
                    placeholder="********"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      height: "52px",
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <button
                    onClick={handleResetPassword}
                    className=" w-full py-4 font-bold bg-primary rounded-md text-xl"
                    type="submit"
                  >
                    Update Password
                  </button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>

        {/* Right section - Image */}
        <div className="flex justify-end items-end">
          <img src={img} alt="sign-up" className="w-full h-screen" />
        </div>
      </div>
    </div>
  );
};

export default Newpass;
