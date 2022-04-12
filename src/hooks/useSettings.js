import { useCallback, useState } from "react";
const defaultSettingsData = {
  noImageMode: false,
  rotationMode: false,
  distanceUnit: "km",
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
};
function loadSettings() {
  const storedSettings = localStorage.getItem("settings");
  const settingsData = storedSettings != null ? JSON.parse(storedSettings) : {};
  return Object.assign(Object.assign({}, defaultSettingsData), settingsData);
}
export function useSettings() {
  const [settingsData, setSettingsData] = useState(loadSettings());
  const updateSettingsData = useCallback(
    (newSettings) => {
      const updatedSettings = Object.assign(Object.assign({}, settingsData), newSettings);
      setSettingsData(updatedSettings);
      localStorage.setItem("settings", JSON.stringify(updatedSettings));
    },
    [settingsData]
  );
  return [settingsData, updateSettingsData];
}
