import React, { useContext, useState } from "react";
import HoverRating from "./HoverRating";
import axios from "../lib/axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AddReview = ({ setAddReviewModal, setReviews }) => {
  const [staff, setStaff] = useState(2.5);
  const [comfort, setComfort] = useState(2.5);
  const [valueForMoney, setValueForMoney] = useState(2.5);
  const [geographicSituation, setGeographicSituation] = useState(2.5);
  const [facilities, setFacilities] = useState(2.5);
  const [cleanliness, setCleanliness] = useState(2.5);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);
  const { id } = useParams();

  const handleSubmit = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${backendUrl}/review/create-review`, {
        staff,
        comfort,
        valueForMoney,
        geographicSituation,
        facilities,
        cleanliness,
        text,
        propertyId: id,
      });

      if (data.success) {
        toast.success(data.message);
        setReviews((prev) => [...prev, data.review]);
        setAddReviewModal(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10000">
      <div
        className="bg-black/30 absolute top-0 bottom-0 left-0 right-0"
        onClick={() => setAddReviewModal(false)}
      ></div>
      <div className="bg-white absolute top-1/2 left-1/2 -translate-1/2 rounded-md p-4 flex justify-center items-center">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-medium text-xl">Add a review</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2">
            <div className="">
              <p>Staff</p>
              <HoverRating rate={staff} setRate={setStaff} />
            </div>
            <div className="">
              <p>Comfort</p>
              <HoverRating rate={comfort} setRate={setComfort} />
            </div>
            <div className="">
              <p>Value For Money</p>
              <HoverRating rate={valueForMoney} setRate={setValueForMoney} />
            </div>
            <div className="">
              <p>Geographic Situation</p>
              <HoverRating
                rate={geographicSituation}
                setRate={setGeographicSituation}
              />
            </div>
            <div className="">
              <p>Facilities</p>
              <HoverRating rate={facilities} setRate={setFacilities} />
            </div>
            <div className="">
              <p>Cleanliness</p>
              <HoverRating rate={cleanliness} setRate={setCleanliness} />
            </div>
          </div>
          <div className="">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your review here"
              className="border border-slate-300 w-full min-h-40 p-4 rounded-md"
            ></textarea>
          </div>
          <button
            className="bg-primary text-white py-2 rounded-md hover:bg-primary-dull transition-all duration-300 flex justify-center items-center gap-2"
            onClick={handleSubmit}
          >
            <span>Add review</span>
            {isLoading && (
              <div className="border-x border-b border-white rounded-full w-5 h-5 animate-spin"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
