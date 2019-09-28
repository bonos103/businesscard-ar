<template lang="pug">
  a-icon(:component="PlusIcon", :style="customStyle", :class="$style.icon")
</template>
<script>
import PlusIcon from '@/assets/images/icons/plus.svg?component'

export default {
  props: {
    customStyle: { type: Object },
  },
  data() {
    return {
      PlusIcon,
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
