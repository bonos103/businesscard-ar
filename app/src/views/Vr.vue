<template lang="pug">
  div(:class="$style.wrapper")
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
</style>
<script>
// eslint-disable
import * as THREE from 'three'
import LoadScript from '@/utils/LoadScript'

export default {
  data() {
    return {
      renderer: new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      }),
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(),
      group: new THREE.Group(),
      raycaster: new THREE.Raycaster(),
      mouseVector: new THREE.Vector3(),
      selectedObject: null,
      arToolkitSource: null,
      arToolkitContext: null,
    }
  },
  methods: {
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
      // const w = window.innerWidth
      // const h = window.innerHeight
      // this.camera.aspect = w / h
      // this.camera.updateProjectionMatrix()
      // this.renderer.setSize(w, h)

      // AR
      this.arToolkitSource.onResizeElement()
      this.arToolkitSource.copyElementSizeTo(this.renderer.domElement)
      if (this.arToolkitContext.arController !== null) {
        this.arToolkitSource.copyElementSizeTo(this.arToolkitContext.arController.canvas)
      }
    },
    getIntersects(x, y) {
      const video = document.querySelector('video')
      this.mouseVector.set(
        (x / video.offsetWidth) * 2 - 1,
        -(y / video.offsetHeight) * 2 + 1,
        1,
      )
      this.raycaster.setFromCamera(this.mouseVector, this.camera)
      return this.raycaster.intersectObject(this.group, true)
    },
    onDocumentMouseMove(event) {
      event.preventDefault()
      console.log(event)
      if (this.selectedObject) {
        this.selectedObject.material.color.set('#69f')
        this.selectedObject = null
      }

      const intersects = this.getIntersects(event.clientX, event.clientY)
      if (intersects.length) {
        const res = intersects.find(r => r && r.object)
        console.log(res)
        if (res) {
          this.selectedObject = res.object
          this.selectedObject.material.color.set('#f00')
        }
      }
    },
    createMaterials() {
      // add sprites
      // const sprite1 = new THREE.Sprite(new THREE.SpriteMaterial({ color: '#0f0' }))
      // sprite1.position.set(1, 0, 1)
      // sprite1.scale.set(2, 5, 1)
      // this.group.add(sprite1)

      // const sprite2 = new THREE.Sprite(new THREE.SpriteMaterial({ color: '#00f', sizeAttenuation: false }))
      // sprite2.material.rotation = Math.PI / 3 * 4
      // sprite2.position.set(2, 0, 1)
      // sprite2.center.set(0.5, 0)
      // sprite2.scale.set(0.1, 0.5, 0.1)
      // this.group.add(sprite2)

      // const group2 = new THREE.Object3D()
      // group2.scale.set(1, 2, 1)
      // group2.position.set(-2, 0, 0)
      // group2.rotation.set(Math.PI / 2, 0, 0)
      // this.group.add(group2)

      // const sprite3 = new THREE.Sprite(new THREE.SpriteMaterial({ color: '#0ff' }))
      // sprite3.position.set(0, 0, 3)
      // sprite3.scale.set(10, 2, 3)
      // sprite3.center.set(-0.1, 0)
      // sprite3.material.rotation = Math.PI / 3
      // group2.add(sprite3)

      const geometry = new THREE.CubeGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        color: '#00f',
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = 4
      mesh.position.z = 3
      mesh.position.y = geometry.parameters.height / 2
      // mesh.position.y = 0
      this.group.add(mesh)
    },
  },
  async mounted() {
    const self = this

    window.THREE = THREE
    const loadThreeAr = new LoadScript('https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js', 'three-ar-script', 'pbody').load()
    await Promise.all([loadThreeAr])

    const { THREEx } = window
    THREEx.ArToolkitContext.baseURL = 'https://localhost:8080/'

    // init this.renderer
    this.renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    // init this.scene
    // this.scene.background = new THREE.Color(0xffffff)
    this.scene.add(this.camera)
    this.scene.add(this.group)

    // init this.camera
    // this.camera.position.set(15, 15, 15)
    // this.camera.lookAt(this.scene.position)

    // init material
    this.createMaterials()

    this.arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: 'webcam',
    })
    this.arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: `${THREEx.ArToolkitContext.baseURL}data/camera_para.dat`,
      detectionMode: 'mono',
    })
    this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.group, {
      type: 'pattern',
      patternUrl: `${THREEx.ArToolkitContext.baseURL}data/patt.hiro`,
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
        const $video = document.querySelector('canvas')
        $video.addEventListener('mousemove', self.onDocumentMouseMove, false)
        $video.addEventListener('mousedown', self.onDocumentMouseMove, false)
      }, true)
    })

    window.addEventListener('resize', this.onWindowResize, false)
    // window.addEventListener('mousemove', this.onDocumentMouseMove, false)
    // window.addEventListener('mousedown', this.onDocumentMouseMove, false)

    // console.log(this.arToolkitSource)
    // const $video = this.arToolkitSource.domElement
    // $video.addEventListener('mousemove', this.onDocumentMouseMove, false)
    // $video.addEventListener('mousedown', this.onDocumentMouseMove, false)

    this.onWindowResize()
    this.animate()
  },
}
</script>
