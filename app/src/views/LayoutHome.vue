<template lang="pug">
  a-layout(:class="$style.layout")
    a-layout-header(:class="$style.header")
      home-header
    a-layout-content(:class="$style.content")
      router-view
    a-layout-footer
      home-footer
</template>
<script>
import HomeHeader from '@/components/Home/Header.vue'
import HomeFooter from '@/components/Home/Footer.vue'

export default {
  components: {
    HomeHeader,
    HomeFooter,
  },
}
</script>
<style module>
  .layout {
    min-height: 100%;
  }
  .content {
    flex: 1 0 auto;
    display: flex;
  }
  .header {
    padding: 0 20px;
    @media (--md) {
      padding: 0 30px;
    }
  }
</style>
