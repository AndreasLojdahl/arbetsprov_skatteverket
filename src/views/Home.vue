<template>
  <div class="home-container">
    <div class="cont">
      <city-search class="city-search"></city-search>
      <wind-speed-filter></wind-speed-filter>
      <div class="msg" v-if="!getErrorMsg && !getCityWeather">
        Search city in Sweden for weather forecast
      </div>
      <div class="msg" v-if="getErrorMsg">Oops! {{ getErrorMsg }}</div>
      <city-weather-card v-if="getCityWeather"></city-weather-card>
    </div>
  </div>
</template>
<script>
import CityWeatherCard from "../components/CityWeatherCard.vue";
import CitySearch from "../components/CitySearch.vue";
import WindSpeedFilter from "../components/WindSpeedFilter.vue";
export default {
  components: { CityWeatherCard, CitySearch, WindSpeedFilter },
  name: "Home",
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    getCityWeather() {
      return this.$store.state.cityWeather;
    },
    getErrorMsg() {
      return this.$store.state.errorMsg;
    },
  },
};
</script>
<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* max-width: 100vw; */
  min-height: 100vh;
}
.cont {
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  width: 80%;
  height: 80vh;
  background-color: rgb(110, 160, 207);
  border-radius: 10px;
  padding: 30px;
  /* margin: auto; */
}
.city-search {
  margin-bottom: 20px;
}
.msg {
  color: white;
  font-size: 35px;
}
</style>
