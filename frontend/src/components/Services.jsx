import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";


const Services = () => {
  return (
    <div className="px-2.5 md:px-[5%] lg:px-[10%]">
      <div className="my-20 ">
        <h1 className="mb-5 text-center font-semibold text-3xl">
          We Offer The Best Services
        </h1>
        <p className="text-center text-slate-400">
          Immonova is booking app that reunites owners and potential tenants all
          across Cameroon.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-y-4 max-w-250 mx-auto gap-x-4">
        <div className="flex flex-col gap-2">
          <div className="text-primary text-5xl flex justify-center items-center">
            <FaMoneyBillWave />
          </div>
          <div>
            <h2 className="font-medium text-center">
              Earn money with ImmoNova
            </h2>
            <p className="text-slate-400 text-center">
              ImmoNova is a way to earn money easily. Add your property and find
              tenant in few hours.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-primary text-5xl flex justify-center items-center">
            <FaKey />
          </div>
          <div>
            <h2 className="font-medium text-center">
              Earn money with ImmoNova
            </h2>
            <p className="text-slate-400 text-center">
              ImmoNova is a way to earn money easily. Add your property and find
              tenant in few hours.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-primary text-5xl flex justify-center items-center">
            <BiSupport />
          </div>
          <div>
            <h2 className="font-medium text-center">
              Earn money with ImmoNova
            </h2>
            <p className="text-slate-400 text-center">
              ImmoNova is a way to earn money easily. Add your property and find
              tenant in few hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
