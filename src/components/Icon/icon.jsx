import React, { useMemo } from "react";
import seedrandom from "seedrandom";

export const Icon = ({ name, settingsData, ...rest }) => {
  const randomAngle = useMemo(() => seedrandom.alea(name)() * 360, [name]);

  const imageScale = useMemo(() => {
    const normalizedAngle = 45 - (randomAngle % 90);
    const radianAngle = (normalizedAngle * Math.PI) / 180;
    return 1 / (Math.cos(radianAngle) * Math.sqrt(2));
  }, [randomAngle]);

  return <img src={`/images/countries/${name}/vector.svg`} alt="country image" {...rest} style={settingsData.rotationMode ? { transform: `rotate(${randomAngle}deg) scale(${imageScale})` } : {}} />;
};
