import React from "react";
import Hero from "../components/Hero";
import PopularCities from "../components/PopularCities";
import PopularCategories from "../components/PopularCategories";
import PopularProperties from "../components/PopularProperties";
import Services from "../components/Services";
import NewLetters from "../components/NewLetters";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <PopularCities />
      <PopularCategories />
      <PopularProperties />
      <Services />
      <Testimonials />
      <NewLetters />
    </div>
  );
};

export default Home;
