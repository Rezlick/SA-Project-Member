import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-party/Loadable";

import FullLayout from "../components/FullLayout";

const MainPages = Loadable(lazy(() => import("../components/Pages/login/login")));
const Dashboard = Loadable(lazy(() => import("../components/Pages/dashboard/dashboard")));

const Member = Loadable(lazy(() => import("../components/Pages/member/member")));
const CreateMember = Loadable(lazy(() => import("../components/Pages/member/create")));
const EditMember = Loadable(lazy(() => import("../components/Pages/member/edit")));

const Employee = Loadable(lazy(() => import("../components/Pages/Employee/employee")));
const CreateEmployee = Loadable(lazy(() => import("../components/Pages/Employee/create")));
const EditEmployee = Loadable(lazy(() => import("../components/Pages/Employee/edit")));

const ProfileEdit = Loadable(lazy(() => import("../components/Pages/ProfileEdit/profileEdit")))
const ChangePassword = Loadable(lazy(() => import("../components/Pages/ProfileEdit/changePassword")))

const Payment = Loadable(lazy(() => import("../components/Pages/Payment/payment")))

const AdminRoutes = (isLoggedIn : boolean): RouteObject => {
  return {
    path: "/",
    element: isLoggedIn ? <FullLayout /> : <MainPages />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/profileEdit",
        element: <ProfileEdit />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/member",
        children: [
          {
            path: "/member",
            element: <Member />,
          },
          {

            path: "/member/create",

            element: <CreateMember />
          },
          {

            path: "/member/edit/:id",

            element: <EditMember />
          },
        ]
      },
      {
        path: "/employee",
        children: [
          {
            path: "/employee",
            element: <Employee />,
          },
          {

            path: "/employee/create",

            element: <CreateEmployee />
          },
          {

            path: "/employee/edit/:id",

            element: <EditEmployee />
          },
        ]
      },
    ],
  };
};
export default AdminRoutes;