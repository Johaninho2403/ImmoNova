/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import ImageList from "../components/ImageList";
import { facilities, user } from "../assets/assets";
import Navbar from "../components/Navbar";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
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
import { Skeleton } from "@mui/material";
import ImageListSkeleton from "../components/ImageListSkeleton";
import AddReview from "../components/AddReview";

const SingleProperty = () => {
  const [showSwiper, setShowSwiper] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { property } = useLoaderData();

  const waitReviews = async () => {
    const { data } = await property;

    if (data) {
      setReviews(data.property.reviews);
    }
  };

  useEffect(() => {
    waitReviews();
  }, [property]);

  return (
    property && (
      <div>
        <Navbar />
        <div className="px-[5%] md:px-[10%] lg:px-[15%] overflow-hidden">
          <Suspense
            fallback={
              <div className="flex justify-between items-center my-5!">
                <Skeleton variant="rounded" className="w-40! h-3!" />
                <Skeleton variant="circular" className="w-10! h-10!" />
              </div>
            }
          >
            <Await resolve={property}>
              {({ data }) => <PropertyTitle property={data.property} />}
            </Await>
          </Suspense>
          <Suspense fallback={<ImageListSkeleton />}>
            <Await resolve={property}>
              {({ data }) => (
                <ImageList
                  images={data.property.images}
                  setShowSwiper={setShowSwiper}
                  setCurrentImage={setCurrentImage}
                />
              )}
            </Await>
          </Suspense>

          <div className="my-5 flex flex-col gap-y-5">
            <div className="flex justify-between items-center">
              <Suspense
                fallback={<Skeleton variant="rounded" className="w-20! h-3!" />}
              >
                <Await resolve={property}>
                  {({ data }) => (
                    <p className="text-sm sm:text-xl text-slate-500">
                      {data.property.category.name}
                    </p>
                  )}
                </Await>
              </Suspense>

              <div className="flex text-slate-600 justify-between gap-4">
                <Suspense
                  fallback={
                    <Skeleton variant="rounded" className="w-40! h-3!" />
                  }
                >
                  <Await resolve={property}>
                    {({ data }) => {
                      return (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="text-primary">
                              <FaBed />
                            </div>
                            <div className="whitespace-nowrap text-sm">
                              {data.property.bedrooms} bedroom
                              {data.property.bedrooms > 1 && "s"}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-primary">
                              <FaBath />
                            </div>
                            <div className="whitespace-nowrap text-sm overflow-hidden text-ellipsis">
                              {data.property.bathrooms} bathroom
                              {data.property.bathrooms > 1 && "s"}
                            </div>
                          </div>
                        </>
                      );
                    }}
                  </Await>
                </Suspense>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col justify-between">
                <Suspense
                  fallback={
                    <Skeleton variant="rounded" className="w-20! h-3!" />
                  }
                >
                  <Await resolve={property}>
                    {({ data }) => {
                      return (
                        <div className="flex items-center gap-2">
                          <div className="text-primary text-xl">
                            <FaLocationDot />
                          </div>
                          <p className="text-slate-500">{data.property.city}</p>
                        </div>
                      );
                    }}
                  </Await>
                </Suspense>
                <Suspense
                  fallback={
                    <Skeleton variant="rounded" className="w-10! h-3!" />
                  }
                >
                  <Await resolve={property}>
                    {({ data }) => (
                      <div className="flex items-center gap-2">
                        <div className="text-primary text-xl">
                          <BiSolidArea />
                        </div>
                        <p className="text-slate-500">
                          {data.property.superficy} m²
                        </p>
                      </div>
                    )}
                  </Await>
                </Suspense>

                <Suspense
                  fallback={
                    <Skeleton variant="rounded" className="w-15! h-3!" />
                  }
                >
                  <Await resolve={property}>
                    {({ data }) => (
                      <div className="flex items-center gap-2">
                        <span>XAF</span>
                        <span className="text-2xl">
                          <span className="text-primary">
                            {data.property.price}
                          </span>{" "}
                          / <sub className="text-slate-500">Night</sub>
                        </span>
                      </div>
                    )}
                  </Await>
                </Suspense>
              </div>
              <div className="flex flex-col gap-y-2 items-center">
                <Suspense
                  fallback={
                    <Skeleton
                      variant="circular"
                      className="w-15! h-15! self-center!"
                    />
                  }
                >
                  <Await resolve={property}>
                    {({ data }) => {
                      const { property } = data;
                      const { host } = property;
                      return host.avatar ? (
                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="w-15 h-15 rounded-full object-cover self-center"
                        />
                      ) : (
                        <div className="flex justify-center items-center bg-black text-white w-15 h-15 rounded-full self-center">
                          {host.name[0].toUpperCase()}
                        </div>
                      );
                    }}
                  </Await>
                </Suspense>

                <Suspense
                  fallback={
                    <div className="flex justify-center items-center">
                      <Skeleton
                        variant="rounded"
                        className="w-15! h-3! mx-auto!"
                      />
                    </div>
                  }
                >
                  <Await resolve={property}>
                    {({ data }) => {
                      const { property } = data;
                      const { host } = property;
                      return (
                        <p className="text-xl font-medium self-center">
                          {host.name}
                        </p>
                      );
                    }}
                  </Await>
                </Suspense>
                <Suspense
                  fallback={
                    <Skeleton variant="rounded" className="w-20! h-3!" />
                  }
                >
                  <Await resolve={property}>
                    {({ data }) => (
                      <button className="bg-primary hover:bg-primary-dull transition-all duration-300 text-white px-2 py-1 rounded-md">
                        Contact the host
                      </button>
                    )}
                  </Await>
                </Suspense>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-x-2 gap-y-4">
              <Suspense
                fallback={
                  <div className="flex flex-col gap-y-2 w-full md:max-w-2/5"></div>
                }
              >
                <Await resolve={property}>
                  {({ data }) => (
                    <p className="w-full md:max-w-2/5 max-sm:text-sm text-[#4a4646]">
                      {showDescription
                        ? data.property.description
                        : data.property.description.slice(0, 450)}
                      <span
                        className="ml-1 text-primary cursor-pointer"
                        onClick={() => setShowDescription(!showDescription)}
                      >
                        {showDescription ? "Read Less" : "...Read More"}
                      </span>
                    </p>
                  )}
                </Await>
              </Suspense>
              <Suspense
                fallback={
                  <Skeleton
                    variant="rectangular"
                    className="md:w-2/5! md:min-w-80! rounded-md! h-100!"
                  />
                }
              >
                <Await resolve={property}>
                  {({ data }) => <BookingForm property={data.property} />}
                </Await>
              </Suspense>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-y-5 gap-x-1">
              <div className="w-full md:w-2/5">
                <h1 className="text-xl font-medium mb-5">Facilities</h1>
                <div className="grid grid-cols-2 gap-3 items-center w-full sm:w-80 justify-between">
                  <Suspense
                    fallback={new Array(6).fill(0).map((_, index) => {
                      return (
                        <Skeleton
                          variant="rectangular"
                          className="w-15! h-6! rounded-md!"
                          key={index}
                        />
                      );
                    })}
                  >
                    <Await resolve={property}>
                      {({ data }) => {
                        const { property } = data;
                        const { propertiesOnFacilities } = property;
                        return propertiesOnFacilities.map((item, index) => {
                          return (
                            <div className="" key={item.facility.id}>
                              <div
                                className={`flex gap-3 ${index % 2 == 1 && "justify-end"}`}
                              >
                                <img
                                  src={item.facility.image}
                                  alt=""
                                  className="w-5 h-5"
                                />
                                <h2 className="text-sm font-medium">
                                  {item.facility.name}
                                </h2>
                              </div>
                            </div>
                          );
                        });
                      }}
                    </Await>
                  </Suspense>
                </div>
                <button className="my-4 rounded-md bg-[#f2f2f2] transition-all duration-300 py-2 px-2">
                  Show all {facilities.length} facilities
                </button>
              </div>
              <div
                className={`w-full md:w-2/5 md:min-w-80 aspect-square ${showSwiper && "-z-10"}`}
              >
                <Suspense
                  fallback={
                    <Skeleton
                      variant="rectangular"
                      className="w-full! h-full!"
                    />
                  }
                >
                  <Await resolve={property}>
                    {({ data }) => <Map properties={[data.property]} />}
                  </Await>
                </Suspense>
              </div>
            </div>
            <Suspense>
              <Await resolve={property}>
                {({ data }) => (
                  <div>
                    <Reviews property={data.property} reviews={reviews} />
                  </div>
                )}
              </Await>
            </Suspense>
          </div>
        </div>

        {showSwiper && (
          <Suspense>
            <Await resolve={property}>
              {({ data }) => (
                <ImageSwiper
                  images={data.property.images}
                  currentImage={currentImage}
                  setShowSwiper={setShowSwiper}
                  setCurrentImage={setCurrentImage}
                />
              )}
            </Await>
          </Suspense>
        )}
        {showReviewModal && (
          <AddReview reviews={reviews} setReviews={setReviews}/>
        )}
        <Footer />
      </div>
    )
  );
};

export default SingleProperty;
