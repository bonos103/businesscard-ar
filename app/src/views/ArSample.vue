<template>
  <a-scene
   embedded
   arjs="debugUIEnabled:false; trackingMethod: best; sourceType: webcam;"
   v-if="show"
  >
    <div style="width: 100%; height: 100%;
    position: fixed; left: 0; top: 0; z-index: -1; overflow: hidden">
      <vr-object :text="text"></vr-object>
    </div>
    <a-assets>
      <img :src="src" id="image1" v-if="src" />
    </a-assets>
    <!-- <a-marker type="barcode" value="63"> -->
    <a-marker type="pattern" :url="markerUrl" smooth="true" v-if="show && src">
      <a-image src="#image1" rotation="-60 0 0" position=" 0 0.5 -0.5"
      :width="size.width" :height="size.height"></a-image>
      <!--<a-text :value="text"
      position=" 0 0.5 -0.5" align="center"
      rotation="-60 0 0" color="#7993ff" scale="1 1 1"></a-text>-->
    </a-marker>
    <a-entity camera></a-entity>
    <!-- <a-marker-camera preset='hiro'></a-marker-camera> -->
  </a-scene>
</template>

<script>
import 'aframe'
import VrObject from '@/components/Vr/Object.vue'
import LoadScript from '@/utils/LoadScript'
import MarkerPattern from '@/utils/MarkerPattern'
import Object2Canvas from '@/utils/Object2Canvas'

export default {
  name: 'About',
  components: {
    VrObject,
  },
  data() {
    return {
      show: false,
      size: {
        width: 0,
        height: 0,
      },
      src: null,
      text: null,
      marker: null,
      markerUrl: null,
      SITE_URL: process.env.VUE_APP_URL,
    }
  },
  methods: {
    async createMaterial(id = '#target1') {
      const canvas = await new Object2Canvas(document.querySelector(id)).canvas()
      this.src = canvas.toDataURL('image/png')
      const w = canvas.width
      const h = canvas.height
      if (w < h) {
        this.size = {
          width: w / w,
          height: h / w,
        }
      } else {
        this.size = {
          width: w / h,
          height: h / h,
        }
      }
    },
  },
  async mounted() {
    if (this.$route.query.text) {
      this.text = this.$route.query.text

      const link = new URL('ar-sample', this.SITE_URL)
      link.searchParams.append('text', this.text)
      const markerPattern = new MarkerPattern(link.href)
      this.markerUrl = await markerPattern.markerSrc
    }

    const loadAframeAr = new LoadScript('https://cdn.rawgit.com/jeromeetienne/AR.js/1.7.5/aframe/build/aframe-ar.js', 'aframe-ar-script').load()
    await Promise.all([loadAframeAr])

    this.show = true
    this.$nextTick(async () => {
      await this.createMaterial()
    })
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
