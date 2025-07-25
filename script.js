const apiKey="YOUR API_KEY HERE"; // Replace with your actual API key
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="; 

const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    // Use the new forecast URL
    const response = await fetch(forecastApiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        // The forecast data is in a list, we'll use the first item.
        const forecast = data.list[0];

        // Update the UI with fetched data
        document.querySelector(".city").innerHTML = data.city.name; // City name is in a different place
        document.querySelector(".temp").innerHTML = Math.round(forecast.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = forecast.main.humidity + "%";
        document.querySelector(".wind").innerHTML = forecast.wind.speed + " km/h";
        
    
        const rainChance = Math.round(forecast.pop * 100); 
        document.querySelector(".rain").innerHTML = rainChance + "%";
       

        
        const iconCode = forecast.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listeners remain the same
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

window.addEventListener("load", () => {
    checkWeather("Kadapa");
});