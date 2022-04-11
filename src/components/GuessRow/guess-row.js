import React, { useEffect, useState } from "react";
import Twemoji from "react-twemoji";
import CountUp from "react-countup";

export function GuessRow({ guess }) {
  const SQUARE_ANIMATION_LENGTH = 250;
  const [squares, setSquares] = useState([]);
  const [animationState, setAnimationState] = useState("NOT_STARTED");

  useEffect(() => {
    setAnimationState("NOT_STARTED");
    if (!guess) {
      return;
    }
    setSquares(generateSquares());
    setAnimationState("RUNNING");
    const timeout = setTimeout(() => {
      setAnimationState("ENDED");
    }, SQUARE_ANIMATION_LENGTH * 6);
    return () => {
      clearTimeout(timeout);
    };
  }, [guess]);

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

  const generateSquares = () => {
    const characters = new Array(5);
    const greenSquareCount = Math.floor(guess.proximity / 20);
    const yellowSquareCount = guess.proximity - greenSquareCount * 20 >= 10 ? 1 : 0;

    characters.fill("🟩", 0, greenSquareCount);
    characters.fill("🟨", greenSquareCount, greenSquareCount + yellowSquareCount);
    characters.fill("⬜", greenSquareCount + yellowSquareCount);

    return characters;
  };

  switch (animationState) {
    case "NOT_STARTED":
      return <div className="blank-guess-row"></div>;
    case "RUNNING":
      return (
        <div className="guess-row animated">
          <div>
            {squares.map((character, index) => (
              <div
                key={index}
                className="square"
                style={{
                  animationDelay: `${SQUARE_ANIMATION_LENGTH * index}ms`,
                }}
              >
                <Twemoji options={{ className: "twemoji" }}>
                  <span>{character}</span>
                </Twemoji>
              </div>
            ))}
          </div>
          <div>
            <CountUp end={guess.proximity} suffix="%" duration={(SQUARE_ANIMATION_LENGTH * 5) / 1000} />
          </div>
        </div>
      );
    case "ENDED":
      return (
        <div className="guess-row">
          <div>
            <p>{guess.name}</p>
          </div>
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
          <div style={{ WebkitAnimation: "pop .5s ease-out forwards", animation: "pop .5s ease-out forwards" }}>
            <span>{guess.proximity}%</span>
          </div>
        </div>
      );
    default:
      return <div className="blank-guess-row"></div>;
  }
}
