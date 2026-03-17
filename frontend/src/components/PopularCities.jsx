import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import {Link} from 'react-router-dom'

const PopularCities = ({destinations}) => {
  return (
    <div className="px-2.5 md:px-[5%] lg:px-[10%]">
      <h2 className="my-10 text-center font-semibold text-3xl">
        Popular Destinations
      </h2>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {destinations.map((item) => {

          return (
            <SwiperSlide
              key={item.id}
              className="h-50! rounded-lg relative group overflow-hidden cursor-pointer"
            >
              <Link to={`/search/qu`}>
                <img
                  src={item.image}
                  alt=""
                  className="rounded-lg group-hover:scale-105 transition-all duration-500"
                />
                <p className="absolute text-white left-5 bottom-1 text-xl">
                  {item.city}
                </p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PopularCities;
