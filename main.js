const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

const apiKey = '8d8d0f2d1cmsh0feda85c2dabca8p16c9f0jsn30d0c0f7ed86';
const apiK = '5eabeb55f152b01a0367fc3e48a65afc' // openweather

searchButton.addEventListener('click', async () => {
    weatherResult.style.display = 'block';
    const city = cityInput.value;
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Parse JSON response

        // Create a formatted output
        weatherResult.innerHTML = `
                    <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
                    <p>Current Temperature: ${data.current.temp_c}°C</p>
                    <p>Condition: ${data.current.condition.text}</p>
                    <p>Humidity: ${data.current.humidity}%</p>
                    <p>Wind Speed: ${data.current.wind_kph} km/h</p>
                `;
    } catch (error) {
        console.error(error);
        weatherResult.textContent = 'An error occurred. Please try again later.';
    }
});