import axios from "./lib/axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const HomePageLoaders = () => {
  const popularDestinations = axios.get(
    `${backendUrl}/destination/get-destinations`,
  );
  const popularCategories = axios.get(
    `${backendUrl}/category/popular-categories`,
  );
  const popularProperties = axios.get(
    `${backendUrl}/property/popular-properties`,
  );

  return {
    popularCategories,
    popularDestinations,
    popularProperties,
  };
};

export const searchPageLoader = () => {
  const url = URL.parse(document.location.href);
  const search = url.search;
  const properties = axios.get(
    `${backendUrl}/property/get-properties${search}`,
  );
  return { properties };
};

export const singlePropertyPage = ({ params }) => {
  const { id } = params;
  const property = axios.get(`${backendUrl}/property/${id}`);
  return {
    property,
  };
};

export const addPropertyLoader = () => {
  const isAuth = axios.get(`${backendUrl}/user/is-auth`);
  const categories = axios.get(`${backendUrl}/category/get-categories`);
  const facilities = axios.get(`${backendUrl}/facility/get-facilities`);

  return {
    isAuth,
    categories,
    facilities,
  };
};

export const myBookingsPageLoader = () => {
  const bookings = axios.get(`${backendUrl}/user/tenant-bookings`);
  return {
    bookings,
  };
};
