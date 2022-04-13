import React, { useEffect, useState } from "react";
import Twemoji from "react-twemoji";

export const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  return (
    <button onClick={supportsPWA ? onClick : null}>
      <Twemoji noWrapper={true} options={{ className: "twemoji" }}>
        <span>📲</span>
      </Twemoji>
    </button>
  );
};
