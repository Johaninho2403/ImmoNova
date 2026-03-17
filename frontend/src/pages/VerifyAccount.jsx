/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import OtpInputs from "../components/OtpInputs";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const [codeSent, setCodeSent] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const { backendUrl } = useContext(AppContext);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setSeconds(30);
    setCodeSent(true);
  };

  const verifyEmail = async () => {
    if (otp.length === 6) {
      try {
        const { data } = await axios.post(`${backendUrl}/auth/verify-email`, {
          OTP: otp,
        });
        console.log(data);

        if (data.success) {
          toast.success(data.message);
          navigate("/");
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [otp]);

  const askVerificationOTP = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/auth/send-verification-otp`,
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (codeSent) {
      askVerificationOTP();
    }
  }, [codeSent]);

  useEffect(() => {
    let id;
    if (codeSent) {
      id = setInterval(() => {
        if (seconds === 0) {
          clearInterval(id);
          setCodeSent(false);
          return;
        }
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [codeSent, seconds]);
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-100 mx-auto border border-primary px-4 py-4 rounded-md mt-10">
        <h1 className="text-center font-medium mb-3">Email verification OTP</h1>
        <p className="text-center text-primary mb-3">
          OTP sent to your email address
        </p>
        <OtpInputs {...{ otp, setOtp }} />
        <div className="w-full mt-3 flex justify-center items-center">
          <button
            className={`${codeSent && "hidden"} bg-primary hover:bg-primary-dull text-white w-1/2 py-2 rounded-full transition-all duration-300`}
            onClick={handleClick}
          >
            Send New Code
          </button>
        </div>
        <div className={`${!codeSent && "hidden"} text-sm text-slate-500 mt-3`}>
          <p>
            Didn't receive the code ? Wait{" "}
            <span className="text-primary">{seconds}</span> before asking a new
            code
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
