/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import axios from "../lib/axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [checkIn, setCheckIn] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [checkOut, setCheckOut] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
  );
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState(1);
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [nights, setNights] = useState(0);

  useEffect(() => {
    const diff = new Date(checkOut) - new Date(checkIn);
    setNights(Math.round(diff / 1000 / 60 / 60 / 24));
  }, [checkIn, checkOut]);

  const GEOPIFY_API_KEY = import.meta.env.VITE_GEOPIFY_API_KEY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const checkIsAuth = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/is-auth`);
      if (data.success) {
        setIsAuth(true);
      } else {
        setUserInfo(null);
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkIsAuth();
  }, [isAuth]);

  const value = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    city,
    setCity,
    guests,
    setGuests,
    GEOPIFY_API_KEY,
    backendUrl,
    isAuth,
    setIsAuth,
    userInfo,
    setUserInfo,
    nights,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
