import { ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/image/forgate.png";
import { Link } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import { AiOutlineMail } from "react-icons/ai";

const ForgatePassword = () => {
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
                    Reset your password
                  </h2>
                  <p className="text-neutral-600 lg:text-lg font-semibold">
                    We’ll send you a code on your registered email.
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

                <Form.Item>
                  <Link to="/varification">
                    <button
                      className="text-center p-2 font-bold bg-primary  w-full py-4 rounded-md "
                      type="submit"
                    >
                      Send Code
                    </button>
                  </Link>
                </Form.Item>
                <p className="text-xl font-medium text-center">
                  Back to{" "}
                  <Link to="/sign-in" className="font-bold underline">
                    {" "}
                    Sign In
                  </Link>
                </p>
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

export default ForgatePassword;
