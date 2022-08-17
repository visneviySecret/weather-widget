<template>
  <div class="Card">
    <header>
      {{ this.city }}, {{ this.country}}
    </header>
    <body>
      <div class="temperature">{{this.temperature}}&deg;</div>
      <img :src="icon_url"/>
      <div class="description">Feels like {{this.feels_like}}&deg;</div>
      <div class="parameters" v-for="(parameter, index) in parameters" :key="index">
        {{ parameter }}
      </div>
    </body>
  </div>
</template>

<script>
export default {
  name: "CityCard",
  props: ["weather"],
  data() {
    const icon = this.weather.weather[0].icon
    const icon_url = `http://openweathermap.org/img/wn/${icon}@2x.png`

    return {
      city: this.weather.name,
      country: this.weather.sys.country,
      temperature: Math.round((this.weather.main.temp-32)*5/9),
      feels_like: Math.round((this.weather.main.feels_like-32)*5/9),
      description: this.weather.weather[0].description,
      icon_url,
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
    console.log()
  }
}
</script>

<style lang="scss" scoped>

</style>