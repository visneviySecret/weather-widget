<template>
  <div class="modal" ref="modal">
    <span>Settings</span>

    <ul class="cities-list" v-for="city in cities" :key="city">
      <li style="display: flex">
        {{city}}
        <button @click="deleteCity(city)" ref="delete">delete</button>  
      </li>  
    </ul>

    <div class="modal-wrap" ref="modalWrap">
        <label for="city-name">Add Location: </label>
        <input 
          type="text" 
          name="city-name" 
          @input="getSearchResults"
          placeholder="search by city name" 
          v-model="searchQuery">
        <button @click="addCity">Enter</button>
        <ul
          v-if="this.mapboxSearchResults">
          <li 
            v-for="searchResult in this.mapboxSearchResults" 
            :key="searchResult.id"
            @click="previewCity(searchResult)">
            {{ searchResult.place_name}}
          </li>
        </ul>
        <p v-if="this.searchError">"Something went wrong"</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { ref } from "vue"

export default {
  name: "modalSettings",
    props: ["cities", "APIKey"],
    data() {
        return {
          city: "",
          mapboxAPIKey: "pk.eyJ1IjoiYmVsb2RpbiIsImEiOiJjbDZ4dTBoYWEwNDcwM2NtcGNxeXNtNTh4In0.vOOy5sQ1z79Dc1tQV-6tRA",
          searchQuery: "",
          queryTimeout: null,
          mapboxSearchResults: '',
          searchError: null
        }
  },
  methods: {
    async addCity() {
      if (this.cities.find(city => city.toLowerCase() === this.city.toLowerCase())) { alert('This city is alredy in list'); return}
      if (this.city === "") { alert("Field can not be empty") }
      else {
        try {
          const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIKey}`)
          const data = await result.data
          this.$emit("add-city", this.city, data)
          this.searchQuery = ''
        }
        catch {
          alert("This city doesn't exist, try another one")
          }
        }
      },
    deleteCity(city) {
        this.$emit("delete-city", city)
    },
    getSearchResults() {
      clearTimeout(this.queryTimeout)
      this.queryTimeout = setTimeout(async () => {
        if (this.searchQuery !== '') {
          try {
            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchQuery}.json?limit=5&access_token=${this.mapboxAPIKey}&types=place`)
              .then(result => result.data)
              .then(data => this.mapboxSearchResults = data.features)
          }
          catch {
            this.searchError = true
          }
          return
        }
          this.mapboxSearchResults = null
      }, 300)
    },
    previewCity(searchResult) {
      this.searchQuery = searchResult.text
      this.city = searchResult.text
      this.mapboxSearchResults = ""
    }
  }
}
</script>

<style>

</style>