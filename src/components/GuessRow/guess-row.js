import React from "react";
import Twemoji from "react-twemoji";

export function GuessRow({ guess }) {
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

  return !guess ? (
    <div className="blank-guess-row"></div>
  ) : (
    <div className="guess-row">
      <div>{guess.name}</div>
      <div>
        <span>{Math.floor(guess.distance / 1000)}km</span>
      </div>
      <div>
        {guess.distance === 0 ? (
          <Twemoji options={{ className: "twemoji" }}>
            <span>🎉</span>
          </Twemoji>
        ) : (
          <Twemoji options={{ className: "twemoji" }}>
            <span>{DIRECTION_ARROWS[guess.direction]}</span>
          </Twemoji>
        )}
      </div>
      <div>
        <span>{guess.proximity}%</span>
      </div>
    </div>
  );
}
