<template>
  <a-scene
   embedded
   v-if="show" >
    <a-assets>
      <img :src="src" id="image1">
    </a-assets>
    <a-text :value="text"
      position=" 0 0.5 -3" align="center"
      rotation="0 0 0" color="#7993ff" scale="1 1 1"></a-text>
    <a-image src="#image1" position=" 0 0.5 -3"></a-image>
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
