<template lang="pug">
  a-layout(:class="$style.layout")
    div(:class="$style.header")
      home-header
    div(:class="$style.content")
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
    background-color: #fff;
  }
  .header {
    position: relative;
    background-color: #fff;
    padding: 0 20px;
    box-shadow: 0 -8px 10px 0 var(--black);
    z-index: 1;
    @media (--md) {
      padding: 0 30px;
    }
  }
</style>
