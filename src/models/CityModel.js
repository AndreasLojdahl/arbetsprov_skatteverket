import { scrubCityFromOpenWeather } from "../misc/Scrubber";

export const cityModel = {
  windSpeed: (x) => x.wind.speed,
  tempKelvin: (x) => x.main.temp,
  tempCelsius: (x) => Math.round(x.main.temp - 273.15),
  // weather is an array with objects
  // object model: description, icon, id, main
  weather: (x) => x.weather,
  dateTime: (x) => x.dt,
  dateTime_txt: (x) => x.dt_txt,
};

export const cityModelForecast = {
  coord: (x) => x.city.coord,
  timezone: (x) => x.city.timezone,
  name: (x) => x.city.name,
  country: (x) => x.city.country,
  forecastList: (x) => {
    let scrubbedCities = [];
    x.list.forEach(async (city) => {
      let scrubbed = await scrubCityFromOpenWeather(city);
      scrubbedCities.push(scrubbed);
    });
    return scrubbedCities;
  },
};
// let date = new Date(datetime);

// let dateString = `${date.getFullYear}/${date.getMonth() + 1}/${date.getDate}`
