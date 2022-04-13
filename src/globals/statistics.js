import { useCallback, useState } from "react";
const defaultStatsData = {
  gamesPlayed: 0,
  gamesWon: 0,
  winPercentage: 0,
  currentStreak: 0,
  maxStreak: 0,
  bestDistancesAvg: 0,
  guesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
};
function loadStats() {
  const storedStats = localStorage.getItem("statistics");
  const statsData = storedStats != null ? JSON.parse(storedStats) : {};
  return Object.assign(Object.assign({}, defaultStatsData), statsData);
}
export function useStats() {
  const [statsData, setStatsData] = useState(loadStats());
  const updateStatsData = useCallback(
    (newStats) => {
      const updatedStats = Object.assign(Object.assign({}, statsData), newStats);
      setStatsData(updatedStats);
      localStorage.setItem("statistics", JSON.stringify(updatedStats));
    },
    [statsData]
  );
  return [statsData, updateStatsData];
}
