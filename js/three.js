var cube;
var background;
var camera;

var scene;



var mapWidth = 10;
var mapHeight = 10;

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });


  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 20;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 10;

  //camera.rotateOnAxis(new THREE.Vector3( 0, 1, 0 ), 0.18 );

  scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  cube = new THREE.Mesh(geometry, material);

  const backgroundGeometry = new THREE.PlaneGeometry(mapWidth, mapHeight, 1);
  const backgroundMaterial = new THREE.MeshPhysicalMaterial({ color: 0x44aa88 });
  background = new THREE.Mesh(backgroundGeometry, backgroundMaterial)

  //scene.add(cube);
  scene.add(background);
  //background.add(cube);

  background.position.x = 0;
  background.position.y = 0;

  addCube()

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    //cube.rotation.x = time;
    //cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);

  }
  requestAnimationFrame(render);

}

var r = Math.random()
var g = Math.random()
var b = Math.random()

function changeColor() {
  updateRGB();
  var rgbThreeColor = new THREE.Color(r, g, b).getHex()
  cube.material.color.setHex(rgbThreeColor);
};

var delta = 0.005
function updateRGB() {
  if (r + delta <= 1 && r + delta >= 0) {
    r += delta
  } else {
    delta = -delta;
  }

  if (b + delta <= 1 && b + delta >= 0) {
    b += delta
  } else {
    delta = -delta;
  }
}

var moveCube = function (event) {
  var speed = 0.05;
  console.log(event.keyCode)
  if (event.keyCode == 115) {
    camera.position.z += speed;
  } else if (event.keyCode == 119) {
    camera.position.z -= speed;
  } else if (event.keyCode == 97) {
    camera.position.x -= speed;
  } else if (event.keyCode == 100) {
    camera.position.x += speed;
  }
}

var mousePressed = false;

function scale(x) {
  // 0 - 100
  // 0.001 - 0.008

  var a = 0.01
  var b = 0.08

  var min = 20;
  var max = 100;

  return (((b - a) * (x - min)) / max) + a
}

function addCube() {
  var map = [
    [1, 0, 0, 2, 2, 2, 0, 0, 0, 1],
    [0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 2, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 2, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 1]
  ];

  for (var i = 0; i < map.length; ++i) {
    for (var j = 0; j < map.length; ++j) {
      if (map[i][j] == 1) {
        const customCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0xFFF233 }));
        background.add(customCube);

        customCube.position.x = -4 + j;
        customCube.position.y = -4 + i;
      }
      if (map[i][j] == 2) {
        const customCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0xFF0E0E }));
        background.add(customCube);

        customCube.position.x = -4 + j;
        customCube.position.y = -4 + i;
      }
    }
  }

}

var canvas = document.getElementById("c")
canvas.focus()

document.addEventListener('keypress', moveCube, false);

canvas.addEventListener('mousedown', function (event) {
  mousePressed = true;
}, false);

canvas.addEventListener('mouseup', function (event) {
  mousePressed = false;
}, false)

canvas.addEventListener('mouseleave', function (event) {
  mousePressed = false;
}, false)


var deltaRotationX = 0, deltaRotationY = 0;

canvas.addEventListener('mousemove', function (event) {
  if (mousePressed) {
    deltaRotationX += scale(event.movementX);
    deltaRotationY += scale(event.movementY);
    background.rotation.x = deltaRotationY;
    background.rotation.y = deltaRotationX;
  }
}, false)

function initBackground() {

}

function buildMap() {
}



main();