<template>
  <div class="main">
    <div v-if="weather">
      <CityCard v-bind:weather="this.weather"/>
    </div>
    <div v-else>
      Weather is Loading...
    </div>
    <router-view v-bind:cities="cities"/>
  </div>
</template>

<script >
import axios from "axios"
import {ref} from "vue"
import CityCard from "./components/CityCard.vue"

export default {
  name: "App",
  components: {
    CityCard
  },
  data() {
    return {
      APIKey: "9f326ee9b09aee5a00b633ce569dad61",
      city: ['Moscow'],
      cities: ['Moscow','London'],
      weather: null
    }
  },
  created() {
    // this.cities.forEach(city => this.getCurrentWeather(city))
    this.getCurrentWeather(this.city)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  },

  methods: {
    getCityWeather() {
      return 0
    },
    getCurrentWeather(city) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.APIKey}`)
        .then(response => {
          // const newWeather = response.data
          // this.weather.push(newWeather)
          this.weather = response.data
          console.log(this.weather)
        })
        .then(error => console.log(error.response.data))
    },
    showPosition(position) {
      this.setLocalStorage(position)
       console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude)
    },
    setLocalStorage(position) {
      this.cities = ['Moscow','London']
      const parsed = JSON.stringify(this.cities)
      localStorage.setItem('cities', parsed)
    }
  },
  mounted() {
    if (localStorage.getItem('cities'))
    console.log('Local storage is: ', localStorage)
      try {
        this.cities = JSON.parse(localStorage.getItem('cities'))
      } catch (e) {
        localStorage.removeItem('cities')
      }
  },
  watch: {
    cities(newCity) {localStorage.cities = [...this.cities, newCity]}
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 font-family: "Lato", sans-serif;

}
</style>
