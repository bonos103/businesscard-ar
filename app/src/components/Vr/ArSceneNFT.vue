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

export default {
  name: 'VrScene',
  async mounted() {
    const self = this
    window.THREE = THREE
    const loadThreeAr = new LoadScript('https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-nft.js', 'three-ar-script', 'pbody').load()
    const loadGLTFLoader = new LoadScript('https://raw.githack.com/AR-js-org/AR.js/master/three.js/examples/vendor/three.js/GLTFLoader.js', 'glf-loader-script', 'pbody').load()

    await Promise.all([loadThreeAr, loadGLTFLoader])

    const { THREEx } = window
    THREEx.ArToolkitContext.baseURL = '/'

    //////////////////////////////////////////////////////////////////////////////////
    //		Init
    //////////////////////////////////////////////////////////////////////////////////
    console.log('init')
    var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        precision: 'mediump',
    });

    var clock = new THREE.Clock();

    var mixers = [];

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    document.body.appendChild( renderer.domElement );

    // init scene and camera
    var scene = new THREE.Scene();

    //////////////////////////////////////////////////////////////////////////////////
    //		Initialize a basic camera
    //////////////////////////////////////////////////////////////////////////////////
    console.log('camera')

    // Create a camera
    var camera = new THREE.Camera();
    scene.add(camera);

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    ////////////////////////////////////////////////////////////////////////////////
    //          handle arToolkitSource
    ////////////////////////////////////////////////////////////////////////////////
    console.log('artoolkitsource')

    var arToolkitSource = new THREEx.ArToolkitSource({
        sourceType : 'webcam',
        sourceWidth: 480,
        sourceHeight: 640,
    })

    arToolkitSource.init(function onReady(){
        // use a resize to fullscreen mobile devices
        setTimeout(function() {
            onResize()
        }, 1000);
    })

    // handle resize
    window.addEventListener('resize', function(){
        onResize()
    })

    // listener for end loading of NFT marker
    window.addEventListener('arjs-nft-loaded', function(ev){
      console.log(ev);
    })

    function onResize(){
        arToolkitSource.onResizeElement()
        arToolkitSource.copyElementSizeTo(renderer.domElement)
        if( arToolkitContext.arController !== null ){
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //          initialize arToolkitContext
    ////////////////////////////////////////////////////////////////////////////////

    console.log('artoolkitcontext')
    // create atToolkitContext
    var arToolkitContext = new THREEx.ArToolkitContext({
        detectionMode: 'mono',
        cameraParametersUrl: `${THREEx.ArToolkitContext.baseURL}data/camera_para.dat`, // カメラパラメータファイル
        canvasWidth: 480,
        canvasHeight: 640,
    }, {
        sourceWidth: 480,
        sourceHeight: 640,
    })

    // initialize it
    arToolkitContext.init(function onCompleted(){
        // copy projection matrix to camera
        camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
    })

    ////////////////////////////////////////////////////////////////////////////////
    //          Create a ArMarkerControls
    ////////////////////////////////////////////////////////////////////////////////

    console.log('armarkerControls')
    // init controls for camera
    var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
        type : 'nft',
        descriptorsUrl : `${THREEx.ArToolkitContext.baseURL}data/pinball`,
        changeMatrixMode: 'cameraTransformMatrix'
    })

    scene.visible = false

    var root = new THREE.Object3D();
    scene.add(root);

    //////////////////////////////////////////////////////////////////////////////////
    //		add an object in the scene
    //////////////////////////////////////////////////////////////////////////////////

    console.log('glf')
    var threeGLTFLoader = new THREE.GLTFLoader();
    var model;

    threeGLTFLoader.load(`${THREEx.ArToolkitContext.baseURL}data/resources/Flamingo.glb`, function (gltf) {
        model = gltf.scene.children[0];
        model.name = 'Flamingo';

        var animation = gltf.animations[0];
        var mixer = new THREE.AnimationMixer(model);
        mixers.push(mixer);
        var action = mixer.clipAction(animation);
        action.play();
        console.log(gltf)

        root.matrixAutoUpdate = false;
        root.add(model);

        model.position.z = -200;
        model.position.x = 100;
        model.position.y = 100;


        //////////////////////////////////////////////////////////////////////////////////
        //		render the whole thing on the page
        //////////////////////////////////////////////////////////////////////////////////

        var animate = function() {
            requestAnimationFrame(animate);

            if (mixers.length > 0) {
                for (var i = 0; i < mixers.length; i++) {
                    console.log('mixiers update')
                    mixers[i].update(clock.getDelta());
                }
            }

            if (!arToolkitSource.ready) {
                return;
            }

            arToolkitContext.update( arToolkitSource.domElement )

            console.log('context updated')
            // update scene.visible if the marker is seen
            scene.visible = camera.visible;

            renderer.render(scene, camera);
            console.log('renderer')
        };

        requestAnimationFrame(animate);
    });
  },
}
</script>
