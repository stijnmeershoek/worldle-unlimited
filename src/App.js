import "./app.css";
import React from "react";
import Twemoji from "react-twemoji";
import { useAppState } from "./context/AppContext";
import { Icon } from "./components/Icon";
import { AutoComplete } from "./components/AutoComplete";

export default function App() {
  const { country } = useAppState();

  return (
    <>
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
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="make-guess">
          <AutoComplete />
          <button className="guess-country">
            <Twemoji options={{ className: "twemoji" }}>
              <span>🌍</span>
            </Twemoji>
            GUESS
          </button>
        </div>
      </div>
    </>
  );
}
