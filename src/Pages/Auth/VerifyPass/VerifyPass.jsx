import img from "../../../assets/image/otp.png";
import logo from "../../../assets/image/Logo.png";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOTPForResetPasswordMutation, useResendResetOTPMutation } from "../../../redux/feature/auth/authApi";

const VerifyPass = () => {
  const [otp, setOtp] = useState("");
  const nevigate = useNavigate();
  const [verifyOTP, { isLoading }] = useVerifyOTPForResetPasswordMutation();
  const [resendOTP, { isLoading: isResending }] = useResendResetOTPMutation();

  const handleVerifyOtp = async () => {
    const resetToken = localStorage.getItem("resetToken");
    
    if (!resetToken) {
      console.error("No reset token found");
      return;
    }

    try {
      await verifyOTP({
        token: resetToken,
        otp: otp
      }).unwrap();
      nevigate("/new-password");
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  const handleResendOtp = async () => {
    const resetToken = localStorage.getItem("resetToken");
    
    if (!resetToken) {
      console.error("No reset token found");
      return;
    }

    try {
      await resendOTP(resetToken).unwrap();
    } catch (error) {
      console.error("Resend OTP failed:", error);
    }
  };

  return (
    <div className="h-screen flex p-2">
      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 right-5 left-10" />

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
              renderSeparator={<span className="lg:w-4"> </span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="border-2 border-gray-300 text-black text-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mx-1 rounded-lg transition-all duration-200 hover:border-gray-400"
                  style={{
                    width: '40px',
                    height: '40px',
                    textAlign: 'center'
                  }}
                />
              )}
            />
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={otp.length !== 6 || isLoading}
            className={`text-center w-full p-3 font-bold text-xl rounded-md ${
              otp.length !== 6 || isLoading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary text-black'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>

          <p className="text-center pt-5">
            Didn't receive the code?
            <span
              onClick={handleResendOtp}
              className={`pl-2 underline cursor-pointer ${
                isResending ? 'text-gray-400 cursor-not-allowed' : ''
              }`}
            >
              {isResending ? 'Sending...' : 'Resend'}
            </span>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <img src={img} alt="sign-up" className="w-full h-full" />
      </div>
    </div>
  );
};

export default VerifyPass;
