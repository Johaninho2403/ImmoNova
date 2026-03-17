import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./router/router.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminContextProvider from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <AdminContextProvider>
    <ToastContainer autoClose={2000} closeOnClick={true} pauseOnHover={false} />
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </AdminContextProvider>,
);
