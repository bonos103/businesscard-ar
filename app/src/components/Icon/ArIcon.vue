<template lang="pug">
  a-icon(:component="ArIcon", :style="customStyle")
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
