import React, { createContext, useContext, useEffect, useState } from "react";
import { COUNTRIES } from "../globals/COUNTRIES";

const AppContext = createContext();

export function useAppState() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");

  useEffect(() => {
    async function generateCountry() {
      const randomCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
      setCountry(randomCountry);
      setLoading(false);
    }
    generateCountry();
  }, []);

  return <AppContext.Provider value={{ country }}>{loading ? <></> : children}</AppContext.Provider>;
}
