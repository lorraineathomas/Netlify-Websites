// Key:
// Day and Time display: display day and time above weather
// Search button: search engine results display
// Current location and temperature button: display current location city and temperature
// Change celcius to Fahrenheit: change Celcius or Fahrenheit
//display day and time above weather
let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let hours = date.getHours();
let minutes = date.getMinutes();
let time;
if (hours > 12) {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time = hours - 12 + ":" + minutes + "PM";
} else {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time = `${hours}:${minutes}AM`;
}
let currentDateTime = `${days[date.getDay()]} ${time}`;
document.getElementById("current-date-time").innerHTML = `${currentDateTime}`;
//search engine results display
function handleSubmit(event) {
  event.preventDefault();
  let searchbarCity = document.querySelector(".searchbar-city");
  let changeCity = document.querySelector(".city-search");
  let enteredCity = searchbarCity.value;
  changeCity.innerHTML = enteredCity;
  searchCity(enteredCity);
}
function searchCity(city) {
  //display tempterture
  let units = "imperial";
  let apiKey = "1210725e217bb8d60abbde5d3ee94832";
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios
    .get(`${apiUrlSearch}&appid=${apiKey}`)
    .then(showTemperature)
    .catch((err) => {
      // what now?
      console.log(err);
    });
}

function showTemperature(response) {
  let changeCity = document.querySelector(".city-search");
  changeCity.innerHTML = response.data.name;
  let enteredCityTemp = `${Math.round(response.data.main.temp)}`;
  let changeDisplayTemp = document.querySelector(".degrees-number");
  changeDisplayTemp.innerHTML = `${enteredCityTemp}`;
}
let searchbarForm = document.querySelector(".searchbar");
searchbarForm.addEventListener("submit", handleSubmit);
//display current location city and temperature
function submitCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "1210725e217bb8d60abbde5d3ee94832";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;
  axios.get(`${apiUrlCurrent}&appid=${apiKey}`).then(showTemperature);
}
let currentTempButton = document.querySelector(".searchbar-current");
currentTempButton.addEventListener("click", submitCurrentTemp);
// change Celcius or Fahrenheit
function celciusFahrenheit(event) {
  event.preventDefault();
  let letter = document.querySelector(".degrees-letter");
  let number = document.querySelector(".degrees-number");
  if (letter.innerHTML === "F") {
    let celcius = Math.round(((`${number.innerHTML}` - 32) * 5) / 9);
    number.innerHTML = `${celcius}`;
    letter.innerHTML = "C";
  } else {
    let fahrenheit = Math.round((`${number.innerHTML}` * 9) / 5 + 32);
    number.innerHTML = `${fahrenheit}`;
    letter.innerHTML = "F";
  }
}
let changeCelciusFahrenheit = document.querySelector(".celcius-fahrenheit");
changeCelciusFahrenheit.addEventListener("click", celciusFahrenheit);
