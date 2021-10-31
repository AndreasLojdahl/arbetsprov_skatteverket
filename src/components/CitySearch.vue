<template>
  <form @submit.prevent="handleSubmit()">
    <input
      class="search-input"
      type="text"
      @input="getCitySuggestions()"
      placeholder="Search city.."
      id="citySearch"
      v-model="searchInput"
      list="cityList"
    />
    <datalist v-show="searchInput" id="cityList">
      <option v-for="city in cityList" :key="city.id">
        {{ city.name }}
      </option>
    </datalist>
  </form>
</template>
<script>
import SweCityList from "../misc/SweCityList.json";

export default {
  name: "CitySearch",
  props: {},
  data() {
    return {
      cityList: [],
      searchInput: "",
    };
  },
  computed: {
    getCityList() {
      return SweCityList;
    },
  },
  methods: {
    getCitySuggestions() {
      // returns the 4 first matching city objects from
      // the SweCityList json file based on input

      this.cityList = this.getCityList
        .filter((city) => {
          return city.name
            .toLowerCase()
            .startsWith(this.searchInput.toLowerCase());
        })
        .splice(0, 3);
    },

    handleSubmit() {
      // best would be to reset if only an error occurs
      this.$store.dispatch("resetCityWeather");
      
      this.$store.dispatch("getWeatherByCityDaily", {
        name: this.searchInput,
        country: "SE",
      });
      this.cityList = [];
      this.searchInput = "";
    },
  },
};
</script>
<style lang="css" scoped>
.search-input {
  display: flex;
  border-radius: 5px;
  line-height: 1.5em;
  padding: 10px 16px;
  /* width: 100%; */
  border: 1px solid transparent;
  background: rgb(215, 238, 252);
  outline: none;
}
</style>
