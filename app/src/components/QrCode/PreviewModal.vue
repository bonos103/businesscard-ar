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
import MarkerPattern from '@/utils/MarkerPattern'

export default {
  props: {
    value: { type: Boolean, default: false },
    id: { type: String, require: true, default: '' },
  },
  data() {
    return {
      markerSrc: null,
      SITE_URL: process.env.VUE_APP_URL,
    }
  },
  mounted() {
    this.handleUpdate(this.id)
  },
  methods: {
    async handleUpdate(id) {
      await this.createQRCode(id)
      await this.updateCanvas()
    },
    async createQRCode(id) {
      const { href } = this.$router.resolve({ name: 'ProjectPreview', params: { id } })
      const link = new URL(href, this.SITE_URL)
      const markerPattern = new MarkerPattern(link.href)
      this.markerSrc = await markerPattern.markerImage
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
}
</script>
