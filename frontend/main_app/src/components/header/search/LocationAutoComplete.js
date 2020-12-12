import React, { memo, useContext, useCallback, useState } from "react";

import { locationContext } from "../../../App";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

const API_KEY = "AIzaSyDEoiDfpQW73648IFxcQUNIupKCOJKf6IQ";

const LocationAutoComplete = ({ icon }) => {
  const { addToast } = useToasts();

  // local state management
  const [addressPlaceholder, setAddressPlaceholder] = useState("Location");

  // using imported context
  const { address, lat, long, location, setLocation } = useContext(
    locationContext
  );

  // Log error status and clear dropdown when Google Maps API returns an error.
  const onError = useCallback((status, clearSuggestions) => {
    addToast("Google Maps API returned error with status: " + status, {
      appearance: "error",
      autoDismiss: true,
    });
    clearSuggestions();
  }, []);

  // limit the results to below constraints only
  const searchOptions = {
    types: ["address"],
    componentRestrictions: {
      country: ["in"],
    },
  };

  // handleChange
  const handleChange = useCallback(
    (add) => {
      setLocation(() => {
        return {
          ...location,
          address: add,
        };
      });
    },
    [location, setLocation]
  );

  // handleSelect
  const handleSelect = useCallback(
    (add) => {
      localStorage.setItem("address", add);
      geocodeByAddress(add)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          localStorage.setItem("lat", latLng.lat);
          localStorage.setItem("long", latLng.lng);
          setLocation(() => {
            return {
              address: add,
              lat: latLng.lat,
              long: latLng.lng,
            };
          });
        })
        .catch((error) => console.log("Address selection error: ", error));
    },
    [setLocation]
  );

  // --------------------------------------------------
  // ---------LOCATION SEARCH BLOCK STARTS HERE--------
  const getLocation = () => {
    if (navigator.geolocation) {
      if (address) {
        setLocation(() => {
          return {
            ...location,
            address: "",
          };
        });
      }
      setAddressPlaceholder(() => {
        return "Locating...";
      });
      navigator.geolocation.getCurrentPosition(showPosition, handleError, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });
    } else {
      alert(
        "This feature isn't supported. Try manually searching the address..."
      );
    }
  };

  const showPosition = (position) => {
    let posX = position.coords.latitude;
    let posY = position.coords.longitude;

    localStorage.setItem("lat", posX);
    localStorage.setItem("long", posY);

    setLocation(() => {
      return {
        ...location,
        lat: posX,
        long: posY,
      };
    });

    let currentLocation = "";

    let locAPI =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      posX +
      "," +
      posY +
      "&key=" +
      API_KEY;

    axios
      .get(locAPI)
      .then((response) => {
        currentLocation = response.data.results[0].formatted_address;
        // setting location box status to locating
        localStorage.setItem("address", currentLocation);
        setLocation(() => {
          return {
            ...location,
            address: currentLocation,
          };
        });
        setAddressPlaceholder(() => "Location");
        addToast(currentLocation, {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        addToast(error, {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .finally();
  };

  const handleError = (error) => {
    let errMsg = "";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errMsg =
          "PERMISSION_DENIED. Allow website to use location in site settings...";
        break;
      case error.POSITION_UNAVAILABLE:
        errMsg =
          "POSITION_UNAVAILABLE. Your current position is unavailable, please enter your location manually...";
        break;
      case error.TIMEOUT:
        errMsg = "Server timed out. Make sure Location service is turned on...";
        break;
      case error.UNKNOWN_ERROR:
        errMsg = "UNKNOWN_ERROR. Error code: 0";
        break;

      default:
        errMsg =
          "Something unexpected happened. We couldn't process your request...";
        break;
    }
    // setting location box status to locating
    setAddressPlaceholder(() => {
      return "Couldn't locate...";
    });
    addToast(errMsg, {
      appearance: "error",
      autoDismiss: true,
    });
  };

  // ----------LOCATION SEARCH BLOCK ENDS HERE---------
  // --------------------------------------------------

  return (
    <div className="fcc pos_rel f1">
      {icon && (
        <i className="fas fa-map-marker-alt search_bar_icon mar_l-8 mar_r-8"></i>
      )}
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        onError={onError}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="fccc pos_rel f1">
            <input
              {...getInputProps({
                placeholder: addressPlaceholder,
                className: "search_bar_input",
                autoFocus: false,
                required: true,
              })}
            />
            <div className="search_result add_sugestion_box">
              {loading && (
                <div className="fsm pad-8">
                  Loading... <i className="fas fa-circle-notch fa-spin"></i>
                </div>
              )}
              {suggestions.map((suggestion) => {
                const className = "fsm active_menu_opt";
                return (
                  <div
                    key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <div className="pad_l-16 pad_r-16 pad_b-8 pad_t-8 menu_options cur">
                      {suggestion.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {/* location utility btn */}
      <button
        className="btn fccc input_assist_btn search_bar_btn_pos cur"
        onClick={getLocation}
        type={"button"}
      >
        <i className="fas fa-crosshairs"></i>
      </button>
    </div>
  );
};

export default memo(LocationAutoComplete);
