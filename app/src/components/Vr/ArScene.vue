<template>
  <a-scene
    embedded
    arjs="debugUIEnabled:false; trackingMethod: best; sourceType: webcam;"
    v-if="show"
  >
    <a-assets>
      <img src="@/assets/images/project/qr.png" id="businesscard" />
    </a-assets>
    <!-- <a-assets>
      <img src="@/assets/images/project/qr.png" id="businesscard" />
    </a-assets>
    <a-image
      v-for="object in objects"
      :key="object.id"
      :src="object.src"
      :position="`${object.x} ${object.y} ${object.z}`"
      rotation="0 0 0"
      :width="object.width"
      :height="object.height"
      id="object"></a-image>
    <a-image
      src="#businesscard"
      width="1" height="1"
      rotation="0 0 0"
      position=" 0 0 0"></a-image>
    <a-entity rotation="0 0 0" position="0 0 5" >
      <a-camera id="camera" far=1000 fov=80 zoom=1.5 position="0 0 0"></a-camera>
    </a-entity> -->
    <a-marker
      type="pattern"
      :url="markerUrl"
      smooth="true"
      emitevents="true"
      markerhandler
      cursor="fuse: false; rayOrigin: mouse;"
    >
      <a-image
        v-for="object in objects"
        :key="object.id"
        :src="object.src"
        :position="`${object.x} ${object.y} ${object.z}`"
        rotation="-90 0 0"
        :width="object.width"
        :height="object.height"
        id="object"
        :data-link="getLink(object)"
        class="link"
        foo
      ></a-image>
      <a-image
      src="#businesscard"
      width="1" height="1"
      rotation="0 0 0"
      position=" 0 0 0"
      data-link="https://google.com"
      class="link"></a-image>
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
</template>

<script>
import 'aframe'
import LoadScript from '@/utils/LoadScript'
import MarkerPattern from '@/utils/MarkerPattern'
// import Object2Canvas from '@/utils/Object2Canvas'

export default {
  name: 'VrScene',
  props: {
    // node: [
    //   { type: HTMLDivElement, required: true },
    // ],
    objects: { type: Array },
  },
  data() {
    return {
      markerUrl: '',
      show: false,
      src: null,
      size: {
        width: 0,
        height: 0,
      },
      SITE_URL: process.env.VUE_APP_URL,
    }
  },
  methods: {
    async createMarkerUrl() {
      const link = new URL(this.$route.fullPath, this.SITE_URL)
      const markerPattern = new MarkerPattern(link.href)
      this.markerUrl = await markerPattern.markerSrc
    },
    getLink(object) {
      if (object.type === 'social') {
        return object.value
      }
      return ''
    },
  },
  async mounted() {
    await this.createMarkerUrl()

    const loadAframeAr = new LoadScript('https://raw.githack.com/jeromeetienne/AR.js/2.0.8/aframe/build/aframe-ar.js', 'aframe-ar-script').load()
    await Promise.all([loadAframeAr])

    this.show = true
    await this.$nextTick()

    let playing = false
    window.AFRAME.registerComponent('markerhandler', {
      // init() {
      //   const links = document.querySelectorAll('.link')
      //   links.forEach((link) => {
      //     link.addEventListener('click', (event) => {
      //       if (event.srcElement) {
      //         const location = event.srcElement.dataset.link
      //         console.log(location)
      //         // window.location.href = link
      //       }
      //     })
      //   })
      // },
      init() {
        // Set up the tick throttling. Will check if marker is active every 500ms
        this.tick = window.AFRAME.utils.throttleTick(this.tick, 2000, this)
      },

      tick() {
        if (document.querySelector('a-marker').object3D.visible === true && playing === false) {
          // MARKER IS PRESENT
          // alert("MARKER IS PRESENT")
          document.querySelector('a-marker').setAttribute('raycaster', 'objects: .link')
          const links = document.querySelectorAll('.link')
          links.forEach((link) => {
            link.addEventListener('click', (event) => {
              if (event.srcElement) {
                const location = event.srcElement.dataset.link
                console.log(location)
                // window.location.href = link
              }
            })
          })
          playing = true
        } else {
          // MARKER IS HIDDEN, do nothing (up to you)
        }
      },
    })
    window.AFRAME.registerComponent('foo', {
      events: {
        click(evt) {
          console.log('hoge', evt)
        },
      },
    })
    // AFRAME.registerComponent('markerhandler1', {
    //   init() {
    //     this.tick = AFRAME.utils.throttleTick(this.tick, 500, this)
    //   },
    //   tick(t, dt) {
    //     if(document.querySelectorAll("video")[1] !== undefined && segundo == true) {
    //       segundo = false;
    //       var vv = document.querySelector('a-marker')
    //       vv.setAttribute('raycaster',"objects: .clickable")
    //       vv.setAttribute( 'cursor',"rayOrigin: mouse")
    //       vv.setAttribute( 'cursor',"fuse: false")
    //     }
    //   },
    // })
    // const promise = async (node) => {
    //   const object2Canvas = new Object2Canvas(node)
    //   await object2Canvas.init()
    //   this.src = await object2Canvas.toDataURL('image/png')
    //   this.size = await object2Canvas.aframeSize()
    // }
    // await Promise.all(this.objects.map(({ node }) => promise(node)))

    // const object2Canvas = new Object2Canvas(this.node)
    // await object2Canvas.init()
    // this.src = await object2Canvas.toDataURL('image/png')
    // this.size = await object2Canvas.aframeSize()
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
