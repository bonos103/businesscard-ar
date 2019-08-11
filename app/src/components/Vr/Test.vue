<template>
  <a-scene
   vr-mode-ui="enabled: false;"
   embedded
   v-if="show"
   background="color:  #24CAFF" >
    <a-assets>
      <img :src="src" id="image1">
      <img src="@/assets/images/vr/businesscard.png" id="businesscard" />
    </a-assets>
    <a-image src="#image1" position="0.55 0.6 -3.3"></a-image>
    <a-image
      src="#businesscard"
      width="1.64545" height="1"
      rotation="-90 0 0"
      position=" 0 0 -3"></a-image>
  </a-scene>
</template>

<script>
import 'aframe'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'
import THREEx from '@/assets/javascripts/threex-arpatternfile'

export default {
  name: 'About',
  data() {
    return {
      show: false,
      src: null,
      text: null,
      marker: null,
      markerUrl: null,
      SITE_URL: process.env.VUE_APP_URL,
    }
  },
  methods: {
    async createMarker(value) {
      const link = new URL('ar-sample', this.SITE_URL)
      link.searchParams.append('text', value)
      const imgSrc = await QRCode.toDataURL(link.href)
      return new Promise((resolve) => {
        THREEx.ArPatternFile.encodeImageURL(imgSrc, (patternFileString) => {
          this.marker = patternFileString
          this.markerUrl = window.URL.createObjectURL(new Blob([patternFileString], { type: 'text/plain' }))
          resolve()
        })
      })
    },
  },
  async mounted() {
    if (this.$route.query.text) {
      this.text = this.$route.query.text
      await this.createMarker(this.text)
    }
    await new Promise((resolve) => {
      this.$nextTick(() => {
        html2canvas(document.querySelector('#target1')).then((canvas) => {
          document.body.appendChild(canvas)
          this.src = canvas.toDataURL()
          console.log(this.src)
          resolve()
        })
      })
    })
    this.show = true
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
