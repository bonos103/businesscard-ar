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
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: '',
    // all titles will be injected into this template
    titleTemplate: '%s | QRコード型WebAR作成ツール QRAR',
  },
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

html {
  font-size: 62.5%; /*ベースを10pxにしています*/
}
body {
  font-size: 1.0rem; /*10px*/
}
</style>
