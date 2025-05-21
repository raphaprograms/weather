export const connect = "I'm connected! Index depends on me.";


let weatherInfo;
let inputCity;
let citySearchButton;

export function createDisplay() {
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);

    const searchArea = document.createElement('div');

    inputCity = document.createElement('input');
    inputCity.placeholder = "Enter a city";

    citySearchButton = document.createElement('button');
    citySearchButton.textContent = 'Search';

    searchArea.appendChild(inputCity);
    searchArea.appendChild(citySearchButton);

    weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info');

    container.appendChild(searchArea);
    container.appendChild(weatherInfo);

    searchCity();
}

function fetchData(userCity) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userCity}?key=5UW28883W4JJ7HPD36F352NQP`)
        .then(function(response) {
            return response.json();
        })
        .then(function(apiData) {
            const weather = extractWeatherData(apiData);
            displayWeather(weather);
        })
        .catch(function(error) {
            alert(`Error: ${error.message}`);
            weatherInfo.textContent = 'ERROR';
        })

        /*
    async function fetchWeather(userCity) {
        try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userCity}?key=5UW28883W4JJ7HPD36F352NQP`
        );

        const apiData = await response.json();
            
        const weather = extractWeatherData(apiData);
        displayWeather(weather);    
        
    } catch(error) {
        alert(`Error:`, error);
        weatherInfo.textContent = 'ERROR';
        }
} */

}

function searchCity() {
    citySearchButton.addEventListener('click', (e) => {

    let userCity = inputCity.value.trim() || 'losangeles';
    fetchData(userCity);

    /*
    citySearchButton.addEventListener('click', () => {
    let userCity = inputCity.value.trim() || 'losangeles';
    fetchWeather(userCity);
    });
*/

});
}




function extractWeatherData(apiData) {
    return {
        location: apiData.resolvedAddress,
        temperature: apiData.currentConditions.temp,
        feelsLike: apiData.currentConditions.feelslike,
        humidity: apiData.currentConditions.humidity,
        conditions: apiData.currentConditions.conditions,
        time: apiData.currentConditions.datetime
    };
}

export function displayWeather(weather) {
    weatherInfo.textContent =
                `${weather.location}: ${weather.temperature}F and ${weather.conditions}`;
}