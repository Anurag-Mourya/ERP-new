import React, { useEffect } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import Notfoundpage from "./notfound/404Notfound";
import Home from "../Views/Home/Home.jsx";
import Login from "../Views/AuthPages/Login.jsx";
import Register from "../Views/AuthPages/Register.jsx";
import CreateUpdateOrg from "../Views/AuthPages/CreateUpdateOrg.jsx";
import Organisations from "../Views/AuthPages/Organisations.jsx";
import { ProtectedRouteForUser } from "./AuthRoutes.jsx";
import ForgetPassword from "../Views/AuthPages/ForgetPassword.jsx";
import ChangePassword from "../Views/AuthPages/ChangePassword.jsx";
import VerifyEmail from "../Views/AuthPages/VerifyEmail.jsx";
import Settings from "../Views/Settings/Settings.jsx";
import Organizations from "../Views/Settings/Organizations/Organizations.jsx";
import CreateANewOrganization from "../Views/Settings/Organizations/CreateANewOrganization.jsx";
import Users from "../Views/Settings/Organizations/Users.jsx";
import InviteUser from "../Views/Settings/Organizations/InviteUser.jsx";
import EditQuotation from "../Views/Sales/EditQuotation.jsx";
import EditSalesOrder from "../Views/Sales/EditSalesOrder.jsx";
import EditInvoices from "../Views/Sales/EditInvoices.jsx";
import WareHouse from "../Views/Settings/WareHouse/WareHouse.jsx";
import CreateWareHouse from "../Views/Settings/WareHouse/CreateWareHouse.jsx";
import Roles from "../Views/Settings/UsersAndRoles/Roles.jsx";
import AcceptInvitation from "../Views/Settings/Organizations/AcceptInvitation.jsx";
import EditPurchases from "../Views/Purchases/EditPurchases.jsx";
import CreateRoles from "../Views/Settings/UsersAndRoles/CreateRoles.jsx";
import EditBills from "../Views/Purchases/EditBills.jsx";
import EditExpence from "../Views/Expences/EditExpence.jsx";
import UpdateJournal from "../Views/Accountant/Journal/UpdateJournal.jsx";
import UpdateCreditNotes from "../Views/Sales/CreditNotes/UpdateCreditNotes.jsx";
import UpdateDebitNotes from "../Views/Sales/DebitNotes/UpdateDebitNotes.jsx";
import Test from "../../test/test.jsx";

// Define a higher-order component to scroll to the top
const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Your router configuration
const routerConfig = [
  {
    path: "/",
    element: <ProtectedRouteForUser><Home /></ProtectedRouteForUser>,
    errorElement: <Notfoundpage />,
  },

  {
    path: "/2",
    element: <Test />,
  },

  {
    path: "/settings",
    element: <Settings />,
  },



  // warehouse
  {
    path: "/settings/warehouse",
    element: <WareHouse />,
  },
  {
    path: "/settings/create-warehouse",
    element: <CreateWareHouse />,
  },


  // organization
  {
    path: "/settings/organisations",
    element: <Organizations />,
  },
  {
    path: "/settings/create-organisations",
    element: <CreateANewOrganization />,
  },
  {
    path: "/invite-user-to-organization",
    element: <InviteUser />,
  },
  {
    path: "/organization-users",
    element: <Users />,
  },



  // roles

  {
    path: "/settings/user-roles",
    element: <Roles />,
  },
  {
    path: "/settings/create-user-roles",
    element: <CreateRoles />,
  },
  // {
  //   path: "/organization-users",
  //   element: <Users />,
  // },





















  {
    path: "dashboard/edit-quotation/:id",
    element: <EditQuotation />,
  },


  {
    path: "/dashboard/edit-purchases/:id",
    element: <EditPurchases />,
  },
  {
    path: "/dashboard/edit-bills/:id",
    element: <EditBills />,
  },

  {
    path: "dashboard/:convert/:id",
    element: <EditQuotation />,
  },
  {
    path: "dashboard/edit-expenses/:id",
    element: <EditExpence />,
  },

  {
    path: "/dashboard/edit-sales-order/:id",
    element: <EditSalesOrder />,
  },

  {
    path: "/dashboard/edit-credit-notes/:id",
    element: <UpdateCreditNotes />,
  },
  {
    path: "/dashboard/edit-debit-notes/:id",
    element: <UpdateDebitNotes />,
  },

  {
    path: "/dashboard/edit-journal/:id",
    element: <UpdateJournal />,
  },

  {
    path: "/dashboard/:slug1/:slug2/:id",
    element: <EditSalesOrder />,
  },
  {
    path: "/dashboard/edit-invoices/:id",
    element: <EditInvoices />,
  },






















  {
    path: "/dashboard/:component",
    element: <ProtectedRouteForUser><Home /></ProtectedRouteForUser>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verifymail/:token",
    element: <VerifyEmail />,
  },
  {
    path: "/invitation-mail/:token",
    element: <AcceptInvitation />,
  },






  {
    path: "/create-organisation",
    element: <CreateUpdateOrg />,
  },
  {
    path: "/organisations",
    element: <Organisations />,
  },


  // {
  //   path: "/career",
  //   element: <CareerPage />,
  // },
  // {
  //   path: "/blogs",
  //   element: <Blogs />,
  // },
  // {
  //   path: "/about-us",
  //   element: <AboutUs />,
  // },
  // {
  //   path: "/services",
  //   element: <Services />,
  // },
  // {
  //   path: "/booking-form",
  //   element: <BookingForm />,
  // },
];

// Apply the higher-order component to each route
const wrappedRoutes = routerConfig.map((route) => ({
  ...route,
  element: (
    <>
      <ScrollToTopOnMount />
      {route.element}
    </>
  ),
}));

const router = createBrowserRouter(wrappedRoutes);

export default router;
