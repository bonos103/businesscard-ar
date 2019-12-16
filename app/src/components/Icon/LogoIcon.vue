<template lang="pug">
  a-icon(:component="Logo", :style="customStyle", :class="$style.icon")
</template>
<script>
import Logo from '@/assets/images/icons/logo.svg?component'

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
      width: 4.64em;
    }
  }
</style>
