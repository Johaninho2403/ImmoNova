import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./routes/router.jsx";
import { RouterProvider } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById("root")).render(
    <AppContextProvider>
      <ToastContainer closeOnClick={true} pauseOnHover={false} autoClose={2000}/>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AppContextProvider>
);
