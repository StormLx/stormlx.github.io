class RainSystem {
    constructor(count = 6000) {
        this.rainCount = count;
        this.rain = this._createRainSystem();
    }

    _createRainSystem() {
        const positions = [];
        const sizes = [];
        const rainGeo = new THREE.BufferGeometry();

        for (let i = 0; i < this.rainCount; i++) {
            positions.push(Math.random() * 400 - 200);
            positions.push(Math.random() * 500 - 250);
            positions.push(Math.random() * 400 - 200);
            sizes.push(30);
        }

        rainGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(new Float32Array(positions), 3)
        );
        rainGeo.setAttribute(
            "size",
            new THREE.BufferAttribute(new Float32Array(sizes), 1)
        );

        const rainMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.04,
            transparent: true,
            opacity: 0.7
        });

        return new THREE.Points(rainGeo, rainMaterial);
    }

    update() {
        this.rain.position.z -= 0.222;
        if (this.rain.position.z < -200) {
            this.rain.position.z = 0;
        }
    }

    getMesh() {
        return this.rain;
    }
}

export default RainSystem; 