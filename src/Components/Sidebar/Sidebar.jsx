/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { FaQuestionCircle, } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdDashboard, MdMenuBook, MdPolicy, MdPrivacyTip } from "react-icons/md";
import { LuCircleDollarSign } from "react-icons/lu";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiTerminalWindowLine } from "react-icons/ri";
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

    // const toggleDropdown = (item) => {
    //     setActive(item);
    //     setOpenDropdown(openDropdown === item ? "" : item);
    // };
    const toggleDropdown = (label) => {
        // setActive(label);
        setOpenDropdown(openDropdown === label ? "" : label);
    };

    const menuItems = [
        { icon: <MdDashboard className="h-5 w-5" />, label: "dashboard", Link: "/" },
        {
            icon: <FiUser className="h-5 w-5" />,
            label: "User Management",
            isDropdown: true,
            subItems: [
                { icon: <FaQuestionCircle className="h-5 w-5" />, label: "Patients", Link: "/user-management/patient" },
                { icon: <FaQuestionCircle className="h-5 w-5" />, label: "Doctor", Link: "/user-management/doctor" },
                { icon: <FaQuestionCircle className="h-5 w-5" />, label: "Sign-up Request", Link: "/user-management/sign-up-request" },
            ],
        },
        { icon: <BsGraphUp className="h-5 w-5" />, label: "Appoinment Management", Link: "/appoinment-management" },
        { icon: <LuCircleDollarSign className="h-5 w-5" />, label: "Payment Management", Link: "/payment-management" },
        { icon: <FaMoneyCheckAlt className="h-5 w-5" />, label: "Add Category", Link: "/add-category" },
        { icon: <FaMoneyCheckAlt className="h-5 w-5" />, label: "Subdcription Management", Link: "/subdcription-management" },
        { icon: <FaMoneyCheckAlt className="h-5 w-5" />, label: "Make Admin", Link: "/make-admin" },

        {
            icon: <AiOutlineSetting className="h-5 w-5" />,
            label: "Settings",
            isDropdown: true,
            subItems: [
                { icon: <FaEdit className="h-5 w-5" />, label: "Edit Profile", Link: "/settings/edit-profile" },
                { icon: <MdPolicy className="h-5 w-5" />, label: "Policies", Link: "/settings/policies" },

                { icon: <MdMenuBook className="h-5 w-5" />, label: "Blogs", Link: "/settings/blogs" },
                { icon: <FaQuestionCircle className="h-5 w-5" />, label: "FAQ", Link: "/settings/faq" },
                { icon: <MdPrivacyTip className="h-5 w-5" />, label: "Privacy Policy", Link: "/settings/privacy-policy" },
                { icon: <RiTerminalWindowLine className="h-5 w-5" />, label: "Terms & Condition", Link: "/settings/terms-condition" },
            ],
        },

    ];

    return (
        <div className="bg-white h-full md:ml-16">
            <div className="flex flex-col md:h-full">
                <div className="flex flex-col gap-2 md:my-5 mb-10">
                    {menuItems.map((item) => (
                        <div key={item.label}>
                            <div
                                className={`w-72 flex justify-between items-center px-5 py-2 cursor-pointer  ${active === item.label ? "bg-black text-primary font-semibold" : "bg-white text-black font-semibold"
                                    }`}
                                onClick={() => (item.isDropdown ? toggleDropdown(item.label) : handleActiveRoute(item.label))}
                            >
                                <Link to={item.Link}>
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <p>{item.label}</p>
                                        {item.isDropdown && (
                                            <BiChevronDown
                                                className={`transform transition-transform ${openDropdown === item.label ? "rotate-180" : ""
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
                                                className={`py-2 px-5 cursor-pointer  ${active === subItem.label ? "text-white bg-primary font-bold" : "text-black bg-[#efe5c4]"
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
                            className="bg-primary w-72 md:mt-20 py-3 flex justify-center items-center cursor-pointer hover:bg-primary text-white"
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
