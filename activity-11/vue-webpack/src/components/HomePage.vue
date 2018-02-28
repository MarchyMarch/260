<template>
    <div class="hero">
	<h1>Simplify Your Life</h1>
	<img v-bind:src="imagePath"/>
    </div>
</template>

<script>
 export default {
     name: 'HomePage',
     data () {
	 return {
	     imagePath: '/static/images/cloud.jpg'
	 }
     }
 }
</script>

<style scoped>
 body {
     padding: 0px;
     margin: 0px;
 }
 .hero {
     text-align: center;
 }
 h1 {
     font-size: 2.5em;
     letter-spacing: .2rem;
     color: #999;
     margin-bottom: 2px;
 }
 img {
     width: 100%;
 }
</style>