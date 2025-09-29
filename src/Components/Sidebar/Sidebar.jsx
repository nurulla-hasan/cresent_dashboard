/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import dashboard from "../../assets/image/dashboard.png";
import users from "../../assets/image/users.png";
import subscription from "../../assets/image/subscription.png";
import analytics from "../../assets/image/analytics.png";
import organization from "../../assets/image/organization.png";
import donor from "../../assets/image/donor.png";
import business from "../../assets/image/business.png";
import setting from "../../assets/image/settings.png";
import logout from "../../assets/image/logout.png";

const Sidebar = ({ closeDrawer }) => {
  const [active, setActive] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState("");
  const navigate = useNavigate();

  const handleActiveRoute = (item) => {
    setActive(item);
    setOpenDropdown("");
    if (closeDrawer) closeDrawer();
  };

  const handleSubItemClick = (subItem) => {
    setActive(subItem);
    if (closeDrawer) closeDrawer();
  };

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? "" : label);
  };

  const handleLogout = () => {
    // clear user session/token
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // redirect to login page
    navigate("/sign-in");
  };

  const menuItems = [
    { icon: dashboard, label: "Dashboard", Link: "/" },
    { icon: users, label: "User Management", Link: "/user-management/all-users" },
    { icon: subscription, label: "Subscription & Payment", Link: "/subscription-management" },
    { icon: analytics, label: "Analytics", Link: "/analytics" },
    {
      icon: organization,
      label: "Organizations",
      Link: "/organization-management/all-organizations",
    },
    { icon: donor, label: "Donor App", Link: "/donor-app" },
    { icon: business, label: "Business Admin", Link: "/business-admin" },
    // Settings section with mt-20
    {
      icon: setting,
      label: "Settings",
      Link: "/settings/contact-us",
      className: "mt-32",
    },
  ];

  return (
    <div className="bg-[#f9f7f9] h-full border-r">
      <div className="flex flex-col md:h-full">
        <div className="flex flex-col gap-2 md:my-5 mb-10 px-4 py-8">
          {menuItems.map((item) => (
            <div key={item.label} className={item.className || ""}>
              <div
                className={`text-lg flex justify-between items-center p-4 cursor-pointer rounded-2xl ${
                  active === item.label ? "bg-primary" : "text-black"
                }`}
                onClick={() =>
                  item.isDropdown
                    ? toggleDropdown(item.label)
                    : handleActiveRoute(item.label)
                }
              >
                <Link to={item.Link}>
                  <div className="flex items-center gap-3">
                    <img src={item.icon} alt={item.label} />
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
              {item.isDropdown && openDropdown === item.label && (
                <div className="flex flex-col">
                  {item.subItems.map((subItem) => (
                    <Link to={subItem.Link} key={subItem.label}>
                      <div
                        className={`py-2 px-5 cursor-pointer ${
                          active === subItem.label
                            ? "bg-primary font-bold"
                            : "text-black hover:bg-primary"
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

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2  rounded-2xl text-black hover:bg-primary py-4 px-5 cursor-pointer"
          >
            <img src={logout} alt="Logout" />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
