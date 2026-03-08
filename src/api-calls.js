// async function for getting the weather data, takes in an api call string
async function getWeather(location) {
  // declaring data in this scope so it can be returned later on
  let data;
  // try block for intended behaviour
  try {
    // fetching the data from visual crossing with the build api call string
    let response = await fetch(location);
    // taking raw response object and the json body to get actual weather data
    // taking the now javascript object and storing it in data variable
    data = await response.json();
    // assigning the data we get back to the global variable so we can use it in main
    // catch block in case the api call fails
  } catch (error) {
    console.error("An error occured:", error);
  }
  // returning the data we got from the api call so we can access its properties
  return data;
}

export { getWeather };
