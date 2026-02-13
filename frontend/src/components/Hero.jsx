import React from "react";
import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <div className="bg-[url('/hero.jpg')] bg-center py-10 md:py-20 px-2.5 md:px-[5%] lg:px-[10%] bg-cover">
      <h1 className="text-white text-4xl font-medium font-serif">
        Discover Your Perfect Stay
      </h1>
      <p className="text-white text-2xl max-w-60">
        Wherever life takes you, find a home that feels like yours.
      </p>
      <div className="mx-auto max-w-200 mt-10 md:mt-20">
        <SearchForm />
      </div>
    </div>
  );
};

export default Hero;
