<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';
export default {
  name: 'App',
  components: {
    NavBar,
    FooterBar,
  }
}
</script>

<style>
  body {
      font-family: Helvetica, sans-serif;
      background: #fffff0;
  }

  h1{
    font-family: Gotham, "Helcetica Neue", Helcetica, Arial, "sans-serrif";
    font-size: 2vw;
    text-align: center; 
  }

  h2{
    font-family: Gotham, "Helcetica Neue", Helcetica, Arial, "sans-serrif";
    font-size: 1.5vw;
    text-align: center;
  }

  ul {
      list-style: none;
  }

  li {
      background: #f3f3f3;
      display: flex;
  }

</style>
