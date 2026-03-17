/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import NumberSpinner from "./NumberSpinner";
import { AppContext } from "../context/AppContext";

const BookingForm = ({ property }) => {
  const { checkIn, checkOut, guests, setCheckIn, setCheckOut } =
    useContext(AppContext);
  const [nights, setNights] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setNights(
      Math.round(
        (new Date(checkOut) - new Date(checkIn)) / 1000 / 60 / 60 / 24,
      ),
    );
  }, [checkIn, checkOut]);

  return (
    <form className="flex flex-col gap-y-3 px-2 md:px-5 py-2 rounded-md shadow-[0_0_20px_rgba(0,0,0,0.2)] md:w-2/5 md:min-w-80 sticky top-10">
      <h2 className="line-clamp-1">{property.title}</h2>
      <p>
        <span>XAF </span>
        <span>
          <span className="text-primary">{property.price}</span> /{" "}
          <sub className="text-sm text-slate-500">
            {property.paymentFrequency}
          </sub>
        </span>
      </p>
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-y-1 w-1/2 bg-primary/60 rounded-md text-white px-2">
          <label htmlFor="checkIn">Check In:</label>
          <input
            type="date"
            name="checkIn"
            value={checkIn}
            className="w-full!"
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1 w-1/2 bg-primary/60 rounded-md text-white px-2">
          <label htmlFor="checkOut">Check Out:</label>
          <input
            type="date"
            name="checkOut"
            value={checkOut}
            className="w-full!"
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>
      <div className="px-2 pb-2 rounded-md flex flex-col gap-y-1 items-start">
        <Box>
          <NumberSpinner
            label="Guests"
            min={1}
            size="small"
            defaultValue={guests}
          />
        </Box>
      </div>
      <div className="flex flex-col gap-y-3 text-slate-500">
        <div className="flex justify-between">
          <div className="">
            XAF {property.price} x {nights} night{nights > 1 && "s"}
          </div>
          <div className="">XAF {property.price * nights}</div>
        </div>
        <div className="flex justify-between">
          <div className="">Service Fee</div>
          <div className="">XAF {property.price * nights * 0.1}</div>
        </div>
        <div className="h-px bg-slate-200"></div>
        <div className="flex justify-between">
          <div className="">Total</div>
          <div className="">
            XAF {Math.round(property.price * nights * 1.1)}
          </div>
        </div>
      </div>
      <button className="text-white bg-primary rounded-md py-2 hover:bg-primary-dull transition-all duration-300">
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
