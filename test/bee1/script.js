// Initialize Three.js scene
let scene, camera, renderer, controls, mixer;
let clock = new THREE.Clock();
let bee; // Reference to the bee model

// Set up the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;

    // Load the bee model
    loadBeeModel();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    animate();
}

// Load the 3D bee model
function loadBeeModel() {
    const loader = new THREE.GLTFLoader();
    
    loader.load(
        '3d/flying_bee.glb',
        function (gltf) {
            bee = gltf.scene;
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(bee);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Scale the model to a reasonable size
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            bee.scale.set(scale, scale, scale);
            
            // Center the model
            bee.position.x = -center.x * scale;
            bee.position.y = -center.y * scale;
            bee.position.z = -center.z * scale;
            
            // Add subtle animation if available
            if (gltf.animations && gltf.animations.length) {
                mixer = new THREE.AnimationMixer(bee);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
            } else {
                // Add a simple hover animation if no animations are in the model
                animateBeeHover(bee);
            }
            
            scene.add(bee);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened when loading the model:', error);
        }
    );
}

// Simple hover animation if the model doesn't have built-in animations
function animateBeeHover(model) {
    // Create a simple hover effect
    const hoverAnimation = () => {
        const time = Date.now() * 0.001; // Convert to seconds
        if (model) {
            model.position.y = Math.sin(time * 1.5) * 0.1;
            model.rotation.y = time * 0.25;
        }
        requestAnimationFrame(hoverAnimation);
    };
    hoverAnimation();
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Update animation mixer if it exists
    if (mixer) {
        mixer.update(clock.getDelta());
    }

    renderer.render(scene, camera);
}

// Initialize the application when the DOM is loaded
window.addEventListener('DOMContentLoaded', init);
