class CloudSystem {
    constructor() {
        this.cloudParticles = [];
        this.textureLoader = new THREE.TextureLoader();
    }

    async initialize() {
        return new Promise((resolve) => {
            this.textureLoader.load(
                "bg.webp",
                (texture) => {
                    this._createClouds(texture);
                    resolve();
                }
            );
        });
    }

    _createClouds(texture) {
        const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        const cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });

        for (let p = 0; p < 15; p++) {
            const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random() * 800 - 400,
                500,
                Math.random() * 500 - 450
            );

            cloud.rotation.x = 1.18;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random() * 360;
            cloud.material.opacity = 0.4;
            
            this.cloudParticles.push(cloud);
        }
    }

    update() {
        this.cloudParticles.forEach((p) => {
            p.rotation.z -= 0.002;
        });
    }

    getClouds() {
        return this.cloudParticles;
    }
}

export default CloudSystem; 