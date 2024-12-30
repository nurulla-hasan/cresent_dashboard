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
import Patient from "../Components/UserManagemnet/Patient/Patient";
import Doctor from "../Components/UserManagemnet/Doctor/Doctor";
import SignUpRequest from "../Components/UserManagemnet/SignUpRequest/SignUpRequest";
import Appointment from "../Pages/Appointment/Appointment";
import Payment from "../Pages/Payment/Payment";
import Projects from "../Pages/Projects/Projects";
import MakeAdmin from "../Pages/MakeAdmin/MakeAdmin";
import Policy from "../Pages/Settings/Policy/Policy";
import Blogs from "../Pages/Settings/Blogs/Blogs";
import EditProfile from "../Pages/Settings/EditProfile/EditProfile";
import Category from "../Pages/Category/Category";


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
                path: "/user-management/patient",
                element: <Patient />
            },
            {
                path: "/user-management/doctor",
                element: <Doctor />
            },
            {
                path: "/user-management/sign-up-request",
                element: <SignUpRequest />
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
                path: '/project',
                element: <Projects />
            },
            {
                path: '/make-admin',
                element: <MakeAdmin />
            },





            // setting:
            {
                path: "/settings/edit-profile",
                element: <EditProfile />
            },
            {
                path: "/settings/policies",
                element: <Policy></Policy>
            },
            {
                path: "/settings/blogs",
                element: <Blogs />
            },
            {
                path: "/settings/faq",
                element: <EditProfile />
            },
            {
                path: "/settings/privacy-policy",
                element: <EditProfile />
            },
            {
                path: "/settings/terms-condition",
                element: <EditProfile />
            },
            // chat
            // {
            //     path: "/chat",
            //     element: <Chat></Chat>
            // }
        ]
    },
]);
