import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import { properties } from "../assets/assets";
import PropertyCard from "../components/PropertyCard";
import Map from "../components/Map";
import Filters from "../components/Filters";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaginationControlled from "../components/PaginationControlled";

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-sm:mx-2.5 max-w-200 rounded-md md:rounded-full shadow-[0px_0px_10px_rgba(0,0,0,0.2)]">
        <SearchForm />
      </div>
      <div className="px-2.5 md:px-[5%] lg:px-[10%] my-5">
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2 text-[18px]">
            <span className="text-primary text-xl">1000</span> proprerties found
          </p>
          <button
            className="border border-black py-1 px-6 rounded-full"
            onClick={() => setShowFilters(true)}
          >
            Filters
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] justify-between gap-4 my-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 min-[1200px]:grid-cols-3! gap-5">
            {properties.map((item) => (
              <PropertyCard key={item.id} {...item} />
            ))}
          </div>
          <div className="h-150 sticky top-20 hidden sm:block">
            <Map properties={properties} />
          </div>
        </div>
        <PaginationControlled />

        <Filters {...{ showFilters, setShowFilters }} />
      </div>
      <Footer />
    </>
  );
};

export default Search;
