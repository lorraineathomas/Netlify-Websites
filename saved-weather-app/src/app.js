function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    } 
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = date.getDay()

    if (hours < 12){
        minutes = minutes + "AM";
    } else if (minutes === 12){
        minutes = minutes + "PM";
    } else{
        hours = `0${hours - 12}`;
        minutes = minutes + "PM"; 
    }
    return `${days[day]} ${hours}:${minutes}`;
}

function formatDay(timestamp){
 let date = new Date(timestamp * 1000);
 let day  = date.getDay();

 let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

 return days[day];
}

function displayForecast(response){
 let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index){
        if (index < 6){
        forecastHTML = forecastHTML + `
        <div class="col-2">
            <div class="weather-forecast-date">
            ${formatDay(new Date(forecastDay.dt))}
            </div>
            <img 
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
            alt="" 
            width="42"/> 
            <div class="weather-forecast-temperatures"> <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span> <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
        </div>
    </div>`;
}
    })
    
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
    let apiKey = "1210725e217bb8d60abbde5d3ee94832";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let decscriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = Math.round(response.data.main.temp);

    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML= response.data.name;
    decscriptionElement.innerHTML= response.data.weather[0].description;
    humidityElement.innerHTML= response.data.main.humidity;
    windElement.innerHTML= Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city){
    let apiKey = "1210725e217bb8d60abbde5d3ee94832";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");

