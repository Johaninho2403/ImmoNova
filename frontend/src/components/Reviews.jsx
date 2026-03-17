/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { reviews } from "../assets/assets";
import { MdCleaningServices } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { FaKey } from "react-icons/fa";
import { IoChatboxSharp } from "react-icons/io5";
import { GiPositionMarker } from "react-icons/gi";
import BasicRating from "./BasicRating";
import { PosAnimation } from "leaflet";
import ReviewItem from "./ReviewItem";
import AddReview from "./AddReview";

const Reviews = ({ property, reviews, setReviews }) => {
  const [addReviewModal, setAddReviewModal] = useState(false);
  const rates = [
    {
      name: "Staff",
      rate: property.staff,
    },
    {
      name: "Facilities",
      rate: property.facilities,
    },
    {
      name: "Cleanliness",
      rate: property.cleanliness,
    },
    {
      name: "Comfort",
      rate: property.comfort,
    },
    {
      name: "Value For Money",
      rate: property.valueForMoney,
    },
    {
      name: "Geographic Situation",
      rate: property.geographicSituation,
    },
  ];

  return (
    <div>
      <div className="flex gap-2">
        <BasicRating rate={property.rate.toFixed(1)} />
        <p className="text-slate-500">
          {property.rate.toFixed(1)} ({property.reviews.length})
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-5">
        {rates.map((item, index) => {
          return (
            <div className="flex flex-col gap-y-1" key={index}>
              <div className="flex justify-between w-full items-center">
                <p className="whitespace-nowrap text-sm sm:text-base">
                  {item.name}
                </p>
                <p className="text-primary">{item.rate.toFixed(1)}</p>
              </div>
              <div className="bg-slate-200 w-full h-1.5 rounded-full">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${(item.rate / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-4">
        <button
          className="bg-primary hover:bg-primary-dull text-white rounded-md px-2 py-2"
          onClick={() => setAddReviewModal(true)}
        >
          Add a review
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-4">
        {reviews.map((item) => {
          return <ReviewItem key={item.id} review={item} />;
        })}
      </div>
      {addReviewModal && (
        <AddReview
          setAddReviewModal={setAddReviewModal}
          setReviews={setReviews}
        />
      )}
    </div>
  );
};

export default Reviews;
