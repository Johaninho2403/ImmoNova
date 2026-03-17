import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiGlobe } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "../lib/axios";
import { AppContext } from "../context/AppContext";

const SignUp = () => {
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(isLoading){
      return
    }
    setIsLoading(true)
    const formdata = new FormData(e.target);
    const name = formdata.get("name");
    const email = formdata.get("email");
    const password = formdata.get("password");
    const confirmPassword = formdata.get("confirmPassword");
    if (avatar) {
      formdata.append("avatar", avatar);
    }

    try {
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        throw new Error("All fields are required");
      }

      if (confirmPassword !== password) {
        throw new Error("The passwords must match");
      }

      const { data } = await axios.post(`${backendUrl}/auth/signup`, formdata);

      if (data.success) {
        toast.success(data.message);
        navigate("/signin");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center py-4">
      <Link to={"/"} className="absolute top-[5%] left-[5%]">
        <img src="/logo.jpg" alt="logo" className="w-15" />
      </Link>
      <div className="text-xl hover:text-primary cursor-pointer absolute top-[5%] right-[5%]">
        <CiGlobe />
      </div>
      <form
        className="flex flex-col gap-y-4 w-[90%] max-w-100 py-4 rounded-md"
        onSubmit={handleSignUp}
      >
        <label htmlFor="avatar" className="cursor-pointer self-start mx-auto">
          <img
            src={`${avatar ? URL.createObjectURL(avatar) : "/no-avatar.jpg"}`}
            alt="no-avatar"
            className="w-20 h-20 rounded-full mx-auto object-cover"
          />
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </label>
        <div className="flex flex-col gap-y-1 w-full">
          <label htmlFor="name">Name:*</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            className="border border-primary w-full! rounded-md py-2 px-2"
          />
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <label htmlFor="email">Email:*</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="border border-primary w-full! rounded-md py-2 px-2"
          />
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <label htmlFor="password">Password:*</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="border border-primary w-full! rounded-md py-2 px-2"
          />
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <label htmlFor="password">Confirm Password:*</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            className="border border-primary w-full! rounded-md py-2 px-2"
          />
        </div>
        <button className="bg-primary hover:bg-primary-dull text-white py-2 rounded-md transition-all duration-300 flex justify-center items-center gap-2">
          Sign Up
          <div className={`${!isLoading && "hidden"} border border-t-transparent border-white w-5 h-5 rounded-full animate-spin`}></div>
        </button>
        <div className="flex justify-between text-sm">
          <span>Already have an account?</span>
          <Link to={"/signin"} className="text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
