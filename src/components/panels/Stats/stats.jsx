import React from "react";
import Panel from "../Panel";
import { formatDistance } from "../../../globals/geography";

export function Stats({ isOpen, close, statsData, settingsData }) {
  return (
    <Panel title="Statistics" isOpen={isOpen} close={close}>
      <div className="top-stats">
        <div>
          <h1>{statsData.gamesPlayed}</h1>
          <p>Played</p>
        </div>
        <div>
          <h1>{Math.round(statsData.winPercentage)}</h1>
          <p>Win %</p>
        </div>
        <div>
          <h1>{statsData.currentStreak}</h1>
          <p>
            Current
            <br />
            Streak
          </p>
        </div>
        <div>
          <h1>{statsData.maxStreak}</h1>
          <p>
            Max
            <br />
            Streak
          </p>
        </div>
      </div>
      <span className="average">{formatDistance(statsData.bestDistancesAvg, settingsData.distanceUnit)}</span>
      <span className="average-label">Best Distances Average</span>
      <h3>Guess Distribution:</h3>
      <ul className="guess-distribution">
        {Object.entries(statsData.guesses).map(([index, count]) => (
          <li key={index}>
            <div className="index">{index}</div>
            <div
              className="bar"
              style={{
                flex: `0 1 ${Math.round((count / Object.values(statsData.guesses).reduce((a, b) => a + b)) * 100)}%`,
              }}
            />
            <div className="count">{count}</div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
