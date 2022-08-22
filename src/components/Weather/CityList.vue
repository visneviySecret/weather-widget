<template>
  <div>
    <div v-if="weathers">
      <div v-for="weather in weathers" :key="weather.id">
        <CityCard  v-bind:weather="weather" class="card"/>
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
  .card {
    background-color: rgb(246, 222, 203, 0.25);
    border-radius: 1rem;
    width: 16rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
</style>