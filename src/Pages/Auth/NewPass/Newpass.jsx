import { ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/image/reset.png"; // Path to the image
import logo from "../../../assets/image/Logo.png"; // Path to the logo
import { useNavigate } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";

const Newpass = () => {
  const neviaget = useNavigate();
  const onFinish = () => {};
  const handleResetPassword = () => {
    neviaget("/");
  };
  return (
    <div className="h-screen flex p-2">
      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 right-5 left-10" />
        <div className=" w-[400px] ">
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
              onFinish={onFinish}
              layout="vertical"
            >
              <div className="mb-4 text-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  Reset Your Password
                </h2>
                <p className="text-neutral-400  pt-3 pb-6">
                  The password must be different than previous password.
                </p>
              </div>

              <Form.Item
                name="new-password"
                label={<p className="text-lg ">New Password</p>}
              >
                <Input.Password
                  required
                  className=""
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
                  <p className="text-lg ">Confirm Password</p>
                }
              >
                <Input.Password
                  required
                  className=""
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

      <div className="w-full md:w-1/2 ">
        <img src={img} alt="sign-up" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Newpass;
