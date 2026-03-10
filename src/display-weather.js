const weatherDataContainer = document.querySelector(".weather-data-container");
const body = document.querySelector("body");

// creating celsiusSymbol variable to store the celsius symbol with C
const celsiusSymbol = "\u00B0C";

// creating async function to load svg icon from a specific file path
// used in order to be able to use the fill property on raw svg element
// instead of creating an img element and pointing its src file
async function loadSvgIcon(path, container, className) {
  try {
    // pause function here and wait to fetch the path
    const response = await fetch(path);
    // using .text() method in order to retrieve the text content from the response
    const svgText = await response.text();
    // using insertAdjacentHTML so it appends the svg
    container.insertAdjacentHTML("beforeend", svgText);
    // selecting the containers svg element that's the last sibling of its
    // specific element name within its parent
    const svgElement = container.querySelector("svg:last-of-type");
    // if its a svg element and a className is passed in guard clause
    if (svgElement && className) {
      // add that passed in className to the svgElement
      svgElement.classList.add(className);
    }
  } catch (error) {
    console.error("Failed to load SVG:", error);
  }
}

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
  // returning multiple values as an object (since the order they come don't matter)
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
// making the function asynchronous so it plays nice with the loadSvgIcon function
async function displayWeather(data) {
  // clearing the weatherDataContainer before renderingso that every submission
  // replaces old data instead of continously appending it
  weatherDataContainer.innerHTML = "";
  if (data.temp >= 20) {
    // changing the background gradient to look hot
    body.style.backgroundImage = "linear-gradient(to right, orange, yellow)";
    // calling the loadSvgIcon to get the icon we want, appending it to the weatherDataContainer
    // making it the function pause here with await so that it can get the icon we need before
    // appending
    await loadSvgIcon(
      "/svg/wi-day-sunny.svg",
      weatherDataContainer,
      "sunny-icon",
    );
  } else if (data.temp < 5) {
    // make the background gradient look cold
    body.style.backgroundImage = "linear-gradient(to right, white, grey)";
    // loading the snowflake icon to make it look cold
    // using await to make the function pause hre so that we can load the icon we need
    // before appending all of the elements
    await loadSvgIcon(
      "/svg/wi-snowflake-cold.svg",
      weatherDataContainer,
      "cold-icon",
    );
  } else {
    body.style.backgroundImage =
      "linear-gradient(to right, lightblue, darkblue)";
    // pausing the function here so we can get the icon we want before appending it
    await loadSvgIcon(
      "/svg/wi-day-haze.svg",
      weatherDataContainer,
      "mild-icon",
    );
  }
  // container for the temp
  const tempContainer = document.createElement("div");
  tempContainer.classList.add("temp-container");
  tempContainer.textContent = `${data.temp}${celsiusSymbol}`;

  // container for the feelsLike
  const feelsLikeContainer = document.createElement("div");
  feelsLikeContainer.classList.add("feels-like-container");
  feelsLikeContainer.textContent = `Feels like ${data.feelsLike}${celsiusSymbol}`;

  // container for high/low temps
  const highLowContainer = document.createElement("div");
  highLowContainer.classList.add("high-low-container");
  highLowContainer.style.display = "flex";
  highLowContainer.style.flexDirection = "row";
  highLowContainer.textContent = `High of ${data.high}${celsiusSymbol}/ Low of ${data.low}${celsiusSymbol}`;

  // container for conditions
  const conditionsContainer = document.createElement("div");
  conditionsContainer.classList.add("conditions-container");
  conditionsContainer.textContent = data.conditions;

  // appending the newly created divs to the weatherDataContainer
  weatherDataContainer.appendChild(tempContainer);
  weatherDataContainer.appendChild(feelsLikeContainer);
  weatherDataContainer.appendChild(highLowContainer);
  weatherDataContainer.appendChild(conditionsContainer);
}

export { extractWeatherData, displayWeather };
