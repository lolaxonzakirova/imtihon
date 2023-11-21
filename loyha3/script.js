let inputBox = document.querySelector('.input-box');
let searchBtn = document.getElementById('searchBtn');
let weather_img = document.querySelector('.weather-img');
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let humidity = document.getElementById('humidity');
let wind_speed = document.getElementById('wind-speed');


let weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    let api_key = "18ce49c4e53083b0a929d4ae4e393fca";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    let weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;



    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});