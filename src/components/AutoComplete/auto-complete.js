import { useState, useEffect } from "react";
import { countries } from "../../globals/COUNTRIES";

export const AutoComplete = ({ clear, setClear }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    const query = e.target.value.toLowerCase();
    if (query.length > 1) {
      const filterSuggestions = countries.filter((suggestion) => suggestion.name.toLowerCase().indexOf(query) > -1);
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.innerText.toUpperCase());
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.key === "ArrowUp") {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.key === "ArrowDown") {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // TAB
    else if (e.key === "Tab") {
      setValue(suggestions[suggestionIndex].name.toUpperCase());
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  useEffect(() => {
    if (clear) {
      setValue("");
      setSuggestionsActive(false);
      setClear(false);
    }
  }, [clear, setClear]);

  const Suggestions = () => {
    return (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          return (
            <li className={index === suggestionIndex ? "active" : ""} key={index} onClick={handleClick}>
              {suggestion.name}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="autocomplete">
      <input
        onSubmit={() => {
          console.log("submit");
        }}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        name="guess"
        placeholder="Country, territory..."
        autoComplete="off"
      />
      {suggestionsActive && <Suggestions />}
    </div>
  );
};
