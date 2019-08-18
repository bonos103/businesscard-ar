<template lang="pug">
  a-icon(:component="ArIcon")
</template>
<script>
import qrCodeSvg from '@/assets/images/icons/qr-code.svg?component'

console.log(qrCodeSvg)
const ArIcon = {
  template: qrCodeSvg,
}

export default {
  data() {
    return {
      ArIcon,
    }
  },
}
</script>
