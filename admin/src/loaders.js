import axios from "./lib/axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const appLoader = async () => {
  const isAdmin = axios.get(`${backendUrl}/auth/is-admin`)
  return {
    isAdmin
  }
}

export const dashboardLoader = async () => {
  const dashboardData = axios.get(`${backendUrl}/dashboard-data`);
  const categories = axios.get(`${backendUrl}/category/get-categories`)
  const facilities = axios.get(`${backendUrl}/facility/get-facilities`);
  const destinations = axios.get(`${backendUrl}/destination/get-destinations`)
  return {
    dashboardData,
    categories,
    facilities,
    destinations
  };
};
