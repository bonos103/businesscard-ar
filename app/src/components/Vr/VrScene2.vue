<template>
  <a-scene
   vr-mode-ui="enabled: false;"
   embedded
   background="color:  #24CAFF" >
    <a-assets>
      <img src="@/assets/images/project/qr.png" id="businesscard" />
    </a-assets>
    <a-image :src="src"
      :position="`${size.width} ${size.height} 0`"
      rotation="0 0 0"
      :width="size.width" :height="size.height" id="object"></a-image>
    <a-image
      src="#businesscard"
      width="1" height="1"
      rotation="0 0 0"
      position=" 0 0 0"></a-image>
    <a-entity rotation="0 0 0" position="0 0 5" >
      <a-camera id="camera" far=1000 fov=80 zoom=1.5 position="0 0 0"></a-camera>
    </a-entity>
  </a-scene>
</template>

<script>
import 'aframe'
import Object2Canvas from '@/utils/Object2Canvas'

export default {
  name: 'VrScene',
  props: {
    node: { type: HTMLDivElement, required: true },
  },
  data() {
    return {
      show: false,
      src: null,
      size: {
        width: 0,
        height: 0,
      },
    }
  },
  methods: {
  },
  async mounted() {
    this.show = true
    await this.$nextTick()
    const object2Canvas = new Object2Canvas(this.node)
    await object2Canvas.init()
    this.src = await object2Canvas.toDataURL('image/png')
    this.size = await object2Canvas.aframeSize()
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
