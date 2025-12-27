import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { ConfigProvider, Drawer } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import brandlogo from "../../assets/image/Logo.png";
import user from "../../assets/image/p.png";
import { useGetUnseenNotificationCountQuery } from "../../redux/feature/notification/notificationApis";
// import Search from "antd/es/transfer/search";

const MainLayout = () => {
  const [drawer, setDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { data: unseenRes } = useGetUnseenNotificationCountQuery();
  const unseenCount = unseenRes?.data;

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

  // const onSearch = () => {
  //   console.log("Search input: ");
  // };

  return (
    <div className="flex flex-col min-h-screen">
      {/* header */}
      <div className="h-20 bg-[#f9f7f9] flex items-center gap-3 px-3 md:px-8 border-b">
        {isMobile && (
          <GiHamburgerMenu
            onClick={toggleDrawer}
            className="w-8 h-8 cursor-pointer"
          />
        )}

        {/* logo */}
        <div className="flex items-center shrink-0">
          <Link to="/">
            <img
              src={brandlogo}
              alt="brandlogo"
              className="object-contain h-10"
            />
          </Link>
        </div>

        {/* search */}
        <div className="flex-1" />

        {/* user + notifications */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/settings/contact-us"
            className="grid w-10 h-10 bg-white border rounded-full place-items-center"
            aria-label="Settings"
          >
            <FiSettings className="w-5 h-5" />
          </Link>

          <Link to="/notification">
            <div className="relative grid w-10 h-10 bg-white border rounded-full place-items-center">
              <IoIosNotificationsOutline className="w-6 h-6 text-black" />
              {typeof unseenCount === "number" && unseenCount > 0 ? (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                  {unseenCount}
                </span>
              ) : null}
            </div>
          </Link>

          <Link to="/admin-profile">
            <div className="flex items-center gap-2 px-2 py-1 bg-white border rounded-full">
              <img
                src={user}
                alt=""
                className="border rounded-full w-9 h-9 border-primary"
              />
              <p className="pr-2 text-sm font-semibold md:text-base">Super Admin</p>
            </div>
          </Link>
        </div>
      </div>

      {/* content area */}
      <ConfigProvider
        theme={{
          components: {
            Drawer: {
              footerPaddingInline: 0,
              footerPaddingBlock: 0,
              padding: 0,
              paddingLG: 0,
              paddingXS: 30,
            },
          },
        }}
      >
        <div className="flex flex-1 h-[calc(100vh-5rem)]">
          {/* sidebar */}
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
            <div className="w-[30%] lg:w-[18%] sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto bg-white border-r">
              <Sidebar />
            </div>
          )}

          {/* main outlet content */}
          <div
            className={`flex-1 bg-[#f9f7f9] h-[calc(100vh-5rem)] overflow-y-auto ${
              isMobile ? "p-4" : "p-8"
            }`}
          >
            <Outlet />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default MainLayout;
