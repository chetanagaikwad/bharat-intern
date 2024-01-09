const apiKey = "2feacf3e8d8599dcb6ff9480e7be31d6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Add the 'handleKeyPress' function
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}

function getWeather() {
    const cityInput = document.getElementById("cityInput").value;
    const weatherContainer = document.getElementById("weather-container");

    if (cityInput.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(apiUrl + cityInput + "&appid=" + apiKey)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherContainer.innerHTML = "Error fetching weather data. Please try again.";
        });
}

function displayWeather(data) {
    const weatherContainer = document.getElementById("weather-container");
    const weatherCard = document.getElementById("weather-card");

    if (!weatherCard) {
        const cityName = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;

        const newWeatherCard = document.createElement('div');
        newWeatherCard.id = "weather-card";
        newWeatherCard.classList.add('weather-card');
        newWeatherCard.style.background = getTemperatureColor(temperature);

        // Set text color based on temperature
        newWeatherCard.style.color = getTextColor(temperature);

        newWeatherCard.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature} °C</p>
            <p>Description: ${description}</p>
        `;

        weatherContainer.appendChild(newWeatherCard);
    } else {
        // Set display property to block when updating existing card
        weatherCard.style.display = 'block';
    }
}

function getTextColor(temperature) {
    // Choose a contrasting text color based on temperature
    return temperature < 20 ? 'white' : 'black'; // Use dark text for colder temperatures, and light text for warmer temperatures
}

function getTemperatureColor(temperature) {
    const minTemperature = -10;
    const maxTemperature = 40;

    // Map temperature to a gradient color
    const normalizedTemperature = (temperature - minTemperature) / (maxTemperature - minTemperature);
    const hue = (1 - normalizedTemperature) * 240;

    // Set different colors based on temperature range
    if (temperature < 0) {
        return `linear-gradient(120deg, hsl(240, 100%, 50%), hsl(240, 100%, 70%))`; // Dark Blue
    } else if (temperature >= 0 && temperature < 10) {
        return `linear-gradient(120deg, hsl(200, 100%, 50%), hsl(200, 100%, 70%))`; // Blue
    } else if (temperature >= 10 && temperature < 20) {
        return `linear-gradient(120deg, hsl(160, 100%, 50%), hsl(160, 100%, 70%))`; // Light Blue
    } else if (temperature >= 20 && temperature < 30) {
        return `linear-gradient(120deg, hsl(120, 100%, 50%), hsl(120, 100%, 70%))`; // Green
    } else if (temperature >= 30 && temperature <= 40) {
        return `linear-gradient(120deg, hsl(30, 100%, 50%), hsl(30, 100%, 70%))`; // Orange
    } else {
        return `linear-gradient(120deg, hsl(0, 0%, 80%), hsl(0, 0%, 90%))`; // Default Light Gray for undefined range
    }
}
