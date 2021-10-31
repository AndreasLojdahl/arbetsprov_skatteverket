<template>
  <div class="card-container">
    <div v-if="getCityWeather.forecastList[0].tempCelsius">
      <span class="font-size-40">
        {{ getCityWeather.forecastList[0].tempCelsius }}
      </span>
      ℃
    </div>
    <div class="card-header, font-size-24">
      {{ getCityWeather.name }}, <span>{{ getCityWeather.country }}</span>
    </div>

    <div class="flex-row mt-20 flex-space-between">
      <!-- // creates a daily forecast for today, tomorrow and day after tomorrow.
       Remove 3 first forecasts from array on days after today   -->
      <div class="col">
        <div class="font-size-24 border-bottom mb-15">Today</div>
        <city-weather-small-card
          v-for="(cityForecast, i) in getForecastWeatherToday"
          :key="cityForecast.dateTime + i"
          :forecastWeather="cityForecast"
        ></city-weather-small-card>
      </div>
      <div class="col">
        <div class="font-size-24 border-bottom mb-15">Tomorrow</div>
        <city-weather-small-card
          v-for="(cityForecast, i) in getForecastWeatherTomorrow.splice(
            2,
            getForecastWeatherTomorrow.length
          )"
          :key="cityForecast.dateTime + i"
          :forecastWeather="cityForecast"
        ></city-weather-small-card>
      </div>
      <div class="col">
        <div class="font-size-24 border-bottom mb-15">
          {{ getDateDayAfterTomorrow.toLocaleDateString() }}
        </div>
        <city-weather-small-card
          v-for="(cityForecast, i) in getForecastWeatherDayAfterTomorrow.splice(
            2,
            getForecastWeatherDayAfterTomorrow.length
          )"
          :key="cityForecast.dateTime + i"
          :forecastWeather="cityForecast"
        ></city-weather-small-card>
      </div>
    </div>
  </div>
</template>
<script>
import CityWeatherSmallCard from "./CityWeatherSmallCard.vue";
export default {
  components: { CityWeatherSmallCard },
  name: "CityWeatherCard",
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    getWindSpeedFilter() {
      return this.$store.state.windSpeedFilter;
    },
    getCityWeather() {
      return this.$store.state.cityWeather;
    },
    getDateNow() {
      let dateNow = new Date();
      return new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate()
      );
    },
    getDateTomorrow() {
      return new Date(
        this.getDateNow.getFullYear(),
        this.getDateNow.getMonth(),
        this.getDateNow.getDate() + 1
      );
    },
    getDateDayAfterTomorrow() {
      return new Date(
        this.getDateTomorrow.getFullYear(),
        this.getDateTomorrow.getMonth(),
        this.getDateTomorrow.getDate() + 1
      );
    },
    // Returns array of forecasts if date is today
    getForecastWeatherToday() {
      let cityWeather = this.getCityWeather.forecastList.filter((city) => {
        if (this.checkIfPassingSpeedFilter(city)) {
          return this.checkIfSameDate(
            this.getDateNow,
            this.extractDate(city.dateTime)
          );
        }
      });
      return cityWeather;
    },
    // Returns array of forecasts if date is tomorrow
    getForecastWeatherTomorrow() {
      let cityWeather = this.getCityWeather.forecastList.filter((city) => {
        if (this.checkIfPassingSpeedFilter(city)) {
          return this.checkIfSameDate(
            this.getDateTomorrow,
            this.extractDate(city.dateTime)
          );
        }
      });
      return cityWeather;
    },
    // Returns array of forecasts if date is day after tomorrow
    getForecastWeatherDayAfterTomorrow() {
      let cityWeather = this.getCityWeather.forecastList.filter((city) => {
        if (this.checkIfPassingSpeedFilter(city)) {
          return this.checkIfSameDate(
            this.getDateDayAfterTomorrow,
            this.extractDate(city.dateTime)
          );
        }
      });
      return cityWeather;
    },
  },
  methods: {
    extractDate(date) {
      // multiply with 1000 becasue its unix time
      let forecastDate = new Date(date * 1000);
      return new Date(
        forecastDate.getFullYear(),
        forecastDate.getMonth(),
        forecastDate.getDate()
      );
    },
    checkIfSameDate(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    },
    checkIfPassingSpeedFilter(cityWeather) {
      return cityWeather.windSpeed > this.getWindSpeedFilter;
    },
  },
};
</script>
<style lang="css" scoped>
.card-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  /* width: 60%; */
}
.font-size-24 {
  font-size: 24px;
}
.font-size-40 {
  font-size: 40px;
}
.font-size-12 {
  font-size: 12px;
}

.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-end {
  display: flex;
  align-items: flex-end;
}

.flex-space-between {
  display: flex;
  justify-content: space-between;
}

.mt-20 {
  margin-top: 50px;
}
.mb-15 {
  margin-bottom: 15px;
}

.border-bottom {
  border-bottom: white 1px solid;
}
</style>
