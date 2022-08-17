<template>
  <div>
    <div v-if="weathers">
      <div v-for="weather in weathers" :key="weather.id">
        <CityCard  v-bind:weather="weather"/>
      </div>
    </div>
    <NoCities v-if="this.weathers.length == 0" v-on:open-modal="openModal"/>
  </div>
</template>

<script>
import CityCard from './CityCard.vue'
import NoCities from './NoCities.vue'

export default {
    components: {
        CityCard, NoCities
    },
  props: ["weathers"],
  methods: {
    openModal() {
        this.$emit("open-modal")
      }
    }
}
</script>

<style>

</style>