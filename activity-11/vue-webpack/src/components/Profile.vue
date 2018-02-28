<template>
  <div>
    <h1>Profile</h1>
    <h2>{{ name }}</h2>
    <img v-bind:src="imagePath"/>
  </div>
</template>

<script>
 export default {
   name: 'Profile',
   data () {
     return {
       name: 'Road Runner',
       imagePath: '/static/images/road-runner.jpg'
     }
   }
 }
</script>

<style scoped>
 img {
     max-width: 500px;
 }
</style>
