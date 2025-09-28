/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";

import { SlOrganization } from "react-icons/sl";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { IoHeartCircleOutline } from "react-icons/io5";
const Sidebar = ({ closeDrawer }) => {
  const [active, setActive] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState("");

  const handleActiveRoute = (item) => {
    setActive(item);
    setOpenDropdown("");
  };

  const handleSubItemClick = (subItem) => {
    setActive(subItem);
    closeDrawer();
  };
  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? "" : label);
  };

  const menuItems = [
    {
      icon: <MdDashboard className="h-5 w-5" />,
      label: "dashboard",
      Link: "/",
    },
    {
      icon: <FiUser className="h-5 w-5" />,
      label: "User Management",
      Link: "/user-management/all-users",
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Subdcription & Payment ",
      Link: "/subdcription-management",
    },
    {
      icon: <TbDeviceDesktopAnalytics className="h-5 w-5" />,
      label: "Analytics ",
      Link: "/analytics",
    },
    {
      icon: <SlOrganization className="h-5 w-5" />,
      label: "Organizations ",
      Link: "/organization-management/all-organizations",
      //
    },

    {
      icon: <IoHeartCircleOutline className="h-5 w-5" />,
      label: "Donor App",
      Link: "/donor-app",
    },
    // {
    //   icon: <FaGift className="h-5 w-5" />,
    //   label: "Rewards",
    //   Link: "/add-reward",
    // },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Business Admin ",
      Link: "/business-admin",
    },

    {
      icon: <AiOutlineSetting className="h-5 w-5" />,
      label: "Settings",
      Link: "/settings/contact-us",
    },
  ];

  return (
    <div className="bg-[#f9f7f9] h-full border-r ">
      <div className="flex flex-col md:h-full ">
        <div className="flex flex-col gap-2 md:my-5 mb-10 px-4 py-8">
          {menuItems.map((item) => (
            <div key={item.label}>
              <div
                className={` flex justify-between items-center p-4 cursor-pointer rounded-2xl  ${
                  active === item.label
                    ? "bg-primary  font-semibold"
                    : "bg-white text-black font-semibold"
                }`}
                onClick={() =>
                  item.isDropdown
                    ? toggleDropdown(item.label)
                    : handleActiveRoute(item.label)
                }
              >
                <Link to={item.Link}>
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <p>{item.label}</p>
                    {item.isDropdown && (
                      <BiChevronDown
                        className={`transform transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </Link>
              </div>
              {/* Dropdown for sub-items */}
              {item.isDropdown && openDropdown === item.label && (
                <div className="flex flex-col">
                  {item.subItems.map((subItem) => (
                    <Link to={subItem.Link} key={subItem.label}>
                      <div
                        className={`py-2 px-5 cursor-pointer  ${
                          active === subItem.label
                            ? " bg-primary font-bold"
                            : "text-black"
                        }`}
                        onClick={() => handleSubItemClick(subItem.label)}
                      >
                        <p className="flex items-center gap-2 ml-10">
                          {subItem.icon}
                          {subItem.label}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Logout */}
          <Link className="text-black hover:text-black" to="/sign-in">
            <div
              className="bg-primary w-72 md:mt-20 py-3 flex justify-center items-center cursor-pointer hover:bg-primary "
              onClick={() => console.log("Logged out")}
            >
              <FiLogOut className="text-xl" />
              <p className="ml-2">Log out</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
