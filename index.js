"use strict";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apiKey = "11bc29fc62de2a110a04f2ace7a4d60e";
const inputValue = document.querySelector(".inputBox");
let cityHolder;

const dayDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dateDay = document.querySelector(".day_date_container");
dateDay.innerHTML = `${weekdays[dayDate.getDay()]}, ${dayDate.getDate()} ${
  months[dayDate.getMonth()]
}`;

async function Weather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  if (response.status == 404) {
    document.querySelector(".invalid_title").style.display = "block";
  } else {
    document.querySelector(".invalid_title").style.display = "none";
  }

  let weatherTitle = document.querySelector(".weather_title_container");
  let temprature = document.querySelector(".temp_value");
  let feelsLike = document.querySelector(".l_onetemp_one");
  let actuallyIs = document.querySelector(".l_onetemp_two");
  let fells = document.querySelector(".l_twotemp_one");
  let fCozOf = document.querySelector(".l_twotemp_two");
  let from = document.querySelector(".l_threetemp_one");
  let to = document.querySelector(".l_threetemp_two");
  let windSpeed = document.querySelector(".wind");
  let humidity = document.querySelector(".humid");
  let visibility = document.querySelector(".visibility");

  weatherTitle.innerHTML = data.weather[0].main;
  temprature.innerHTML = Math.round(data.main.temp);
  feelsLike.innerHTML = data.main.feels_like;
  actuallyIs.innerHTML = data.main.temp_max;
  fells.innerHTML = data.weather[0].main;
  fCozOf.innerHTML = data.weather[0].description;
  from.innerHTML = data.main.temp_max + 1;
  to.innerHTML = data.main.temp_min - 1;
  windSpeed.innerHTML = data.wind.speed;
  humidity.innerHTML = data.main.humidity;
  visibility.innerHTML = data.visibility / 1000;

  if (data.weather[0].main === "Clear") {
    document.body.style.backgroundImage = "url(/images/clear.png)";
  } else if (data.weather[0].main === "Clouds") {
    document.body.style.backgroundImage = "url(/images/clouds.png)";
  } else if (data.weather[0].main === "Drizzle") {
    document.body.style.backgroundImage = "url(/images/drizzle.png)";
  } else if (data.weather[0].main === "Mist") {
    document.body.style.backgroundImage = "url(/images/mist.png)";
  } else if (data.weather[0].main === "Rain") {
    document.body.style.backgroundImage = "url(/images/rain.png)";
  } else if (data.weather[0].main === "Snow") {
    document.body.style.backgroundImage = "url(/images/snow.png)";
  } else if (data.weather[0].main === "Haze") {
    document.body.style.backgroundImage = "url(/images/mist.png)";
  }
}

inputValue.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    cityHolder = inputValue.value;
    Weather(cityHolder);
  }
});
