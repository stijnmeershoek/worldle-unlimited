import React from "react";
import Twemoji from "react-twemoji";

export default function Panel({ children, title, isOpen, close }) {
  return (
    <div id="modal" className={!isOpen ? "visually-hidden" : ""}>
      <header>
        <h2>{title.toUpperCase()}</h2>
        <button className="close-btn" onClick={close}>
          <Twemoji noWrapper={true} options={{ className: "twemoji" }}>
            <div>❌</div>
          </Twemoji>
        </button>
      </header>
      <div className="content">{children}</div>
    </div>
  );
}
