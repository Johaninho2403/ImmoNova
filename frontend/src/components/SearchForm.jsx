/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { IoIosSearch } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { checkIn, checkOut, setCheckIn, setCheckOut, city, setCity, guests, setGuests } = useContext(AppContext);

  const handleSubmit = (formdata) => {

    try {
      if (!city || !checkIn || !checkOut || !guests) {
        throw new Error("All fields are required");
      }

      if (new Date(checkIn) > new Date(checkOut)) {
        throw new Error("The checkin date must be before the checkout date");
      }

      navigate(
        `/search?location=${city}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      action={handleSubmit}
      className="bg-white w-full rounded-md md:rounded-full px-4 pl-6 flex flex-col md:flex-row justify-between md:items-center gap-y-1 py-4"
    >
      <div className="flex flex-col md:flex-row justify-between gap-y-2">
        <div className="flex flex-col gap-y-1 border-b md:border-b-0 md:border-r border-r-0 border-slate-400 relative">
          <label htmlFor="city">City</label>
          <input
            type="text"
            placeholder="Where are you going ?"
            name="city"
            id="city"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1 border-b md:border-b-0 md:border-r border-r-0 border-slate-400 md:px-4">
          <label htmlFor="checkIn">Check In</label>
          <input
            type="date"
            name="checkIn"
            id="checkIn"
            defaultValue={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1 border-b md:border-b-0 md:border-r border-r-0 border-slate-400 md:px-4">
          <label htmlFor="checkOut">Check Out</label>
          <input
            type="date"
            name="checkOut"
            id="checkOut"
            defaultValue={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1 md:px-4">
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            placeholder="Guests"
            defaultValue={guests}
            min={1}
            className="w-10!"
            name="guests"
            id="guests"
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </div>
      </div>
      <button className="text-white text-2xl bg-primary hover:bg-primary-dull transition-all duration-300 flex justify-center items-center md:w-15 md:aspect-square md:rounded-full max-md:py-2 rounded-md">
        <IoIosSearch />
      </button>
    </form>
  );
};

export default SearchForm;
