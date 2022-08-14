<template>
  <div class="main">
    <div v-if="weathers">
      <div v-for="weather in weathers" :key="weather.id">
        <CityCard  v-bind:weather="weather"/>
      </div>
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
      cities: [],
      weathers: []
    }
  },
  created() {
    if (localStorage.getItem('cities'))
    {
      console.log('Local storage is: ', localStorage)
      try {
          this.cities = localStorage.getItem('cities').split(',')
      }
      catch (e) {
          localStorage.removeItem('cities')
        }
    }   
  },
  mounted() {
    this.cities.forEach(city => this.getCurrentWeather(city))
    
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
          const currentCityWeather = response.data
          this.weathers.push(currentCityWeather)
        })
        .then(error => console.log(error.response.data))
    },
    showPosition(position) {
      this.setLocalStorage(position)
    },
    setLocalStorage(position) {
      // to set weather depand on coordinates use this position prop 
       console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude)

      const newCities = ['Moscow', 'Amsterdam', 'London']
      localStorage.setItem('cities', newCities)
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
