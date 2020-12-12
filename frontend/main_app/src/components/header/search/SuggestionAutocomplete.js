import React, { useState } from "react";

const SuggestionAutocomplete = () => {
  // local state management
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // speechRecognition
  const speechRecognition = () => {};

  return (
    <div className="fcc pos_rel f1">
      <i className="fas fa-search search_bar_icon mar_l-8 mar_r-8"></i>
      <input
        placeholder="Search jobs/people"
        type="text"
        className="search_bar_input"
      />
      <button
        className="btn fccc input_assist_btn search_bar_btn_pos cur"
        onClick={speechRecognition}
        type={"button"}
      >
        <i className="fas fa-microphone"></i>
      </button>
    </div>
  );
};

export default SuggestionAutocomplete;
