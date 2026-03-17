/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import axios from '../lib/axios'
import { useState } from "react";
import { useEffect } from "react";


export const adminContext = createContext()

const AdminContextProvider = ({children}) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isAdmin, setIsAdmin] = useState(false)

    const value = {
        backendUrl,
        isAdmin,
        setIsAdmin
    }
    return (
        <adminContext.Provider value={value}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminContextProvider