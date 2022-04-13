import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { countriesWithImage } from "../globals/COUNTRIES";

const AppContext = createContext();

export function useAppState() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const defaultSettingsData = {
    noImageMode: false,
    rotationMode: false,
    distanceUnit: "km",
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  };
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [settingsData, setSettingsData] = useState(loadSettings());

  function loadSettings() {
    const storedSettings = localStorage.getItem("settings");
    const settingsData = storedSettings != null ? JSON.parse(storedSettings) : {};
    return Object.assign(Object.assign({}, defaultSettingsData), settingsData);
  }

  const updateSettings = useCallback(
    (newSettings) => {
      const updatedSettings = Object.assign(Object.assign({}, settingsData), newSettings);
      setSettingsData(updatedSettings);
      localStorage.setItem("settings", JSON.stringify(updatedSettings));
    },
    [settingsData]
  );

  useEffect(() => {
    async function generateCountry() {
      const randomCountry = countriesWithImage[Math.floor(Math.random() * countriesWithImage.length)];
      setCountry(randomCountry);
      setLoading(false);
    }
    generateCountry();
  }, []);

  return <AppContext.Provider value={{ country, settingsData, updateSettings }}>{loading ? <></> : children}</AppContext.Provider>;
}
