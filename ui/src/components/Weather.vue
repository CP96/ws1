<template>
  <div v-if="weatherInfo">{{weatherInfo.currently.summary +"  "+ weatherInfo.currently.temperature}} C</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Weather",
  
  data() {
    return {
      weatherInfo: null
    };
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    getWeather() {
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d212e752e77024fa82c5713e0debad8b/46.7712,23.6236?units=auto&exclude=minutely%22"
        )
        .then(response => response.data)
        .then(response => {
          console.log(response);
          this.weatherInfo = response;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

