const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const body = document.querySelector('body');
const locationIcon = document.querySelector('.search-box .fa-location-dot');


// Day/Night Color Theme
let currentHour = new Date().getHours();

const button = document.querySelector('button');
if (currentHour >= 18 || currentHour <= 6) {
    body.style.background = '#0b1a44';

    button.addEventListener('mouseover', () => {
        button.style.background = '#8ec1d2'
    });
    button.addEventListener('mouseout', () => {
        button.style.background = 'lightblue'
    });

} else {
    body.style.background = '#ffb70e';
    button.style.background = '#ffc559';

    button.addEventListener('mouseover', () => {
        button.style.background = '#ffb94a'
    });
    button.addEventListener('mouseout', () => {
        button.style.background = '#ffc559'
    });
}

search.addEventListener('click', () => {
    const apiKey = '5eabeb55f152b01a0367fc3e48a65afc';
    const city = document.querySelector('.search-box input').value;
    const lang = 'en';
    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {

                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                locationIcon.classList.remove('fa-location-dot');
                locationIcon.classList.add('fa-triangle-exclamation');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            locationIcon.classList.remove('fa-triangle-exclamation');
            locationIcon.classList.add('fa-location-dot');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');


            if (json.dt >= json.sys.sunrise) {
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/day_clear.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/day_partial_cloud.png';
                        break;
                    case 'Drizzle':
                        image.src = 'images/day_rain.png';
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
            } else {
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/night_full_moon_clear.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/night_full_moon_partial_cloud.png';
                        break;
                    case 'Drizzle':
                        image.src = 'images/night_full_moon_rain.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'images/night_full_moon_snow.png';
                        break;
                    case 'Mist':
                        image.src = 'images/mist.png';
                        break;
                    case 'Thunderstorm':
                        image.src = 'images/night_full_moon_thunder.png';
                        break;

                    default:
                        image.src = '';
                }
            }

            temperature.innerHTML = `${parseInt(json.main.temp - 273.15)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1);
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '650px';
            body.style.height = '97vh';
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