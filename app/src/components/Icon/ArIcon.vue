<template lang="pug">
  a-icon(:component="ArIcon", :style="customStyle", :class="$style.icon")
</template>
<script>
import ArIcon from '@/assets/images/icons/qr-code.svg?component'

export default {
  props: {
    customStyle: { type: Object },
  },
  data() {
    return {
      ArIcon,
    }
  },
}
</script>
<style module>
  .icon {
    & svg {
      display: block;
    }
  }
</style>
