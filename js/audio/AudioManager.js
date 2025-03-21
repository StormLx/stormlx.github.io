class AudioManager {
    constructor(listener) {
        this.listener = listener;
        this.thunderSound = null;
        this.audioLoader = new THREE.AudioLoader();
        this.isInitialized = false;
    }

    async initialize() {
        // Add click event listener to initialize audio
        document.addEventListener('click', () => {
            if (!this.isInitialized) {
                this.loadThunderSound();
                this.isInitialized = true;
            }
        }, { once: true });
    }

    async loadThunderSound() {
        return new Promise((resolve) => {
            this.audioLoader.load("thunder.mp3", (buffer) => {
                this.thunderSound = new THREE.PositionalAudio(this.listener);
                this.thunderSound.setBuffer(buffer);
                this.thunderSound.setRefDistance(20);
                this.thunderSound.setVolume(0.6);
                this.thunderSound.setLoop(true);
                resolve();
            });
        });
    }

    updateThunderPosition(position) {
        if (this.thunderSound && !this.thunderSound.isPlaying && this.isInitialized) {
            this.thunderSound.position.copy(position);
            this.thunderSound.play();
            this.thunderSound.isPlaying = true;
        }
    }

    getThunderSound() {
        return this.thunderSound;
    }
}

export default AudioManager; 