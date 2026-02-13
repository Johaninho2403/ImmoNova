import React from "react";
import Hero from "../components/Hero";
import PopularCities from "../components/PopularCities";
import PopularCategories from "../components/PopularCategories";
import PopularProperties from "../components/PopularProperties";
import Services from "../components/Services";
import NewLetters from "../components/NewLetters";
import Testimonials from "../components/Testimonials";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <PopularCities />
      <PopularCategories />
      <PopularProperties />
      <Services />
      <Testimonials />
      <NewLetters />
      <Footer />
    </div>
  );
};

export default Home;
