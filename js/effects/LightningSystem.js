class LightningSystem {
    constructor() {
        this.flash = new THREE.PointLight(0x062d89, 20, 400, 1.5);
        this.flash.position.set(200, 300, 100);
    }

    update() {
        if (Math.random() > 0.98 || this.flash.power > 100) {
            if (this.flash.power < 100) {
                this.flash.position.set(
                    Math.random() * 400,
                    300,
                    Math.random() * 200,
                    100
                );
            }
            this.flash.power = 50 + Math.random() * 300;
        }
    }

    getLight() {
        return this.flash;
    }
}

export default LightningSystem; 