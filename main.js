
// Description: Main JS file for the project
import { getdateInfo, getTimeInfo, getTimeByAmPm, getWeatherIcon, getWeatherDescription, getDaysForecast, getHourlyForecast,getDarkMode,setDarkMode } from "./src/helperFunctions";
import { getCountryData, getWeatherData, getCurrentPosition } from "./src/fetchData";
// select elements
// cityInfo
const cityName = document.querySelector("[data-cityName]");
const cityTime = document.querySelector("[data-cityTime]");
const cityDate = document.querySelector("[data-cityDate]");
// current weather
const currentWetherTemperture = document.querySelector("[data-currentWetherTemperture]");
const currentSunrise = document.querySelector("[data-currentWetherSunrise]");
const currentSunset = document.querySelector("[data-currentWetherSunset]");
const currentWeatherIcon = document.querySelector("[data-currentWeatherIcon]");
const currentWeatherDescription = document.querySelector("[data-currentWeatherDescription]");
const currentWeatherHumidity = document.querySelector("[data-currentWeatherHumidity]");
const currentWeatherWind = document.querySelector("[data-currentWeatherWind]");
const currentWeatherPressure = document.querySelector("[data-currentWeatherPressure]");
const currentWeatherUv = document.querySelector("[data-currentWeatherUv]");
// days forecats
const daysForecats = document.querySelector("[data-daysForecats]");
// Hourly forecast
const hourlyForecast = document.querySelector("[data-hourlyForecast]");
// Dark mode
const darkModeToggle = document.querySelector("[data-darkModeToggle]");
const darkModeTitle = document.querySelector("[data-DarkModeTitle]");
const elipse=document.querySelector("[data-elipse]");


// functions
const addDarkModeClass = (mode) => {
    document.body.classList = mode;
    darkModeTitle.textContent = mode === "dark" ? "Light Mode" : "Dark Mode";
};

addDarkModeClass(getDarkMode());

// Dark mode toggle
darkModeToggle.addEventListener("click",()=>{
    let mode = getDarkMode();
    elipse.classList.toggle("darkModeSwitch");

    if(mode === "light"){
        setDarkMode("dark");
        addDarkModeClass("dark");}
    else{
        setDarkMode("light");
        addDarkModeClass("light");
    }
    
})

// get data by position
const getWeatherDataByPosition = async () => {
    try {
        const { lat, long } = await getCurrentPosition();
        const weatherData = await getWeatherData(lat, long);
        console.log(weatherData);

        return weatherData;
    } catch (error) {
        console.error(error);
    }
}


// change content
const changeContent = (data) => {
    // cityInfo
    cityTime.textContent = getTimeInfo(data.current.time);
    cityDate.textContent = getdateInfo(data.current.time);
    // current weather
    currentWetherTemperture.textContent = `${data.current.temperature_2m}${data.current_units.temperature_2m}`;
    currentSunrise.textContent = getTimeByAmPm(data.daily.sunrise[0]);
    currentSunset.textContent = getTimeByAmPm(data.daily.sunset[0]);
    currentWeatherIcon.src =`/public/WeatherImages/${getWeatherIcon(data.current.weather_code, data.current.is_day)}`;
    currentWeatherDescription.textContent = getWeatherDescription(data.current.weather_code);
    currentWeatherHumidity.textContent = `${data.current.relative_humidity_2m}${data.current_units.relative_humidity_2m}`;
    currentWeatherWind.textContent = `${data.current.wind_speed_10m}${data.current_units.wind_speed_10m}`;
    currentWeatherPressure.textContent = `${data.current.surface_pressure}${data.current_units.surface_pressure}`;
    currentWeatherUv.textContent = data.daily.uv_index_max[0];
    // days forecast
    daysForecats.innerHTML = getDaysForecast({ 
        time: data.daily.time, 
        weatherCode: data.daily.weather_code, 
        temp_min: data.daily.temperature_2m_min, 
        temp_max: data.daily.temperature_2m_max 
    });
    // hourly forecast
    hourlyForecast.innerHTML = getHourlyForecast({
        time: data.hourly.time,
        weatherCode: data.hourly.weather_code,
        temp: data.hourly.temperature_2m,
        wind_speed: data.hourly.wind_speed_10m
    });


}


let mohda = await getWeatherDataByPosition();
changeContent(mohda);













