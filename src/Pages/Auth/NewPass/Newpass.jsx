import { ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/image/reset.png";
import logo from "../../../assets/image/Logo.png";
import { MdLockOutline } from "react-icons/md";
import { useResetPasswordMutation } from "../../../redux/feature/auth/authApi";
import { useNavigate } from "react-router-dom";

const Newpass = () => {
  const [form] = Form.useForm();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate()

  const onFinish = async (values) => {
    const resetPasswordToken = localStorage.getItem("resetPasswordToken");

    if (!resetPasswordToken) {
      console.error("No reset password token found");
      return;
    }

    try {
      await resetPassword({
        resetPasswordToken: resetPasswordToken,
        newPassword: values["new-password"]
      }).unwrap();
      navigate("/sign-in")
    } catch (error) {
      console.error("Password reset failed:", error);
    }
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
              form={form}
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
                  className={`w-full py-4 font-bold rounded-md text-xl ${isLoading
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-primary'
                    }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
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
