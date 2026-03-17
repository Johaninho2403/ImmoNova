import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiGlobe } from "react-icons/ci";
import { IoMenuSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "../lib/axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {
    checkIn,
    checkOut,
    city,
    userInfo,
    backendUrl,
    setIsAuth,
    setUserInfo,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/auth/signout`);
      if (data.success) {
        toast.success(data.message);
        localStorage.removeItem("user");
        setIsAuth(false);
        setUserInfo(null);
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
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
          to={`/search?location=${city}&checkIn=${checkIn}&checkOut=${checkOut}`}
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
        <Link
          to={"/add-property"}
          className="text-primary px-2 py-1 border border-slate-300 rounded-full text-sm"
        >
          Become a host
        </Link>

        {!userInfo ? (
          <button
            className="bg-primary hover:bg-primary-dull transition-all duration-300 text-white rounded-md px-4 py-2"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        ) : (
          <div className="group relative p-2 cursor-pointer">
            <div className="">
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="bg-black text-white w-10 h-10 rounded-full flex justify-center items-center">
                  {userInfo.name[0].toUpperCase()}
                </div>
              )}
            </div>
            <div
              className={`z-10 hidden group-hover:block bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.3)] absolute top-full right-0 rounded-md w-50 overflow-hidden`}
            >
              <div className="px-6 py-3 hover:bg-slate-100/80 cursor-pointer">
                Profile
              </div>
              <div
                className="px-6 py-3 hover:bg-slate-100/80 cursor-pointer"
                onClick={() => navigate("/my-bookings")}
              >
                My Bookings
              </div>
              <div
                className="px-6 py-3 hover:bg-slate-100/80 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>
        )}
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
            <NavLink
              to={`/search?location=${city}&checkIn=${checkIn}&checkOut=${checkOut}`}
              onClick={() => setShowMenu(false)}
            >
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
