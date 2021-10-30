import * as THREE from "https://threejs.org/build/three.module.js";

import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

export const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();

        var loader = new THREE.TextureLoader();
        var backgroundTexture = loader.load( 'textures/space.jpg' );
        sceneElements.sceneGraph.background = backgroundTexture;

        // ************************** //
        // Add camera
        // ************************** //
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
        sceneElements.camera = camera;

        camera.position.set(30, 20, 0);
        camera.lookAt(0, 0, 0);
        let CameraPositionState = "1";

        //CameraPositionState starts at 1 (when project is loaded for the first time)
        //every time the button is clicked, it changes the state of the camera, changing the position
        function changeCameraPosition() {

            if (CameraPositionState == "1") {

                camera.position.set(0, 6, 0);
                camera.lookAt(10, 3, 0);
                CameraPositionState = "2";
            }

            else if (CameraPositionState == "2") {
                camera.position.set(30, 20, 0);
                camera.lookAt(0, 0, 0);
                CameraPositionState = "1";
            }
        }
        
        var slider = document.getElementById("slider");

        slider.oninput = function() {
            const slider_value = this.value/100;
            camera.position.set(24/slider_value, 16/slider_value, 0);
        }
        
        // ************************** //
        // Illumination
        // ************************** //

        // ************************** //
        // Add ambient light
        // ************************** //

        var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        sceneElements.sceneGraph.add(ambientLight);

        const light = new THREE.PointLight( 0xffffff, 1, 100 );
        light.position.set( 0, 0, 0 );
        sceneElements.sceneGraph.add( light );
        
        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 255, 150)', 1.0);
        renderer.setSize(width, height);

        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);

        sceneElements.control = new OrbitControls(camera, renderer.domElement);
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};
