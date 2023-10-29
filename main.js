const container = document.querySelector('.container');
let language = document.querySelector('#languageButton');
const search = document.querySelector('#searchButton');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const body = document.querySelector('body');
const locationIcon = document.querySelector('.search-box .fa-location-dot');


// Day/Night Color Theme
const currentHour = new Date().getHours();
const allButtons = document.querySelectorAll('button');

allButtons.forEach((button) => {
    if (currentHour >= 18 || currentHour <= 6) {
        body.style.background = '#0b1a44';
        search.style.background = 'lightblue';
        language.style.background = 'none';

        search.addEventListener('mouseover', () => {
            search.style.background = '#8fccde';
        });
        search.addEventListener('mouseout', () => {
            search.style.background = 'lightblue';
        });
        search.addEventListener('mousedown', () => {
            search.style.background = '#c7ecf6';
        });


        language.addEventListener('mouseover', () => {
            language.style.background = 'rgba(173, 216, 230, 0.5)';
        });
        language.addEventListener('mouseout', () => {
            language.style.background = 'none';
        });
        language.addEventListener('mousedown', () => {
            language.style.background = 'lightblue';
        });

    } else {
        body.style.background = '#ffb70e';
        button.style.background = '#ffd893';

        button.addEventListener('mouseover', () => {
            button.style.background = '#ffc973';
        });
        button.addEventListener('mouseout', () => {
            button.style.background = '#ffd893';
        });
    }
})

let lang = 'en';

// Search
search.addEventListener('click', () => {
    const apiKey = '5eabeb55f152b01a0367fc3e48a65afc';
    const city = document.querySelector('.search-box input').value;

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
            wind.innerHTML = `${parseInt(json.wind.speed)}`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '650px';
            body.style.height = '97vh';
        });
});

// Search with 'Enter' key
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // Prevent the default form submission
        event.preventDefault();
        // Trigger the search when Enter is pressed
        search.click();
    }
});

// Language
const english = document.querySelector('#english');
const ukrainian = document.querySelector('#ukrainian');

document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelector('.dots');
    const menuContent = document.querySelector('.menu-content');
    const inputText = document.querySelector('.search-box input');
    const humidityText = document.querySelector('.humidity .text p');
    const windText = document.querySelector('.wind .text p');
    const windSpeed = document.querySelector('#speed');

    dots.addEventListener('click', () => {
        if (menuContent.style.display === 'none' || menuContent.style.display === '') {
            menuContent.style.display = 'block';
        } else {
            menuContent.style.display = 'none';
        }
    });

    document.addEventListener('click', (event) => {
        if (!dots.contains(event.target) && !menuContent.contains(event.target)) {
            menuContent.style.display = 'none';
        }
    });

    // Function to set the language in localStorage
    function setLanguage(language) {
        localStorage.setItem('selectedLanguage', language);
    }

    english.addEventListener('click', () => {
        setLanguage('en');
        english.style.outline = '3px solid red';
        ukrainian.style.outline = 'none';
        inputText.placeholder = 'Enter a city';
        humidityText.innerHTML = 'Humidity';
        windText.innerHTML = 'Wind';
        windSpeed.innerHTML = 'km/h';
        document.location.reload();
    });

    ukrainian.addEventListener('click', () => {
        setLanguage('uk');
        english.style.outline = 'none';
        ukrainian.style.outline = '3px solid red';
        inputText.placeholder = 'Введіть місто';
        humidityText.innerHTML = 'Вологість';
        windText.innerHTML = 'Вітер';
        windSpeed.innerHTML = 'км/г';
        document.location.reload();
    });

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    if (selectedLanguage) {
        lang = selectedLanguage;
        if (lang === 'en') {
            english.style.outline = '3px solid red';
            ukrainian.style.outline = 'none';
            inputText.placeholder = 'Enter a city';
            humidityText.innerHTML = 'Humidity';
            windText.innerHTML = 'Wind';
            windSpeed.innerHTML = 'km/h';
            setLanguage(lang);
        } else if (lang === 'uk') {
            english.style.outline = 'none';
            ukrainian.style.outline = '3px solid red';
            inputText.placeholder = 'Введіть місто';
            humidityText.innerHTML = 'Вологість';
            windText.innerHTML = 'Вітер';
            windSpeed.innerHTML = 'км/г';
            setLanguage(lang);
        }
    }
});