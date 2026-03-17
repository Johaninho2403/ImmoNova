/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";
import { PiCity } from "react-icons/pi";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import CategoryTable from "../components/CategoryTable";
import FacilityTable from "./FacilityTable";
import DestinationTable from "./DestinationTable";
import UpdateCategoryModal from "./UpdateCategoryModal";
import UpdateFacilityModal from "./UpdateFacilityModal";
import UpdateDestinationModel from "./UpdateDestinationModal";

const Dashboard = () => {
  const { dashboardData, categories, facilities, destinations } =
    useLoaderData();
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [categoriesSelectionModel, setCategoriesSelectionModel] = useState({
    type: "include",
    ids: new Set(),
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [facilitiesArray, setFacilitiesArray] = useState([]);
  const [facilitiesSelectionModel, setFacilitiesSelectionModel] = useState({
    type: "include",
    ids: new Set(),
  });
  const [selectedFacility, setSelectedFacility] = useState(null);

  const [destinationsArray, setDestinationsArray] = useState([]);
  const [destinationsSelectionModel, setDestinationsSelectionModel] = useState({
    type: "include",
    ids: new Set(),
  });
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [openCategory, setOpenCategory] = useState(true);
  const [openFacility, setOpenFacility] = useState(true);
  const [openDestination, setOpenDestination] = useState(true);

  const waitData = async () => {
    if (categories) {
      const result = await categories;
      setCategoriesArray(result.data.categories);
    }
    if (facilities) {
      const result = await facilities;
      setFacilitiesArray(result.data.facilities);
    }
    if (destinations) {
      const result = await destinations;
      setDestinationsArray(result.data.destinations);
    }
  };

  useEffect(() => {
    waitData();
  }, [categories, facilities, destinations]);

  return (
    <div className="py-10 px-5 sm:px-10 w-full sm:w-[80%] sm:ml-[20%]">
      <h1 className="text-2xl font-medium">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 w-full">
        <div className="bg-[#10B981] rounded-md flex justify-between px-4 py-8 text-white cursor-pointer hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col gap-y-2">
            <p className="">Total Users</p>
            <Suspense
              fallback={
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  className="w-15! h-6!"
                />
              }
            >
              <Await resolve={dashboardData}>
                {({ data }) => (
                  <p className="font-medium text-xl">{data.users}</p>
                )}
              </Await>
            </Suspense>
          </div>
          <div className="text-4xl">
            <FaRegUserCircle />
          </div>
        </div>
        <div className="bg-[#4F49E4] rounded-md flex justify-between px-4 py-8 text-white cursor-pointer hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col gap-y-2">
            <p className="">Total Categories</p>
            <Suspense
              fallback={
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  className="w-15! h-6!"
                />
              }
            >
              <Await resolve={dashboardData}>
                {({ data }) => (
                  <p className="font-medium text-xl">{data.categories}</p>
                )}
              </Await>
            </Suspense>
          </div>
          <div className="text-4xl">
            <BiCategory />
          </div>
        </div>
        <div className="bg-[#3872FA] rounded-md flex justify-between px-4 py-8 text-white cursor-pointer hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col gap-y-2">
            <p className="">Total Facilities</p>
            <Suspense
              fallback={
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  className="w-15! h-6!"
                />
              }
            >
              <Await resolve={dashboardData}>
                {({ data }) => (
                  <p className="font-medium text-xl">{data.facilities}</p>
                )}
              </Await>
            </Suspense>
          </div>
          <div className="text-4xl">
            <TbAirConditioning />
          </div>
        </div>
        <div className="bg-[#F22C61] rounded-md flex justify-between px-4 py-8 text-white cursor-pointer hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col gap-y-2">
            <p className="">Total Destinations</p>
            <Suspense
              fallback={
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  className="w-15! h-6!"
                />
              }
            >
              <Await resolve={dashboardData}>
                {({ data }) => (
                  <p className="font-medium text-xl">{data.destinations}</p>
                )}
              </Await>
            </Suspense>
          </div>
          <div className="text-4xl">
            <PiCity />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-xl font-medium my-4">Categories</h2>
        {(categoriesSelectionModel.ids.size ||
          categoriesSelectionModel.type === "exclude") && (
          <button className="bg-red-500 text-white px-8 py-2 rounded-md">
            Delete
          </button>
        )}
      </div>
      <Suspense>
        <Await resolve={categories}>
          {() => {
            return (
              <div className="">
                <CategoryTable
                  categories={categoriesArray.map((item) => {
                    return {
                      id: item.id,
                      name: item.name,
                      image: item.image,
                      isPopular: item.isPopular,
                    };
                  })}
                  categoriesSelectionModel={categoriesSelectionModel}
                  setCategoriesSelectionModel={setCategoriesSelectionModel}
                  setSelectedCategory={setSelectedCategory}
                  setOpen={setOpenCategory}
                />
              </div>
            );
          }}
        </Await>
      </Suspense>
      <h2 className="text-xl font-medium my-4">Facilities</h2>
      <Suspense>
        <Await resolve={facilities}>
          {() => (
            <FacilityTable
              facilities={facilitiesArray.map((item) => {
                return {
                  id: item.id,
                  name: item.name,
                  image: item.image,
                  isPopular: item.isPopular,
                };
              })}
              facilitiesSelectionModel={facilitiesSelectionModel}
              setFacilitiesSelectionModel={setFacilitiesSelectionModel}
              setSelectedFacility={setSelectedFacility}
              setOpen={setOpenFacility}
            />
          )}
        </Await>
      </Suspense>
      <h2 className="text-xl font-medium my-4">Destinations</h2>
      <Suspense>
        <Await resolve={destinations}>
          {() => (
            <DestinationTable
              destinations={destinationsArray.map((item) => {
                return {
                  id: item.id,
                  city: item.city,
                  image: item.image,
                };
              })}
              destinationsSelectionModel={destinationsSelectionModel}
              setDestinationsSelectionModel={setDestinationsSelectionModel}
              setSelectedDestination={setSelectedDestination}
              setOpen={setOpenDestination}
            />
          )}
        </Await>
      </Suspense>
      {selectedCategory && (
        <UpdateCategoryModal
          open={openCategory}
          setOpen={setOpenCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setCategoryArray={setCategoriesArray}
        />
      )}
      {selectedFacility && (
        <UpdateFacilityModal
          open={openFacility}
          setOpen={setOpenFacility}
          selectedFacility={selectedFacility}
          setSelectedFacility={setSelectedFacility}
          setFacilitiesArray={setFacilitiesArray}
        />
      )}
      {selectedDestination && (
        <UpdateDestinationModel
          open={openDestination}
          setOpen={setOpenDestination}
          selectedDestination={selectedDestination}
          setSelectedDestination={setSelectedDestination}
          setDestinationsArray={setDestinationsArray}
        />
      )}
    </div>
  );
};

export default Dashboard;
