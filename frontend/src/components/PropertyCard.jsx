import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import BasicRating from "./BasicRating";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";

const PropertyCard = (props) => {
  const [liked, setLiked] = useState(props.liked);
  const { checkIn, checkOut, guests } = useContext(AppContext);

  return (
    <div className="flex justify-between gap-x-4 flex-col gap-y-2 group">
      <div className="relative h-60 w-full sm:h-50 overflow-hidden rounded-md">
        <Link
          to={`/property/${props.id}?&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
          className="h-full w-full sm:h-50"
        >
          <img
            src={props.images[0]}
            alt=""
            className="h-full w-full object-cover  group-hover:scale-105 transition-all duration-300"
          />
        </Link>
        <div
          className="absolute top-5 right-5 text-xl bg-white hover:bg-white/90 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          onClick={() => setLiked(!liked)}
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-1">
        <h2 className="line-clamp-2 h-10 text-sm font-medium">{props.title}</h2>
        <div className="flex items-center gap-2">
          <p className="text-slate-500">{props.category}</p>
          <p className="text-slate-500 flex justify-end items-center w-full gap-1 text-end">
            <span>
              <IoLocationOutline />
            </span>
            <span className=" whitespace-nowrap overflow-hidden text-[#222] font-semibold">
              {props.city}
            </span>
          </p>
        </div>
        <div className="flex text-slate-600 justify-between gap-1">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <FaBed />
            </div>
            <div className="whitespace-nowrap text-sm">
              {props.bedroom} bedroom{props.bedroom > 1 && "s"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <FaBath />
            </div>
            <div className="whitespace-nowrap text-sm overflow-hidden text-ellipsis">
              {props.bathroom} bathroom{props.bathroom > 1 && "s"}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center justify-between w-full">
            <BasicRating rate={props.rate} />
            <p>
              {props.rate} ({props.reviews})
            </p>
          </div>
        </div>
        <div className="">
          <span>XAF</span>{" "}
          <span className="text-xl text-primary font-medium">
            {props.price}
          </span>{" "}
          / <span className="text-sm">{props.paymentFrequency}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
