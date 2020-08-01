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
    // this.height = window.innerWidth * 2
    // this.width = window.innerHeight * 2
    await this.createMarkerUrl()
    const loadThreeAr = new LoadScript('https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js', 'three-ar-script', 'pbody').load()
    // const loadAframeAr = new LoadScript('https://raw.githack.com/AR-js-org/AR.js/3.0.0/aframe/build/aframe-ar.js', 'aframe-ar-script').load()
    await Promise.all([loadThreeAr])

    const THREEx = window.THREEx
    THREEx.ArToolkitContext.baseURL = '/'
    // window.AFRAME.registerComponent('clickhandler', {
    //   init() {
    //     console.log(this)
    //     // this.el.addEventListener('click', (event) => {
    //     //   console.log(event)
    //     // })
    //     Array.from(document.querySelectorAll('.link')).forEach((link) => {
    //       link.addEventListener('click', (event) => {
    //         console.log(event)
    //       })
    //     })
    //   },
    // })

    /*
     *  Init
     */
    // init renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize(640, 480)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    document.body.appendChild(renderer.domElement)

    // array of functions for the rendering loop
    const onRenderFcts = []

    // init scene and camera
    const scene = new THREE.Scene()

    /*
     * Initialize a basic camera
     */
    // Create a camera
    const camera = new THREE.Camera()
    scene.add(camera)

    /*
     * handle arToolkitSource
     */
    const arToolkitSource = new THREEx.ArToolkitSource({
      // to read from the webcam
      sourceType: 'webcam',

      // // to read from an image
      // sourceType : 'image',
      // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',

      // to read from a video
      // sourceType : 'video',
      // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',
    })

    /*
     * initialize arToolkitContext
     * arToolkitContext（カメラパラメータ、マーカ検出設定）
     */
    // create atToolkitContext
    const arToolkitContext = new THREEx.ArToolkitContext({
      debug: false, // デバッグ用キャンバス表示（デフォルトfalse）
      cameraParametersUrl: `${THREEx.ArToolkitContext.baseURL}data/camera_para.dat`, // カメラパラメータファイル
      detectionMode: 'mono', // 検出モード（color/color_and_matrix/mono/mono_and_matrix）
      imageSmoothingEnabled: true, // 画像をスムージングするか（デフォルトfalse）
      maxDetectionRate: 60, // マーカの検出レート（デフォルト60）
      // canvasWidth: source.parameters.sourceWidth, // マーカ検出用画像の幅（デフォルト640）
      // canvasHeight: source.parameters.sourceHeight, // マーカ検出用画像の高さ（デフォルト480）
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

      arToolkitContext.update(arToolkitSource.domElement)
      // update scene.visible if the marker is seen
      scene.visible = camera.visible
    })

    /*
     * handle resize
     */
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

    /*
     * Create a ArMarkerControls
     * ArMarkerControls（マーカと、マーカ検出時の表示オブジェクト）
     */
    // init controls for camera
    // マーカを登録
    // const markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
    new THREEx.ArMarkerControls(arToolkitContext, camera, {
      type: 'pattern',
      patternUrl: `${THREEx.ArToolkitContext.baseURL}data/patt.hiro`,
      // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
      // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
      changeMatrixMode: 'cameraTransformMatrix',
    })
    // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
    scene.visible = false


    /*
     *  add an object in the scene
     *  オブジェクトの登録
     */

    // add a torus knot
    let geometry = new THREE.CubeGeometry(1, 1, 1)
    let material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    })
    // メッシュを生成
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = geometry.parameters.height / 2
    scene.add(mesh)

    geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16)
    material = new THREE.MeshNormalMaterial()
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = 0.5
    scene.add(mesh)

    onRenderFcts.push((delta) => {
      mesh.rotation.x += Math.PI * delta
    })

    /*
     *  render the whole thing on the page
     */
    // render the scene
    // 画面にレンダリング
    onRenderFcts.push(() => {
      renderer.render(scene, camera)
    })

    // run the rendering loop
    let lastTimeMsec = null

    function animate(nowMsec) {
      // keep looping
      requestAnimationFrame(animate)
      // measure time
      lastTimeMsec = lastTimeMsec || nowMsec - (1000 / 60)
      const deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec = nowMsec
      // call each update function
      onRenderFcts.forEach((onRenderFct) => {
        onRenderFct(deltaMsec / 1000, nowMsec / 1000)
      })
    }
    requestAnimationFrame(animate)

    this.show = true
    await this.$nextTick()

    // window.AFRAME.registerComponent('markerhandler', {
    //   dependencies: ['arjs', 'artoolkit'],
    //   init() {
    //     const arjsSystem = this.el.sceneEl.systems.arjs || this.el.sceneEl.systems.artoolkit
    //     const self = this
    //     self.isReady = false

    //     const timerId = setInterval(() => {
    //       if (arjsSystem.isReady === false) {
    //         return
    //       }
    //       clearInterval(timerId)

    //       const arSession = arjsSystem._arSession // eslint-disable-line
    //       const { renderer } = arSession.parameters
    //       self._arHitTesting = new window.ARjs.HitTesting(arSession) // eslint-disable-line
    //       const hitTesting = self._arHitTesting // eslint-disable-line
    //       hitTesting.enabled = self.data.enabled

    //       console.log(renderer.domElement)

    //       self.isReady = true
    //     }, 1000 / 60)
    //   },
    // })

    // let playing = false
    // window.AFRAME.registerComponent('markerhandler', {
    //   // init() {
    //   //   const links = document.querySelectorAll('.link')
    //   //   links.forEach((link) => {
    //   //     link.addEventListener('click', (event) => {
    //   //       if (event.srcElement) {
    //   //         const location = event.srcElement.dataset.link
    //   //         console.log(location)
    //   //         // window.location.href = link
    //   //       }
    //   //     })
    //   //   })
    //   // },
    //   init() {
    //     // Set up the tick throttling. Will check if marker is active every 500ms
    //     this.tick = window.AFRAME.utils.throttleTick(this.tick, 2000, this)
    //   },

    //   tick() {
    //     if (document.querySelector('a-marker').object3D.visible === true && playing === false) {
    //       // MARKER IS PRESENT
    //       // alert("MARKER IS PRESENT")
    //       document.querySelector('a-marker').setAttribute('raycaster', 'objects: .link')
    //       const links = document.querySelectorAll('.link')
    //       links.forEach((link) => {
    //         link.addEventListener('click', (event) => {
    //           if (event.srcElement) {
    //             const location = event.srcElement.dataset.link
    //             console.log(location)
    //             // window.location.href = link
    //           }
    //         })
    //       })
    //       playing = true
    //     } else {
    //       // MARKER IS HIDDEN, do nothing (up to you)
    //     }
    //   },
    // })

    // window.AFRAME.registerComponent('foo', {
    //   events: {
    //     click(evt) {
    //       console.log('hoge', evt)
    //     },
    //   },
    // })

    // AFRAME.registerComponent('markerhandler1', {
    //   init() {
    //     this.tick = AFRAME.utils.throttleTick(this.tick, 500, this)
    //   },
    //   tick(t, dt) {
    //     if(document.querySelectorAll("video")[1] !== undefined && segundo == true) {
    //       segundo = false;
    //       const vv = document.querySelector('a-marker')
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
