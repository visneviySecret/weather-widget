<template>
  <div class="main">
    <div class="App">
      <div class="cog-mg" v-on:click="this.toggleModal">
        <img v-if="!this.modalOpen" width="20px" src="./assets/icon_settingscog.png" alt="">
        <img v-else width="20px" src="./assets/icon_cross.png"/>
      </div>
      <div v-if="this.isLoading">Loading...</div>
      <div v-else>
        <Modal 
          v-if="this.modalOpen" 
          v-bind:cities="this.cities" 
          v-bind:weathers="this.weathers"
          :APIKey="this.APIKey" 
          v-on:add-city="this.addCity" 
          v-on:delete-city="this.deleteCity"
          v-on:update-cities="this.updateCities"/> 
        <CityList 
          v-else 
          v-bind:weathers="this.weathers" 
          v-on:open-modal="this.toggleModal"/>
      </div>
      <router-view v-bind:cities="this.cities"/>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios"
import {ref, defineComponent, reactive, toRefs} from "vue"
import CityList from "./components/Weather/CityList.vue"
import Modal from './components/Settings/Modal.vue'
import City from './types/City'
import Position from "./types/Position"
import Weather from './types/Weather'

export default defineComponent({
  name: "App",
  components: {
    CityList, Modal,
  },
  setup() {
    const cities = ref<City[] | null>([])
    const weathers = ref<Weather[] | null>([])
    const state = reactive({
      modalOpen: false,
      isLoading: true,
      order: 0
    })
    return { ...toRefs(state), cities, weathers}
  },
  data() {
    return {
      APIKey: "9f326ee9b09aee5a00b633ce569dad61",
      mapboxAPIKey: "pk.eyJ1IjoiYmVsb2RpbiIsImEiOiJjbDZ4dTBoYWEwNDcwM2NtcGNxeXNtNTh4In0.vOOy5sQ1z79Dc1tQV-6tRA",
    }
  },
  created() {
    this.loadLocalStorage()
    console.log("Hi from a new version of WeatherApp!")
  },
  mounted() {
    this.loadWeather()
    if (this.cities.length === 0) { this.isLoading = false }
  },
  methods: {
    toggleModal() {this.modalOpen = !this.modalOpen},
    addCity(cityName: string, cityId: number, country?: string, weatherData?: Weather) {
      const newCity = { name: cityName, id: cityId, country, order: ++this.order }
      this.cities.push(newCity)
      this.weathers.push(weatherData)
      this.setLocalStorage()
    },
    deleteCity(city: City) {
      this.cities = this.cities.filter(item => item.id !== city.id)
      this.weathers = this.weathers.filter(item => item.id !== city.id)
      this.setLocalStorage()
    },
    updateCities(value: City[]) {
      this.cities = value
      this.cities.forEach((city, index) => {
        city.order = index
      })
      this.weathers = []
      this.loadWeather()
      this.setLocalStorage()
    },
    loadWeather() {this.cities.forEach(city => this.getCurrentWeather(city))},
    getCurrentWeather(city: City) {
      const {name, id} = city
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=imperial&appid=${this.APIKey}`)
        .then(response => {
          const currentCityWeather = response.data
          this.weathers.push({ ...currentCityWeather, id }) // change weather's id to handle delete function
          this.isLoading = false
        })
    },
    getUserGeoPosition(position: any) {
      console.log(position)
      const { latitude, longitude } = position.coords
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c1ef089d475b4ed185a97c2195435845`)
        .then(response => response.json())
        .then(result => result.results[0].components)
        .then(city => {
          this.setLocalCity(city)
        })
    },
    setLocalCity(position: Position) {
      const { state, postcode } = position
      console.log("user current position is: ",)
      this.addCity(state, postcode)
      this.setLocalStorage()
    },
    setLocalStorage() {localStorage.setItem('cities', JSON.stringify(this.cities))},
    loadLocalStorage() {
    if (localStorage.getItem('cities'))
      {
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
    }
  },
})
</script>

<style lang="css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
}
.cog-mg{
  position: absolute;
  top: 1rem;
  left: 13.4rem;
  cursor: pointer;
}
.App {
  width: 16rem;
  margin: 0 auto;
  position: relative;
}
</style>
