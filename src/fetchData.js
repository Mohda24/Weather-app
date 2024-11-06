import axios from "axios";
const api_key="AIzaSyAEuE4RPWZWH0EJ5c06Egqaza9DgX-gMGs";
// get Countrys data
const getCountryData=async ()=>{
    let ApiCountrys="https://restcountries.com/v3.1/all?fields=capital,flags,capitalInfo";
    try{
        const response = await axios.get(ApiCountrys);
        return response.data;
    }catch(error){
        console.log(error);
        
    }
}
// get adresse from lat and long
const getAddress = async (latitude,longitude)=>{
    let ApiAdresse=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api_key}`;
    try{
        const response = await axios.get(ApiAdresse);
        
        let cityAdresse=extractCityAdresse(response.data.results[0].formatted_address);
        
        return cityAdresse;
    }catch(error){
        console.log(error);
        
    }
}
const extractCityAdresse=(adresse)=>{
    let cityAdresse=adresse.split(",")[1];
    return cityAdresse.trim();
}
// get Weather data
const getWeatherData = async (latitude,longitude)=>{
    let ApiWeather=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,rain,weather_code,surface_pressure,wind_speed_10m&hourly=temperature_2m,rain,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;
    console.log(ApiWeather);
    try{
        const response = await axios.get(ApiWeather);
        return response.data;
        
    }catch(error){
        console.log(error);
        
    }
}
// get current possition
const getCurrentPosition = async () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude;
                    let long = position.coords.longitude;
                    console.log(lat, long);
                    resolve({ lat, long });
                },
                (error) => {
                    console.error("Geolocation error: ", error.message);
                    // Fallback to a default location (e.g., Morocco)
                    let lat = 31.7917;
                    let long = -7.0926;
                    console.log("Using default location: ", lat, long);
                    resolve({ lat, long });
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}
export {getCountryData,getWeatherData,getCurrentPosition,getAddress};