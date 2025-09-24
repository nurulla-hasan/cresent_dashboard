import img from "../../../assets/image/otp.png";
import logo from "../../../assets/image/logo.png";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyPass = () => {
  const [otp, setOtp] = useState(""); // initialize as empty string
  const nevigate = useNavigate();
  const handleVerifyOtp = () => {
    console.log("Verifying OTP:", otp);
    nevigate("/auth/confirm-password");
  };

  const handleResendOtp = () => {
    console.log("Resend OTP clicked");
    // Add your resend logic here
  };

  return (
    <div className="">
      <div className="relative grid grid-cols-1 md:grid-cols-2 justify-center items-center p-4">
        {/* Left section - Login Form */}
        <div className="bg-white p-10">
          <img src={logo} alt="Logo" className="absolute top-5" />

          <div className="flex justify-center items-center">
            <div className="">
              <h1 className="text-3xl text-center font-bold py-5">
                Enter Verification Code
              </h1>
              <p className="text-center text-gray-500">
                We’ve sent a verification code to{" "}
                <span className="text-black">userofficialemail@gmail.com</span>
              </p>
              <p className="py-3 font-medium">Enter your verification code</p>
              <div className="pb-7 pt-2 flex justify-center items-center">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="lg:w-10"> </span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="md:w-8 h-12 border border-gray-300 text-black text-xl focus:outline-none focus:border-blue-400 mx-1 rounded-md"
                    />
                  )}
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                className="text-center w-full p-3 font-bold text-xl bg-primary text-black rounded-md "
              >
                Verify
              </button>

              <p className="text-center pt-5">
                Didn’t receive the code?
                <span
                  onClick={handleResendOtp}
                  className="pl-2 underline cursor-pointer"
                >
                  Resend
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-end">
          <img
            src={img}
            alt="sign-up"
            className="w-full h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyPass;
