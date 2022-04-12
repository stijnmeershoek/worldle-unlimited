import React, { useEffect, useRef, useState, useMemo } from "react";
import seedrandom from "seedrandom";

export const Icon = ({ name, settingsData, ...rest }) => {
  const ImportedIconRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const randomAngle = useMemo(() => seedrandom.alea(name)() * 360, [name]);

  const imageScale = useMemo(() => {
    const normalizedAngle = 45 - (randomAngle % 90);
    const radianAngle = (normalizedAngle * Math.PI) / 180;
    return 1 / (Math.cos(radianAngle) * Math.sqrt(2));
  }, [randomAngle]);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        const { default: namedImport } = await import(`../../globals/countries/${name}`);
        ImportedIconRef.current = namedImport;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef;
    return <ImportedIcon {...rest} style={settingsData.rotationMode ? { transform: `rotate(${randomAngle}deg) scale(${imageScale})` } : {}} />;
  }

  return null;
};
