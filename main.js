
// Description: Main JS file for the project
import weatherDescription from "./public/data/weatherDescription.json";


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
// helper Functions
// get date info
const getdateInfo = (isoString) => {
    const date = new Date(isoString);
    // Format the date using Intl.DateTimeFormat
    const formattedDate = `${date.toLocaleDateString('en-GB', { weekday: 'long' })}, ${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;

    return formattedDate;
}
// get time info
const getTimeInfo = (isoString) => {
    let time = isoString.split("T")[1];
    return time;
}
// display Pm or Am
const getTimeByAmPm = (isoString) => {
    console.log(isoString);
    
    let time = isoString.split("T")[1];
    let hour = time.split(":")[0];
    let TimeByamPm = hour >= 12 ? `${time} PM` : `${time} AM`;
    return TimeByamPm;
}
// get weather icon and description
const getWeatherIcon = (weatherCode, is_day) => {
    let weather = weatherDescription[weatherCode];
    let icon = is_day ? weather.icon_day : weather.icon_night;
    return icon;
}
// get description
const getWeatherDescription = (weatherCode) => {
    let weather = weatherDescription[weatherCode];
    return weather.description;
}
// get day name daily forecast
const getDayName = (isoString) => {
    const date = new Date(isoString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    
    return days[date.getDay()];
}
// get days forecast
const getDaysForecast = ({ time, weatherCode, temp_min, temp_max }) => {
    let daysForecast = "";
    for (let index = 1; index < time.length-1; index++) {
        daysForecast += `
        <div class="forecastDay">
            <div class="forecastIcon">
                <img src="/public/WeatherImages/${getWeatherIcon(weatherCode[index],1)}" alt="Icon for description statu of weather">
            </div>
            <div class="forecastDegree">
                <span class="forecastMax">${temp_max[index]}°C</span>
                <span class="forecastMin">${temp_min[index]}°C</span>
            </div>
            <span class="forecastDayName">${getDayName(time[index])}</span>
        </div>`
        
    }
    return daysForecast;

}
// get hourly forecast
const  getHourlyForecast=({time,weatherCode,temp,wind_speed})=>{
    let hourlyForecast="";
    let index=12;
    let LastPositionCard=24;
    while(index<=LastPositionCard){
        hourlyForecast+=`
            <div class="hourlyCard">
                <span class="hourlyTime">${getTimeInfo(time[index])}</span>
                <div class="hourlyIcon">
                    <img src="/public/WeatherImages/${getWeatherIcon(weatherCode[index],1)}" alt="Icon for description statu of weather">
                </div>
                <span class="hourlyDegree">${temp[index]}°C</span>
                <div class="windDirectionIcon">
                    <img src="/public/icons/windDirection.png" alt="Icon for Wind Direction">
                </div>
                <span class="hourlyWind">${wind_speed[index]}km/h</span>
            </div>
        
        `
        index+=3;

    }
    return hourlyForecast;
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













