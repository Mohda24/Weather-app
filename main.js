import weatherDescription from "./public/data/weatherDescription.json";
console.log(weatherDescription);
import { getCountryData, getWeatherData, getCurrentPosition } from "./src/fetchData";
let current=getCurrentPosition().then((resolve)=>console.log(resolve)).catch((reject)=>console.log(reject));
console.log(current);


