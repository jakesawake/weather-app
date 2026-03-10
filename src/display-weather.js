const weatherDataContainer = document.querySelector(".weather-data-container");
const body = document.querySelector("body");

// creating async function to load svg icon from a specific file path
// used in order to be able to use the fill property on raw svg element
// instead of creating an img element and pointing its src file
async function loadSvgIcon(path, container) {
  try {
    // pause function here and wait to fetch the path
    const response = await fetch(path);
    // using .text() method in order to retrieve the text content from the response
    const svgText = await response.text();
    // setting the innerHTML of whatever container we pass through to svgText
    container.innerHTML = svgText;
  } catch (error) {
    console.error("Failed to load SVG:", error);
  }
}
// NOTE: testing loadSvgIcon - placeholder for now
loadSvgIcon("/svg/wi-day-sunny.svg", weatherDataContainer);

// function that extracts weather data, takes weatherData as a parameter
// extracting relevant data like the temp, conditions, high, low, feels like, etc.
function extractWeatherData(data) {
  // getting the temp of the current city
  const temp = convertTemp(data.currentConditions.temp);
  // getting what the temp currently feels like
  const feelsLike = convertTemp(data.currentConditions.feelslike);
  // destructuring the object we returned from loopThroughDays into simpler variables
  // called high and low
  const { highTempCelsius: high, lowTempCelsius: low } = loopThroughDays(data);
  // getting the conditions of the current city
  const conditions = data.currentConditions.conditions;
  // TODO: might need to return a named object here ie. const extractedDataObj
  return { temp, feelsLike, high, low, conditions };
}

// helper function for converting farenheit to celsius
function convertTemp(temp) {
  // using Math.round to round to the nearest whole number
  // wrapping temp - 32 first so that gets calculated first before dividing
  return Math.round((temp - 32) / 1.8);
}

// function to get the current day's array in the API response object
// to get the max temp and min temp for the day, accessing the current days
// object and getting the feelslikemax and feelsikemin temps
function loopThroughDays(data) {
  // get that days high temp value (data is a object that has a nested array of objects)
  const highTempFarenheit = data.days[0].feelslikemax;
  // converting to celsius
  const highTempCelsius = convertTemp(highTempFarenheit);
  // get that days min temp value (data is a object that has a nested array of objects)
  const lowTempFarenheit = data.days[0].feelslikemin;
  // converting to celsius
  const lowTempCelsius = convertTemp(lowTempFarenheit);
  // returning object with the variables so we can use them in extractWeatherData
  return { highTempCelsius, lowTempCelsius };
}

// function for displaying styles for weather app
// takes the weather data object as an arguement (temp, feels like, high, low, conditions)
function displayWeather(data) {
  if (data.temp >= 20) {
    body.style.backgroundImage = "linear-gradient(to right, orange, yellow)";
    // TODO: if the temp is hot, call the loadSvgIcon function here with the sunny icon
  } else if (data.temp < 5) {
    body.style.backgroundImage = "linear-gradient(to right, white, grey)";
    // TODO: if the temp is cold, invoke the loadSvgIcon function here with cold icon
  } else {
    body.style.backgroundImage = "";
  }

  // container for the temp
  const tempContainer = document.createElement("div");
  tempContainer.classList.add("temp-container");
  tempContainer.textContent = data.temp;
  tempContainer.style.fontFamily = "system";

  // container for the feelsLike
  const feelsLikeContainer = document.createElement("div");
  feelsLikeContainer.classList.add("feels-like-container");
  feelsLikeContainer.textContent = data.feelsLike;
  feelsLikeContainer.style.fontFamily = "system";

  // TODO: create containers for high/low and conditions weather data

  // appending the newly created divs to the weatherDataContainer
  weatherDataContainer.appendChild(tempContainer);
  weatherDataContainer.appendChild(feelsLikeContainer);
}

export { extractWeatherData, displayWeather };
