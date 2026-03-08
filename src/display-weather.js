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

loadSvgIcon("/svg/wi-day-sunny.svg", weatherDataContainer);

// TODO: - create a function that takes weather data as a parameter
// - extracts values like temp, conditions, etc
// - call it in submitForm in main.js
