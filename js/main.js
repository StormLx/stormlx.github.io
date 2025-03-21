import SceneManager from './core/SceneManager.js';
import RainSystem from './effects/RainSystem.js';
import CloudSystem from './effects/CloudSystem.js';
import LightningSystem from './effects/LightningSystem.js';
import ParticleSystem from './effects/ParticleSystem.js';
import AudioManager from './audio/AudioManager.js';
import AnimationLoop from './core/AnimationLoop.js';

class WeatherApp {
    constructor() {
        this.sceneManager = new SceneManager();
        this.animationLoop = new AnimationLoop(this.sceneManager);
    }

    async initialize() {
        // Initialize systems
        const rainSystem = new RainSystem();
        const cloudSystem = new CloudSystem();
        const lightningSystem = new LightningSystem();
        const particleSystem = new ParticleSystem();
        const audioManager = new AudioManager(this.sceneManager.camera);

        // Add systems to scene
        this.sceneManager.add(rainSystem.getMesh());
        this.sceneManager.add(lightningSystem.getLight());
        this.sceneManager.add(particleSystem.getMesh());

        // Wait for async operations
        await cloudSystem.initialize();
        await audioManager.initialize();

        // Add clouds to scene
        cloudSystem.getClouds().forEach(cloud => {
            this.sceneManager.add(cloud);
        });

        // Add systems to animation loop
        this.animationLoop.addSystem('rain', rainSystem);
        this.animationLoop.addSystem('clouds', cloudSystem);
        this.animationLoop.addSystem('lightning', lightningSystem);
        this.animationLoop.addSystem('particles', particleSystem);
        this.animationLoop.addSystem('audio', audioManager);

        // Start animation
        this.animationLoop.start();
    }
}

// Start the application
const app = new WeatherApp();
app.initialize(); 