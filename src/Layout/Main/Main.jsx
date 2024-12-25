/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { ConfigProvider, Drawer } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import brandlogo from "../../assets/image/logo.png";
import user from "../../assets/image/user.png";
const MainLayout = () => {
    const [drawer, setDrawer] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const toggleDrawer = () => setDrawer(!drawer);
    const closeDrawer = () => setDrawer(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) closeDrawer();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            {/* haeder */}
            <div className="h-20 bg-white flex justify-between  items-center px-2 md:px-20 gap-2">
                {isMobile && (
                    <GiHamburgerMenu onClick={toggleDrawer} className="h-8 w-8 cursor-pointer " />
                )}
                {/* logo section */}
                <div>
                    <Link to="/">
                        <div className="">
                            <img src={brandlogo} alt="brandlogo" className="md:h-full md:w-full object-cover" />
                        </div>
                    </Link>
                </div>
                {/* others section */}
                <div>
                    <div className="flex justify-between items-center gap-2 text-white mx-10">
                        <div className="relative">
                            <div className=" flex justify-between items-center gap-5 py-5">
                                <Link to="/notification">
                                    <div className="relative ">
                                        <IoIosNotificationsOutline className="h-10 w-10 bg-white  text-black p-1 border rounded-full border-primary " />
                                        <span className="bg-primary h-5 w-5 rounded-full flex justify-center items-center absolute top-0 right-0 text-white text-xs">
                                            1
                                        </span>
                                    </div>
                                </Link>
                                <Link to="/userProfile">
                                    <div className="flex justify-center items-center gap-2">
                                        <img src={user} alt="" className="w-10 h-10 rounded-full border border-primary" />
                                        <p className="md:text-xl font-semibold text-primary">Mr Rita</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfigProvider
                theme={{
                    components: {
                        Drawer: {
                            footerPaddingInline: 0,
                            footerPaddingBlock: 0,
                            padding: 0,
                            paddingLG: 0,
                            paddingXS: 30,
                        }
                    }
                }}
            >
                <div className="w-full flex ">
                    {isMobile ? (
                        <Drawer
                            title="Menu"
                            placement="left"
                            closable={true}
                            onClose={closeDrawer}
                            open={drawer}
                            width="80%"
                            closeIcon={<FaX className="text-black" />}
                        >
                            <Sidebar onClose={closeDrawer} />
                        </Drawer>
                    ) : (
                        <div className="w-[30%] lg:w-[18%] ">
                            <Sidebar />
                        </div>
                    )}
                    <div className={`flex-1 bg-[#eeeeee] md:h-[100vh] ${isMobile ? "p-4" : "p-10"}`}>
                        <Outlet />
                    </div>
                </div>
            </ConfigProvider>
        </div>
    );
};

export default MainLayout;
