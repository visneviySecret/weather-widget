<template>
  <div class="Card">
    <header>
      {{ this.city }}, {{ this.country}}
    </header>
    <body>
      <div class="temperature">{{this.temperature}}</div>
      <div class="description">Feels like {{this.feels_like}}</div>
      <div class="parameters" v-for="parameter in parameters" :key="parameter">
        {{ parameter }}
      </div>
    </body>
  </div>
</template>

<script>
export default {
  name: "CityCard",
  props: ["weather", "cities"],

  data() {
    return {
      city: this.weather.name,
      country: this.weather.sys.country,
      temperature: this.weather.main.temp,
      feels_like: this.weather.main.feels_like,
      parameters: {
          wind: this.weather.wind.speed,
          pressure: this.weather.main.pressure,
          humidity: this.weather.main.humidity,
          dew_point: 0,
          visibility: this.weather.visibility,
      }
    }
  },
  created() {
    console.log(JSON.parse(JSON.stringify(this.weather)), 'from cityCard')
  }
}
</script>

<style lang="scss" scoped>

</style>