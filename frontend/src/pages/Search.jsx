import React, { Suspense, useState } from "react";
import SearchForm from "../components/SearchForm";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";
import PropertyCard from "../components/PropertyCard";
import Map from "../components/Map";
import Filters from "../components/Filters";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaginationControlled from "../components/PaginationControlled";
import { Await, useLoaderData } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { properties } = useLoaderData();

  return (
    properties && (
      <>
        <Navbar />
        <div className="mx-auto max-sm:mx-2.5 max-w-200 rounded-md md:rounded-full shadow-[0px_0px_10px_rgba(0,0,0,0.2)]">
          <SearchForm />
        </div>
        <div className="px-2.5 md:px-[5%] lg:px-[10%] my-5">
          <div className="flex justify-between items-center">
            <Suspense
              fallback={<Skeleton variant="rounded" className="w-40!" />}
            >
              <Await resolve={properties}>
                {({ data }) => (
                  <p className="flex items-center gap-2 text-[18px]">
                    <span className="text-primary text-xl">
                      {data.properties.length}
                    </span>{" "}
                    {data.properties.length > 1 ? "properties" : "property"}{" "}
                    found
                  </p>
                )}
              </Await>
            </Suspense>

            <button
              className="border border-black py-1 px-6 rounded-full"
              onClick={() => setShowFilters(true)}
            >
              Filters
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] justify-between gap-4 my-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 min-[1200px]:grid-cols-3! gap-5">
              <Suspense
                fallback={new Array(12).fill(0).map((item, index) => (
                  <PropertyCardSkeleton key={index} />
                ))}
              >
                <Await resolve={properties}>
                  {({ data }) => {
                    return data.properties.map((item) => (
                      <PropertyCard {...item} key={item.id} />
                    ));
                  }}
                </Await>
              </Suspense>
              {}
            </div>
            <div className="h-150 sticky top-20 hidden sm:block">
              <Suspense
                fallback={
                  <Skeleton
                    variant="rectangular"
                    className="w-full! h-full! rounded-md"
                  />
                }
              >
                <Await resolve={properties}>
                  {({ data }) => {
                    return data.properties.length ? (
                      <Map properties={data.properties} />
                    ) : (
                      <div className=""></div>
                    );
                  }}
                </Await>
              </Suspense>
            </div>
          </div>
          <Suspense
            fallback={<Skeleton variant="rounded" className="w-60! h-2!" />}
          >
            <Await resolve={properties}>
              {({ data }) => <PaginationControlled pages={data.totalPages} />}
            </Await>
          </Suspense>

          <Filters {...{ showFilters, setShowFilters }} />
        </div>
        <Footer />
      </>
    )
  );
};

export default Search;
