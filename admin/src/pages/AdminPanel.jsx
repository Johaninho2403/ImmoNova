/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { adminContext } from "../context/AdminContext";
import axios from "../lib/axios";

const AdminPanel = () => {
  const { backendUrl } = useContext(adminContext);
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsAdmin = async () => {
      const { data } = await axios.get(`${backendUrl}/auth/is-admin`);
      setIsAdmin(data.success);
    };
    checkIsAdmin();
  }, []);
  if (isAdmin === null) {
    return <div className="">Loading...</div>;
  }
  if (isAdmin === false) {
    navigate("/signin");
  }
  return (
    <div className="w-screen min-h-screen bg-slate-100">
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );

};

export default AdminPanel;
