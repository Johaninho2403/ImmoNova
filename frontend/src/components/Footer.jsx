import React from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="px-2.5 md:px-[5%] lg:px-[10%] text-sm">
      <div className="w-15">
        <Link to={"/"} className="">
          <img src="/logo.jpg" alt="logo" className="w-full" />
        </Link>
      </div>
      <div className=" flex gap-x-4 gap-y-6 max-[570px]:flex-col sm:flex-row justify-between my-5 py-5 border-b border-slate-400">
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl">Home</h2>
          <ul className="flex flex-col gap-y-4 text-slate-500 items-start">
            <Link to={"/about"}>About Us</Link>
            <a href="">Terms & Conditions</a>
            <a href="">Privacy Policy</a>
          </ul>
        </div>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl">Landlords</h2>
          <ul className="text-slate-500 flex flex-col items-start gap-y-4">
            <Link to={"/my-listing"} className="inline">
              My Listing
            </Link>
            <Link to={"/my-account"} className="inline">
              My Account
            </Link>
            <Link to={"/become-host"} className="inline">
              Become a Host
            </Link>
          </ul>
        </div>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl">Tenants</h2>
          <ul className="text-slate-500 flex flex-col items-start gap-y-4">
            <Link to={"/search"} className="inline">
              Search
            </Link>
            <Link to={"/my-account"} className="inline">
              My Account
            </Link>
            <Link to={"/become-host"} className="inline">
              Become a Host
            </Link>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-y-4">
          <h2 className="text-xl">Contacts</h2>
          <div className="flex gap-2">
            <div className="text-xl text-primary">
              <FaLocationDot />
            </div>
            <p className="text-slate-500">Bepanda Omnisports, Douala</p>
          </div>
          <div className="flex gap-2">
            <div className="text-xl text-primary">
              <BsFillTelephoneFill />
            </div>
            <a href="tel:+237 690321390" className="text-slate-500">
              +(237) 690 32 13 90
            </a>
          </div>
          <div className="flex gap-2">
            <div className="text-xl text-primary">
              <MdEmail />
            </div>
            <a
              href="mailto:johaninho2432006@gmail.com"
              className="text-slate-500"
            >
              johaninho2432006@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-slate-500">
        &copy; 2025 • Biyo Johan, All rights reserved
      </div>
    </div>
  );
};

export default Footer;
