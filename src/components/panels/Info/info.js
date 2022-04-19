import React from "react";
import Panel from "../Panel";
import { GuessRow } from "../../GuessRow";
import * as geolib from "geolib";
import Twemoji from "react-twemoji";
import { formatDistance } from "../../../globals/geography";

export function Info({ isOpen, close, settingsData }) {
  const MAX_DISTANCE_ON_EARTH = 20_000_000;
  const guess1 = {
    code: "CL",
    latitude: -35.675147,
    longitude: -71.542969,
    name: "Chile",
    distance: geolib.getDistance({ latitude: -35.675147, longitude: -71.542969 }, { latitude: 33.854721, longitude: 35.862285 }),
  };
  const guess2 = {
    code: "FI",
    latitude: 61.92411,
    longitude: 25.748151,
    name: "Finland",
    distance: geolib.getDistance({ latitude: 61.92411, longitude: 25.748151 }, { latitude: 33.854721, longitude: 35.862285 }),
  };

  const country = {
    code: "LB",
    latitude: 33.854721,
    longitude: 35.862285,
    name: "Lebanon",
  };

  return (
    <Panel title="How To Play" isOpen={isOpen} close={close}>
      <p>
        Guess the{" "}
        <strong>
          WOR<span className="accent">L</span>DLE
        </strong>{" "}
        in 6 guesses.
      </p>
      <p>Each guess must be a valid country, territory, ...</p>
      <p>After each guess, you will have the distance, the direction and the proximity from your guess and the target country.</p>
      <hr />
      <p>
        <strong>Examples</strong>
      </p>
      <GuessRow
        guess={{
          name: guess1.name,
          distance: guess1.distance,
          direction: geolib.getCompassDirection({ latitude: guess1.latitude, longitude: guess1.longitude }, { latitude: country.latitude, longitude: country.longitude }, (origin, dest) => Math.round(geolib.getRhumbLineBearing(origin, dest) / 45) * 45),
          proximity: Math.floor((Math.max(MAX_DISTANCE_ON_EARTH - guess1.distance, 0) / MAX_DISTANCE_ON_EARTH) * 100),
        }}
      />
      <p>
        Your guess <strong>{guess1.name}</strong> is {formatDistance(guess1.distance, settingsData.distanceUnit)} away from the target country, the target country is in the North-East direction and you have a only 32% of proximity because it's quite far away!
      </p>
      <GuessRow
        guess={{
          name: guess2.name,
          distance: guess2.distance,
          direction: geolib.getCompassDirection({ latitude: guess1.latitude, longitude: guess1.longitude }, { latitude: country.latitude, longitude: country.longitude }, (origin, dest) => Math.round(geolib.getRhumbLineBearing(origin, dest) / 45) * 45),
          proximity: Math.floor((Math.max(MAX_DISTANCE_ON_EARTH - guess2.distance, 0) / MAX_DISTANCE_ON_EARTH) * 100),
        }}
      />
      <p>
        Your second guess <strong>FINLAND</strong> is getting closer! {formatDistance(guess2.distance, settingsData.distanceUnit)} away, South-East direction and 83%!
      </p>
      <GuessRow
        guess={{
          name: country.name,
          distance: 0,
          proximity: 100,
        }}
      />
      <p>
        Next guess, <strong>LEBANON</strong>, it's the country to guess! Congrats!{"  "}
        <Twemoji noWrapper={true}>
          <span> 🎉</span>
        </Twemoji>
      </p>
      <hr />
      <p>
        <strong>To try another WORLDLE just hit the play again button or refresh the page!</strong>
      </p>
      <hr />
      <p>
        <strong>
          WOR<span className="accent">L</span>DLE
        </strong>{" "}
        has been <strong>heavily</strong> inspired by{" "}
        <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noreferrer">
          Wordle
        </a>{" "}
        created by Josh Wardle (
        <a href="https://twitter.com/powerlanguish" target="_blank" rel="noreferrer">
          @powerlanguish
        </a>
        ).
      </p>
      <hr />
      <p>
        Made by{" "}
        <a href="https://twitter.com/teuteuf" target="_blank" rel="noreferrer">
          @teuteuf
        </a>{" "}
        and{" "}
        <a href="https://github.com/stijnmeershoek" target="_blank" rel="noreferrer">
          Stijn Meershoek
        </a>
      </p>
    </Panel>
  );
}
