
// Description: Main JS file for the project
import { getdateInfo, getTimeInfo, getTimeByAmPm, getWeatherIcon, getWeatherDescription, getDaysForecast, getHourlyForecast, getDarkMode, setDarkMode,addSelected } from "./src/helperFunctions";
import { getCountryData, getWeatherData, getCurrentPosition, getAddress } from "./src/fetchData";
// select elements
// header selects
// droupdoun
const dropDownBtn = document.querySelector("[data-dropDounBtn]");
const dropDownContent = document.querySelector("[data-dropDounContent]");
const searchInput = document.querySelector("[data-search]");
// countrys select
const countrysSelect = document.querySelector("[data-selectCountrys]");

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
const elipse = document.querySelector("[data-elipse]");


// functions
// add darkmode class
const addDarkModeClass = (mode) => {
    document.body.classList = mode;
    darkModeTitle.textContent = mode === "dark" ? "Light Mode" : "Dark Mode";
};

addDarkModeClass(getDarkMode());



// get data by position
const getWeatherDataByPosition = async () => {
    try {
        const { lat, long } = await getCurrentPosition();
        console.log(lat, long);

        const weatherData = await getWeatherData(lat, long);
        console.log(weatherData);

        return weatherData;
    } catch (error) {
        console.error(error);
    }
}


// change content
const changeContent = (data, city) => {
    // cityInfo
    cityName.textContent = city;
    cityTime.textContent = getTimeInfo(data.current.time);
    cityDate.textContent = getdateInfo(data.current.time);
    // current weather
    currentWetherTemperture.textContent = `${data.current.temperature_2m}${data.current_units.temperature_2m}`;
    currentSunrise.textContent = getTimeByAmPm(data.daily.sunrise[0]);
    currentSunset.textContent = getTimeByAmPm(data.daily.sunset[0]);
    currentWeatherIcon.src = `/public/WeatherImages/${getWeatherIcon(data.current.weather_code, data.current.is_day)}`;
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
        wind_speed: data.hourly.wind_speed_10m,
        wind_direction: data.hourly.wind_direction_10m
    });


}
// add countrys select
const addCountrySelect = (data) => {
    let countrysData = "";
    data.forEach((country) => {
        if(country.capitalInfo.latlng.length === 0 || country.capital=="Jerusalem") return;
        countrysData += `
            <li class="countryName" data-LatLng="${country.capitalInfo.latlng[0]},${country.capitalInfo.latlng[1]}">
                <div class="CountryFlag">
                    <img src="${country.flags.png}" alt="${country.flags.alt}">
                </div>
                <span class="countryCapitalName">${country.capital}</span>
            </li>`
    });
    countrysSelect.innerHTML = countrysData;
}

let mohda = await getWeatherData(39.47920587965429, -0.37990246196968624);
const data = await getAddress(39.47920587965429, -0.37990246196968624);
changeContent(mohda, data);

// Events Listeners
// Dark mode toggle
darkModeToggle.addEventListener("click", () => {
    let mode = getDarkMode();
    elipse.classList.toggle("darkModeSwitch");

    if (mode === "light") {
        setDarkMode("dark");
        addDarkModeClass("dark");
    }
    else {
        setDarkMode("light");
        addDarkModeClass("light");
    }

});
// get countrys call
addCountrySelect(await getCountryData());


// serach input
searchInput.addEventListener("input", (e) => {

    
    const searchValue = e.target.value.toLowerCase();
    const countryNames = Array.from(document.querySelectorAll("li.countryName"));
    console.log(countryNames);
    
    countryNames.forEach((country) => {
        console.log(country);
        const countryName = country.querySelector(".countryCapitalName").textContent.toLowerCase();
        console.log(countryName);
        if (countryName.includes(searchValue)) {
            country.style.display = "flex";
        } else {
            country.style.display = "none";
        }
    });
});

dropDownBtn.addEventListener("click", () => {
    dropDownContent.classList.toggle("show");
});

countrysSelect.addEventListener("click", async (e) => {
    if (e.target.classList.contains("countryName")) {
        const latLng = e.target.dataset.latlng.split(",");
        const data = await getWeatherData(latLng[0], latLng[1]);
        const city=e.target.querySelector(".countryCapitalName").textContent;
        const flag=e.target.querySelector(".CountryFlag img").src;
        const name=e.target.querySelector(".countryCapitalName").textContent;
        
        
        
        changeContent(data, city);
        dropDownBtn.innerHTML=addSelected(flag,name)
        searchInput.value = "";

        dropDownContent.classList.remove("show");
    }
});


    





















