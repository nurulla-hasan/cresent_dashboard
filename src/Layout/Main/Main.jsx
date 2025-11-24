import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { ConfigProvider, Drawer } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import brandlogo from "../../assets/image/Logo.png";
import user from "../../assets/image/p.png";
import Search from "antd/es/transfer/search";

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

  const onSearch = () => {
    console.log("Search input: ");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* header */}
      <div className="h-20 bg-[#f9f7f9] flex justify-between items-center px-2 md:px-8 gap-2 border-b">
        {isMobile && (
          <GiHamburgerMenu
            onClick={toggleDrawer}
            className="h-8 w-8 cursor-pointer"
          />
        )}

        {/* logo */}
        <div>
          <Link to="/">
            <img
              src={brandlogo}
              alt="brandlogo"
              className="md:h-full md:w-full object-contain"
            />
          </Link>
        </div>

        {/* search */}
        <div className="w-[320px] ">
          <ConfigProvider
            theme={{
              components: {
                Input: { controlHeight: 48 },
              },
            }}
          >
            <div className="w-[320px] flex items-center gap-2 p-3 rounded-[60px]  backdrop-blur-sm">
              <Search
                allowClear
                placeholder="Input search text"
                onSearch={onSearch}
                enterButton
                bordered={false}
                style={{ flex: 1, padding: 0 }}
              />
            </div>
          </ConfigProvider>
        </div>

        {/* user + notifications */}
        <div>
          <div className="flex justify-between items-center gap-2 mx-10">
            <div className="relative flex items-center gap-5 py-5">
              <Link to="/notification">
                <div className="relative">
                  <IoIosNotificationsOutline className="h-10 w-10 bg-white text-black p-1 border rounded-full" />
                  <span className="bg-red-500 h-5 w-5 rounded-full flex justify-center items-center absolute top-0 right-0 text-white text-xs">
                    1
                  </span>
                </div>
              </Link>
              <Link to="/admin-profile">
                <div className="flex items-center gap-2">
                  <img
                    src={user}
                    alt=""
                    className="w-10 h-10 rounded-full border border-primary"
                  />
                  <p className="md:text-xl font-semibold">Super Admin</p>
                </div>
              </Link>
            </div>
          </div>
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
              isMobile ? "p-4" : "p-10"
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
