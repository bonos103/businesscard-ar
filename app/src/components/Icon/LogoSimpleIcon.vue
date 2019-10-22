<template lang="pug">
  a-icon(:component="Logo", :style="customStyle", :class="$style.icon")
</template>
<script>
import Logo from '@/assets/images/icons/logo-simple.svg?component'

export default {
  props: {
    customStyle: { type: Object },
  },
  data() {
    return {
      Logo,
    }
  },
}
</script>
<style module>
  .icon {
    & svg {
      display: block;
      fill: var(--black);
    }
  }
</style>
