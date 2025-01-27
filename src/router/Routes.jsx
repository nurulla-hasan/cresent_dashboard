import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import Analytics from "../Pages/Analytics/Analytics";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import Newpass from "../Pages/Auth/NewPass/Newpass";
import VerifyPass from "../Pages/Auth/VerifyPass/VerifyPass";
// import Chat from "../Pages/ChatComponent/Chat";
import ContinuePage from "../Pages/Auth/ContinuePage/ContinuePage";

import Appointment from "../Pages/Appointment/Appointment";
import Payment from "../Pages/Payment/Payment";
import MakeAdmin from "../Pages/MakeAdmin/MakeAdmin";
import Category from "../Pages/Category/Category";
import Subscription from "../Pages/Subscription/Subscription";
import AboutUs from "../Pages/Settings/AboutUS/AboutUs";
import ContactUS from "../Pages/Settings/ContactUS/COntactUS";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "../Pages/Settings/TermsCondition/TermsCondition";
import Banner from "../Pages/Settings/Banner/Banner";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import Notifications from "../Pages/Notification/Notification";
import AllUsers from "../Components/UserManagemnet/AllUsers/AllUsers";


export const router = createBrowserRouter([
    {
        path: "/sign-in",
        element: <SignIn></SignIn>
    },

    {
        path: "/forgate-password",
        element: <ForgatePassword></ForgatePassword>
    },
    {
        path: "/varification",
        element: <VerifyPass></VerifyPass>
    },

    {
        path: "/new-password",
        element: <Newpass></Newpass>
    },
    {
        path: "/continue-page",
        element: <ContinuePage />
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Analytics />
            },
            {
                path: "user-management",
                element: <AllUsers />
            },
            {
                path: '/appoinment-management',
                element: <Appointment />
            },
            {
                path: '/payment-management',
                element: <Payment></Payment>
            },
            {
                path: '/add-category',
                element: <Category></Category>
            },
            {
                path: '/subdcription-management',
                element: <Subscription />
            },
            {
                path: '/make-admin',
                element: <MakeAdmin />
            },

            // setting:
            {
                path: "/settings/about-us",
                element: <AboutUs />
            },
            {
                path: "/settings/contact-us",
                element: <ContactUS />
            },


            {
                path: "/settings/privacy-policy",
                element: <PrivacyPolicy />
            },
            {
                path: "/settings/terms-condition",
                element: <TermsCondition />
            },
            {
                path: "/settings/banner",
                element: <Banner />
            },

            // Admin profile:
            {
                path: '/admin-profile',
                element: <AdminProfile />
            },
            {
                path: '/notification',
                element: <Notifications />
            }

        ]
    },
]);
