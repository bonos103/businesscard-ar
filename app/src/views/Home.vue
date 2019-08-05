<template lang="pug">
  layout-content
    text-heading {{title}}
    div
      a-textarea(
        v-model="value",
        :autosize="{ minRows: 4, maxRows: 6 }"
      )
    div
      qr-code(:text="text")
</template>

<script>
import LayoutContent from '@/components/Layout/Content.vue'
import TextHeading from '@/components/Text/Heading.vue'
import QrCode from '@/components/QrCode/index.vue'

export default {
  name: 'home',
  components: {
    LayoutContent,
    TextHeading,
    QrCode,
  },
  data() {
    const defaultValue = 'Autosize height with minimum and maximum number of lines Autosize height with minimum and maximum number of lines'
    return {
      title: 'HOME',
      value: defaultValue,
      text: defaultValue,
      timer: null,
    }
  },
  watch: {
    value(value) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.reloadQRCode(value)
      }, 1000)
    },
  },
  methods: {
    reloadQRCode(value) {
      console.log(value)
      this.text = value
    },
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: 'viewport',
          name: 'viewport',
          content: 'width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
        },
      ],
    }
  },
}
</script>
