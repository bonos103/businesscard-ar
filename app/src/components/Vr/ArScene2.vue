<template lang="pug">
  #canvas(:class="$style.wrapper")
</template>
<style module>
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: black; */
  }
</style>
<script>
import * as THREE from 'three'
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
  computed: {
    arjs() {
      return 'debugUIEnabled:false; trackingMethod: best; sourceType: webcam;'
      // return `debugUIEnabled:false; trackingMethod: best; sourceType: webcam; sourceWidth:${this.width}; sourceHeight:${this.height}; displayWidth: ${this.width}; displayHeight: ${this.height};`
    },
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
      // width: 1280,
      // height: 960,
      SITE_URL: process.env.VUE_APP_URL,
      renderer: null,
      renderFunctions: [],
      scene: null,
      camera: null,
      arToolkitSource: null,
      arToolkitContext: null,
      markerControls: null,
      raycaster: null,
      ratio: 0.9,
      markerRoot: null,
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
    initRenderer() {
      const renderer = new THREE.WebGLRenderer({
        // antialias: true,
        alpha: true,
      })
      renderer.setSize(640, 480)
      // renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.domElement.style.position = 'absolute'
      renderer.domElement.style.top = '0px'
      renderer.domElement.style.left = '0px'
      // renderer.domElement.style.width = '100%'
      // renderer.domElement.style.height = '100%'
      renderer.domElement.style.display = 'none'
      document.getElementById('canvas').appendChild(renderer.domElement)
      return renderer
    },
    initArToolkitContext() {
      const self = this
      this.arToolkitContext.init(() => {
        // copy projection matrix to camera
        // 射影行列をコピー
        self.camera.projectionMatrix.copy(self.arToolkitContext.getProjectionMatrix())
      })
    },
    initArToolkitResource() {
      const self = this
      this.arToolkitSource.init(() => {
        self.arToolkitSource.domElement.addEventListener('canplay', () => {
          self.onResize()
          self.renderer.domElement.style.display = 'block'
        }, true)
      })
    },
    onResize() {
      this.arToolkitSource.onResizeElement()
      this.arToolkitSource.copyElementSizeTo(this.renderer.domElement)
      if (this.arToolkitContext.arController !== null) {
        this.arToolkitSource.copyElementSizeTo(this.arToolkitContext.arController.canvas)
      }
    },
    registerObject(object, index, root) {
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
      texture.minFilter = THREE.LinearFilter
      const geometry = new THREE.PlaneGeometry(width, height)
      const material = new THREE.MeshBasicMaterial({ map: texture })
      material.transparent = true
      material.depthTest = false
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.y = y + (index * 0.1)
      mesh.position.z = z
      mesh.position.x = x
      mesh.rotation.x = -1 * Math.PI / 2
      mesh.name = id

      // this.scene.add(mesh)
      root.add(mesh)
    },
    registerObjects(THREEx) {
      const self = this
      this.markerRoot = new THREE.Group()
      this.scene.add(this.markerRoot)

      // build a smoothedControls
      const smoothedRoot = new THREE.Group()
      this.scene.add(smoothedRoot)
      const smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
        lerpPosition: 0.4,
        lerpQuaternion: 0.3,
        lerpScale: 1,
      })
      this.renderFunctions.push(() => {
        smoothedControls.update(self.markerRoot)
      })
      this.objects.forEach((o, i) => this.registerObject(o, i, smoothedRoot))
    },
    renderScene() {
      const self = this
      this.renderFunctions.push(() => {
        self.renderer.render(self.scene, self.camera)
      })

      // run the rendering loop
      function animate() {
        requestAnimationFrame(animate)
        self.renderFunctions.forEach((onRenderFct) => {
          onRenderFct()
        })
      }
      requestAnimationFrame(animate)
    },
    onClickObject(event) {
      event.preventDefault()
      const intersectObject = this.getIntersectObject(event)
      if (!intersectObject) {
        return
      }
      const item = this.getItemById(intersectObject.name)
      if (item && item.value && item.type === 'social') {
        window.open(item.value, 'qrar')
      }
    },
    getIntersectObject(event) {
      const element = event.currentTarget
      const x = event.clientX - element.offsetLeft
      const y = event.clientY - element.offsetTop
      const w = element.offsetWidth
      const h = element.offsetHeight
      const mouse = new THREE.Vector2((x / w) * 2 - 1, -(y / h) * 2 + 1)
      this.raycaster.setFromCamera(mouse, this.camera)
      const intersects = this.raycaster.intersectObjects(this.scene.children, true)
      console.log(intersects[0] && intersects[0].object.name)
      return intersects[0] && intersects[0].object
    },
    getItemById(id) {
      return this.objects.find(o => o.id === id)
    },
  },
  async mounted() {
    const self = this
    window.THREE = THREE
    const loadThreeAr = new LoadScript('https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js', 'three-ar-script', 'pbody').load()
    await Promise.all([this.createMarkerUrl(), loadThreeAr])

    const { THREEx } = window
    THREEx.ArToolkitContext.baseURL = '/'

    // init renderer
    this.renderer = this.initRenderer()

    // array of functions for the rendering loop
    this.renderFunctions = []

    // init scene and camera
    this.scene = new THREE.Scene()

    // Initialize a basic camera
    // Create a camera
    this.camera = new THREE.PerspectiveCamera()
    this.scene.add(this.camera)

    // handle arToolkitSource
    this.arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: 'webcam',
    })

    // initialize arToolkitContext
    // arToolkitContext（カメラパラメータ、マーカ検出設定）
    this.arToolkitContext = new THREEx.ArToolkitContext({
      debug: false, // デバッグ用キャンバス表示（デフォルトfalse）
      cameraParametersUrl: `${THREEx.ArToolkitContext.baseURL}data/camera_para.dat`, // カメラパラメータファイル
      detectionMode: 'mono', // 検出モード（color/color_and_matrix/mono/mono_and_matrix）
      imageSmoothingEnabled: true, // 画像をスムージングするか（デフォルトfalse）
      maxDetectionRate: 60, // マーカの検出レート（デフォルト60）
      patternRatio: this.ratio,
    })
    // initialize it
    this.initArToolkitContext()

    // update artoolkit on every frame
    this.renderFunctions.push(() => {
      if (self.arToolkitSource.ready === false) {
        return
      }
      self.arToolkitContext.update(self.arToolkitSource.domElement)
      // update scene.visible if the marker is seen
      // self.scene.visible = self.camera.visible
    })

    // handle resize
    window.addEventListener('resize', () => {
      self.onResize()
    })

    // initialize ArToolkitResource
    this.initArToolkitResource()

    // init controls for camera
    // // マーカを登録
    // this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.camera, {
    //   type: 'pattern',
    //   patternUrl: this.markerUrl,
    //   changeMatrixMode: 'cameraTransformMatrix',
    //   smooth: true,
    //   smoothCount: 5,
    //   smoothTolerance: 10,
    //   smoothThreshold: 5,
    // })
    // // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
    // this.scene.visible = false

    // add an object in the scene
    // オブジェクトの登録
    this.registerObjects(THREEx)

    this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.markerRoot, {
      type: 'pattern',
      patternUrl: this.markerUrl,
      // changeMatrixMode: 'cameraTransformMatrix',
      // smooth: true,
      // smoothCount: 5,
      // smoothTolerance: 10,
      // smoothThreshold: 5,
    })

    // クリックイベントを処理
    this.raycaster = new THREE.Raycaster()
    this.renderer.domElement.addEventListener('click', this.onClickObject, false)

    // render the scene
    // 画面にレンダリング
    this.renderScene()

    this.show = true
    await this.$nextTick()
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
