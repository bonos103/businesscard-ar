<template lang="pug">
  div(:class="$style.button", @click="handleCapture") Cap
</template>
<script>
export default {
  methods: {
    projectVideoToCanvas(video, canvas, ratio) {
      const bodyWidth = canvas.width
      const bodyHeight = canvas.height
      const videoWidth = video.clientWidth * ratio
      const videoHeight = video.clientHeight * ratio
      const offsetX = (bodyWidth - videoWidth) / 2
      const offsetY = (bodyHeight - videoHeight) / 2
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, offsetX, offsetY, videoWidth, videoHeight)
    },
    projectArToCanvas(ar, canvas, ratio) {
      const bodyWidth = canvas.width
      const bodyHeight = canvas.height
      const arWidth = ar.clientWidth * ratio
      const arHeight = ar.clientHeight * ratio
      const offsetX = (bodyWidth - arWidth) / 2
      const offsetY = (bodyHeight - arHeight) / 2
      const ctx = canvas.getContext('2d')
      ctx.drawImage(ar, offsetX, offsetY, arWidth, arHeight)
      const data = ar.toDataURL()
      const img = document.createElement('img')
      img.src = data
      document.body.append(img)
    },
    handleCapture() {
      const ratio = window.devicePixelRatio
      const canvas = document.createElement('canvas')
      const video = document.querySelector('video')
      const ar = document.querySelector('canvas')
      console.log(ar)
      const bodyWidth = document.body.clientWidth
      const bodyHeight = document.body.clientHeight
      canvas.width = bodyWidth * ratio
      canvas.height = bodyHeight * ratio
      this.projectVideoToCanvas(video, canvas, ratio)
      this.projectArToCanvas(ar, canvas, ratio)

      const link = document.createElement('a')
      link.download = 'screenshot_qrar'
      link.href = canvas.toDataURL()
      link.click()
      console.log('downloaded')
    },
  },
}
</script>
<style lang="postcss" module>
  .button {
    position: fixed;
    bottom: 20px;
    left: 50%;
    font-size: 2rem;
    font-weight: bold;
    color: red;
    transform: translateX(-50%);
  }
</style>
