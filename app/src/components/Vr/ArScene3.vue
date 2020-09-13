<template lang="pug">
  div
    load-page(:visible="loading")
</template>
<style module>
  .wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    overflow: hidden;
  }
  :global {
    & html,
    & body {
      overflow: hidden;
    }
  }
</style>
<script>
// eslint-disable
import * as THREE from 'three'
import LoadScript from '@/utils/LoadScript'
import MarkerPattern from '@/utils/MarkerPattern'
import LoadPage from '@/components/Vr/LoadPage.vue'

export default {
  props: {
    objects: { type: Array },
  },
  components: {
    LoadPage,
  },
  data() {
    return {
      SITE_URL: process.env.VUE_APP_URL,
      ratio: 0.9,
      loading: true,
      renderer: new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      }),
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(40, 1.3333),
      group: new THREE.Group(),
      raycaster: new THREE.Raycaster(),
      mouseVector: new THREE.Vector3(),
      selectedObject: null,
      arToolkitSource: null,
      arToolkitContext: null,
      markerControls: null,
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
    animate() {
      requestAnimationFrame(this.animate)
      if (this.arToolkitSource.ready === false) {
        return
      }
      this.renderer.render(this.scene, this.camera)
      this.arToolkitContext.update(this.arToolkitSource.domElement)
      this.scene.visible = this.camera.visible
    },
    onWindowResize() {
      // this.renderer.setSize(1280, 960)
      this.arToolkitSource.onResizeElement()
      this.arToolkitSource.copyElementSizeTo(this.renderer.domElement)
      if (this.arToolkitContext.arController !== null) {
        this.arToolkitSource.copyElementSizeTo(this.arToolkitContext.arController.canvas)
      }
    },
    getIntersects(x, y) {
      const $canvas = document.querySelector('canvas')
      this.mouseVector.set(
        (x / $canvas.offsetWidth) * 2 - 1,
        -(y / $canvas.offsetHeight) * 2 + 1,
        1,
      )
      this.raycaster.setFromCamera(this.mouseVector, this.camera)
      return this.raycaster.intersectObject(this.group, true)
    },
    onClickObject(event) {
      event.preventDefault()
      const intersects = this.getIntersects(event.layerX, event.layerY)
      if (!intersects.length) {
        return
      }
      const intersect = intersects.find(r => r && r.object)
      if (!intersect) {
        return
      }
      const item = this.getItemById(intersect.object.name)
      if (item && item.value && item.type === 'social') {
        window.open(item.value, 'qrar')
      }
    },
    getItemById(id) {
      return this.objects.find(o => o.id === id)
    },
    registerObject(object, index) {
      const {
        width,
        height,
        x,
        y,
        z,
        src,
        id,
      } = object
      const texture = new THREE.TextureLoader().load(src)
      // this.canvas.addParent(texture)
      texture.minFilter = THREE.LinearFilter
      const geometry = new THREE.PlaneGeometry(width, height)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      })
      // material.transparent = true
      // material.depthTest = false
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.y = y + (index * 0.1)
      mesh.position.z = z
      mesh.position.x = x
      mesh.rotation.x = -1 * Math.PI / 2
      mesh.name = id

      // this.scene.add(mesh)
      this.group.add(mesh)
    },
    registerObjects() {
      this.objects.forEach(this.registerObject)
    },
  },
  async mounted() {
    const self = this

    window.THREE = THREE
    const loadThreeAr = new LoadScript('https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js', 'three-ar-script', 'pbody').load()
    await Promise.all([this.createMarkerUrl(), loadThreeAr])

    const { THREEx } = window
    THREEx.ArToolkitContext.baseURL = this.SITE_URL

    // init this.renderer
    this.renderer.setSize(1280, 960)
    this.renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.domElement.style.display = 'none'

    // this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    // init this.scene
    // this.scene.background = new THREE.Color(0xffffff)
    this.scene.add(this.camera)
    this.scene.add(this.group)

    // init material
    this.registerObjects()

    this.arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: 'webcam',
    })
    this.arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: `${THREEx.ArToolkitContext.baseURL}/data/camera_para.dat`,
      detectionMode: 'mono',
      imageSmoothingEnabled: true, // 画像をスムージングするか（デフォルトfalse）
      maxDetectionRate: 60, // マーカの検出レート（デフォルト60）
      patternRatio: this.ratio,
    })
    this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.group, {
      type: 'pattern',
      patternUrl: this.markerUrl,
      // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
      // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
      changeMatrixMode: 'modelViewMatrix',
      // changeMatrixMode: 'cameraTransformMatrix',
    })
    this.scene.visible = false

    this.arToolkitSource.init(() => {
      setTimeout(this.onWindowResize, 2000)
    })
    this.arToolkitContext.init(() => {
      // copy projection matrix to camera
      this.camera.projectionMatrix.copy(this.arToolkitContext.getProjectionMatrix())

      this.arToolkitSource.domElement.addEventListener('canplay', () => {
        const $canvas = document.querySelector('canvas')
        $canvas.addEventListener('click', self.onClickObject, false)
        self.onWindowResize()
        self.renderer.domElement.style.display = 'block'
        self.loading = false
      }, true)
    })

    window.addEventListener('resize', this.onWindowResize, false)

    this.animate()
  },
}
</script>
