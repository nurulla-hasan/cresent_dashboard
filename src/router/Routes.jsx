import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import Analytics from "../Pages/Analytics/Analytics";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import Newpass from "../Pages/Auth/NewPass/Newpass";
import VerifyPass from "../Pages/Auth/VerifyPass/VerifyPass";
import ContinuePage from "../Pages/Auth/ContinuePage/ContinuePage";
import Payment from "../Pages/Payment/Payment";

import Subscription from "../Pages/Subscription/Subscription";
import ContactUS from "../Pages/Settings/ContactUS/ContactUS";

import Banner from "../Pages/Settings/Banner/Banner";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import Notifications from "../Pages/Notification/Notification";
import AllUsers from "../Components/UserManagemnet/AllUsers/AllUsers";
import Subscribers from "../Components/UserManagemnet/Subscribers/Subscribers";
import AllOrganization from "../Pages/OrganizationManagement/AllOrganization/AllOrganization";
import SubscribersOrganization from "../Pages/OrganizationManagement/SubscribersOrganization/SubscribersOrganization";
import DonationQuickLink from "../Components/Dashboard/AnalyticsInfo/DonationQuickLink";
import SubscriptionQuickLinks from "../Components/Dashboard/AnalyticsInfo/SubscriptionQuickLinks";
import RewardsQuickLinks from "../Components/Dashboard/AnalyticsInfo/RewardsQuickLinks";
import AnalyticsRoute from "../Pages/AnalyticsRoute/AnalyticsRoute";
import DonorApp from "../Pages/DonorApp/DOnorApp";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn></SignIn>,
  },

  {
    path: "/forgate-password",
    element: <ForgatePassword></ForgatePassword>,
  },
  {
    path: "/varification",
    element: <VerifyPass></VerifyPass>,
  },

  {
    path: "/new-password",
    element: <Newpass></Newpass>,
  },
  {
    path: "/continue-page",
    element: <ContinuePage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Analytics />,
      },
      {
        path: "/user-management/all-users",
        element: <AllUsers />,
      },
      {
        path: "/user-management/subscribers",
        element: <Subscribers />,
      },
      {
        path: "/organization-management/all-organizations",
        element: <AllOrganization />,
      },
      {
        path: "/organization-management/subscribers-organizations",
        element: <SubscribersOrganization />,
      },
      {
        path: "/subdcription-management",
        element: <Subscription />,
      },
      {
        path: "/payment-management",
        element: <Payment></Payment>,
      },
      {
        path: "/analytics",
        element: <AnalyticsRoute />,
      },
      {
        path: "/donor-app",
        element: <DonorApp />,
      },
      // {
      //     path: '/add-reward',
      //     element: <Rewards></Rewards>
      // },

      // {
      //     path: '/make-admin',
      //     element: <MakeAdmin />
      // },

      // setting:

      {
        path: "/settings/contact-us",
        element: <ContactUS />,
      },

      {
        path: "/settings/banner",
        element: <Banner />,
      },

      // Admin profile:
      {
        path: "/admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
      //Quick limks:
      {
        path: "donationQuickLink",
        element: <DonationQuickLink />,
      },
      {
        path: "subscriptions",
        element: <SubscriptionQuickLinks />,
      },
      {
        path: "rewards",
        element: <RewardsQuickLinks />,
      },
    ],
  },
]);
