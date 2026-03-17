import React, { useContext, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import confetti from "canvas-confetti";
import { properties } from "../assets/assets";
import { MdLocationPin } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { checkIn, checkOut, guests } = useContext(AppContext);
  const navigate = useNavigate()

  useEffect(() => {
    confetti({
      particleCount: 1000,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);
  return (
    <div className="flex justify-center items-center flex-col gap-y-4 w-screen h-screen bg-slate-100">
      <div className="p-4 flex justify-center items-center bg-green-200 rounded-full">
        <div className="w-15 h-15 rounded-full bg-green-300 text-white flex justify-center items-center text-2xl">
          <FaCheck />
        </div>
      </div>
      <h1 className="font-medium text-3xl">Payment Successful</h1>
      <div className="bg-white rounded-md shadow-md mx-4 sm:mx-0 flex flex-col gap-y-4 py-4">
        <div className="flex gap-2 px-4">
          <img
            src={properties[0].images[0]}
            alt="property"
            className="w-25 aspect-square object-cover rounded-md"
          />
          <div className="flex flex-col  gap-y-2">
            <h2 className="text-xl font-medium">{properties[0].title}</h2>
            <div className="flex gap-2 text-slate-400 items-center">
              <div className="">
                <MdLocationPin />
              </div>
              <p>{properties[0].adress}</p>
            </div>
            <p className="text-primary">Booking ID: {properties[0].id}</p>
          </div>
        </div>
        <hr className="text-slate-300" />
        <div className="px-4">
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between">
              <p className="text-slate-400">Check-in</p>
              <p className="text-slate-800">{checkIn}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-slate-400">Check-in</p>
              <p className="text-slate-800">{checkOut}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-slate-400">Guests</p>
              <p>{guests}</p>
            </div>
            <hr className="text-slate-300" />
            <div className="flex justify-between">
              <p className="font-medium text-xl">Total Paid</p>
              <p className="text-primary text-xl font-medium">
                XAF {properties[0].price}
              </p>
            </div>
          </div>
        </div>
        <div className="px-4">
          <button className="text-white bg-primary hover:bg-primary-dull rounded-md py-2 w-full" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
