import React, { Suspense } from "react";
import Hero from "../components/Hero";
import PopularCities from "../components/PopularCities";
import PopularCategories from "../components/PopularCategories";
import PopularProperties from "../components/PopularProperties";
import Services from "../components/Services";
import NewLetters from "../components/NewLetters";
import Testimonials from "../components/Testimonials";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Await, useLoaderData } from "react-router-dom";
import GridSkeleton from "../components/GridSkeleton";
import { Skeleton } from "@mui/material";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";

const Home = () => {
  const { popularDestinations, popularCategories, popularProperties } =
    useLoaderData();
    
  return (
    <div>
      <Navbar />
      <Hero />
      <Suspense
        fallback={
          <div>
            <Skeleton variant="rounded" className="my-10! w-60! h-5! mx-auto" />
            <GridSkeleton />
          </div>
        }
      >
        <Await
          resolve={popularDestinations}
          errorElement={
            <div>
              <Skeleton
                variant="rounded"
                className="my-10! w-60! h-5! mx-auto"
              />
              <GridSkeleton />
            </div>
          }
        >
          {({ data }) => {
            return <PopularCities destinations={data.destinations} />;
          }}
        </Await>
      </Suspense>
      <Suspense
        fallback={
          <div>
            <Skeleton variant="rounded" className="my-10! w-60! h-5! mx-auto" />
            <GridSkeleton />
          </div>
        }
      >
        <Await
          resolve={popularCategories}
          errorElement={
            <div>
              <Skeleton
                variant="rounded"
                className="my-10! w-60! h-5! mx-auto"
              />
              <GridSkeleton />
            </div>
          }
        >
          {({ data }) => (
            <PopularCategories categories={data.popularCategories} />
          )}
        </Await>
      </Suspense>
      <Suspense
        fallback={
          <div className="px-2.5 md:px-[5%] lg:px-[10%]">
            <Skeleton variant="rounded" className="my-10! w-60! h-5! mx-auto" />
            <div className="grille gap-2 sm:gap-5">
              {new Array(12).fill(0).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          </div>
        }
      >
        <Await resolve={popularProperties}>
          {({ data }) => (
            <PopularProperties properties={data.popularProperties} />
          )}
        </Await>
      </Suspense>
      <Services />
      <Testimonials />
      <NewLetters />
      <Footer />
    </div>
  );
};

export default Home;
