import React from "react";
import BasicRating from "./BasicRating";

const ReviewItem = ({ review }) => {
  return (
    <div className="flex flex-col gap-y-1 justify-between">
      <div className="flex items-center gap-2">
        {review.author.avatar ? <img
          src={review.avatar}
          alt="avatar"
          className="w-10 h-10 object-cover rounded-full"
        /> :
        
        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-black text-white">{review.author.name[0].toUpperCase()}</div>}
        <p>{review.author.name}</p>
      </div>
      <div className="flex gap-2 items-center">
        <div className="">
          <BasicRating rate={review.rate} />
        </div>
        <p className="text-slate-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
      </div>
      <p className="line-clamp-3 h-18">{review.text}</p>
      {review.text.length > 200 && <p className="hover:text-primary hover:underline cursor-pointer self-start">
        Read More
      </p>}
    </div>
  );
};

export default ReviewItem;
