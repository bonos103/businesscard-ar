<template lang="pug">
  a-icon(:component="Icon", :style="customStyle", :class="$style.icon")
</template>
<script>
import CenterIcon from '@/assets/images/icons/align-center.svg?component'
import LeftIcon from '@/assets/images/icons/align-left.svg?component'
import RightIcon from '@/assets/images/icons/align-right.svg?component'

export default {
  props: {
    customStyle: { type: Object },
    type: { type: String, default: 'left' },
  },
  computed: {
    Icon() {
      switch (this.type) {
        case 'center':
          return CenterIcon
        case 'left':
          return LeftIcon
        case 'right':
          return RightIcon
        default:
          return ''
      }
    },
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
