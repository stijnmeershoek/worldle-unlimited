const MAX_DISTANCE_ON_EARTH = 20_000_000;
const DIRECTION_ARROWS = {
  N: "⬆️",
  NNE: "↗️",
  NE: "↗️",
  ENE: "↗️",
  E: "➡️",
  ESE: "↘️",
  SE: "↘️",
  SSE: "↘️",
  S: "⬇️",
  SSW: "↙️",
  SW: "↙️",
  WSW: "↙️",
  W: "⬅️",
  WNW: "↖️",
  NW: "↖️",
  NNW: "↖️",
};

export const getDirectionEmoji = (guess) => {
  return guess.distance === 0 ? "🎉" : DIRECTION_ARROWS[guess.direction];
};

export const computeProximityPercent = (distance) => {
  const proximity = Math.max(MAX_DISTANCE_ON_EARTH - distance, 0);
  return Math.floor((proximity / MAX_DISTANCE_ON_EARTH) * 100);
};

export const generateSquares = (proximity, theme) => {
  const characters = new Array(5);
  const greenSquareCount = Math.floor(proximity / 20);
  const yellowSquareCount = proximity - greenSquareCount * 20 >= 10 ? 1 : 0;

  characters.fill("🟩", 0, greenSquareCount);
  characters.fill("🟨", greenSquareCount, greenSquareCount + yellowSquareCount);
  characters.fill(theme === "light" ? "⬜" : "⬛", greenSquareCount + yellowSquareCount);

  return characters;
};

export const formatDistance = (distanceInMeters, distanceUnit) => {
  const distanceInKm = distanceInMeters / 1000;

  return distanceUnit === "km" ? `${Math.round(distanceInKm)}km` : `${Math.round(distanceInKm * 0.621371)}mi`;
};
