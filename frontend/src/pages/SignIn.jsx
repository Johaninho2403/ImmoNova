import React from "react";
import { Link } from "react-router-dom";
import { CiGlobe } from "react-icons/ci";
import { toast } from "react-toastify";

const SignIn = () => {

  const handleSignIn = (formdata) => {
    const email = formdata.get("email")
    const password = formdata.get("password")

    try {
      if(!email || !password){
        throw new Error("All fields are required!")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center py-4">
      <Link to={"/"} className="absolute top-[5%] left-[5%]">
        <img src="/logo.jpg" alt="logo" className="w-15" />
      </Link>
      <div className="hover:text-primary cursor-pointer absolute right-[5%] top-[5%] text-xl">
        <CiGlobe />
      </div>
      <form className="flex flex-col gap-y-4 w-[90%] max-w-100 py-4 rounded-md" action={handleSignIn}>
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
        <div className="flex justify-between text-sm">
            <span>Forgot your password?</span>
            <Link to={'/reset-password'} className="text-primary hover:underline">Reset your password</Link>
        </div>
        <button className="bg-primary hover:bg-primary-dull text-white py-2 rounded-md transition-all duration-300">
          Sign In
        </button>
        <div className="flex justify-between text-sm">
            <span>Don't have an account yet?</span>
            <Link to={'/signup'} className="text-primary hover:underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
