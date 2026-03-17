import React from "react";
import BasicRating from "./BasicRating";
import person1 from "../assets/person1.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      image: person1,
      name: "Johan Xavier",
      adress: "Bepanda Omisports, Douala",
      rate: 5,
      text: "I found my high-standing studio in under 48 hours on this platform! The photos are 100% accurate, descriptions are detailed, and booking is direct without endless middlemen.",
    },
    {
      image: person2,
      name: "Franck Junior",
      adress: "Bastos, Yaounde",
      rate: 5,
      text: "We were looking for a spacious apartment for our family of 5. Thanks to the app, we could virtually tour several options before choosing this one (3 bedrooms + large living room).",
    },
    {
      image: person3,
      name: "Paul M.",
      adress: "New-Bell, Douala",
      rate: 5,
      text: "As a landlord, I was hesitant to list online, but since I put my apartment on this platform, everything has been smooth! Listing took 10 minutes, serious tenants book directly, payments are secure, and I manage everything from my phone.",
    },
  ];
  return (
    <div className="my-20 px-2.5 md:px-[5%] lg:px-[10%]">
      <h1 className="text-3xl text-center font-medium">What Our Users Say</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-sm:gap-y-4 gap-6 w-full justify-between  my-10">
        {testimonials.map((item, index) => {
          return (
            <div
              className="rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.2)] py-3 flex flex-col gap-y-1 w-full px-4 cursor-pointer hover:-translate-y-2 transition-all duration-300"
              key={index}
            >
              <div className="flex gap-x-4">
                <img
                  src={item.image}
                  alt="testimonial"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col justify-between">
                  <h2>{item.name}</h2>
                  <p className="text-slate-400">{item.adress}</p>
                </div>
              </div>
              <BasicRating rate={item.rate} />
              <p className="text-slate-400 text-sm">
                "{item.text}"
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
