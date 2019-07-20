<template>
  <a-scene embedded arjs v-if="show">
    <a-marker preset="hiro">
        <a-box position='0 0.5 0' material='color: yellow;'></a-box>
    </a-marker>
    <a-entity camera></a-entity>
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
}
</script>
