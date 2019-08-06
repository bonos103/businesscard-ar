<template>
  <a-scene
   embedded
   arjs="debugUIEnabled:false; trackingMethod: best; sourceType: webcam;"
   v-if="show" >
    <!-- <a-marker type="barcode" value="63"> -->
    <a-marker type="pattern" :url="markerUrl" smooth="true">
        <a-text :value="text"
        position=" 0 0.5 -0.5" align="center"
        rotation="-60 0 0" color="#7993ff" scale="1 1 1"></a-text>
    </a-marker>
    <a-entity camera></a-entity>
    <!-- <a-marker-camera preset='hiro'></a-marker-camera> -->
  </a-scene>
</template>

<script>
import QRCode from 'qrcode'
import THREEx from '@/assets/javascripts/threex-arpatternfile'

export default {
  name: 'About',
  data() {
    return {
      show: false,
      text: null,
      marker: null,
      markerUrl: null,
      SITE_URL: process.env.VUE_APP_URL,
    }
  },
  methods: {
    loadScript({ src, id }) {
      if (!document) {
        return
      }
      const script = document.createElement('script')
      script.src = src
      if (id) {
        script.id = id
      }
      document.body.appendChild(script)
    },
    async loadPromise(id) {
      return new Promise((resolve, reject) => {
        const $el = document.querySelector(id)
        if (!$el) {
          reject()
        }
        $el.addEventListener('load', () => {
          resolve()
        })
      })
    },
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
    this.loadScript({ src: 'https://aframe.io/releases/0.9.2/aframe.min.js', id: 'aframe-script' })
    this.loadScript({ src: 'https://cdn.rawgit.com/jeromeetienne/AR.js/1.7.5/aframe/build/aframe-ar.js', id: 'aframe-ar-script' })
    await Promise.all([this.loadPromise('#aframe-script'), this.loadPromise('#aframe-ar-script')])
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
