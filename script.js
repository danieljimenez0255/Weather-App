/**
 * Weather App
 * DONE: Complete getWeatherData() to return json response Promise
 * DONE: Complete searchCity() to get user input and get data using getWeatherData()
 * DONE: Complete showWeatherData() to set the data in the the html file from response
 */

window.onload = () => {
  getWeatherData();
};

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";
let cityM, clarity, tempM, minTemp, maxTemp;

let weatherImages = {
  clear: "Images/clear_weather.gif",
  clouds: "Images/cloud_weather.gif",
  thunderstorm: "Images/thunderStorm_weather.gif",
  rain: "Images/rain_weather.gif",
  haze: "Images/haze_weather.jpg",
};
/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this:
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
getWeatherData = async (city = "palmdale") => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  //HINT: Use template literals to create a url with input and an API key
  const fullURL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
  /* const weatherPromise = fetch(fullURL);
  weatherPromise.then((weather)=>{
    return weather.json()
  }).then((resData)=> {
    console.log(resData);
    showWeatherData(resData);
  }).catch((error)=> {
    console.log(error.status)
  }) */

  // cleaner way of fetching the data using async and await keywords
  try {
    const weatherPromise = await fetch(fullURL); //pauses the getWeatherData func while it waits for the pending promise to be either fulfilled or reject
    //returns control back to the function
    const resData = await weatherPromise.json(); //pauses the function again
    showWeatherData(resData); //returns control back to function and executes the code
  } catch {
    console.log("Error getting Data");
  }
};

/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
searchCity = () => {
  let city = document.getElementById("city-input").value;
  city = city.toLowerCase();
  // CODE GOES HERE
  getWeatherData(city);
};

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
showWeatherData = (weatherData) => {
  //CODE GOES HERE
  console.log(weatherData);
  ({
    name: cityM,
    weather: [{ main: clarity }],
    main: { temp: tempM, temp_min: minTemp, temp_max: maxTemp },
  } = weatherData);
  document.getElementById("city-name").innerHTML = cityM;
  document.getElementById("weather-type").innerHTML = clarity;
  document.getElementById("temp").innerHTML = tempM;
  document.getElementById("min-temp").innerHTML = minTemp;
  document.getElementById("max-temp").innerHTML = maxTemp;

  switch (clarity) {
    case "Clear":
      document.getElementsByClassName(
        "text-center"
      )[0].style.backgroundImage = `url(${weatherImages["clear"]})`;
      break;
    case "Clouds":
      document.getElementsByClassName(
        "text-center"
      )[0].style.backgroundImage = `url(${weatherImages["clouds"]})`;
      break;
    case "Thunderstorm":
      document.getElementsByClassName(
        "text-center"
      )[0].style.backgroundImage = `url(${weatherImages["thunderstorm"]})`;
      break;
    case "Rain":
      document.getElementsByClassName(
        "text-center"
      )[0].style.backgroundImage = `url(${weatherImages["rain"]})`;
      break;
    case "Haze":
      document.getElementsByClassName(
        "text-center"
      )[0].style.backgroundImage = `url(${weatherImages["haze"]})`;
      break;
    default:
      document.getElementsByClassName("text-center")[0].style.background =
        "green";
  }
};
