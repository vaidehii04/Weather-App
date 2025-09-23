function getWeather() {
    const apiKey = '7774a077ea4cb56e0010093c4bafe1c4';
    const city = document.getElementById('city').value;
    
    if (!city) {
        alert('Please enter a city');
        return; // Stop execution if city is not provided
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data); // Display current weather after fetching
            return fetch(forecastUrl); // Continue fetching forecast data
        })
        .then(response => response.json())
        .then(data => {
            displayHourForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast'); 

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else { 
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`; 
        
        const temperatureHTML = `<p>${temperature}</p>`;
        const weatherHtml = `<p>${cityName}</p> <p>${description}</p>`;
        
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl; 
        weatherIcon.alt = description;
        showImage();
    }
}
function displayHourForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dataTime = new Date(item.dt * 1000);
        const hour = dataTime.getHours();
        const temperature = Math.round(item.main.temp - 275.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; // Define iconUrl inside the loop

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage(){
    const weatherIcon=document. getElementById ('weather-icon');
    weatherIcon.style.display='block'
}