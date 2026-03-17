import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";
import { PiCity } from "react-icons/pi";


const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 bottom-0 w-[20%] bg-white pt-6 px-4 overflow-auto max-sm:hidden">
      <Link to={"/"} className="inline-block">
        <img src="/logo.jpg" alt="" className="w-15" />
      </Link>
      <ul className="flex flex-col gap-y-4 mt-6">
        <NavLink
          to={"/"}
          className={`flex gap-2 items-center py-4 px-2 rounded-md hover:bg-slate-200/50`}
        >
          <div className="text-2xl">
            <MdOutlineDashboard />
          </div>
          <p>Dashboard</p>
        </NavLink>
        <NavLink
          to={"/categories"}
          className={`flex gap-2 items-center py-4 px-2 rounded-md hover:bg-slate-200/50`}
        >
          <div className="text-2xl">
            <BiCategory />
          </div>
          <p>Categories</p>
        </NavLink>
        <NavLink
          to={"/facilities"}
          className={`flex gap-2 items-center py-4 px-2 rounded-md hover:bg-slate-200/50`}
        >
          <div className="text-2xl">
            <TbAirConditioning />
          </div>
          <p>Facilities</p>
        </NavLink>
        <NavLink
          to={"/destinations"}
          className={`flex gap-2 items-center py-4 px-2 rounded-md hover:bg-slate-200/50`}
        >
          <div className="text-2xl">
            <PiCity />
          </div>
          <p>Destinations</p>
        </NavLink>
      </ul>
    </div>
  );
}

export default SideBar