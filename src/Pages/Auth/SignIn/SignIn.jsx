import { Checkbox, ConfigProvider, Form, Input } from "antd";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";

import img from "../../../assets/image/login.png";
import { useLoginMutation } from "../../../redux/feature/auth/authApi";
import logo from "../../../assets/image/Logo.png";

const SignIn = () => {
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      await login({
        email: values["email-address"],
        password: values.password
      }).unwrap();
      // On success, the authApi will handle token storage and redirection
    } catch  {
      // Error is already handled by authApi's onQueryStarted
    }
  };

  return (
    <div className="h-screen flex p-2">
      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 right-5 left-10" />
        <div className="w-[400px]">
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Form: { borderRadius: 0 },
                  Input: { borderRadius: 5 },
                },
              }}
            >
              <Form
                name="login"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                layout="vertical"
              >
                <div className="mb-4 text-center">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                    Welcome Back!
                  </h2>
                  <p className="text-neutral-400 lg:text-lg">
                    Sign in to access the Super Admin Dashboard.
                  </p>
                </div>

                <Form.Item
                  name="email-address"
                  label={<p className="text-lg">Email Address</p>}
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input
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
                  label={<p className="text-lg">Password</p>}
                  rules={[
                    { required: true, message: 'Please input your password!' }
                  ]}
                >
                  <Input.Password
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
                    <Checkbox>Remember Password</Checkbox>
                  </ConfigProvider>
                  <Link to="/forgot-password" className="text-md underline hover:text-black">
                    Forgot Password?
                  </Link>
                </div>

                <Form.Item>
                  <button
                    className="text-center text-lg p-2 font-bold bg-primary w-full py-4 rounded-md hover:text-black"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
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