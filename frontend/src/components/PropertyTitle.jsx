import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const PropertyTitle = ({property}) => {
    const [liked, setLiked] = useState(property.liked)
  return (
    <div className="flex justify-between items-center my-5">
      <h1 className='text-xl font-medium max-w-4/5'>{property.title}</h1>
      <div className={`cursor-pointer w-10 h-10 rounded-full shadow-[0px_0px_10px_rgba(0,0,0,0.2)] text-xl flex justify-center items-center ${liked && "text-red-500"}`} onClick={() => setLiked(!liked)}>{liked ? <FaHeart /> : <FaRegHeart />}</div>
    </div>
  );
}

export default PropertyTitle