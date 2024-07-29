/**
 * Student Information
 * Name: Abhishek Gupta
 * Student ID: 21810094
 */

/* This event listener ensures that the JavaScript code runs 
only after the HTML content has been fully loaded. */
document.addEventListener("DOMContentLoaded", function () {
  // Getting the container element where weather information will be displayed.
  const weatherContainer = document.getElementById("weather-container");

  // Getting all the city buttons and adding click event listeners to them.
  const cityButtons = document.querySelectorAll(".city-btn");
  cityButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Getting the name of the city from the clicked button.
      const cityName = this.textContent.trim();
      // Retrieving coordinates for the selected city.
      const coordinates = getCoordinates(cityName);
      if (coordinates) {
        // If coordinates are available, showing a loading spinner and text indicating that weather data is loading.
        showLoadingSpinner();
        // After a delay of 1 second, fetching weather data using the coordinates.
        setTimeout(() => {
          fetchWeatherData(coordinates.lat, coordinates.lon);
        }, 1000); // Delay of 1 second
      } else {
        // If coordinates are not found for the city, log an error and display an alert.
        console.error("Coordinates not found for the city:", cityName);
        alert("Coordinates not found for the city");
      }
    });
  });

  // Function to get coordinates based on city name.
  function getCoordinates(cityName) {
    const cityCoordinates = {
      Banff: { lat: 51.2969, lon: -116.9632 },
      Jasper: { lat: 52.8734, lon: -118.0817 },
      Kootenay: { lat: 51.3247, lon: -116.1486 },
      Revelstoke: { lat: 51.0373, lon: -118.2093 },
      WatertonLakes: { lat: 49.0833, lon: -113.9167 },
      Manning: { lat: 49.0625, lon: -120.9464 },
      // Will add more cities and their coordinates if needed
    };

    return cityCoordinates[cityName];
  }

  // Function to show a loading spinner and text indicating that weather data is loading.
  function showLoadingSpinner() {
    // HTML content for the loading spinner and text.
    const weatherInfo = `
      <div class="spinner"></div>
      <p>Current Weather Data is Loading...</p>
    `;
    // Updating the content of the weather modal with the loading spinner and text.
    document.getElementById("modal-weather").innerHTML = weatherInfo;
    // Displaying the modal.
    modal.style.display = "block";
  }

  // Fetching weather data from the OpenWeatherMap API.
  function fetchWeatherData(lat, lon) {
    // My API key for accessing OpenWeatherMap API.
    const apiKey = "6f592194797eebe6ec6512ee9138c688";
    // API endpoint for fetching weather data.
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
    // Constructing the URL with latitude, longitude, units, and API key.
    const url = `${apiUrl}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=metric&appid=${apiKey}`;

    // Fetching weather data from the API.
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Once the data is fetched successfully, display the weather data.
        displayWeatherData(data);
      })
      .catch((error) => {
        // If there's an error fetching the weather data, log the error.
        console.error("Error fetching weather data:", error);
      });
  }

  // Displaying weather data in the modal.
  function displayWeatherData(data) {
    // Extracting relevant weather information from the fetched data.
    const currentWeather = data.main;
    const weatherDescription = data.weather[0].description;
    // Generating HTML content to display weather information.
    const weatherInfo = `
      <h2>${data.name}</h2>
      <p>Temperature: ${currentWeather.temp}°C</p>
      <p>Weather: ${weatherDescription}</p>
      <p>Humidity: ${currentWeather.humidity}%</p>
    `;
    // Updating the content of the weather modal with the fetched data.
    document.getElementById("modal-weather").innerHTML = weatherInfo;
  }

  // Handling modal functionality.
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];

  // Function to close the modal when the close button is clicked.
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Function to close the modal when clicking anywhere outside of it.
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
