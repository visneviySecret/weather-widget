<template>
  <div>
    <div v-if="weathers">
      <div v-for="weather in weathers" :key="weather.id">
        <CityCard  v-bind:weather="weather"/>
      </div>
    </div>
    <div v-else>
      Weather is Loading...
    </div>
  </div>
</template>

<script>
import CityCard from './CityCard.vue'
export default {
    components: {
        CityCard
    },
    props: ["weathers"]
}
</script>

<style>

</style>