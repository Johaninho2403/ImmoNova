import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/SignIn";
import AdminPanel from "../pages/AdminPanel";
import Dashboard from "../components/Dashboard";
import Categories from "../pages/Categories";
import { dashboardLoader } from "../loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <AdminPanel />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
            loader: dashboardLoader,
          },
          {
            path: "/categories",
            element: <Categories />,
          },
        ],
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
