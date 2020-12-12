import React from "react";

import SuggestionAutocomplete from "./SuggestionAutocomplete";
import LocationAutoComplete from "./LocationAutoComplete";

const SearchBar = () => {
  // performQuery
  const performQuery = (e) => {
    e.preventDefault();
    console.log("Query performed without any search criteria.");
    alert(
      "This feature will be available soon. Sorry for the inconvenience caused."
    );
  };

  return (
    <div className="search_bar h-100 w-100 fjustc fend pos_rel">
      <form onSubmit={performQuery} className="fc search_bar_form w-100">
        <SuggestionAutocomplete />
        <LocationAutoComplete icon={true} />
        <button
          type={"submit"}
          className="mar_l-8 mar_r-8 btn fcc search_bar_btn cur"
        >
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
