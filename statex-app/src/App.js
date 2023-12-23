import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (countryName) => {
    
    axios
      .get(
        `https://crio-location-selector.onrender.com/country=${countryName}/states`
      )
      .then((response) => {
        setStates(response.data);
        setSelectedCountry(countryName);
        setSelectedState(null);
        setSelectedCity(null);
      })
      .catch((error) => console.error("Error fetching states:", error));
  };

  const handleStateChange = (stateName) => {
   
    axios
      .get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${stateName}/cities`
      )
      .then((response) => {
        setCities(response.data);
        setSelectedState(stateName);
        setSelectedCity(null);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCityChange = (cityName) => {
    
    setSelectedCity(cityName);
  };

  return (
    <>
      <h1>Select Location</h1>

      <div className="App">
        <select onChange={(e) => handleCountryChange(e.target.value)}>
          <option value="" disabled selected>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => handleStateChange(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="" disabled selected>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={!selectedState}
        >
          <option value="" disabled selected>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <p className="paragraph">
          You selected <span className="city">{selectedCity}, </span>
          <span className="state-country">{selectedState}, </span>
          <span className="state-country">{selectedCountry}</span>
        </p>
      )}
    </>
  );
};

export default App;
