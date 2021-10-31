<template>
  <div v-if="getCityWeather">
    <div class="windspeed-container flex-col">
      <div class="font-size-12">Filter windspeed</div>
      <select class="windspeed-select" @change="onChange($event)">
        <option v-for="(value, i) in getWindSpeedSelections" :key="value + i">
          {{ value }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "WindSpeedFilter",
  props: {},
  data() {
    return {};
  },
  created() {},
  computed: {
    getWindSpeedSelections() {
      return ["Reset", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    },
    getCityWeather() {
      return this.$store.state.cityWeather;
    },
  },
  methods: {
    onChange(event) {
      event.target.value === "Reset"
        ? this.$store.dispatch("setWindSpeedFilter", null)
        : this.$store.dispatch("setWindSpeedFilter", event.target.value);
    },
  },
};
</script>

<style scoped>
.windspeed-container {
  display: flex;
  width: 15%;
  color: white;
}

.windspeed-select {
  border-radius: 5px;
  line-height: 1.5em;
  padding: 10px 16px;
  border: 1px solid transparent;
  background: rgb(215, 238, 252);
  outline: none;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.font-size-12 {
  font-size: 12px;
}
</style>
