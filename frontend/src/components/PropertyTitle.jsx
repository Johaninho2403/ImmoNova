import React, { useContext, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import axios from "../lib/axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const PropertyTitle = ({ property }) => {
  const [liked, setLiked] = useState(property.saved);
  const { backendUrl } = useContext(AppContext);
  const handleSaved = async (id) => {
    try {
      setLiked(!liked);
      const { data } = await axios.post(
        `${backendUrl}/user/save-property/${id}`,
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-between items-center my-5">
      <h1 className="text-xl font-medium max-w-4/5">{property.title}</h1>
      <div
        className={`cursor-pointer w-10 h-10 rounded-full shadow-[0px_0px_10px_rgba(0,0,0,0.2)] text-xl flex justify-center items-center ${liked && "text-red-500"}`}
        onClick={() => handleSaved(property.id)}
      >
        {liked ? <FaHeart className="text-red-500"/> : <FaRegHeart/>}
      </div>
    </div>
  );
};

export default PropertyTitle;
