import React from "react";
import Panel from "../Panel";

export function Settings({ isOpen, close }) {
  return (
    <Panel title="Settings" isOpen={isOpen} close={close}>
      <div>
        <select id="distanceUnit">
          <option value="KM">KM</option>
          <option value="MI">MI</option>
        </select>
        <label htmlFor="distanceUnit">Unit of distance</label>
      </div>
      <div>
        <select id="theme">
          <option value="0">Light</option>
          <option value="1">Dark</option>
        </select>
        <label htmlFor="theme">Theme</label>
      </div>
      <div className="difficulty">
        <h3>Difficulty modifiers</h3>
        <span>
          <em>Starting the next worldle!</em>
        </span>
        <div>
          <input type="checkbox" id="setting-noImage"></input>
          <label htmlFor="setting-noImage">Hide country image htmlFor more of a challenge.</label>
        </div>
        <div>
          <input type="checkbox" id="setting-rotationMode"></input>
          <label htmlFor="setting-rotationMode">Randomly rotate country image.</label>
        </div>
      </div>
    </Panel>
  );
}
