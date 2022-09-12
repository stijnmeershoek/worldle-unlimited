import React from "react";
import Panel from "../Panel";

export function Settings({ isOpen, close, settingsData, updateSettings }) {
  return (
    <Panel title="Settings" isOpen={isOpen} close={close}>
      <div>
        <select id="distanceUnit" value={settingsData.distanceUnit} onChange={(e) => updateSettings({ distanceUnit: e.target.value })}>
          <option value="km">KM</option>
          <option value="miles">MI</option>
        </select>
        <label htmlFor="distanceUnit">Unit of distance</label>
      </div>
      <div>
        <select id="theme" value={settingsData.theme} onChange={(e) => updateSettings({ theme: e.target.value })}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <label htmlFor="theme">Theme</label>
      </div>
      <div className="difficulty">
        <h3>Difficulty modifiers</h3>
        <div>
          <input type="checkbox" id="setting-noImage" checked={settingsData.noImageMode} onChange={(e) => updateSettings({ noImageMode: e.target.checked })}></input>
          <label htmlFor="setting-noImage">Hide country image for more of a challenge.</label>
        </div>
        <div>
          <input type="checkbox" id="setting-rotationMode" checked={settingsData.rotationMode} onChange={(e) => updateSettings({ rotationMode: e.target.checked })}></input>
          <label htmlFor="setting-rotationMode">Randomly rotate country image.</label>
        </div>
      </div>
    </Panel>
  );
}
