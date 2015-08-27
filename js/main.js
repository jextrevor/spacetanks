var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
camera.rotation.order = "YZX";
var group = new THREE.Group();
group.add(camera);
console.log(camera.rotation.order);
var camera2 = new THREE.PerspectiveCamera( 75, 1, 0.1, 100000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
speed = 0;
document.body.appendChild( renderer.domElement );
//renderTarget.position.set(0.5,0,0);
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0xeeeeee, shininess: 30, shading: THREE.SmoothShading } );
var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );
cube.castShadow = true;
var light = new THREE.AmbientLight( 0x111111 ); // soft white light
scene.add( light );
var light2 = new THREE.PointLight( 0xffffff, 1, 100 );
light2.position.set( 5, 5, 5 );
scene.add( light2 );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 0, 1000000000, 1000000000 );
scene.add( directionalLight );
var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight2.position.set( 0, -1000000000, -1000000000  );
scene.add( directionalLight2 );
var loader = new THREE.JSONLoader();
function callback(object,m){
	materials = []
	var material0 = new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0xeeeeee, shininess: 30, shading: THREE.SmoothShading } );
	material0.metal = true;
	material0.side= THREE.DoubleSide;
	var material1 = new THREE.MeshPhongMaterial( { color: 0x010101, specular: 0x000000, shininess: 1, shading: THREE.SmoothShading } );
	material1.transparent = true;
	material1.opacity = 0.5;
	material1.side = THREE.DoubleSide;
	var material2 = new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0xeeeeee, shininess: 30, shading: THREE.SmoothShading } );
	material2.metal = true;
	material2.side = THREE.DoubleSide;
	var material3 = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0xeeeeee, shininess: 30, shading: THREE.SmoothShading } );
	material3.metal = true;
	material3.side = THREE.DoubleSide;
	var material4 = new THREE.MeshPhongMaterial( {color:0x000000, specular:0x666666, emissive:0x444444, shininess:5, shading: THREE.SmoothShading });
	material4.metal = true;
	material4.side = THREE.DoubleSide;
	materials.push(material0);
	materials.push(material1);
	materials.push(material2);
	materials.push(material3);
	materials.push(material4);
	//object.material = materials;
	for(face in object.faces){
		console.log(face.materialIndex);
	}
	var ma = new THREE.MeshFaceMaterial(materials);
	var newobject = new THREE.Mesh(object,ma);
	group.add(newobject);
}
loader.load("obj/ship.json",callback);
/*var pointlight = new THREE.PointLight( 0xffffff, 0.5, 10000 );
pointlight.position.set( -3, 0, 5 );
scene.add( pointlight );*/
renderTarget = new THREE.WebGLRenderTarget( 100, 100, { format: THREE.RGBFormat } );
/*var urls = [ "skybox/right.jpg", "skybox/left.jpg",
    "skybox/top.jpg", "skybox/bottom.jpg",
    "skybox/front.jpg", "skybox/back.jpg" ];

var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
cubemap.format = THREE.RGBFormat;

var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
shader.uniforms['tCube'].value = cubemap; // apply textures to shader

// create shader material
var skyBoxMaterial = new THREE.ShaderMaterial( {
  fragmentShader: shader.fragmentShader,
  vertexShader: shader.vertexShader,
  uniforms: shader.uniforms,
  depthWrite: false,
  side: THREE.BackSide
});

// create skybox mesh
var skybox = new THREE.Mesh(
  new THREE.CubeGeometry(5000, 5000, 5000),
  skyBoxMaterial
);

scene.add(skybox);*/
camera.position.z = -0.45;
camera.position.y = 0.08;
scene.add(group);
var sphereGeometry = new THREE.SphereGeometry(5,32,32);
var starMaterial = new THREE.MeshLambertMaterial({color:0xffffff,emissive:0xffffff});
var particle_system_geometry = new THREE.Geometry();  
//var camera = new THREE.camera();
	for ( var i = 0; i < 1000; i ++ ) {
/*
    var mesh = new THREE.Mesh( sphereGeometry, starMaterial );
    var light = new THREE.PointLight(0xffffff,100,1000); 
    mesh.position.x = Math.random() * 10000 - 5000;
    mesh.position.y = Math.random() * 10000 - 5000;
    mesh.position.z = Math.random() * 10000 - 5000;
    light.position.x = mesh.position.x;
    light.position.y = mesh.position.y;
    light.position.z = mesh.position.z;

    mesh.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
    mesh.rotation.y = Math.random() * 360 * ( Math.PI / 180 );

    camera.add( mesh );
*/

particle_system_geometry.vertices.push(new THREE.Vector3(Math.random() * 10000-5000, Math.random() * 10000-5000, Math.random() * 10000-5000));
}

var particle_system_material = new THREE.PointCloudMaterial({
  color: 0xffffff,
  size: 7,
  sizeAttenuation:false,
  map: THREE.ImageUtils.loadTexture(
    "img/particle.png"
  )//,
  //blending: THREE.AdditiveBlending,
  //transparent: true
});
var particleSystem = new THREE.PointCloud(  
  particle_system_geometry,
    particle_system_material
);
particleSystem.sortParticles = true;
scene.add(particleSystem); 
//scene.add( camera );
var planelikeGeometry = new THREE.PlaneGeometry( 1, 1);
var plane = new THREE.Mesh( planelikeGeometry, new THREE.MeshPhongMaterial( { color: 0xffffff, shininess:100,specular: 0x555555, shininess: 30, shading: THREE.SmoothShading , map:renderTarget} ) );
plane.position.set(1,1,1);
//scene.add(plane);

plane.receiveShadow = true;
camera2.position.z = 1.5;
function handleKeyDown(event) {
  if (event.keyCode === 37) { //66 is "b"
    window.isLeftDown = true;
  }
  if (event.keyCode === 38) { //66 is "b"
    window.isUpDown = true;
  }
  if (event.keyCode === 39) { //66 is "b"
    window.isRightDown = true;
  }
  if (event.keyCode === 40) { //66 is "b"
    window.isDownDown = true;
  }
  if(event.keyCode === 87){
  	window.isWDown = true;
  }
  if(event.keyCode === 83){
  	window.isSDown = true;
  }
  if(event.keyCode === 65){
  	window.isADown = true;
  }
  if(event.keyCode === 68){
  	window.isDDown = true;
  }
  if(event.keyCode === 16){
  	window.isBackspaceDown = true;
  }
}

function handleKeyUp(event) {
  if (event.keyCode === 37) {
    window.isLeftDown = false;
  }
  if (event.keyCode === 38) {
    window.isUpDown = false;
  }
  if (event.keyCode === 39) {
    window.isRightDown = false;
  }
  if (event.keyCode === 40) {
    window.isDownDown = false;
  }
  if(event.keyCode === 87){
  	window.isWDown = false;
  }
  if(event.keyCode === 83){
  	window.isSDown = false;
  }
  if(event.keyCode === 65){
  	window.isADown = false;
  }
  if(event.keyCode === 68){
  	window.isDDown = false;
  }
  if(event.keyCode === 16){
  	window.isBackspaceDown = false;
  }
}
render.shadowMapEnabled = true;
window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false);
//camera.rotation.order = "YXZ";
function render() {
	plane.rotation.y += 0.005;
	cube.rotation.z += 0.01;
     cube.rotation.y += 0.01;
	if(window.isLeftDown){
		group.rotateZ(0.05);
	}
	if(window.isWDown){
		speed += 0.01;
		if(speed > 100){
			speed = 100;
		}
	}
	if(window.isSDown){
		speed -= 0.01;
		if(speed < 0){
			speed = 0;
		}
	}
	if(window.isBackspaceDown){
		camera.rotation.y = 180*(Math.PI/180);
		camera.position.z = 0.45;
	}
	else{
		camera.rotation.y = 0;
		camera.position.z = -0.45;
	}
	if(window.isADown){
		group.translateX(-0.05);
	}
	if(window.isDDown){
		group.translateX(0.05);
	}
	group.translateZ(-speed);
	if(window.isRightDown){
		group.rotateZ(-0.05);
	}
	if(window.isUpDown){
		group.rotateX(-0.05);
		//group.translate
	}
	if(window.isDownDown){
		group.rotateX(0.05);
	}
	requestAnimationFrame( render );
	//renderer.render( scene, camera2, renderTarget, true);
	renderer.render( scene, camera );
}
render();