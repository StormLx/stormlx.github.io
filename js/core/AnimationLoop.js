class AnimationLoop {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.systems = new Map();
    }

    addSystem(name, system) {
        this.systems.set(name, system);
    }

    start() {
        this.animate();
    }

    animate = () => {
        // Update all systems
        this.systems.forEach(system => {
            if (system.update) {
                system.update();
            }
        });

        // Update audio position based on lightning
        const lightning = this.systems.get('lightning');
        const audio = this.systems.get('audio');
        if (lightning && audio) {
            audio.updateThunderPosition(lightning.getLight().position);
        }

        // Render the scene
        this.sceneManager.render();

        // Continue animation loop
        requestAnimationFrame(this.animate);
    }
}

export default AnimationLoop; 