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
    window.THREE = THREE
    await this.createMarkerUrl()
    const loadThreeAr = new LoadScript('https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js', 'three-ar-script', 'pbody').load()
    await Promise.all([loadThreeAr])

    const { THREEx } = window
    THREEx.ArToolkitContext.baseURL = '/'

    /* ----------------------------------
     *  Init
     ----------------------------------*/
    // init renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
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

    // array of functions for the rendering loop
    const onRenderFcts = []

    // init scene and camera
    const scene = new THREE.Scene()

    /*
     * Initialize a basic camera
     */
    // Create a camera
    const camera = new THREE.PerspectiveCamera()
    scene.add(camera)

    /*
     * handle arToolkitSource
     */
    const arToolkitSource = new THREEx.ArToolkitSource({
      // to read from the webcam
      sourceType: 'webcam',

      // // to read from an image
      // sourceType: 'image',
      // sourceUrl: `${THREEx.ArToolkitContext.baseURL}data/preview.png`,

      // to read from a video
      // sourceType: 'video',
      // sourceUrl: `${THREEx.ArToolkitContext.baseURL}data/preview.mp4`,
      // sourceWidth: 1044,
      // sourceHeight: 784,

      // displayWidth: window.innerWidth,
      // displayHeight: window.innerHeight,
    })

    /* ----------------------------------
     * initialize arToolkitContext
     * arToolkitContext（カメラパラメータ、マーカ検出設定）
     ----------------------------------*/
    // create atToolkitContext
    const arToolkitContext = new THREEx.ArToolkitContext({
      debug: false, // デバッグ用キャンバス表示（デフォルトfalse）
      cameraParametersUrl: `${THREEx.ArToolkitContext.baseURL}data/camera_para.dat`, // カメラパラメータファイル
      detectionMode: 'mono', // 検出モード（color/color_and_matrix/mono/mono_and_matrix）
      imageSmoothingEnabled: true, // 画像をスムージングするか（デフォルトfalse）
      maxDetectionRate: 60, // マーカの検出レート（デフォルト60）
      // canvasWidth: source.parameters.sourceWidth, // マーカ検出用画像の幅（デフォルト640）
      // canvasHeight: source.parameters.sourceHeight, // マーカ検出用画像の高さ（デフォルト480）
      // canvasWidth: 1044,
      // canvasHeight: 784,
    })
    // initialize it
    arToolkitContext.init(() => {
      // copy projection matrix to camera
      // 射影行列をコピー
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix())
    })

    // update artoolkit on every frame
    onRenderFcts.push(() => {
      if (arToolkitSource.ready === false) {
        return
      }
      renderer.domElement.style.display = 'block'

      arToolkitContext.update(arToolkitSource.domElement)
      // update scene.visible if the marker is seen
      scene.visible = camera.visible
    })

    /* ----------------------------------
     * handle resize
     ----------------------------------*/
    function onResize() {
      arToolkitSource.onResizeElement()
      arToolkitSource.copyElementSizeTo(renderer.domElement)
      if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
      }
    }
    window.addEventListener('resize', () => {
      onResize()
    })
    arToolkitSource.init(() => {
      setTimeout(() => {
        onResize()
      }, 2000)
    })

    /* ----------------------------------
     * Create a ArMarkerControls
     * ArMarkerControls（マーカと、マーカ検出時の表示オブジェクト）
     ----------------------------------*/
    // init controls for camera
    // マーカを登録
    // const markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
    new THREEx.ArMarkerControls(arToolkitContext, camera, {
      type: 'pattern',
      // patternUrl: `${THREEx.ArToolkitContext.baseURL}data/patt.hiro`,
      patternUrl: this.markerUrl,
      // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
      // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
      changeMatrixMode: 'cameraTransformMatrix',
      // changeMatrixMode: 'modelViewMatrix',
    })
    // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
    scene.visible = false


    /* ----------------------------------
     *  add an object in the scene
     *  オブジェクトの登録
     ----------------------------------*/
    this.objects.forEach((object, index) => {
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

      scene.add(mesh)
    })


    /*
     * クリックイベントを処理
     */
    // const mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()

    renderer.domElement.addEventListener('click', (event) => {
      event.preventDefault()

      const element = event.currentTarget
      const x = event.clientX - element.offsetLeft;
      const y = event.clientY - element.offsetTop;
      const w = element.offsetWidth;
      const h = element.offsetHeight;
      const mouse = new THREE.Vector2((x / w) * 2 - 1, -(y / h) * 2 + 1);
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);
      console.log(intersects[0] && intersects[0].object.name)
    }, false)



    /* ----------------------------------
     *  render the whole thing on the page
    ----------------------------------*/
    // render the scene
    // 画面にレンダリング
    onRenderFcts.push(() => {
      renderer.render(scene, camera)
    })

    // run the rendering loop
    let lastTimeMsec = null

    function animate(nowMsec) {
      requestAnimationFrame(animate)
      onRenderFcts.forEach((onRenderFct) => {
        onRenderFct()
      })
    }
    requestAnimationFrame(animate)

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
