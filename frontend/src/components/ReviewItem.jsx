import React from 'react'
import BasicRating from './BasicRating'

const ReviewItem = ({review}) => {
  return (
    <div className="flex flex-col gap-y-1 justify-between">
      <div className="flex items-center gap-2">
        <img
          src={review.avatar}
          alt="avatar"
          className="w-10 h-10 object-cover rounded-full"
        />
        <p>{review.name}</p>
      </div>
      <div className="flex gap-2 items-center">
        <div className="">
          <BasicRating rate={review.rate} />
        </div>
        <p className='text-slate-500 text-sm'>22 Octobre 2025</p>
      </div>
      <p className='line-clamp-3 h-18'>{review.text}</p>
      <p className='hover:text-primary hover:underline cursor-pointer self-start'>Read More</p>
    </div>
  );
}

export default ReviewItem