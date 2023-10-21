const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const apiKey = '5eabeb55f152b01a0367fc3e48a65afc';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(response => response.json()).then(json => {
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity');
        const wind = document.querySelector('.weather-details .wind');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
        }
    });


});



document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');

    searchButton.addEventListener('click', function () {
        const city = cityInput.value;

        if (city.trim() !== '') {
            // Replace 'YOUR_API_KEY' with your OpenWeather API key
            const apiKey = '5eabeb55f152b01a0367fc3e48a65afc';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    weatherResult.innerHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>${data.main.clouds}</p>
          `;
                    weatherResult.style.display = 'block'; // Show the weather information div
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    weatherResult.innerHTML = 'Error fetching weather data.';
                    weatherResult.style.display = 'block'; // Show the error message
                });
        }
    });
});
