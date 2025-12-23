import { useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Modal, Input, Button, message } from "antd";
import { Link } from "react-router-dom";

import {
  useTwoFaDisableMutation,
  useTwoFaEnableMutation,
  useTwoFaSetupMutation,
} from "../../../redux/feature/auth/authApi";

import {
  useChangePasswordMutation,
  useGetAuthProfileQuery,
} from "../../../redux/feature/profile/profileApis";

export default function ContactUs() {
  const [twoFA, setTwoFA] = useState(false);

  const { data: profileData, isFetching: isProfileFetching, refetch: refetchProfile } = useGetAuthProfileQuery();

  const [twoFaSetup, { isLoading: isTwoFaSetupLoading }] = useTwoFaSetupMutation();
  const [twoFaEnable, { isLoading: isTwoFaEnableLoading }] = useTwoFaEnableMutation();
  const [twoFaDisable, { isLoading: isTwoFaDisableLoading }] = useTwoFaDisableMutation();

  const [changePassword, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation();

  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [showTwoFaModal, setShowTwoFaModal] = useState(false);
  const [twoFaMode, setTwoFaMode] = useState("enable");
  const [twoFaToken, setTwoFaToken] = useState("");
  const [twoFaSetupData, setTwoFaSetupData] = useState(null);

  useEffect(() => {
    const nextTwoFa = !!profileData?.data?.auth?.isTwoFactorEnabled;
    setTwoFA(nextTwoFa);
  }, [profileData?.data?.auth?.isTwoFactorEnabled]);

  // Password state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const resetPasswordState = () => {
    setPasswords({
      current: "",
      new: "",
      confirm: "",
    });
    setShowPw({
      current: false,
      new: false,
      confirm: false,
    });
  };

  const resetTwoFaModalState = () => {
    setTwoFaToken("");
    setTwoFaSetupData(null);
  };

  const handleToggleTwoFa = async (next) => {
    if (isProfileFetching) return;

    // Safety: if UI is out of sync, base action on backend flag
    const currentEnabled = !!profileData?.data?.auth?.isTwoFactorEnabled;
    const desiredEnabled = typeof next === "boolean" ? next : !currentEnabled;

    if (desiredEnabled === currentEnabled) return;

    if (desiredEnabled) {
      setTwoFaMode("enable");
      resetTwoFaModalState();
      try {
        const res = await twoFaSetup().unwrap();
        setTwoFaSetupData(res?.data || null);
        setShowTwoFaModal(true);
      } catch (err) {
        const msg = err?.data?.message || "Failed to setup 2FA";
        message.error(msg);
      }
      return;
    }

    // disable
    setTwoFaMode("disable");
    resetTwoFaModalState();
    setShowTwoFaModal(true);
  };

  const handleSubmitTwoFa = async () => {
    if (!twoFaToken) {
      message.error("Please enter the token");
      return;
    }

    try {
      if (twoFaMode === "enable") {
        const res = await twoFaEnable({ token: twoFaToken }).unwrap();
        setTwoFA(true);
        setShowTwoFaModal(false);
        resetTwoFaModalState();
        refetchProfile();
        message.success(res?.message || "2FA enabled successfully");
        return;
      }

      const res = await twoFaDisable({ token: twoFaToken }).unwrap();
      setTwoFA(false);
      setShowTwoFaModal(false);
      resetTwoFaModalState();
      refetchProfile();
      message.success(res?.message || "2FA disabled successfully");
    } catch (err) {
      const msg = err?.data?.message || "Failed to submit 2FA token";
      message.error(msg);
    }
  };

  const closeTwoFaModal = () => {
    setShowTwoFaModal(false);
    resetTwoFaModalState();
  };

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      message.error("Please fill all password fields");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      message.error("New password and confirm password do not match");
      return;
    }

    try {
      const res = await changePassword({
        oldPassword: passwords.current,
        newPassword: passwords.new,
      }).unwrap();
      message.success(res?.message || "Password changed successfully");
      setShowPasswordModal(false);
      resetPasswordState();
    } catch (err) {
      const msg = err?.data?.message || "Failed to change password";
      message.error(msg);
    }
  };


  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold md:text-3xl">Settings</h1>
      <p className="mb-8 text-gray-500">
        Manage team access and keep your organisation account secure.
      </p>

      {/* Update Password */}
      <div className="flex items-center justify-between p-4 mb-6 bg-white shadow rounded-xl">
        <div>
          <h3 className="font-medium">Update your password</h3>
          <p className="text-sm text-gray-500">
            Change or update your password. Forgot your password?{" "}
            <Link to="/forgot-password" className="text-blue-600 underline">
              Click here
            </Link>{" "}
            to reset it.
          </p>
        </div>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="text-xl cursor-pointer"
        >
          ↗
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="flex items-center justify-between p-4 bg-white shadow rounded-xl">
        <div>
          <h3 className="font-medium">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-500">
            Two-Factor Authentication is {twoFA ? "on" : "off"}.{" "}
            {twoFA
              ? "Your account is more secure."
              : "Turn it on for stronger security."}
          </p>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={twoFA}
            onChange={(e) => handleToggleTwoFa(e.target.checked)}
            className="sr-only peer"
            disabled={isProfileFetching || isTwoFaSetupLoading || isTwoFaEnableLoading || isTwoFaDisableLoading}
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
        </label>
      </div>

      <Modal
        title={twoFaMode === "enable" ? "Enable Two-Factor Authentication" : "Disable Two-Factor Authentication"}
        open={showTwoFaModal}
        onCancel={closeTwoFaModal}
        footer={null}
      >
        {twoFaMode === "enable" ? (
          <div className="space-y-4">
            <div className="p-3 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-700">
                Scan this QR code with your authenticator app, then enter the 6-digit token.
              </p>
            </div>

            {twoFaSetupData?.qrCodeUrl ? (
              <div className="flex items-center justify-center p-3 border rounded-lg">
                <img
                  src={twoFaSetupData.qrCodeUrl}
                  alt="2FA QR"
                  className="max-w-[220px] w-full"
                />
              </div>
            ) : null}

            {twoFaSetupData?.secret ? (
              <div className="p-3 border rounded-lg">
                <p className="mb-1 text-xs text-gray-500">Secret</p>
                <p className="font-mono text-sm break-all">
                  {twoFaSetupData.secret}
                </p>
              </div>
            ) : null}

            <div>
              <label className="block mb-1 text-sm">Token</label>
              <Input
                value={twoFaToken}
                onChange={(e) => setTwoFaToken(e.target.value)}
                placeholder="Enter token (e.g. 123456)"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={closeTwoFaModal}
                disabled={isTwoFaSetupLoading || isTwoFaEnableLoading}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={handleSubmitTwoFa}
                loading={isTwoFaSetupLoading || isTwoFaEnableLoading}
              >
                Enable
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-700">
                Enter your authenticator token to disable 2FA.
              </p>
            </div>

            <div>
              <label className="block mb-1 text-sm">Token</label>
              <Input
                value={twoFaToken}
                onChange={(e) => setTwoFaToken(e.target.value)}
                placeholder="Enter token (e.g. 123456)"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button onClick={closeTwoFaModal}>Cancel</Button>
              <Button
                type="primary"
                danger
                onClick={handleSubmitTwoFa}
                loading={isTwoFaDisableLoading}
              >
                Disable
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Update your Password"
        open={showPasswordModal}
        onCancel={() => {
          setShowPasswordModal(false);
          resetPasswordState();
        }}
        footer={null}
      >
        {["current", "new", "confirm"].map((field) => (
          <div className="relative mb-4" key={field}>
            <label className="block mb-1 text-sm">
              {field === "current"
                ? "Enter Current Password"
                : field === "new"
                ? "Enter New Password"
                : "Confirm New Password"}
            </label>
            <Input
              type={showPw[field] ? "text" : "password"}
              value={passwords[field]}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, [field]: e.target.value }))
              }
              suffix={
                showPw[field] ? (
                  <AiOutlineEyeInvisible
                    className="cursor-pointer"
                    onClick={() =>
                      setShowPw((p) => ({ ...p, [field]: !p[field] }))
                    }
                  />
                ) : (
                  <AiOutlineEye
                    className="cursor-pointer"
                    onClick={() =>
                      setShowPw((p) => ({ ...p, [field]: !p[field] }))
                    }
                  />
                )
              }
            />
          </div>
        ))}
        <p className="mb-4 text-xs text-gray-500">
          Your Password must contain at least 8 characters, 1 uppercase letter,
          1 number, and 1 special character.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              setShowPasswordModal(false);
              resetPasswordState();
            }}
            disabled={isChangePasswordLoading}
          >
            Discard Changes
          </Button>
          <Button type="primary" onClick={handlePasswordChange} loading={isChangePasswordLoading}>
            Save Changes
          </Button>
        </div>
      </Modal>
    </div>
  );
}
