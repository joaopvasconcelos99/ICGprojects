import * as THREE from "https://threejs.org/build/three.module.js";

export function createPlanet() {
  //varia entre 1 e 3
  const randomTexture = Math.floor(Math.random() * 5) + 1
  let geometry, material;

  if (randomTexture == 1 || randomTexture == 2) {
    geometry = new THREE.SphereGeometry( 5, 25, 25 );
    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('textures/earth.jpg',THREE.SphericalRefractionMapping) } );
  }

  else if (randomTexture == 3) {
    geometry = new THREE.SphereGeometry( 16, 25, 25 );
    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('textures/saturn.jpg',THREE.SphericalRefractionMapping) } );
  }

  else if (randomTexture == 4) {
    geometry = new THREE.SphereGeometry( 4, 25, 25 );
    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('textures/venus.jpg',THREE.SphericalRefractionMapping) } );
  }

  else {
    geometry = new THREE.SphereGeometry( 10, 25, 25 );
    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('textures/uranus.jpg',THREE.SphericalRefractionMapping) } );
  }

  const sphere = new THREE.Mesh( geometry, material );
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  return [sphere,randomTexture];
}

export function createSun() {

  // const geometry = new THREE.SphereGeometry( 5, 32, 32 );
  // const sunLight = new THREE.PointLight(0xffee88, 1, 200, 0);
  // const material = new THREE.MeshPhongMaterial( { 
  //   map: THREE.ImageUtils.loadTexture('textures/sun.jpg',THREE.SphericalRefractionMapping), 
  //   emissive: 0xffffee,
  //   emissiveIntensity: 0.5,
  //   roughness: 1
  // });

  // sunLight.add(new THREE.Mesh(geometry, material));
  // sunLight.position.set(0, 2, 0);
  // sunLight.castShadow = true;

  // return sunLight;

  const geometry2 = new THREE.SphereGeometry( 5, 33, 33);
  const material2 = new THREE.MeshPhongMaterial( { 
    map: THREE.ImageUtils.loadTexture('textures/sun.jpg',THREE.SphericalRefractionMapping)
  });

  const sphere = new THREE.Mesh( geometry2, material2 );
  sphere.castShadow = true;
  sphere.receiveShadow = true;

  return sphere;
}

export function createMoon() {
  const geometry = new THREE.SphereGeometry( 5, 25, 25 );
  const material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('textures/moon.jpg',THREE.SphericalRefractionMapping) } );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  return sphere
}