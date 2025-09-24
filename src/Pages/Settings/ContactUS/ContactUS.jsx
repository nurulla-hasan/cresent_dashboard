/* eslint-disable no-unused-vars */
import { useState } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { Modal, Input, Select, Button } from "antd";
import Swal from "sweetalert2";

const teamMembers = [
  {
    name: "John Bills",
    email: "billsjohn09@gmail.com",
    status: "Active",
    role: "Admin",
  },
  {
    name: "Billy Clark",
    email: "clark999@gmail.com",
    status: "Pending",
    role: "Editor",
  },
  {
    name: "Anna K.",
    email: "annakazama54@gmail.com",
    status: "Active",
    role: "Manager",
  },
];

export default function ContactUs() {
  const [members, setMembers] = useState(teamMembers);
  const [twoFA, setTwoFA] = useState(false);

  // Dropdown open state
  const [openMenu, setOpenMenu] = useState(null);

  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  // Invite state
  const [invite, setInvite] = useState({ email: "", role: "Manager" });

  // Edit state
  const [editingMember, setEditingMember] = useState(null);

  const handleRemove = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This member will be removed from the team.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setMembers((prev) => prev.filter((m) => m.email !== email));
        Swal.fire("Removed!", "The member has been removed.", "success");
      }
    });
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Submit new password:", passwords);
    setShowPasswordModal(false);
  };

  const handleInvite = () => {
    console.log("Invite sent:", invite);
    setShowInviteModal(false);
  };

  const handleEditSave = () => {
    setMembers((prev) =>
      prev.map((m) => (m.email === editingMember.email ? editingMember : m))
    );
    setShowEditModal(false);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">
        Manage team access and keep your organisation account secure.
      </p>

      {/* Team Access */}
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-3">Team Access</h2>
          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-white px-3 py-1 rounded-3xl border"
          >
            Invite a new member
          </button>
        </div>
        <p className="text-gray-500 mb-5">
          Manage your team and assign roles to manage your organization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {members.map((member) => (
            <div
              key={member.email}
              className="bg-white p-6 rounded-3xl border relative"
            >
              <div className="flex justify-between items-center gap-2 border-b pb-6">
                <div>
                  <p className="font-semibold text-lg mb-2">{member.name}</p>
                  <p className="text-gray-500 text-sm">{member.email}</p>
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === member.email ? null : member.email)
                    }
                  >
                    <CgMoreVertical className="cursor-pointer text-gray-500" />
                  </button>

                  {openMenu === member.email && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                      <button
                        onClick={() => {
                          setEditingMember({ ...member });
                          setShowEditModal(true);
                          setOpenMenu(null);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        <FaEdit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => {
                          handleRemove(member.email);
                          setOpenMenu(null);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                      >
                        <FaTrash size={14} /> Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center gap-3 mt-3">
                <p>Status: </p>
                <p
                  className={`${
                    member.status === "Active"
                      ? "text-green-600"
                      : "text-yellow-600"
                  } font-medium`}
                >
                  {member.status}
                </p>
              </div>
              <div className="flex justify-between items-center gap-3 mt-3">
                <p>Role: </p>
                <p className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Member"
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
      >
        {editingMember && (
          <>
            <div className="mb-4">
              <label className="block text-sm mb-1">Name</label>
              <Input
                value={editingMember.name}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, name: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <Input value={editingMember.email} disabled />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Role</label>
              <Select
                value={editingMember.role}
                onChange={(val) =>
                  setEditingMember({ ...editingMember, role: val })
                }
                className="w-full"
              >
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Editor">Editor</Select.Option>
                <Select.Option value="Manager">Manager</Select.Option>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">Status</label>
              <Select
                value={editingMember.status}
                onChange={(val) =>
                  setEditingMember({ ...editingMember, status: val })
                }
                className="w-full"
              >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Pending">Pending</Select.Option>
              </Select>
            </div>

            <div className="flex justify-end gap-3">
              <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
              <Button type="primary" onClick={handleEditSave}>
                Save Changes
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* Update Password */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex justify-between items-center">
        <div>
          <h3 className="font-medium">Update your password</h3>
          <p className="text-sm text-gray-500">
            Change or update your password. Forgot your password?{" "}
            <a href="#" className="text-blue-600 underline">
              Click here
            </a>{" "}
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
      <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
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
            onChange={() => setTwoFA(!twoFA)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
        </label>
      </div>

      <Modal
        title="Update your Password"
        open={showPasswordModal}
        onCancel={() => setShowPasswordModal(false)}
        footer={null}
      >
        {["current", "new", "confirm"].map((field) => (
          <div className="mb-4 relative" key={field}>
            <label className="block text-sm mb-1">
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
        <p className="text-xs text-gray-500 mb-4">
          Your Password must contain at least 8 characters, 1 uppercase letter,
          1 number, and 1 special character.
        </p>
        <div className="flex justify-end gap-3">
          <Button onClick={() => setShowPasswordModal(false)}>
            Discard Changes
          </Button>
          <Button type="primary" onClick={handlePasswordChange}>
            Save Changes
          </Button>
        </div>
      </Modal>

      {/* Invite Modal */}
      <Modal
        title="Invite Your Team Member"
        open={showInviteModal}
        onCancel={() => setShowInviteModal(false)}
        footer={null}
      >
        <div className="mb-4 relative">
          <label className="block text-sm mb-1">Email</label>
          <Input
            type="email"
            value={invite.email}
            onChange={(e) =>
              setInvite((i) => ({ ...i, email: e.target.value }))
            }
            prefix={<AiOutlineMail />}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1">Role</label>
          <Select
            value={invite.role}
            onChange={(value) => setInvite((i) => ({ ...i, role: value }))}
            className="w-full"
          >
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Editor">Editor</Select.Option>
            <Select.Option value="Manager">Manager</Select.Option>
          </Select>
        </div>
        <div className="flex justify-end gap-3">
          <Button onClick={() => setShowInviteModal(false)}>Cancel</Button>
          <Button type="primary" onClick={handleInvite}>
            Invite
          </Button>
        </div>
      </Modal>
    </div>
  );
}
