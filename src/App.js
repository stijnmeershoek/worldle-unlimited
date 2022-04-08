import "./app.css";
import React, { useState } from "react";
import Twemoji from "react-twemoji";
import { COUNTRIES } from "./globals/COUNTRIES";
import * as geolib from "geolib";
import { useAppState } from "./context/AppContext";
import { Icon } from "./components/Icon";
import { AutoComplete } from "./components/AutoComplete";
import { GuessRow } from "./components/GuessRow";
import { Alert } from "./components/Alert";

export default function App() {
  const { country } = useAppState();
  const [finished, setFinished] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [guesses, addGuess] = useState([]);
  const MAX_DISTANCE_ON_EARTH = 20_000_000;
  const MAX_TRIES = 6;

  const submitGuess = (e) => {
    e.preventDefault();
    if (guesses.length >= 6) return;
    const guessValue = e.target.guess.value;
    const guess = COUNTRIES.filter((country) => country.name.toLowerCase() === guessValue.toLowerCase())[0];
    if (COUNTRIES.some((country) => country.name.toLowerCase() === guessValue.toLowerCase())) {
      if (guessValue.toLowerCase() === country.name.toLowerCase()) {
        setFinished(true);
        const GUESS = {
          name: guessValue,
          distance: 0,
          proximity: 100,
        };
        addGuess((prev) => [...prev, GUESS]);
      } else {
        const distance = geolib.getDistance({ latitude: guess.latitude, longitude: guess.longitude }, { latitude: country.latitude, longitude: country.longitude });
        const GUESS = {
          name: guessValue,
          distance: distance,
          direction: geolib.getCompassDirection({ latitude: guess.latitude, longitude: guess.longitude }, { latitude: country.latitude, longitude: country.longitude }, (origin, dest) => Math.round(geolib.getRhumbLineBearing(origin, dest) / 45) * 45),
          proximity: Math.floor((Math.max(MAX_DISTANCE_ON_EARTH - distance, 0) / MAX_DISTANCE_ON_EARTH) * 100),
        };
        addGuess((prev) => [...prev, GUESS]);
      }
    } else {
      showAlert("Invalid Country", 1000);
    }
  };

  const showAlert = (message, duration = 1000) => {
    if (duration == null) return;
    setAlerts((prevAlerts) => [...prevAlerts, { message: message, duration: duration }]);
  };

  return (
    <>
      <div className="alert-container">
        {alerts.map((alert) => {
          return <Alert message={alert.message} duration={alert.duration} />;
        })}
      </div>
      <header>
        <div>
          <Twemoji options={{ className: "twemoji" }}>
            <span>❓</span>
          </Twemoji>
          <Twemoji options={{ className: "twemoji" }}>
            <span>📲</span>
          </Twemoji>
        </div>
        <h1>
          WOR<span>L</span>DLE
        </h1>
        <div>
          <Twemoji options={{ className: "twemoji" }}>
            <span>📈</span>
          </Twemoji>
          <Twemoji options={{ className: "twemoji" }}>
            <span>⚙️</span>
          </Twemoji>
        </div>
      </header>
      <div className="country">
        <Icon name={country.code.toLowerCase()} />
      </div>
      <div className="guesses">
        <div className="guess-grid">
          {Array.from(Array(MAX_TRIES).keys()).map((index) => (
            <GuessRow key={index} guess={guesses[index]} />
          ))}
        </div>
        {!finished ? (
          <form className="make-guess" onSubmit={submitGuess}>
            <AutoComplete />
            <button type="submit" className="guess-country">
              <Twemoji options={{ className: "twemoji" }}>
                <span>🌍</span>
              </Twemoji>
              GUESS
            </button>
          </form>
        ) : (
          <>
            <button className="share-button">Share</button>
            <div className="view-on-maps">
              <Twemoji options={{ className: "twemoji" }}>
                <span>👀</span>
              </Twemoji>
              <a href={`https://www.google.com/maps?q=${country.name}+${country.code.toUpperCase()}`} target="_blank" rel="noopener noreferrer">
                On Google Maps
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
