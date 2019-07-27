<template>
  <a-scene
    embedded
    arjs="debugUIEnabled:false; trackingMethod: best; sourceType: webcam;"
    v-if="show"
  >
    <a-sphere position="0 0.5 0" radius="0.5" color="#EF2D5E"></a-sphere>
    <a-plane position="0 0 0" rotation="-90 0 0" width="1" height="1" color="#7BC8A4"></a-plane>
    <a-marker preset="hiro">
        <a-text value="My name is soeyu!\n Nice to meet you!"
        position=" 0 0 1" align="center" rotation="-90 0 0" color="#7993ff"></a-text>
    </a-marker>
    <a-entity camera></a-entity>
    <!-- <a-marker-camera preset='hiro'></a-marker-camera> -->
  </a-scene>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      show: false,
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
  },
  async mounted() {
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
