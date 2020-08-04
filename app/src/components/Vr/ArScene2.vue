<template>
  <div></div>
</template>
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

    const { THREEx } = window
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
    document.body.appendChild(renderer.domElement)

    // array of functions for the rendering loop
    const onRenderFcts = []

    // init scene and camera
    const scene = new THREE.Scene()

    /*
     * Initialize a basic camera
     */
    // Create a camera
    const camera = new THREE.PerspectiveCamera()
    // const camera = new THREE.OrthographicCamera()
    // const camera = new THREE.Camera()
    // const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000)
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

    // add a torus knot
    // let geometry = new THREE.CubeGeometry(1, 1, 1)
    // let material = new THREE.MeshNormalMaterial({
    //   transparent: true,
    //   opacity: 0.5,
    //   side: THREE.DoubleSide,
    // })
    // メッシュを生成
    // let mesh = new THREE.Mesh(geometry, material)
    // mesh.position.y = geometry.parameters.height / 2
    // scene.add(mesh)

    // geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16)
    // material = new THREE.MeshNormalMaterial()
    // const torusKnot = new THREE.Mesh(geometry, material)
    // torusKnot.position.y = 0.5
    // scene.add(torusKnot)
    // onRenderFcts.push((delta) => {
    //   torusKnot.rotation.x += Math.PI * delta
    // })

    // const texture = new THREE.TextureLoader().load(this.objects[0].src)
    // const { width, height, x, y, z } = this.objects[0]
    // texture.minFilter = THREE.LinearFilter
    // texture.anisotropy = 2
    // geometry = new THREE.PlaneGeometry(width, height)
    // material = new THREE.MeshBasicMaterial({ map: texture})
    // mesh = new THREE.Mesh(geometry, material)
    // mesh.position.y = 0
    // mesh.position.z = z
    // mesh.position.x = x
    // mesh.rotation.x = -1 * Math.PI / 2
    // // mesh.scale.x = 0.5
    // // mesh.scale.y = 0.5

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

    function convertClientPositionToScenePosition ({ x, y }) {
      const width = window.innerWidth
      const height = window.innerHeight
      const cw = Number.parseFloat(document.querySelector('canvas').style.width)
      const ch = Number.parseFloat(document.querySelector('canvas').style.height)

      const screenX = (x / width) * 2 - 1
      const screenY = (y / height) * 2 - 1

      const sceneX = screenX * (width / cw)
      const sceneY = screenY * (height / ch) * -1
      return {
        x: sceneX,
        y: sceneY,
      }
        // var t = window.innerWidth
        //   , n = window.innerHeight
        //   , r = Number.parseFloat(window.document.querySelector("#webgl-canvas").style.width)
        //   , i = Number.parseFloat(window.document.querySelector("#webgl-canvas").style.height)
        //   , o = e.x
        //   , a = e.y;
        // o = o / t * 2 - 1,
        // a = a / n * 2 - 1;
        // var s = void 0
        //   , c = void 0;
        // return "initial" !== window.document.querySelector("#webgl-canvas").style.transform ? (s = n / i * -a * .77,
        // c = t / r * -o * .7) : (s = o * (t / r) * .7,
        // c = n / i * -a * .7),
        // {
        //     x: s,
        //     y: c
        // }
    }

    renderer.domElement.addEventListener('click', (event) => {
    // document.addEventListener('click', (event) => {
      const element = event.currentTarget
      // camera.updateMatrixWorld();
      event.preventDefault()
      // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      // console.log(mouse)

      // const x = ( event.clientX / window.innerWidth ) * 2 - 1;
      // const y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      // less-ar
      // const { x, y } = convertClientPositionToScenePosition({ x: event.clientX, y: event.clientY })
      // const mouse = new THREE.Vector3(x, y, -0.5)
      // mouse.unproject(camera)
      // const raycaster = new THREE.Raycaster(camera.position, mouse.normalize())

      // // original
      // const raycaster = new THREE.Raycaster()
      // const x = (event.clientX / window.innerWidth) * 2 - 1;
      // const y = - (event.clientY / window.innerHeight) * 2 + 1;
      // // Persp
      // // raycaster.ray.origin.setFromMatrixPosition(camera.matrixWorld)
      // // raycaster.ray.direction.set(x, y, 1).unproject(camera).sub(raycaster.ray.origin).normalize()
      // // Ori
      // raycaster.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
      // raycaster.camera = camera

      // qiita
      const x = event.clientX - element.offsetLeft;
      const y = event.clientY - element.offsetTop;
      const w = element.offsetWidth;
      const h = element.offsetHeight;
      const mouse = new THREE.Vector2((x / w) * 2 - 1, -(y / h) * 2 + 1);
      raycaster.setFromCamera(mouse, camera);

      // console.log(mouse)
      // raycaster.setFromCamera(mouse, camera);
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
      // keep looping
      requestAnimationFrame(animate)
      // measure time
      // lastTimeMsec = lastTimeMsec || nowMsec - (1000 / 60)
      // const deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
      // lastTimeMsec = nowMsec
      // call each update function
      onRenderFcts.forEach((onRenderFct) => {
        onRenderFct()
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
