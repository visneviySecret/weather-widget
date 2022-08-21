<template>
  <div class="modal-wrapper" ref="modal">
    <span class="header">Settings</span>

    <ul class="cities-list">
      <li  v-for="city in cities" :key="city.id" class="city">
          <img class="drag-img" src="../../assets/icon_drag.png" width="20px" alt="draggable object">
          {{city.name}}, 
            <img class="delete-button" width="30px" alt="trash bin" src="../../assets/icon_trash.png" @click="deleteCity(city)">
      </li>
    </ul>


    <div class="add-location">
        <label for="city-name">Add Location: </label>
        <div class="add-location__input-enter">
          <input 
            type="text" 
            name="city-name" 
            @input="getSearchResults"
            placeholder="search by city name" 
            v-model="searchQuery">
            <img @click="addCity" src="../../assets/icon_enter.png" alt="" width="30px">
        </div>

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
    props: ["cities", "APIKey", "weathers"],
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
      if (this.cities.find(city => city.name.toLowerCase() === this.city.toLowerCase())) { alert('This city is alredy in list'); return}
      if (this.city === "") { alert("Field can not be empty") }
      else {
        try {
          const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIKey}`)
          const data = await result.data
          // console.log('from addcity: ', data)
          this.$emit("add-city", this.city, data.id, data)
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
      this.city = searchResult.text.replace(/\u0301/g, "") // Убирает буквы со знаком ударения
      this.mapboxSearchResults = ""
    }
  }
}
</script>

<style>
.modal-wrapper{
  width: 16rem;
  font-size: 0.85rem;
  letter-spacing: 0.3px;
  padding: 1rem;
  background-color: rgb(246, 222, 203, 0.25);
  border-radius: 1rem;
}
.header{
  font-size: 1.25rem;
  font-weight: 400;
}
.cities-list{
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.city {
  list-style-type: none;
  display: flex;
  align-items: center;
  background-color: rgba(58, 50, 44, 0.2);
  height: 1.5rem;
  position: relative;
}
.drag-img {
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  cursor: pointer;
}
.delete-button{
  position: absolute;
  right: 0.1rem;
  background: transparent;
  border: none;
  cursor: pointer;
}
.add-location__input-enter {
  display: flex;
  align-items: center;
  gap: 10px;
}
.add-location label {
  font-weight: 600;
  font-size: 0.9rem;
}
.add-location input {
  margin-top: 0.5rem;
  padding: 0.2rem 0.5rem;
  width: calc(100% - 2rem);
  height: 2rem;
}
.add-location button {
  border: none;
  cursor: pointer;
}
</style>