import { Image } from "antd";
import { useState } from "react";

import { Button, Modal } from "antd";
import { FaUserCheck, FaUserAltSlash } from "react-icons/fa";
import { AllImages } from "../../../assets/image/AllImages";

const Patient = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [block, setBlock] = useState(false);

  const userData = [
    {
      id: "#1239",
      name: "Mr. Mahmud",
      email: "mr101@mail.ru",
      contact: "(+33) 7 00 55 59 27",
      location: "Corona, Michigan",
      address: "76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris",
      dob: "17 Dec, 2024",
      gender: "Male",
      action: "↗",
    },
    {
      id: "#1238",
      name: "Lily",
      email: "xterris@gmail.com",
      contact: "(+33) 7 00 55 59 27",
      location: "Great Falls, Maryland",
      address: "123 Rue des Lilas, Paris, 75008",
      dob: "15 Jan, 2022",
      gender: "Female",
      action: "↗",
    },
    {
      id: "#1237",
      name: "Kathry",
      email: "irnabela@gmail.com",
      contact: "(+33) 7 00 55 59 27",
      location: "Syracuse, Connecticut",
      address: "45 Avenue des Champs, Paris, 75001",
      dob: "11 Jul, 2021",
      gender: "Female",
      action: "↗",
    },
  ];

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 mt-4">
      <h1 className="text-lg md:text-xl font-medium mb-4">All User Details</h1>
      <div className="overflow-x-scroll">
        <table className="min-w-full border-collapse border border-gray-200 ">
          <thead className="bg-orange-100">
            <tr>
              <th className="text-left p-3 border border-gray-200">SL.no</th>
              <th className="text-left p-3 border border-gray-200">User</th>
              <th className="text-left p-3 border border-gray-200">Email</th>
              <th className="text-left p-3 border border-gray-200">Contact</th>
              <th className="text-left p-3 border border-gray-200">Location</th>
              <th className="text-left p-3 border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 border border-gray-200">{user.id}</td>
                <td className="p-3 border border-gray-200 flex items-center gap-2">
                  <Image
                    src={AllImages.user}
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <span>{user.name}</span>
                </td>
                <td className="p-3 border border-gray-200">{user.email}</td>
                <td className="p-3 border border-gray-200">{user.contact}</td>
                <td className="p-3 border border-gray-200">{user.location}</td>
                <td className="p-3 border border-gray-200 text-blue-500 font-bold cursor-pointer">
                  <div className="flex items-center ">
                    <Button
                      type="link"
                      className="text-blue-500 font-extrabold text-xl border-none"
                      onClick={() => openModal(user)}
                    >
                      {user.action}
                    </Button>
                    <Button
                      type="link"
                      className="font-extrabold text-xl"
                      onClick={() => setBlock(!block)}
                    >
                      {block ? (
                        <FaUserCheck className="h-7 text-green-500" />
                      ) : (
                        <FaUserAltSlash className="h-7 text-red-500" />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Section */}

        <Modal
          title={"User Details"}
          centered
          open={modalOpen}
          onOk={closeModal}
          onCancel={closeModal}
          footer={null}
        >
          {selectedUser && (
            <div className="flex flex-col items-center">
              <Image
                src={AllImages.user}
                height={96}
                alt={selectedUser.name}
                className="h-36 w-36 rounded-full mb-4 "
              />
              <h2 className=" font-semibold text-2xl mt-16">{selectedUser.name}</h2>
              <div className="mt-4 text-left w-full">
                <p className="font-semibold">Email: {selectedUser.email}</p>
                <p className="font-semibold">Address: {selectedUser.address}</p>
                <p className="font-semibold">Contact: {selectedUser.contact}</p>
                <p className="font-semibold">Location: {selectedUser.location}</p>
                <p className="font-semibold">Date Of Birth: {selectedUser.dob}</p>
                <p className="font-semibold">Gender: {selectedUser.gender}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>

      {/* Pagination Section */}

      {/* <div className="flex justify-between items-center mt-4 text-sm">
        <p>
          Showing <span className="font-bold">1-6</span> out of{" "}
          <span className="font-bold">1239</span>
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Previous
          </button>
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 bg-primary text-white rounded-full">
              1
            </button>
            <button className="w-6 h-6 text-gray-500 rounded">2</button>
            <button className="w-6 h-6 text-gray-500 rounded">3</button>
            <span>...</span>
            <button className="w-6 h-6 text-gray-500 rounded">100</button>
          </div>
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Next
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Patient;
