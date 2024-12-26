import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import Analytics from "../Pages/Analytics/Analytics";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import Newpass from "../Pages/Auth/NewPass/Newpass";
import VerifyPass from "../Pages/Auth/VerifyPass/VerifyPass";
import Chat from "../Pages/ChatComponent/Chat";
import ContinuePage from "../Pages/Auth/ContinuePage/ContinuePage";
import Patient from "../Components/UserManagemnet/Patient/Patient";
import Doctor from "../Components/UserManagemnet/Doctor/Doctor";
import SignUpRequest from "../Components/UserManagemnet/SignUpRequest/SignUpRequest";
import EditProfile from "../Components/Settings/EditProfile/EditProfile";


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
                path: "/patient",
                element: <Patient />
            },
            {
                path: "/doctor",
                element: <Doctor />
            },
            {
                path: "/sign-up-request",
                element: <SignUpRequest />
            },





            // setting:
            {
                path: "/edit-profile",
                element: <EditProfile />
            },
            {
                path: "/chat",
                element: <Chat></Chat>
            }
        ]
    },
]);
