<template>
  <router-view/>
</template>
<script>
export default {
  // metaInfo() {
  //   return {
  //     meta: [
  //       {
  //         vmid: 'viewport',
  //         name: 'viewport',
  //         content: 'width=device-width,initial-scale=1.0',
  //       },
  //     ],
  //   }
  // },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
