// script.js

const API_KEY = "117ff3fbdcc881bdef67b6d9b00df21d"; // Replace with your OpenWeatherMap API key

document.getElementById("toggle-dark").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeatherByCoords, handleGeoError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function fetchWeatherByCoords(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(response => {
      if (!response.ok) throw new Error("Unable to get weather for your location.");
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => showError(error.message));
}

function handleGeoError(error) {
  showError("Geolocation failed. Please search by city instead.");
}

function displayWeather(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("weatherDescription").textContent = data.weather[0].description;
  document.getElementById("temperature").textContent = data.main.temp;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind-speed").textContent = data.wind.speed;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById("weatherResults").classList.remove("hidden");
  document.getElementById("error-message").classList.add("hidden");
}

function showError(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
  document.getElementById("weatherResults").classList.add("hidden");
}


async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("weatherResults");
    const errorDiv = document.getElementById("error-message");

    if (!city) {
        errorDiv.textContent = "Please enter a city name.";
        errorDiv.classList.remove("hidden");
        resultDiv.classList.add("hidden");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("weatherDescription").textContent = data.weather[0].description;
        document.getElementById("temperature").textContent = data.main.temp;
        document.getElementById("humidity").textContent = data.main.humidity;
        document.getElementById("wind-speed").textContent = data.wind.speed;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        errorDiv.classList.add("hidden");
        resultDiv.classList.remove("hidden");
    } catch (err) {
        errorDiv.textContent = err.message;
        errorDiv.classList.remove("hidden");
        resultDiv.classList.add("hidden");
    }
}
