<template>
  <div class="card">
    <div class="title">
        No cities in list, add a new one?
    </div> 
    <button class="button" @click="goToModal">Add city!</button>
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
.card {
    background-color: rgb(246, 222, 203, 0.25);
    border-radius: 1rem;
    width: 16rem;
    padding: 1rem;
}
.title{
  margin-top: 2rem;
  font-weight: 400;
}
.button {
  width: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  height: 1.5rem;
  background-color: rgb(231, 190, 190, 0.5);
  border-radius: 1rem;
  border: none;
  cursor: pointer;
}
.button:hover {
  background-color: rgb(231, 190, 190, 0.8);
  
}
</style>