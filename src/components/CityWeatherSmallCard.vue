<template>
  <div class="container">
    <div class="top-container flex-end">
      <div class="small-font mr-10">{{ getTimeFromForecast }}</div>
      <div class="flex-start">
        <div class="big-font flex-end">
          {{ forecastWeather.tempCelsius }}
        </div>
        ℃
      </div>
    </div>
    <div class="flex-end">
      <div
        class="small-font"
        v-for="weather in forecastWeather.weather"
        :key="weather.id"
      >
        - {{ weather.description }} | {{ forecastWeather.windSpeed }} m/s
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CityWeatherSmallCard",
  props: {
    forecastWeather: Object,
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    getTimeFromForecast() {
      let time = new Date(
        this.forecastWeather.dateTime * 1000
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      return time;
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
.top-container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.big-font {
  font-size: 22px;
}
.small-font {
  font-size: 12px;
}

.flex-end {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.flex-start {
  display: flex;
  align-items: flex-start;
}

.mr-10 {
  margin-right: 10px;
}
.bottom {
  display: flex;
  align-self: flex-end;
}
</style>
