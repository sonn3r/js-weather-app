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

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity');
        const wind = document.querySelector('.weather-details .wind');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/day-clear.png';
                break;
            case 'Clouds':
                image.src = 'images/day_partial_cloud.png';
                break;
            case 'Drizzle':
                image.src = 'day_rain.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/day_snow.png';
                break;
            case 'Mist':
                image.src = 'images/mist.png';
                break;
            case 'Thunderstorm':
                image.src = 'images/day_rain_thunder.png';
                break;

            default:
                image.src = '';
        }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
    });
});

const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // Prevent the default form submission
        event.preventDefault();
        // Trigger the search when Enter is pressed
        search.click();
    }
});