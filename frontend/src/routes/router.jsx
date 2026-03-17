import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Search from "../pages/Search";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import SingleProperty from "../pages/SingleProperty";
import AddProperty from "../pages/AddProperty";
import VerifyAccount from "../pages/VerifyAccount";
import {
  addPropertyLoader,
  HomePageLoaders,
  searchPageLoader,
  singlePropertyPage,
} from "../loaders";
import FallBack from "../pages/FallBack";
import Success from "../pages/Success";
import Failure from "../pages/Failure";
import MyBookings from "../pages/MyBookings";
import Checkout from "../pages/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: HomePageLoaders,
      },
      {
        path: "/search",
        element: <Search />,
        loader: searchPageLoader,
        errorElement: <div className=""></div>,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/property/:id",
        element: <SingleProperty />,
        loader: singlePropertyPage,
        errorElement: <div className="">Property not found</div>,
      },
      {
        path: "/add-property",
        element: <AddProperty />,
        loader: addPropertyLoader,
      },
      {
        path: "/verify-account",
        element: <VerifyAccount />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/failure",
        element: <Failure />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
      },
      {
        path: '/checkout',
        element: <Checkout />
      }
    ],
  },
]);

export default router;
