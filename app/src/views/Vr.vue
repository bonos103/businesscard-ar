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

export default {
  data() {
    return {
      renderer: new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      }),
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(50, 1, 1, 1000),
      group: new THREE.Group(),
      raycaster: new THREE.Raycaster(),
      mouseVector: new THREE.Vector3(),
      selectedObject: null,
    }
  },
  methods: {
    animate() {
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    onWindowResize() {
      const w = window.innerWidth
      const h = window.innerHeight
      this.camera.aspect = w / h
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(w, h)
    },
    getIntersects(x, y) {
      this.mouseVector.set(
        (x / window.innerWidth) * 2 - 1,
        -(y / window.innerHeight) * 2 + 1,
        0.5,
      )
      this.raycaster.setFromCamera(this.mouseVector, this.camera)
      return this.raycaster.intersectObject(this.group, true)
    },
    onDocumentMouseMove(event) {
      event.preventDefault()
      if (this.selectedObject) {
        this.selectedObject.material.color.set('#69f')
        this.selectedObject = null
      }

      const intersects = this.getIntersects(event.layerX, event.layerY)
      if (intersects.length) {
        const res = intersects.find(r => r && r.object)
        if (res) {
          this.selectedObject = res.object
          this.selectedObject.material.color.set('#f00')
        }
      }
    },
    createMaterials() {
      // add sprites
      const sprite1 = new THREE.Sprite(new THREE.SpriteMaterial({ color: '#69f' }))
      sprite1.position.set(6, 5, 5)
      sprite1.scale.set(2, 5, 1)
      this.group.add(sprite1)

      const sprite2 = new THREE.Sprite(new THREE.SpriteMaterial({ color: '#69f', sizeAttenuation: false }))
      sprite2.material.rotation = Math.PI / 3 * 4
      sprite2.position.set(8, -2, 2)
      sprite2.center.set(0.5, 0)
      sprite2.scale.set(0.1, 0.5, 0.1)
      this.group.add(sprite2)

      const group2 = new THREE.Object3D()
      group2.scale.set(1, 2, 1)
      group2.position.set(-5, 0, 0)
      group2.rotation.set(Math.PI / 2, 0, 0)
      this.group.add(group2)

      const sprite3 = new THREE.Sprite(new THREE.SpriteMaterial({ color: '#69f' }))
      sprite3.position.set(0, 2, 5)
      sprite3.scale.set(10, 2, 3)
      sprite3.center.set(-0.1, 0)
      sprite3.material.rotation = Math.PI / 3
      group2.add(sprite3)
    },
  },
  mounted() {
    window.THREE = THREE

    // init this.renderer
    this.renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    // init this.scene
    this.scene.background = new THREE.Color(0xffffff)
    this.scene.add(this.group)

    // init this.camera
    this.camera.position.set(15, 15, 15)
    this.camera.lookAt(this.scene.position)

    // init material
    this.createMaterials()

    window.addEventListener('resize', this.onWindowResize, false)
    window.addEventListener('mousemove', this.onDocumentMouseMove, false)

    this.onWindowResize()
    this.animate()
  },
}
</script>
