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

    const [showSettings, setShowSettings] = useState(false);

    const handleActiveRoute = (item) => {
        setActive(item);
        setShowSettings(false);
    };

    const handleSubItemClick = (subItem) => {
        setActive(subItem);
        closeDrawer();
    };

    const toggleDropdown = (item) => {
        setShowSettings(item === "Settings");
    };

    const menuItems = [
        { icon: <MdDashboard className="h-5 w-5" />, label: "dashboard", Link: "/" },
        { icon: <FiUser className="h-5 w-5" />, label: "User Management", Link: "/user-management" },
        { icon: <BsGraphUp className="h-5 w-5" />, label: "Appoinment Management", Link: "/appoinment-management" },
        { icon: <LuCircleDollarSign className="h-5 w-5" />, label: "Payment Management", Link: "/payment-management" },
        { icon: <FaMoneyCheckAlt className="h-5 w-5" />, label: "notification Management", Link: "/notification-management" },
        { icon: <FaMoneyCheckAlt className="h-5 w-5" />, label: "Project", Link: "/project" },
        { icon: <FaMoneyCheckAlt className="h-5 w-5" />, label: "Make Admin", Link: "/make-admin" },

        {
            icon: <AiOutlineSetting className="h-5 w-5" />,
            label: "Settings",
            isDropdown: true,
            subItems: [
                { icon: <FaEdit className="h-5 w-5" />, label: "Edit Profile", Link: "/edit-profile" },
                { icon: <MdPolicy className="h-5 w-5" />, label: "Policies", Link: "/policies" },

                { icon: <MdMenuBook className="h-5 w-5" />, label: "Blogs", Link: "/blogs" },
                { icon: <FaQuestionCircle className="h-5 w-5" />, label: "FAQ", Link: "/faq" },
                { icon: <MdPrivacyTip className="h-5 w-5" />, label: "Privacy Policy", Link: "/privacy-policy" },
                { icon: <RiTerminalWindowLine className="h-5 w-5" />, label: "Terms & Condition", Link: "/terms-condition" },
            ],
        },

    ];

    return (
        <div className="bg-white h-full">
            <div className=" flex flex-col md:h-full">
                <div className="flex flex-col justify-end items-end gap-2 md:my-5 mb-10">
                    {menuItems.map((item) => (
                        <div key={item.label}>
                            <Link to={item.Link} onClick={!item.isDropdown ? closeDrawer : undefined}>
                                <div
                                    className={`w-72 flex justify-between items-center px-5 py-2 cursor-pointer ${active === item.label ? " bg-black text-primary  hover:text-primary " : "bg-white text-black hover:text-black"}`}
                                    onClick={() => (item.isDropdown ? toggleDropdown(item.label) : handleActiveRoute(item.label))}
                                >

                                    <div className={`${active === item.label ? "text-primary hover:text-primary " : "bg-white text-black hover:text-black"}`} >

                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            {!item.isDropdown ? (
                                                <p>{item.label}</p>
                                            ) : (
                                                <div className="flex items-center justify-between w-full">
                                                    <p>{item.label}</p>
                                                    <BiChevronDown />

                                                </div>
                                            )}
                                        </div>

                                    </div>

                                </div>
                            </Link>



                            {/* Dropdown for Settings */}
                            {item.label === "Settings" && showSettings && (
                                <div className="flex flex-col">
                                    {item.subItems.map((subItem) => (
                                        <Link to={subItem.Link} key={subItem.label}>
                                            <div

                                                className={`py-2 px-5 cursor-pointer ${active === subItem.label ? "text-primary bg-red-300 font-bold" : "text-black bg-white"}`}
                                                onClick={() => handleSubItemClick(subItem.label)}
                                            >
                                                <p className="flex items-center gap-2 ml-10">
                                                    {subItem.icon}
                                                    {subItem.label}</p>

                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Dropdown for Content */}
                            {item.label === "Content" && (
                                <div className="flex flex-col">
                                    {item.subItems.map((subItem) => (
                                        <Link to={subItem.Link} key={subItem.label}>
                                            <div

                                                className={`py-2 px-5 cursor-pointer ${active === subItem.label ? "text-primary bg-primary font-bold" : "text-black bg-white"}`}
                                                onClick={() => handleSubItemClick(subItem.label)}
                                            >
                                                {subItem.label}

                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Logout */}
                    <Link className="text-black hover:text-black" to="/auth/login">
                        <div
                            className="bg-primary w-52 md:mt-20 py-3 flex justify-center items-center cursor-pointer hover:bg-primary text-white"
                            onClick={() => console.log("Logged out")}
                        >
                            <FiLogOut className="text-xl" />

                            <p className="ml-2">Log out</p>

                        </div>
                    </Link>
                </div>
            </div>


        </div >
    );
};

export default Sidebar;
