import "./App.css";
import React, { useState, useEffect } from "react";
import Twemoji from "react-twemoji";
import { countries } from "./globals/COUNTRIES";
import * as geolib from "geolib";
import { useAppState } from "./context/AppContext";
import { Icon } from "./components/Icon";
import { AutoComplete } from "./components/AutoComplete";
import { GuessRow } from "./components/GuessRow";
import { Share } from "./components/Share";
import { Alert } from "./components/Alert";
import { Info } from "./components/panels/Info";
import { Settings } from "./components/panels/Settings";
import { Stats } from "./components/panels/Stats";
import { computeProximityPercent } from "./globals/geography";
import { useStats } from "./globals/statistics";
import { InstallPWA } from "./components/InstallPWA/install";

export default function App() {
  const MAX_TRIES = 6;
  const { country, settingsData, updateSettings, generateCountry } = useAppState();
  const [finished, setFinished] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [clear, setClear] = useState(false);

  const [infoOpen, setInfoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const [statsData, updateStatsData] = useStats();

  function playAgain() {
    setFinished(false);
    setAlerts([]);
    setGuesses([]);
    generateCountry();
  }

  useEffect(() => {
    if (settingsData.theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [settingsData.theme]);

  useEffect(() => {
    if (guesses.length === 0 || !statsData || !finished) return;
    const guessesStats = statsData.guesses;
    if (guesses[guesses.length - 1]?.distance === 0) {
      Object.entries(guessesStats).forEach((item, index) => {
        if (index + 1 === guesses.length) {
          guessesStats[index + 1] = item[1] + 1;
        }
        return;
      });
    }

    updateStatsData({
      gamesPlayed: statsData.gamesPlayed + 1,
      gamesWon: guesses.length === MAX_TRIES ? statsData.gamesWon : statsData.gamesWon + 1,
      winPercentage: guesses.length === MAX_TRIES ? (statsData.gamesWon / (statsData.gamesPlayed + 1)) * 100 : ((statsData.gamesWon + 1) / (statsData.gamesPlayed + 1)) * 100,
      currentStreak: guesses.length === MAX_TRIES ? 0 : statsData.currentStreak + 1,
      maxStreak: guesses.length === MAX_TRIES ? statsData.maxStreak : statsData.currentStreak + 1 > statsData.maxStreak ? statsData.currentStreak + 1 : statsData.maxStreak,
      bestDistancesAvg: (statsData.bestDistancesAvg + Math.min(...guesses.map((guess) => guess.distance))) / 2,
      guesses: guessesStats,
    });
  }, [guesses]);

  const submitGuess = (e) => {
    e.preventDefault();
    setClear(true);
    const guessValue = e.target.guess.value;
    const guess = countries.filter((country) => country.name.toLowerCase() === guessValue.toLowerCase())[0];
    if (countries.some((country) => country.name.toLowerCase() === guessValue.toLowerCase())) {
      if (guessValue.toLowerCase() === country.name.toLowerCase()) {
        setFinished(true);
        const GUESS = {
          name: guessValue,
          distance: 0,
          proximity: 100,
        };
        showAlert("Well Done!", null, "correct");
        setGuesses((prev) => [...prev, GUESS]);
        return;
      } else {
        if (guesses.length + 1 === 6) {
          setFinished(true);
          showAlert(country.name.toUpperCase(), null, "failed");
        }
        const distance = geolib.getDistance({ latitude: guess.latitude, longitude: guess.longitude }, { latitude: country.latitude, longitude: country.longitude });
        const GUESS = {
          name: guessValue,
          distance: distance,
          direction: geolib.getCompassDirection({ latitude: guess.latitude, longitude: guess.longitude }, { latitude: country.latitude, longitude: country.longitude }, (origin, dest) => Math.round(geolib.getRhumbLineBearing(origin, dest) / 45) * 45),
          proximity: computeProximityPercent(distance),
        };
        setGuesses((prev) => [...prev, GUESS]);
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
        {alerts.map((alert, index) => {
          return <Alert key={index} message={alert.message} duration={alert.duration} type={alert.type} />;
        })}
      </div>
      <Info
        isOpen={infoOpen}
        close={() => {
          setInfoOpen(false);
        }}
        settingsData={settingsData}
      />
      <Settings
        isOpen={settingsOpen}
        close={() => {
          setSettingsOpen(false);
        }}
        settingsData={settingsData}
        updateSettings={updateSettings}
      />
      <Stats
        isOpen={statsOpen}
        close={() => {
          setStatsOpen(false);
        }}
        statsData={statsData}
        settingsData={settingsData}
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
          <InstallPWA />
        </div>
        <div className="logo">
          <h1>
            WOR<span className="accent">L</span>DLE
          </h1>
          <span>(unlimited)</span>
        </div>
        <div>
          <button
            onClick={() => {
              setStatsOpen(true);
            }}
          >
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
      {settingsData.noImageMode ? (
        <></>
      ) : (
        <div className="country">
          <Icon name={country.code.toLowerCase()} settingsData={settingsData} />
        </div>
      )}

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
            <Share guesses={guesses} name={country.name} settingsData={settingsData} hideImageMode={settingsData.noImageMode} rotationMode={settingsData.rotationMode} showAlert={showAlert} />
            <button className="play-again-button" onClick={playAgain}>
              Play Again
            </button>
            <div className="view-on">
              <Twemoji options={{ className: "twemoji" }}>
                <span>👀</span>
              </Twemoji>
              <a href={`https://www.google.com/maps?q=${country.name}+${country.code.toUpperCase()}`} target="_blank" rel="noopener noreferrer">
                On Google Maps
              </a>
            </div>
            <div className="view-on">
              <Twemoji options={{ className: "twemoji" }}>
                <span>📚</span>
              </Twemoji>
              <a href={`https://en.wikipedia.org/wiki/${country.name}`} target="_blank" rel="noopener noreferrer">
                On Wikipedia
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
