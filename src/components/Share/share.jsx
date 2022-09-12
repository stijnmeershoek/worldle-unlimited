import React, { useMemo } from "react";
import copy from "copy-to-clipboard";
import { computeProximityPercent, getDirectionEmoji, generateSquares } from "../../globals/geography";

export function Share({ guesses, name, settingsData, hideImageMode, rotationMode, showAlert }) {
  const { theme } = settingsData;

  const shareText = useMemo(() => {
    var _a;
    const win = ((_a = guesses[guesses.length - 1]) === null || _a === void 0 ? void 0 : _a.distance) === 0;
    const bestDistance = Math.min(...guesses.map((guess) => guess.distance));
    const guessCount = win ? guesses.length : "X";
    const difficultyModifierEmoji = hideImageMode ? " 🙈" : rotationMode ? " 🌀" : "";
    const bestPercent = `(${computeProximityPercent(bestDistance)}%)`;
    const title = `#Worldle #${name} ${guessCount}/6 ${bestPercent}${difficultyModifierEmoji}`;
    const guessString = guesses
      .map((guess) => {
        const percent = computeProximityPercent(guess.distance);
        const squares = generateSquares(percent, theme).join("");
        const direction = getDirectionEmoji(guess);
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
