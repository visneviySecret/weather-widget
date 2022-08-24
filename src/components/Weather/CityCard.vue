<template>
  <div class="Card">
    <header class="header">
      {{ name }}, {{ country}}
    </header>
    <body class="body">
      <div class="img-temp">
        <img class="img" :src="icon_url" />
        <div class="temperature">{{temperature}}&deg;C</div>
      </div>
      <div class="description">Feels like {{feels_like}}&deg;C. {{description[0].toUpperCase()}}{{description.slice(1)}} </div>
      <div class="parameters">
        <div class="parameter" v-for="(parameter, key, index) in parameters" :key="key">
          
          <div v-if="parametersTitle[index].title.includes('http')">
              <img :src="parametersTitle[index].title" alt="" width="18px"></div>
          <div v-else><span>{{parametersTitle[index].title}}:</span></div>

          {{parameter}}
          <span v-if="parametersTitle[index].measure.includes('deg')">&deg;C</span>
          <span v-else>{{parametersTitle[index].measure}}</span>

        </div>
      </div>
    </body>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Weather from '@/types/Weather'

export default defineComponent({
  name: "CityCard",
  props: {
    weather: {
      required: true,
      type: Object as PropType<Weather>,
  }},
  data() {
    const icon = this.weather.weather[0].icon
    const icon_url = `http://openweathermap.org/img/wn/${icon}@2x.png`
    const parametersTitle = [
      {title: "https://cdn2.iconfinder.com/data/icons/mobile-web-app-vol-2/32/Direction_arrow_paper_plane_move-512.png", measure:"m/s SSE"},
      {title: "https://www.shareicon.net/data/2015/08/18/87061_reading_512x512.png", measure:"hPa"},
      {title: "Humidity", measure:"%"},
      {title: "Dew point", measure:"deg"},
      {title: "Visibility", measure:"km"}
    ]
    return {
      name: this.weather.name,
      country: this.weather.sys.country,
      temperature: Math.round((this.weather.main.temp-32)*5/9),
      feels_like: Math.round((this.weather.main.feels_like-32)*5/9),
      description: `${this.weather.weather[0].description}. ${this.weather.weather[0].main}`,

      icon_url,
      parameters: {
          wind: Math.round(this.weather.wind.speed*10)/10,
          pressure: this.weather.main.pressure,
          humidity: this.weather.main.humidity,
          dew_point: null,
          visibility: Math.round(this.weather.visibility)/1000 ,
      },
      parametersTitle
    }
  },
  created() {
    this.calculateDewPoint()
  },
  methods: {
    calculateDewPoint() {
    if (this.parameters.humidity) {
      const lambda = Math.log(this.parameters.humidity / 100)+ 17.625*this.temperature/(243.04+this.temperature)
      const dewPoint = 17.625 * lambda / (17.625 - lambda)
      this.parameters.dew_point = Math.round(dewPoint*10)/10
    }
    }
  }
})
</script>

<style>
.header{
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 0.75rem;
}
.body{
  font-size: 0.85rem;
  letter-spacing: 0.3px;
}
.img-temp{
  display: flex;
  vertical-align: middle;
  align-items: center;
  margin-bottom: 0.75rem;
  }
.img{
  width: 100px;
}
.temperature{
  font-size: 2rem;
}
.description {
  margin-bottom: 0.8rem;
}
.parameters{
  display: grid; 
  grid-template-columns: 1fr 1fr;
  row-gap: 0.2rem;

}
.parameters div{
  display: flex; 
}
.parameter div {
  margin-right: 0.35rem;
}
</style>