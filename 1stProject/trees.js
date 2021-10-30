import * as THREE from "https://threejs.org/build/three.module.js";

// example adopted from classes, added another tree type (round tree with fruits) 
// created a function to randomize the position/number/type of trees in scene

export function createForest(x, y, z) {

    var forest = new THREE.Object3D();
    let numberTrees = Math.floor(Math.random() * 10) + 1

    for (let i = 0; i < numberTrees; i++) {

        let evenMoreRandom = Math.floor(Math.random() * 3) + 1

        let treeType = Math.floor(Math.random() * 2) + 1

        if (evenMoreRandom == 1) {
            if (treeType == 1) {
                const tree = createTree(x-Math.random()*3, y, z+Math.random()*3)
                forest.add(tree)
            }
            else {
                const tree = createRoundTree(x-Math.random()*3, y, z+Math.random()*3)
                forest.add(tree)
            }
        }

        else if (evenMoreRandom == 2) {
            if (treeType == 1) {
                const tree = createTree(x, y , z+Math.random()*3)
                forest.add(tree)
            }
            else {
                const tree = createRoundTree(x, y , z+Math.random()*3)
                forest.add(tree)
            }
        }

        else {
            if (treeType == 1) {
                const tree = createTree(x+Math.random()*3, y , z-Math.random()*3)
                forest.add(tree)
            }
            else {
                const tree = createRoundTree(x+Math.random()*3, y , z-Math.random()*3)
                forest.add(tree)
            }
        }  
    }

    forest.position.set(x, y, z);

    return forest

}

function createTree(x, y, z) {

    // Creating a model by grouping basic geometries

    // Cylinder centered at the origin

    const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);

    const redMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

    const cylinder = new THREE.Mesh(cylinderGeometry, redMaterial);

    // Set shadow property
    cylinder.castShadow = true;

    cylinder.receiveShadow = true;

    // Move base of the cylinder to y = 0

    cylinder.position.y = 0.5;

    // Cone

    const coneGeometry = new THREE.ConeGeometry(0.3, 1.5, 32);

    const greenMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    const cone = new THREE.Mesh(coneGeometry, greenMaterial);

    // Set shadow property

    cone.castShadow = true;

    cone.receiveShadow = true;

    // Move base of the cone to y = 20

    cone.position.y = 1.75;

    // Tree

    var tree = new THREE.Group();

    tree.add(cylinder);

    tree.add(cone);

    // Set the given position

    tree.position.set(x, y, z);

    return tree;
}

function createRoundTree(x, y, z) {

    // Creating a model by grouping basic geometries

    // Cylinder centered at the origin

    const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);

    const redMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

    const cylinder = new THREE.Mesh(cylinderGeometry, redMaterial);

    // Set shadow property
    cylinder.castShadow = true;

    cylinder.receiveShadow = true;

    // Move base of the cylinder to y = 0

    cylinder.position.y = 0.5;

    // Sphere

    const spheregeometry = new THREE.SphereGeometry( 0.5, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0x30B850} );
    const sphere = new THREE.Mesh( spheregeometry, material );

    // Set shadow property

    sphere.castShadow = true;

    sphere.receiveShadow = true;

    // Move base of the cone to y = 20

    sphere.position.y = 1.5;

    // apples

    const applegeometry = new THREE.SphereGeometry( 0.1, 16, 16 );
    const material2 = new THREE.MeshBasicMaterial( {color: 0xFF0000} );

    const apple1 = new THREE.Mesh( applegeometry, material2 );
    const apple2 = new THREE.Mesh( applegeometry, material2 );

    // Set shadow property

    apple1.castShadow = true;
    apple1.receiveShadow = true;

    apple2.castShadow = true;
    apple2.receiveShadow = true;

    // Move base of the cone to y = 20

    apple1.position.y = 1.9;
    apple1.position.x = 0.2

    apple2.position.y = 1.9;
    apple2.position.x = -0.2

    // Tree

    var tree = new THREE.Group();

    tree.add(cylinder);

    tree.add(sphere);

    tree.add(apple1)

    tree.add(apple2)

    // Set the given position

    tree.position.set(x, y, z);

    return tree;
}