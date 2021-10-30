"use strict";
import * as THREE from "https://threejs.org/build/three.module.js";
import {helper} from "./helper.js";
import {createPlanet, createSun, createMoon} from "./planets.js";

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

    const sun = createSun();
    sun.name = "sun";
    sceneGraph.add(sun);

    ////////////////////////

    //////////////////////////

    let planet_list = [];
    let moon_list = [];
    let orbit_list = [];

    let planet_distance = 15;

    let addPlanetButton = document.getElementById("addPlanet");

    let subPlanetButton = document.getElementById("subPlanet");

    addPlanetButton.addEventListener("click", () => {changeNumberPlanets("add")})

    subPlanetButton.addEventListener("click",() => {changeNumberPlanets("sub")})

    function changeNumberPlanets(action) {

        //add adds planet to scene with random velocity (in certain range)
        //position starts at 15 and increments 10 for every new planet

        if (action == "add") {

            console.log("add button clicked")

            let planet_velocity = Math.random() * 0.007 + 0.008;

            planet_distance += 7;

            addPlanet(`planet${planet_list.length}`,`moon${moon_list.length}`,`orbit${planet_list.length}`,planet_distance,0,planet_velocity);

        }

        //sub button removes planet from list and removes planet from scene

        else if (action == "sub") {

            if (planet_list.length==1) {
                return;
            }

            console.log("sub button clicked")

            planet_distance -= 7;

            let last_planet = planet_list[planet_list.length - 1];
            let last_moon = moon_list[moon_list.length - 1];
            let last_orbit = orbit_list[orbit_list.length - 1];

            sceneGraph.remove(last_planet);
            sceneGraph.remove(last_moon);
            sceneGraph.remove(last_orbit);

            planet_list.splice(-1,1)
            moon_list.splice(-1,1)
            orbit_list.splice(-1,1)
        }
    }

    //add planet to scene

    addPlanet("planet","moon","orbit",15,0,0.0125);

    //addPlanet adds planet to the scene and uses the functions from planets.js
    function addPlanet(planetname,moonname,orbitname,distance,i,delta) {

        let [planet,randomTexture] = createPlanet();
        let moon = createMoon();

        moon.scale.x = 0.10;
        moon.scale.y = 0.10;
        moon.scale.z = 0.10;

        if (randomTexture !== 1 && randomTexture !== 2) {
            moon.scale.x = 0;
            moon.scale.y = 0;
            moon.scale.z = 0;
        }

        sceneGraph.add(planet);
        sceneGraph.add(moon);

        planet_list.push(planet);
        moon_list.push(moon);
    
        planet.scale.x = 0.20;
        planet.scale.y = 0.20;
        planet.scale.z = 0.20;

        planet.name = planetname;
        moon.name = moonname;

        let planetOrbit = getOrbit(distance+0.01,distance-0.01,orbitname)
        sceneGraph.add(planetOrbit)

        orbit_list.push(planetOrbit);

        var computeFrame = () => {computeFrame3(i,delta,planetname,moonname,distance)}

        requestAnimationFrame(computeFrame);
    }     

    function getOrbit(size,diameter,name) {
        var orbitGeometry = new THREE.RingGeometry(size,diameter,320);
        var orbitMaterial = new THREE.MeshBasicMaterial({color:0xffffff, side: THREE.DoubleSide});
        var orbit = new THREE.Mesh(orbitGeometry,orbitMaterial)
        orbit.name = name;
        orbit.position.set(0,0,0);
        orbit.rotation.x = Math.PI/2;
        return orbit;
    }
}

// computeFrame3 animates planet, delta is the velocity, name is the planet name, distance is the distance between planet and center of plane

function computeFrame3(i,delta,planetname,moonname,distance) {

    // Can extract an object from the scene Graph from its name
    const planet = sceneElements.sceneGraph.getObjectByName(planetname);
    const moon = sceneElements.sceneGraph.getObjectByName(moonname);

    if ( planet == null) {return;}
    if ( moon == null) {return;}

    i += delta;

    //rotate planet around sun
    planet.position.x = distance*Math.cos(i);
    planet.position.z = distance*Math.sin(i);
    planet.rotation.y -= delta;

    //rotate moon around planet
    moon.position.x = (3*Math.cos(2*i)) + planet.position.x;
    moon.position.z = (3*Math.sin(2*i)) + planet.position.z;
    moon.rotation.y -= delta;

    //rotate sun around itself
    const sun = sceneElements.sceneGraph.getObjectByName("sun");
    sun.rotation.y -= delta/4;

    // Rendering
    helper.render(sceneElements);

    var computeFrame = () => {computeFrame3(i,delta,planetname,moonname,distance)}
    
    // Call for the next frame
    requestAnimationFrame(computeFrame);
}