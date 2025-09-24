import { Checkbox, ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/image/login.png"; // Adjust path as necessary
import { Link } from "react-router-dom";
import logo from "../../../assets/image/logo.png"; // Adjust path as necessary
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";

const SignIn = () => {
  const onFinish = () => {};

  return (
    <div className="h-screen flex p-2">
      <div className="bg-white p-10 flex flex-col justify-center items-center w-full md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 left-10" />
        <div className="w-full max-w-sm mt-20">
          <div>
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
                name="contact"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                layout="vertical"
                className="mt-20"
              >
                <div className="mb-4 text-center">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                    Welcome Back!
                  </h2>
                  <p className="text-neutral-600 lg:text-lg font-semibold">
                    Sign in to access the Super Admin Dashboard.
                  </p>
                </div>
                <Form.Item
                  name="email-address"
                  label={
                    <p className="text-lg text-neutral-500">Email Address</p>
                  }
                >
                  <Input
                    required
                    className="text-neutral-500"
                    prefix={<AiOutlineMail className="mr-2 h-5 w-5" />}
                    placeholder="mailto:admin@crescentchange.org"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      height: "52px",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={<p className="text-lg text-neutral-500">Password</p>}
                >
                  <Input.Password
                    required
                    className="text-neutral-500"
                    prefix={<MdLockOutline className="mr-2 h-5 w-5" />}
                    placeholder="Enter Your Password"
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "100%",
                      height: "52px",
                    }}
                  />
                </Form.Item>
                {/* Forgot password and signup link */}
                <div className="flex justify-between items-center font-semibold gap-2 text-md my-6">
                  <ConfigProvider
                    theme={{
                      components: {
                        Checkbox: {
                          colorPrimary: "rgb(209,255,67)",
                          colorPrimaryBorder: "rgb(209,255,67)",
                          colorPrimaryHover: "rgb(209,255,67)",
                        },
                      },
                    }}
                  >
                    {" "}
                    <Checkbox>Remember Password</Checkbox>{" "}
                  </ConfigProvider>
                  <Link
                    to="/forgate-password"
                    className="text-md underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Form.Item>
                  <Link to="/">
                    <button
                      className="text-center p-2 font-bold bg-primary  w-full py-4 rounded-md "
                      type="submit"
                    >
                      Sign In
                    </button>
                  </Link>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <img src={img} alt="sign-up" className="w-full h-full" />
      </div>
    </div>
  );
};

export default SignIn;
