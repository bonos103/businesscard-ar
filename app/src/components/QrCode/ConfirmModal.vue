<template lang="pug">
  a-modal(:visible="value", :footer="null", :width="560", @cancel="handleCancel")
    div(:class="$style.title") スマホでQRコードを読み込んでください
    div(:class="$style.canvas")
      canvas(ref="canvas", width="200px", height="200px")
    div(:class="$style.text")
      | QRコードを読み込むとWebブラウザを開きます。
      br
      | ブラウザ上で起動したカメラをこちらのQRコードに向けてください。
</template>
<style module>
  .title{
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
    padding: 1em 0;
  }
  .canvas {
    text-align: center;
    margin-bottom: 20px;
  }
  .text {
    font-size: 1.4rem;
    text-align: center;
    @media (--sm) {
      & br {
        display: none;
      }
    }
  }
</style>
<script>
import QRCode from 'qrcode'
import THREEx from '@/assets/javascripts/threex-arpatternfile'

export default {
  props: {
    value: { type: Boolean, default: false },
    text: { type: String, require: true, default: 'hogehgoe' },
  },
  data() {
    return {
      canvas: null,
      SITE_URL: process.env.VUE_APP_URL,
    }
  },
  mounted() {
    this.handleUpdate(this.text)
  },
  methods: {
    async handleUpdate(text) {
      await this.createQRCode(text)
      await this.updateCanvas()
    },
    async createQRCode(value) {
      const link = new URL('ar-sample', this.SITE_URL)
      link.searchParams.append('text', value)
      this.imgSrc = await QRCode.toDataURL(link.href)
      return new Promise((resolve) => {
        THREEx.ArPatternFile.buildFullMarker(this.imgSrc, 0.5, 300, 'black', (imageURL) => {
          this.markerSrc = imageURL
          resolve(imageURL)
        })
      })
    },
    async updateCanvas() {
      const cvs = this.$refs.canvas
      const ctx = cvs.getContext('2d')
      const img = new Image()
      img.src = this.markerSrc
      return new Promise((resolve) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 200, 200)
          resolve()
        }
      })
    },
    handleCancel() {
      this.$emit('input', false)
    },
  },
  watch: {
    text(value) {
      this.handleUpdate(value)
    },
  },
}
</script>
