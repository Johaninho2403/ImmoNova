/* eslint-disable no-unused-vars */
import React from "react";
import { reviews } from "../assets/assets";
import { MdCleaningServices } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { FaKey } from "react-icons/fa";
import { IoChatboxSharp } from "react-icons/io5";
import { GiPositionMarker } from "react-icons/gi";
import BasicRating from "./BasicRating";
import { PosAnimation } from "leaflet";
import ReviewItem from "./ReviewItem";

const Reviews = ({property}) => {
    const staff = 4.9
    const amenities = 4.8
    const cleanliness = 5
    const comfort = 4.9
    const valueForMoney = 4.9
    const geographicSituation = 4.8
    const rates = [
        {
            name: "Staff",
            rate: 4.9
        },
        {
            name: "Amenities",
            rate: 4.8
        },
        {
            name: "Cleanliness",
            rate: 5
        },
        {
            name: "Comfort",
            rate: 4.9
        },
        {
            name: "Value For Money",
            rate: 4.9
        },
        {
            name: "Geographic Situation",
            rate: 4.8
        }
    ]

  return (
    <div>
      <div className="flex gap-2">
        <BasicRating rate={property.rate} />
        <p className="text-slate-500">
          {property.rate} ({reviews.length})
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-5">
        {rates.map((item, index) => {
            return (
                <div className="flex flex-col gap-y-1" key={index}>
                    <div className="flex justify-between w-full items-center">
                        <p>{item.name}</p>
                        <p className="text-primary">{item.rate}</p>
                    </div>
                    <div className="bg-slate-200 w-full h-1.5 rounded-full">
                        <div className="bg-primary h-full rounded-full" style={{width: `${(item.rate / 5) * 100}%`}}></div>
                    </div>
                </div>
            )
        })}
      </div>
      <div className="flex justify-end my-4">
        <button className="bg-primary hover:bg-primary-dull text-white rounded-md px-2 py-2">Add a review</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-4">
        {reviews.map(item => {
            return <ReviewItem key={item.id} review={item} />
        })}
      </div>
    </div>
  );
};

export default Reviews;
