class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = this._setupCamera();
        this.renderer = this._setupRenderer();
        this.setupBasicLights();
        this.setupFog();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.position.z = 1;
        camera.rotation.x = 1.16;
        camera.rotation.y = -0.12;
        camera.rotation.z = 0.27;
        return camera;
    }

    _setupRenderer() {
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        document.body.appendChild(renderer.domElement);
        return renderer;
    }

    setupBasicLights() {
        const ambient = new THREE.AmbientLight(0x555555);
        this.scene.add(ambient);

        const directionalLight = new THREE.DirectionalLight(0xffeedd);
        directionalLight.position.set(0, 0, 1);
        this.scene.add(directionalLight);
    }

    setupFog() {
        this.scene.fog = new THREE.FogExp2(0x11111f, 0.001);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    add(object) {
        this.scene.add(object);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

export default SceneManager; 