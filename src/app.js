function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let currentCityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#current-humidity");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#current-wind");
  let wind = Math.round(response.data.wind.speed);
  let dayElement = document.querySelector("#current-day");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#current-weather-icon");

  currentCityElement.innerHTML = response.data.city;
  dayElement.innerHTML = formatDay(date);
  timeElement.innerHTML = formatTime(date);
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}" class= "weather-app-icon"
    />`;
  getForecast(response.data.city);
}
function formatTime(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  return `${hours}:${minutes}`;
}
function formatDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return day;
}

function searchCity(city) {
  let apiKey = "5912o91beb33d634bfd91ta0a18fa0bd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}
function getForecast(city) {
  let apiKey = "5912o91beb33d634bfd91ta0a18fa0bd";
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=${apiKey}&units=metric`;
  axios(apiForecastUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
          <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">⛅</div>
          <div class="weather-forecast-temperatures">
          <span class="weather-forecast-high">15°</span>
          <span class="weather-forecast-low"> 9°</span>
          </div>
          </div>
          `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Brantford");
