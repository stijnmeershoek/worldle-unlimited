import React, { useEffect, useState } from "react";
import Twemoji from "react-twemoji";
import CountUp from "react-countup";
import { getDirectionEmoji, generateSquares, formatDistance } from "../../globals/geography";
import { useAppState } from "../../context/AppContext";

export function GuessRow({ guess }) {
  const { settingsData } = useAppState();
  const SQUARE_ANIMATION_LENGTH = 250;
  const [squares, setSquares] = useState([]);
  const [animationState, setAnimationState] = useState("NOT_STARTED");

  useEffect(() => {
    setAnimationState("NOT_STARTED");
    if (!guess) {
      return;
    }
    setSquares(generateSquares(guess.proximity, settingsData?.theme));
    setAnimationState("RUNNING");
    const timeout = setTimeout(() => {
      setAnimationState("ENDED");
    }, SQUARE_ANIMATION_LENGTH * 6);
    return () => {
      clearTimeout(timeout);
    };
  }, [guess, settingsData]);

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
            <span>{formatDistance(guess.distance, settingsData?.distanceUnit)}</span>
          </div>
          <div>
            <Twemoji options={{ className: "twemoji" }}>
              <span>{getDirectionEmoji(guess)}</span>
            </Twemoji>
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
