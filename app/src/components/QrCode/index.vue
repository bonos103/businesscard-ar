<template lang="pug">
  img(v-if="markerSrc" :src="markerSrc")
</template>
<script>
import QRCode from 'qrcode'
import THREEx from '@/assets/javascripts/threex-arpatternfile'

export default {
  props: {
    text: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      imgSrc: null,
      markerSrc: null,
      marker: null,
      SITE_URL: process.env.VUE_APP_URL,
    }
  },
  methods: {
    async createQRCode(value) {
      const link = new URL('ar-sample', this.SITE_URL)
      link.searchParams.append('text', value)
      this.imgSrc = await QRCode.toDataURL(link.href)
      THREEx.ArPatternFile.encodeImageURL(this.imgSrc, (patternFileString) => {
        this.marker = patternFileString
      })
      THREEx.ArPatternFile.buildFullMarker(this.imgSrc, 0.5, 300, 'black', (imageURL) => {
        this.markerSrc = imageURL
      })
    },
  },
  watch: {
    text(value) {
      this.createQRCode(value)
    },
  },
}
</script>
