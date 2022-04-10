import React, { createContext, useContext, useEffect, useState } from "react";
import { countriesWithImage } from "../globals/COUNTRIES";

const AppContext = createContext();

export function useAppState() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");

  useEffect(() => {
    async function generateCountry() {
      const randomCountry = countriesWithImage[Math.floor(Math.random() * countriesWithImage.length)];
      setCountry(randomCountry);
      setLoading(false);
    }
    generateCountry();
  }, []);

  return <AppContext.Provider value={{ country }}>{loading ? <></> : children}</AppContext.Provider>;
}
