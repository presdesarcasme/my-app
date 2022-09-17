import "./styles.css";

let currentDayTime = document.querySelector("#current-day-time");
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let today = now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

currentDayTime.innerHTML = `${days[today]} ${hours}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#form-input");
  let yourCity = document.querySelector("#chosen-city");

  yourCity.innerHTML = `${cityInput.value}`;
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", showCity);

function showTemperature(response) {
  let realTemp = Math.round(response.data.main.temp);
  let nowTemp = document.querySelector("#temperature");
  nowTemp.innerHTML = `${realTemp} °C`;
  let chosenCity = document.querySelector("#chosen-city");
  chosenCity.innerHTML = response.data.name;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "664664b88d34f104fafc91c238ca36bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getPosition);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");

  let chosenCity = document.querySelector("#chosen-city");
  if (searchInput.value) {
    chosenCity.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  }
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
