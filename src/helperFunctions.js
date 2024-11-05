import weatherDescription from "../public/data/weatherDescription.json";

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
    let icon = is_day===1 ? weather.icon_day : weather.icon_night;
    console.log("is day",is_day,"icon",icon);
    
    
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
const  getHourlyForecast=({time,weatherCode,temp,wind_speed,wind_direction})=>{
    let hourlyForecast="";
    let index=12;
    let LastPositionCard=24;
    while(index<=LastPositionCard){
        hourlyForecast+=`
            <div class="hourlyCard">
                <span class="hourlyTime">${getTimeInfo(time[index])}</span>
                <div class="hourlyIcon">
                    <img src="/public/WeatherImages/${index <= 18 ? getWeatherIcon(weatherCode[index], 1) : getWeatherIcon(weatherCode[index], 0)}" alt="Icon for description statu of weather">
                </div>
                <span class="hourlyDegree">${temp[index]}°C</span>
                <div class="windDirectionIcon">
                    <img style="${getWindDirection(wind_direction[index])}" src="/public/icons/windDirection.png" alt="Icon for Wind Direction">
                </div>
                <span class="hourlyWind">${wind_speed[index]}km/h</span>
            </div>
        
        `
        index+=3;

    }
    return hourlyForecast;
}
// get direction of wind
const getWindDirection = (degree) => {
    return `transform:rotate(${degree}deg)`;

    
}

// dark mode
const getDarkMode = () => {
    if("darkMode" in localStorage){
        return localStorage.getItem("darkMode");
    }else{
        return "light";
    }
}
const setDarkMode = (mode) => {
    localStorage.setItem("darkMode", mode);
}

export { getdateInfo, getTimeInfo, getTimeByAmPm, getWeatherIcon, getWeatherDescription, getDaysForecast, getHourlyForecast, getWindDirection, getDarkMode, setDarkMode };