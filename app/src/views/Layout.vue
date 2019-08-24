<template lang="pug">
  a-layout(:class="$style.layout")
    a-layout-header(:class="$style.header")
      layout-header
    a-layout-content(:class="$style.content")
      router-view
    a-layout-footer
      layout-footer
</template>
<script>
import LayoutHeader from '@/components/Layout/Header.vue'
import LayoutFooter from '@/components/Layout/Footer.vue'

export default {
  components: {
    LayoutHeader,
    LayoutFooter,
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
