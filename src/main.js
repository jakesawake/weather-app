import "./style.css";
import { getWeather } from "./api-calls";
import "./display-weather.js";

const body = document.querySelector("body");

// selecting the name field in the input form (so we don't have to declare a specific ID for that one input field)
const locationInputField = document.querySelector("input[name='location']");
// selecting the entire form
const locationForm = document.querySelector("#location-form");

// weather URL to build api call string
let weatherUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

// leaving userInputCity null for the time being
let userLocation = null;

// api key to append to the end of the user input city
let apiKey = "?key=QHJPA4XZ2MVSAD73HT7RRF533";

// function to handle form submission
async function submitForm(e) {
  // preventing default behaviour of form after submitting
  e.preventDefault();
  // taking the users location in the locationInputField and then trimming any white space
  userLocation = locationInputField.value.trim();
  // guard clause for if no location was entered
  if (!userLocation) {
    throw new Error("No city entered");
  }
  // else log the string to the console
  console.log("city entered is:", userLocation);
  // using await to wait for getWeather to resolve
  // storing the result in weatherData variable so we can access the full API response object
  // and its properties
  const weatherData = await getWeather(weatherUrl + userLocation + apiKey);
  console.log(weatherData);
  // TODO: create helper function to convert temp from farenheit to celsius
  // NOTE: remove these two variables below in favor of having a function
  // to extract the data from weatherData object
  const temp = weatherData.currentConditions.temp;
  const conditions = weatherData.currentConditions.conditions;
  console.log(temp, conditions);
  // TODO: call function from display-weather.js here to take the weather data above
  // as an arguement
}

// adding event listener to the entire form in, listening for submit, if submit then use callback
locationForm.addEventListener("submit", submitForm);
