import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../lib/axios";
import { useContext } from "react";
import { adminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { backendUrl } = useContext(adminContext);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/auth/signin-admin`, {
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col gap-y-4 w-full max-w-105 bg-white px-4 py-2 rounded-md"
      >
        <h1 className="text-center font-medium text-xl">
          Login To Your Account
        </h1>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">Email*:</label>
          <input
            type="email"
            className="w-full px-2 py-2 rounded-md bg-slate-100 border border-slate-200"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">Password*:</label>
          <input
            type="password"
            className="w-full px-2 py-2 rounded-md bg-slate-100 border border-slate-200"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-primary px-15 py-2 self-center text-white rounded-md flex items-center gap-2">
          <span>Sign In</span>
          {isLoading && (
            <div className="w-5 h-5 rounded-full border-white border-x border-b animate-spin"></div>
          )}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
