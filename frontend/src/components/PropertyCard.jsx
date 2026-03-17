import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import BasicRating from "./BasicRating";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";
import axios from "../lib/axios";

const PropertyCard = (props) => {
  const [liked, setLiked] = useState(props.liked);
  const { backendUrl, isAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const handleSave = async (id) => {
    try {
      if (!isAuth) {
        navigate("/signin");
      }
      setLiked(!liked);
      const { data } = await axios.post(
        `${backendUrl}/user/save-property/${id}`,
      );
      if (!data.success) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log();
    }
  };

  return (
    <div className="flex flex-col gap-y-2 group">
      <div className="relative h-60 w-full sm:h-50 overflow-hidden rounded-md">
        <Link to={`/property/${props.id}`} className="w-full h-full">
          <img
            src={props.images[0].url}
            alt="property"
            className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300"
          />
        </Link>
        <div
          className="cursor-pointer absolute top-5 right-5 text-xl bg-white hover:bg-white/90 w-10 h-10 rounded-full flex justify-center items-center z-10"
          onClick={() => handleSave(props.id)}
        >
          {liked ? (
            <FaHeart className={`${liked && "text-red-500"}`} />
          ) : (
            <FaRegHeart />
          )}
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-1">
        <h2 className="line-clamp-2 h-10 font-medium">{props.title}</h2>
        <div className="flex items-center gap-2">
          <p className="text-slate-500">{props.category.name}</p>
          <p className="text-slate-500 flex justify-end items-center w-full gap-1 text-end">
            <span>
              <IoLocationOutline />
            </span>
            <span className="whitespace-nowrap overflow-hidden text-[#222] font-semibold">
              {props.city}
            </span>
          </p>
        </div>
        <div className="flex text-slate-600 justify-between gap-1">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <FaBed />
            </div>
            <p className="whitespace-nowrap text-sm text-ellipsis overflow-hidden">
              {props.bedrooms} bedroom{props.bedrooms > 1 && "s"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <FaBath />
            </div>
            <p className="whitespace-nowrap text-sm text-ellipsis overflow-hidden">
              {props.bathrooms} bathroom{props.bathrooms > 1 && "s"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between w-full">
          <BasicRating rate={props.rate} />
          <p>
            {props.rate.toFixed(1)} ({props._count.reviews})
          </p>
        </div>
        <div className="">
          <span>XAF</span>{" "}
          <span className="text-primary text-xl font-medium">
            {props.price}
          </span>{" "}
          / <span className="text-slate-500">Night</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
