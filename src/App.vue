<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
body {
  width:100%;
  height:100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  background: #333333;
}

#app {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>
