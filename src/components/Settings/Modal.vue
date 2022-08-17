<template>
  <div class="modal" ref="modal">
    <span>Settings</span>

    <ul class="cities-list" v-for="city in cities" :key="city">
      <li style="display: flex">
        {{city}}
        <button @click="deleteCity(city)">delete</button>  
      </li>  
    </ul>

    <div class="modal-wrap" ref="modalWrap">
        <label for="city-name">Add Location: </label>
        <input type="text" name="city-name" placeholder="search by city name" v-model="city">
        <button @click="addCity">Enter</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "modalSettings",
    props: ["cities", "APIKey"],
    data() {
        return {
            city: ""
        }
  },
  methods: {
    async addCity() {
      console.log('from add city', this.city, this.cities, this.cities.find(city => city === this.city))
      if (this.cities.find(city => city === this.city)) { alert('This city is alredy in list'); return}
      if (this.city === "") { alert("Fiels cannot be empty") }
      else {
          const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIKey}`)
          const data = await res.data
          this.$emit("add-city", this.city, data)
        }
    },
    deleteCity(city) {
        console.log(city, 'was deleted')
      }
    }
}
</script>

<style>

</style>