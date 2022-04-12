import React, { useMemo } from "react";
import copy from "copy-to-clipboard";

export function Share({ guesses, name, settingsData, hideImageMode, rotationMode, showAlert }) {
  const MAX_DISTANCE_ON_EARTH = 20_000_000;
  const { theme } = settingsData;

  const generateSquares = (proximity, theme) => {
    const characters = new Array(5);
    const greenSquareCount = Math.floor(proximity / 20);
    const yellowSquareCount = proximity - greenSquareCount * 20 >= 10 ? 1 : 0;

    characters.fill("🟩", 0, greenSquareCount);
    characters.fill("🟨", greenSquareCount, greenSquareCount + yellowSquareCount);
    characters.fill(theme === "light" ? "⬜" : "⬛", greenSquareCount + yellowSquareCount);

    return characters;
  };

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

  const shareText = useMemo(() => {
    var _a;
    const win = ((_a = guesses[guesses.length - 1]) === null || _a === void 0 ? void 0 : _a.distance) === 0;
    const bestDistance = Math.min(...guesses.map((guess) => Number(guess.distance.toString().slice(0, -2))));
    const guessCount = win ? guesses.length : "X";
    const difficultyModifierEmoji = hideImageMode ? " 🙈" : rotationMode ? " 🌀" : "";
    const bestPercent = `(${Math.floor((Math.max(MAX_DISTANCE_ON_EARTH - bestDistance, 0) / MAX_DISTANCE_ON_EARTH) * 100).toString()}%)`;
    const title = `#Worldle ${guessCount}/6 ${bestPercent}${difficultyModifierEmoji}`;
    const guessString = guesses
      .map((guess) => {
        const percent = Math.floor((Math.max(MAX_DISTANCE_ON_EARTH - guess.distance, 0) / MAX_DISTANCE_ON_EARTH) * 100);
        const squares = generateSquares(percent, theme).join("");
        const direction = DIRECTION_ARROWS[guess.direction] || "🎉";
        return `${squares}${direction}`;
      })
      .join("\n");
    return [title, guessString].join("\n");
  }, [name, guesses, hideImageMode, rotationMode, theme]);

  return (
    <button
      onClick={() => {
        copy(shareText);
        showAlert("Copied results to clipboard", 2000);
      }}
      className="share-button"
    >
      Share
    </button>
  );
}
