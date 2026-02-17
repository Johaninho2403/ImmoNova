 
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiGlobe } from "react-icons/ci";
import { IoMenuSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {checkIn, checkOut, city} = useContext(AppContext)

  const navigate = useNavigate()
  return (
    <header className="flex justify-between items-center py-5 px-2.5 md:px-[5%] lg:px-[10%]">
      <Link to={"/"}>
        <img src="/logo.jpg" alt="logo" className="w-15" />
      </Link>
      <ul className="hidden sm:flex gap-5">
        <NavLink
          to={"/"}
          className={
            "after:content-[''] hover:after:bg-primary hover:after:w-full hover:after:h-0.5 hover:after:block hover:after:rounded-[50px] after:w-0 after:transition-all duration-300"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to={`/search?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`}
          className={
            "after:content-[''] hover:after:bg-primary hover:after:w-full hover:after:h-0.5 hover:after:block hover:after:rounded-[50px] after:w-0 after:transition-all duration-300"
          }
        >
          SEARCH
        </NavLink>
        <NavLink
          to={"/about"}
          className={
            "after:content-[''] hover:after:bg-primary hover:after:w-full hover:after:h-0.5 hover:after:block hover:after:rounded-[50px] after:w-0 after:transition-all duration-300"
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to={"/contact"}
          className={
            "after:content-[''] hover:after:bg-primary hover:after:w-full hover:after:h-0.5 hover:after:block hover:after:rounded-[50px] after:w-0 after:transition-all duration-300"
          }
        >
          CONTACT
        </NavLink>
      </ul>
      <div className="hidden sm:flex items-center gap-4">
        <div className="text-xl cursor-pointer hover:text-primary">
          <CiGlobe />
        </div>
        <Link className="text-primary px-2 py-1 border border-slate-300 rounded-full text-sm">
          Become a host
        </Link>

        <button
          className="bg-primary hover:bg-primary-dull transition-all duration-300 text-white rounded-md px-4 py-2"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
      </div>
      <div
        className="sm:hidden text-3xl cursor-pointer hover:text-primary"
        onClick={() => setShowMenu(true)}
      >
        <IoMenuSharp />
      </div>
      <div
        className={`bg-black/60 fixed top-0 bottom-0 right-0 ${showMenu ? "left-0" : "left-full"} z-10000 transition-all duration-300`}
        onClick={() => setShowMenu(false)}
      ></div>
      <div
        className={`fixed top-0 bottom-0 -right-20 ${showMenu ? "w-60 right-0" : "w-0"} bg-white z-10000 px-4 transition-all duration-300`}
      >
        <nav className="mt-10">
          <ul className="flex flex-col gap-y-5 sidebar">
            <NavLink to={"/"} onClick={() => setShowMenu(false)}>
              HOME
            </NavLink>
            <NavLink to={"/search"} onClick={() => setShowMenu(false)}>
              SEARCH
            </NavLink>
            <NavLink to={"/about"} onClick={() => setShowMenu(false)}>
              ABOUT
            </NavLink>
            <NavLink to={"/contact"} onClick={() => setShowMenu(false)}>
              CONTACT
            </NavLink>
            <NavLink to={"/signin"} onClick={() => setShowMenu(false)}>
              SIGNIN
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
