"use strict";
import * as THREE from "https://threejs.org/build/three.module.js";
import {helper} from "./helper.js";
import {createForest} from "./trees.js";
import {createCar,createTruck} from "./cars.js";

// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,
};

// HANDLING EVENTS
window.addEventListener('resize', resizeWindow);

// Update render image size and camera aspect when the window is resized
function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

// Functions are called
//  1. Initialize the empty scene
//  2. Add elements within the scene
//  3. Render the scene
helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
helper.render(sceneElements);

// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {

    let planeGeometryRadius = 10;

    // Create a ground plane
    const planeGeometry = new THREE.CircleGeometry(planeGeometryRadius, 64);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(200, 200, 200)', side: THREE.DoubleSide });
    const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
    sceneGraph.add(planeObject);

    // Change orientation of the plane using rotation
    planeObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // Set shadow property
    planeObject.receiveShadow = true;

    //add forest to scene
    addForest();

    let vehicle_list = [];

    let vehicle_distance = 7;

    let addVehButton = document.getElementById("addVeh");

    let subVehButton = document.getElementById("subVeh");

    addVehButton.addEventListener("click", () => {changeNumberVehicles("add")})

    subVehButton.addEventListener("click",() => {changeNumberVehicles("sub")})

    function changeNumberVehicles(action) {

        //add button scales plane, adds vehicle to scene with random velocity (in certain range)
        //position starts at 7 and increments 5 for every new vehicle

        if (action == "add") {

            console.log("add button clicked")

            let car_velocity = Math.random() * 0.007 + 0.008;

            planeObject.scale.x += planeObject.scale.x * (5 / planeGeometryRadius);
            planeObject.scale.y += planeObject.scale.y * (5 / planeGeometryRadius);

            vehicle_distance += 5;

            planeGeometryRadius += 5;

            if (Math.random() < 0.5) {
                addVehicle("car",`vehicle${vehicle_list.length}`,vehicle_distance,0,car_velocity);
            }
            
            else {
                addVehicle("truck",`vehicle${vehicle_list.length}`,vehicle_distance,0,car_velocity);
            }

        }

        //sub button descales plane, removes vehicle from list and removes vehicle from scene

        else if (action == "sub") {

            if (vehicle_list.length==1) {
                return;
            }

            console.log("sub button clicked")

            planeObject.scale.x -= planeObject.scale.x * (5 / planeGeometryRadius);
            planeObject.scale.y -= planeObject.scale.y * (5 / planeGeometryRadius);

            vehicle_distance -= 5;

            planeGeometryRadius -= 5;

            let last_vehicle = vehicle_list[vehicle_list.length - 1];

            sceneGraph.remove(last_vehicle);

            vehicle_list.splice(-1,1)
        }
    }

    //add vehicle to scene
    if (Math.random() < 0.5) {
        addVehicle("car","vehicle",7,0,0.0125);
    }
    
    else {
        addVehicle("truck","vehicle",7,0,0.0125);
    }

    //addVehicle adds vehicle to the scene and uses the functions from cars.js
    //after adding the vehicle to the scene and list, it animates it using ComputeFrame3
    function addVehicle(vehicleType,name,distance,i,delta) {

        let vehicle;

        if (vehicleType == "car") {
            vehicle = createCar();
        }

        else if (vehicleType == "truck") {
            vehicle = createTruck();
        }

        else {
            return;
        }
    
        sceneGraph.add(vehicle);

        vehicle_list.push(vehicle);
    
        vehicle.scale.x = 0.05;
        vehicle.scale.y = 0.05;
        vehicle.scale.z = 0.05;
    
        vehicle.rotation.y = Math.PI/2;
    
        vehicle.name = name;

        var computeFrame = () => {computeFrame3(i,delta,name,distance)}

        requestAnimationFrame(computeFrame);
    }     

    function addForest() {
        const forest = createForest(0,0,0);
        sceneGraph.add(forest);
    } 
}

// computeFrame3 animates vehicle, delta is the velocity, name is the vehicle name, distance is the distance between vehicle and center of plane

function computeFrame3(i,delta,name,distance) {

    // Can extract an object from the scene Graph from its name
    const vehicle = sceneElements.sceneGraph.getObjectByName(name);

    if ( vehicle == null) {
        return;
    }

    i += delta;

    vehicle.position.x = distance*Math.cos(i);
    vehicle.position.z = distance*Math.sin(i);
    vehicle.rotation.y -= delta;

    // Rendering
    helper.render(sceneElements);

    var computeFrame = () => {computeFrame3(i,delta,name,distance)}
    
    // Call for the next frame
    requestAnimationFrame(computeFrame);
}