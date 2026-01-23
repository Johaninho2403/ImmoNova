import React from "react";
import { IoIosSearch } from "react-icons/io";

const Hero = () => {
  return (
    <div className="bg-[url('/hero.jpg')] bg-center py-10 md:py-20 px-2.5 md:px-[5%] lg:px-[10%] bg-cover">
      <h1 className="text-white text-4xl font-medium font-serif">
        Discover Your Perfect Stay
      </h1>
      <p className="text-white text-2xl max-w-60">
        Wherever life takes you, find a home that feels like yours.
      </p>
      <form className="mt-10 md:mt-20 bg-white mx-auto w-full max-w-200 rounded-md md:rounded-full px-4 pl-6 flex flex-col md:flex-row justify-between md:items-center gap-y-1 py-4">
        <div className="flex flex-col md:flex-row justify-between gap-y-2">
          <div className="flex flex-col gap-y-1 border-b md:border-b-0 md:border-r border-r-0 border-slate-400 relative">
            <label htmlFor="city">City</label>
            <input type="text" placeholder="Where are you going ?" required />
          </div>
          <div className="flex flex-col gap-y-1 border-b md:border-b-0 md:border-r border-r-0 border-slate-400 md:px-4">
            <label htmlFor="checkIn">Check In</label>
            <input type="date" required />
          </div>
          <div className="flex flex-col gap-y-1 border-b md:border-b-0 md:border-r border-r-0 border-slate-400 md:px-4">
            <label htmlFor="checkOut">Check Out</label>
            <input type="date" required />
          </div>
          <div className="flex flex-col gap-y-1 md:px-4">
            <label htmlFor="checkOut">Guests</label>
            <input
              type="number"
              placeholder="Guests"
              defaultValue={1}
              min={1}
              required
              className="w-10!"
            />
          </div>
        </div>
        <button className="text-white text-2xl bg-primary hover:bg-primary-dull transition-all duration-300 flex justify-center items-center md:w-15 md:aspect-square md:rounded-full max-md:py-2 rounded-md">
          <IoIosSearch />
        </button>
      </form>
    </div>
  );
};

export default Hero;
