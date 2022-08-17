<template>
  <div class="main">
    <div class="App">
      <div v-on:click="toggleModal">Clock settings</div>
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <Modal 
          v-if="modalOpen" 
          v-bind:cities="cities" 
          :APIKey="APIKey" 
          v-on:add-city="addCity" 
          v-on:delete-city="deleteCity"/> 
        <CityList 
          v-else 
          v-bind:weathers="weathers" 
          v-on:open-modal="toggleModal"/>
      </div>

      <router-view v-bind:cities="cities"/>
    </div>
  </div>
</template>

<script >
import axios from "axios"
import {ref} from "vue"
import CityList from "./components/Weather/CityList.vue"
import Modal from './components/Settings/Modal.vue'

export default {
  name: "App",
  components: {
    CityList, Modal
  },
  data() {
    return {
      APIKey: "9f326ee9b09aee5a00b633ce569dad61",
      mapboxAPIKey: "pk.eyJ1IjoiYmVsb2RpbiIsImEiOiJjbDZ4dTBoYWEwNDcwM2NtcGNxeXNtNTh4In0.vOOy5sQ1z79Dc1tQV-6tRA",
      cities: [],
      weathers: [],
      modalOpen: false,
      isLoading: true
    }
  },
  created() {
    if (localStorage.getItem('cities'))
    {
      // localStorage.clear()
      console.log('Local storage is: ', localStorage)
      try {
        this.cities = JSON.parse(localStorage.getItem('cities'))
      }
      catch (e) {
          localStorage.removeItem('cities')
        }
    }   
    else if (window.navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(this.getUserGeoPosition, console.log);
      return;
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    
  },
  mounted() {
    this.cities.forEach(city => this.getCurrentWeather(city))
    if (this.cities.length === 0) {this.isLoading = false}
  },
  methods: {
    addCity(cityName, cityId, weatherData) {
      const newCity = { name: cityName, id: cityId }
      this.cities.push(newCity)
      this.weathers.push(weatherData)
      this.setLocalStorage()
    },
    deleteCity(city) {
      this.cities = this.cities.filter(item => item.id !== city.id)
      this.weathers = this.weathers.filter(item => item.id !== city.id)
      this.setLocalStorage()
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen
    },
    getCityWeather() {
      return 0
    },
    getCurrentWeather(city) {
      const {name, id} = city
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=imperial&appid=${this.APIKey}`)
        .then(response => {
          const currentCityWeather = response.data
          this.weathers.push({ ...currentCityWeather, id }) // change weather's id to handle delete function
          console.log(this.weathers, 'from current weather')
          this.isLoading = false
        })
        .then(error => console.log(error.response.data))
    },
    getUserGeoPosition(position) {
      const { latitude, longitude } = position.coords
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c1ef089d475b4ed185a97c2195435845`)
        .then(response => response.json())
        .then(result => result.results[0].components)
        .then(city => this.setLocalCity(city))
    },
    setLocalCity(position) {
      const { state, postcode } = position
      this.addCity (state, postcode)
      this.setLocalStorage()
    },
    setLocalStorage() {
      localStorage.setItem('cities', JSON.stringify(this.cities))
    }
  },
  watch: {
    // cities(newCity) {localStorage.cities = [...this.cities, newCity]}
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
