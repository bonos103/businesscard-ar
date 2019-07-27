<template>
  <a-scene v-if="show">
    <a-box position="0 2 0" rotation="0 45 45" scale="2 4 2">
      <a-sphere position="1 0 3"></a-sphere>
    </a-box>
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
    // this.loadScript({ src: 'https://cdn.rawgit.com/jeromeetienne/AR.js/1.7.5/aframe/build/aframe-ar.js', id: 'aframe-ar-script' })
    await Promise.all([this.loadPromise('#aframe-script')])
    // await Promise.all([this.loadPromise('#aframe-script'), this.loadPromise('#aframe-ar-script')])
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
