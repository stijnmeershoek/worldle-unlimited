import "./app.css";
import React, { useState } from "react";
import Twemoji from "react-twemoji";
import { countries } from "./globals/COUNTRIES";
import * as geolib from "geolib";
import { useAppState } from "./context/AppContext";
import { Icon } from "./components/Icon";
import { AutoComplete } from "./components/AutoComplete";
import { GuessRow } from "./components/GuessRow";
import { Alert } from "./components/Alert";
import { Info } from "./components/panels/Info";
import { Settings } from "./components/panels/Settings";

export default function App() {
  const MAX_DISTANCE_ON_EARTH = 20_000_000;
  const MAX_TRIES = 6;
  const { country } = useAppState();
  const [finished, setFinished] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [guesses, addGuess] = useState([]);
  const [clear, setClear] = useState(false);

  const [infoOpen, setInfoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const submitGuess = (e) => {
    e.preventDefault();
    setClear(true);
    const guessValue = e.target.guess.value;
    const guess = countries.filter((country) => country.name.toLowerCase() === guessValue.toLowerCase())[0];
    if (guesses.length + 1 === 6 && guessValue.toLowerCase() !== country.name.toLowerCase()) {
      setFinished(true);
      showAlert(country.name.toUpperCase(), null, "failed");
      const GUESS = {
        name: guessValue,
        distance: 0,
        proximity: 100,
      };
      addGuess((prev) => [...prev, GUESS]);
      return;
    }
    if (countries.some((country) => country.name.toLowerCase() === guessValue.toLowerCase())) {
      if (guessValue.toLowerCase() === country.name.toLowerCase()) {
        setFinished(true);
        const GUESS = {
          name: guessValue,
          distance: 0,
          proximity: 100,
        };
        showAlert("Well Done!", null, "correct");
        addGuess((prev) => [...prev, GUESS]);
        return;
      } else {
        const distance = geolib.getDistance({ latitude: guess.latitude, longitude: guess.longitude }, { latitude: country.latitude, longitude: country.longitude });
        const GUESS = {
          name: guessValue,
          distance: distance,
          direction: geolib.getCompassDirection({ latitude: guess.latitude, longitude: guess.longitude }, { latitude: country.latitude, longitude: country.longitude }, (origin, dest) => Math.round(geolib.getRhumbLineBearing(origin, dest) / 45) * 45),
          proximity: Math.floor((Math.max(MAX_DISTANCE_ON_EARTH - distance, 0) / MAX_DISTANCE_ON_EARTH) * 100),
        };
        addGuess((prev) => [...prev, GUESS]);
        return;
      }
    } else {
      showAlert("Invalid Country", 1000, "invalid");
    }
  };

  const showAlert = (message, duration = 1000, type) => {
    setAlerts((prevAlerts) => [...prevAlerts, { message: message, duration: duration, type: type }]);
  };

  return (
    <>
      <div className="alert-container">
        {alerts.map((alert) => {
          return <Alert message={alert.message} duration={alert.duration} type={alert.type} />;
        })}
      </div>
      <Info
        isOpen={infoOpen}
        close={() => {
          setInfoOpen(false);
        }}
      />
      <Settings
        isOpen={settingsOpen}
        close={() => {
          setSettingsOpen(false);
        }}
      />
      <header>
        <div>
          <button
            onClick={() => {
              setInfoOpen(true);
            }}
          >
            <Twemoji noWrapper={true} options={{ className: "twemoji" }}>
              <span>❓</span>
            </Twemoji>
          </button>
          <button>
            <Twemoji noWrapper={true} options={{ className: "twemoji" }}>
              <span>📲</span>
            </Twemoji>
          </button>
        </div>
        <div className="logo">
          <h1>
            WOR<span className="accent">L</span>DLE
          </h1>
          <span>(unlimited)</span>
        </div>
        <div>
          <button>
            <Twemoji noWrapper={true} options={{ className: "twemoji" }}>
              <span>📈</span>
            </Twemoji>
          </button>
          <button
            onClick={() => {
              setSettingsOpen(true);
            }}
          >
            <Twemoji noWrapper={true} options={{ className: "twemoji" }}>
              <span>⚙️</span>
            </Twemoji>
          </button>
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
            <AutoComplete clear={clear} setClear={setClear} />
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
