/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

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
  const [guests, setGuests] = useState(1)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const getCity = async () => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        try {
          const { data } = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`,
          );
          setCity(data.address.city)
        } catch (error) {
          console.log(error.message)
        }
        
      };
      getCity()
    });
  }, []);

  const value = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    city,
    setCity,
    guests,
    setGuests
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
