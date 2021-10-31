import Vue from "vue";
import Vuex from "vuex";
import { OPEN_WEATHER_API_KEY } from "../misc/AppStrings";
import {
  // scrubCityFromOpenWeather,
  scrubCityForecastFromOpenWeather,
} from "../misc/Scrubber";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityWeather: null,
    errorMsg: null,
    windSpeedFilter: null,
  },
  mutations: {
    setCityWeather(state, data) {
      state.cityWeather = data;
    },
    setErrorMsg(state, data) {
      state.errorMsg = data;
    },
    setWindSpeedFilter(state, data) {
      state.windSpeedFilter = data;
    },
  },
  actions: {
    async getWeatherByCityDaily({ commit }, city) {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}, ${city.country}&appid=${OPEN_WEATHER_API_KEY}`
      );
      // Might want to create "processFunction" in a another file and import
      // for cleaner code instead of "if, else if,  else"
      if (res.status === 200) {
        commit("setErrorMsg", null);
        let cityToScrub = await res.json();

        let scrubbedCity = await scrubCityForecastFromOpenWeather(cityToScrub);
        console.log(scrubbedCity, "ScrubbedCITY");
        commit("setCityWeather", scrubbedCity);
      } else if (res.status === 404) {
        let msg = await res.json();
        commit("setErrorMsg", msg.message);
      } else {
        let msg = "Oops!, Something went wrong";
        commit("setErrorMsg", msg);
      }
    },
    resetCityWeather({ commit }) {
      commit("setCityWeather", null);
    },

    setWindSpeedFilter({ commit }, filter) {
      commit("setWindSpeedFilter", filter);
    },
  },
  modules: {},
});
