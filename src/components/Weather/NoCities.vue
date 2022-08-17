<template>
  <div>
    <div>
        No cities in list, add a new one?
    </div> 
    <button @click="goToModal">Add city</button>
  </div>
</template>

<script>
export default {
    methods: {
        goToModal() {
            this.$emit("open-modal")
        }
    }
}
</script>

<style>

</style>