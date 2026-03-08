const weatherDataContainer = document.querySelector(".weather-data-container");

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
  const { highTemp: high, lowTemp: low } = loopThroughDays(data);
  // getting the conditions of the current city
  const conditions = data.currentConditions.conditions;
  console.log(temp, feelsLike, high, low, conditions);
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
  const highTemp = data.days[0].feelslikemax;
  // get that days min temp value (data is a object that has a nested array of objects)
  const lowTemp = data.days[0].feelslikemin;
  // returning object with the variables so we can use them in extractWeatherData
  return { highTemp, lowTemp };
}

// TODO: create a function to display weather on the screen from the data returned
// from extractWeatherData

export { extractWeatherData };
