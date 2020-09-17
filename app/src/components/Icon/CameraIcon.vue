<template lang="pug">
  a-icon(:component="Icon", :style="customStyle", :class="$style.icon")
</template>
<script>
import Icon from '@/assets/images/icons/camera.svg?component'

export default {
  props: {
    customStyle: { type: Object },
  },
  data() {
    return {
      Icon,
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
