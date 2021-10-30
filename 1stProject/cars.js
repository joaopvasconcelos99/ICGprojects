import * as THREE from "https://threejs.org/build/three.module.js";

// example adopted from https://www.freecodecamp.org/news/three-js-tutorial/

// changed wheels to cylinder, added random colours, also added a truck

export function createCar() {

    const car = new THREE.Group();
    
    //back wheels
    const backWheel = createWheels();
    backWheel.position.y = 6;
    backWheel.position.x = -18;
    
    //front wheels
    const frontWheel = createWheels();
    frontWheel.position.y = 6;  
    frontWheel.position.x = 18;
    
    //main body
    const mainBody = new THREE.Mesh(
      new THREE.BoxBufferGeometry(60, 15, 30),
      new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    );
    mainBody.position.y = 12;
    
    //top body
    const topBody = new THREE.Mesh(
      new THREE.BoxBufferGeometry(33, 12, 24),
      new THREE.MeshLambertMaterial({ color: 0x808080 })
    );
    topBody.position.y = 25.5;
    
    //cast shadows
    backWheel.castShadow = true;
    backWheel.receiveShadow = true;
    frontWheel.castShadow = true;
    frontWheel.receiveShadow = true;
    mainBody.castShadow = true;
    mainBody.receiveShadow = true;
    topBody.castShadow = true;
    topBody.receiveShadow = true;
    
    car.add(backWheel);
    car.add(frontWheel);
    car.add(mainBody);
    car.add(topBody);

    return car;
}

export function createTruck() {
  const truck = new THREE.Group();

  const mainBody = new THREE.Mesh(
    new THREE.BoxBufferGeometry(75, 30, 30),
    new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  );
  mainBody.position.y = 20;
  
  //front body
  const frontBody = new THREE.Mesh(
    new THREE.BoxBufferGeometry(20, 22, 25),
    new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
  );
  frontBody.position.y = 18;
  frontBody.position.x = -45;
  
  //back wheels
  const backWheel = createWheels();
  backWheel.position.x = -25;
  backWheel.position.y = 6;  

  //middle wheels
  const middleWheel = createWheels();
  middleWheel.position.y = 6;

  //front wheels
  const frontWheel = createWheels();
  frontWheel.position.y = 6;  
  frontWheel.position.x = 25;
  
  //cast shadows
  mainBody.castShadow = true;
  mainBody.receiveShadow = true;
  frontBody.castShadow = true;
  frontBody.receiveShadow = true;
  backWheel.castShadow = true;
  backWheel.receiveShadow = true;
  middleWheel.castShadow = true;
  middleWheel.receiveShadow = true;
  frontWheel.castShadow = true;
  frontWheel.receiveShadow = true;

  truck.add(mainBody);
  truck.add(frontBody);
  truck.add(backWheel);
  truck.add(middleWheel);
  truck.add(frontWheel);

  return truck;
}


function createWheels() {
    const geometry = new THREE.CylinderGeometry( 6, 6, 35, 32 );
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    wheel.rotation.x = Math.PI / 2;
    return wheel;
}