/* eslint-disable react-hooks/set-state-in-effect */
import ImageList from "../components/ImageList";
import { facilities, properties, user } from "../assets/assets";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageSwiper from "../components/ImageSwiper";
import PropertyTitle from "../components/PropertyTitle";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidArea } from "react-icons/bi";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";
import Map from "../components/Map";
import Reviews from "../components/Reviews";
import BasicRating from "../components/BasicRating";

const SingleProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showSwiper, setShowSwiper] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    setProperty(properties.find((item) => item.id === Number(id)));
  }, [id]);

  return (
    property && (
      <div>
        <Navbar />
        <div className="px-[5%] md:px-[10%] lg:px-[15%] overflow-hidden">
          <PropertyTitle property={property} />
          <ImageList
            images={property.images}
            setShowSwiper={setShowSwiper}
            setCurrentImage={setCurrentImage}
          />
          <div className="my-5 flex flex-col gap-y-5">
            <div className="flex justify-between items-center">
              <p className="text-sm sm:text-xl text-slate-500">
                {property.category}
              </p>
              <div className="flex text-slate-600 justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="text-primary">
                    <FaBed />
                  </div>
                  <div className="whitespace-nowrap text-sm">
                    {property.bedroom} bedroom{property.bedroom > 1 && "s"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-primary">
                    <FaBath />
                  </div>
                  <div className="whitespace-nowrap text-sm overflow-hidden text-ellipsis">
                    {property.bathroom} bathroom{property.bathroom > 1 && "s"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-primary text-xl">
                    <FaLocationDot />
                  </div>
                  <p className="text-slate-500">{property.city}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-primary text-xl">
                    <BiSolidArea />
                  </div>
                  <p className="text-slate-500">300 m²</p>
                </div>
                <div className="flex items-center gap-2">
                  <span>XAF</span>
                  <span className="text-2xl">
                    <span className="text-primary">{property.price}</span> /{" "}
                    <sub className="text-slate-500">
                      {property.paymentFrequency}
                    </sub>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-15 h-15 rounded-full object-cover self-center"
                />
                <p className="text-xl font-medium self-center">{user.name}</p>
                <button className="bg-primary hover:bg-primary-dull transition-all duration-300 text-white px-2 py-1 rounded-md">
                  Contact the host
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-x-2 gap-y-4">
              <p className="w-full md:max-w-2/5 max-sm:text-sm text-[#4a4646]">
                {showDescription
                  ? property.description
                  : property.description.slice(0, 450)}
                <span
                  className="ml-1 text-primary cursor-pointer"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  {showDescription ? "Read Less" : "...Read More"}
                </span>
              </p>
              <BookingForm property={property} />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-y-5 gap-x-1">
              <div className="w-full md:w-2/5">
                <h1 className="text-xl font-medium mb-5">Facilities</h1>
                <div className="grid grid-cols-2 gap-3 items-center w-80">
                  {facilities.slice(0, 6).map((item) => {
                    return (
                      <div className="" key={item.id}>
                        <div className="flex gap-3">
                          <img src={item.image} alt="" className="w-5 h-5" />
                          <h2 className="text-sm font-medium">{item.name}</h2>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="my-4 rounded-md bg-[#f2f2f2] transition-all duration-300 py-2 px-2">
                  Show all {facilities.length} facilities
                </button>
              </div>
              <div className={`w-full md:w-2/5 md:min-w-80 aspect-square ${showSwiper && "-z-10"}`}>
                <Map properties={[property]} />
              </div>
            </div>
            <div>
              <Reviews property={property}/>
            </div>
          </div>
        </div>

        {showSwiper && (
          <ImageSwiper
            images={property.images}
            currentImage={currentImage}
            setShowSwiper={setShowSwiper}
            setCurrentImage={setCurrentImage}
          />
        )}
        <Footer />
      </div>
    )
  );
};

export default SingleProperty;
