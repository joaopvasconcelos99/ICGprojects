import * as THREE from "https://threejs.org/build/three.module.js";

import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

export const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();

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

        let changeCameraPos = document.getElementById("changeCamera");
    
        changeCameraPos.addEventListener("click", () => {changeCameraPosition()})

        //CameraPositionState starts at 1 (when project is loaded for the first time)
        //every time the button is clicked, it changes the state of the camera, changing the position
        function changeCameraPosition() {

            if (CameraPositionState == "1") {

                camera.position.set(0, 3, 0);
                camera.lookAt(10, 3, 0);
                CameraPositionState = "2";
            }

            else if (CameraPositionState == "2") {
                camera.position.set(30, 20, 0);
                camera.lookAt(0, 0, 0);
                CameraPositionState = "1";
            }
        }
        
        // ************************** //
        // Illumination
        // ************************** //

        // ************************** //
        // Add ambient light
        // ************************** //
        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.4);
        sceneElements.sceneGraph.add(ambientLight);

        // ***************************** //
        // Add spotlight (with shadows)
        // ***************************** //

        let changeLightRandom = document.getElementById("changeColor");
        let changeLightWhite = document.getElementById("whiteColor");
    
        changeLightRandom.addEventListener("click", () => {changeLightColor("random")})
        changeLightWhite.addEventListener("click", () => {changeLightColor("white")})

        function changeLightColor(color) {
            if (color == "random") {
                let spotLightColor = Math.random() * 0xffffff
                spotLight.color.setHex(spotLightColor)
            }

            else if (color == "white") {
                let spotLightColor = 0xffffff
                spotLight.color.setHex(spotLightColor)
            }

        }

        let spotLightColor = 0xffffff

        const spotLight = new THREE.SpotLight(spotLightColor, 0.8);
        spotLight.position.set(10, 15, 5);
        sceneElements.sceneGraph.add(spotLight);

        // Setup shadow properties for the spotlight
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;

        var slider = document.getElementById("slider");

        slider.oninput = function() {
            spotLight.intensity = this.value/100;
        }

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
