import { cityModel, cityModelForecast } from "../models/CityModel";

export const scrubCityFromOpenWeather = async (cityFromOpenWeather) => {
  // Extract the data I want from the OpenWeather API object based on the "citymodel" object
  let city = cityModel;
  let scrubbedCity = {};

  for (let key in city) {
    let cityFunc = city[key];
    scrubbedCity[key] = await cityFunc(cityFromOpenWeather);
  }
  return scrubbedCity;
};

export const scrubCityForecastFromOpenWeather = async (cityFromOpenWeather) => {
  let city = cityModelForecast;
  let scrubbedCity = {};
   for (let key in city) {
     let cityFunc = city[key];
     scrubbedCity[key] = await cityFunc(cityFromOpenWeather);
   }
   return scrubbedCity;
}
