import "./style.css";
import { getWeather } from "./api-calls";
import { extractWeatherData, displayWeather } from "./display-weather";

// selecting the name field in the input form (so we don't have to declare a specific ID for that one input field)
const locationInputField = document.querySelector("input[name='location']");
// selecting the entire form
const locationForm = document.querySelector("#location-form");
const submitFormBtn = document.querySelector("#submit-form-button");
const loadingSpinner = document.querySelector(".loading-spinner");

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
  // disabling the submit form button while the data is still being processed
  submitFormBtn.disabled = true;
  // showing the spinner
  loadingSpinner.classList.remove("hidden");
  // taking the users location in the locationInputField and then trimming any white space
  userLocation = locationInputField.value.trim();

  let userLocationEntered = true;
  // guard clause for if no location was entered
  if (!userLocation) {
    // hiding the spinner
    loadingSpinner.classList.add("hidden");
    // have the submit button ready to be clicked
    submitFormBtn.disabled = false;
    throw new Error("No city entered");
  }

  // using await to wait for getWeather to resolve
  // storing the result in weatherData variable so we can access the full API response object
  // and its properties -> wrapping code that might fail in try block
  try {
    const weatherData = await getWeather(weatherUrl + userLocation + apiKey);

    // calling extractWeatherData to take the needed info about the current cities weather
    // storing it in a variable so we can pass it off to the displayWeather function in display-weather.js
    const extractedData = extractWeatherData(weatherData);
    console.log(extractedData);

    // calling displayWeather function to display data graphically
    // since the displayWeather function is async (it awaits loadSvgIcon internally)
    // we await it here in our submitForm function
    await displayWeather(extractedData);

    // handling error below
  } catch (error) {
    console.error("Failed to fetch weather:", error);

    // using finally block -> code that always runs, regardless of any error
  } finally {
    // always hiding the spinner whether it succeeded or failed
    loadingSpinner.classList.add("hidden");
    // re-enabling submit button after the weather renders in
    submitFormBtn.disabled = false;
  }
}

// adding event listener to the entire form in, listening for submit, if submit then use callback
locationForm.addEventListener("submit", submitForm);
