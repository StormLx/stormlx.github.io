// import * as THREE from 'three';
// Utilisons la variable THREE globale chargée via CDN

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particleCount = 100;
        this.mousePosition = new THREE.Vector2();
        this.mouseInfluence = 0.5;
        this.init();
    }

    init() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const velocities = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        
        for (let i = 0; i < this.particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
            
            velocities[i] = (Math.random() - 0.5) * 0.02;
            velocities[i + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i + 2] = (Math.random() - 0.5) * 0.02;
            
            sizes[i/3] = Math.random() * 0.1 + 0.05;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        this.velocities = velocities;

        // Créer une texture pour les particules
        const sprite = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0MzUyLCAyMDIwLzAxLzMwLTE1OjUwOjM4ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDctMDRUMTM6MTc6MDQrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA3LTA0VDEzOjE5OjEyKzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA3LTA0VDEzOjE5OjEyKzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJmY2RhYzAzLWE3NWUtNGM4YS05MzVkLTFkMGNjMjQ3YjhkNCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjU3Y2FhYzNhLWZkNWYtMDc0MC1iYWEwLTVmMzY3OGM2YWQwYyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY1MTExZDY5LWI5Y2ItNGQyOS1iOGNkLTU3OGYxNWQ0ZTRlMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjUxMTFkNjktYjljYi00ZDI5LWI4Y2QtNTc4ZjE1ZDRlNGUxIiBzdEV2dDp3aGVuPSIyMDIwLTA3LTA0VDEzOjE3OjA0KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmZjZGFjMDMtYTc1ZS00YzhhLTkzNWQtMWQwY2MyNDdiOGQ0IiBzdEV2dDp3aGVuPSIyMDIwLTA3LTA0VDEzOjE5OjEyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6r1g6gAAADWElEQVRYw82XXU9TQRTHP+eh3fa2UHppLY1pCgSMlJdADDFKNPrBEP0KxhiIHwMSP4pfQxONN3oB3Bhi0Jh4IeFFYoC0QF/oC1Tar+G0BO9u3QJzk5Ocnnl2//85M7Mzu2KaJjsN0XvADUAdUNM3bDjmqc+AFmBYEvN2xbOZoAQ02hUPrZ9hRBJz2y64HiBmK+4RW4q1DQ1WGfF40Gtq0Gtq8MeO4g8d5XhTFv7YURKJfdjtdoZfzOz4b+wG4Og9g/7cHCORCP0DQwwMDBIMBnG73dTX11NbU0PEJ/Dl1QYz42Oqs9qKnZABQG3fkBGbf/Ri7nMrhUJeVWW5zKWONna5rPTjJycnUBWF8vKDJBIJRp6/YGlhAafDQSAQYGZmFsMwmJ9XuN8zQCKRUIH7wGAu98aWBnIRBi80I4oi99s7qKio4OLlq+i6ztWbTZSVlXHn3gPa2tvZ2NggFKrBbrdX53JtG0BITwUw9uktqmqwaT6kvr4eh8PB82ed6LpOW9sdxsfHSaVS1NXVZfKUjvRU8GdkOj0i2wMAJN7LRKNRvN69APj9fqxWK0+fdGC1Wrl+s4l4PM7q6uoT4AGwlj2iy0I6YwB6MpnEMIx0kMtFPJ4gFotx584dtqxWcJW6abzxsxBxbwJuQ1dWVojH43i9XgBWV1eJx+MEgkGjEIekU59sG0A+V01WVlbQ9a8Eqv0IgoDb7cLj8YyJYrLQHRDSRVQikWRu7jM3m24hiiKJRIJ4fJ24GNPzOOanPiVTNDSKnZ/I/fKykTMQDTNDMpViI5Vih8VxPlc3m7SshC3L5+5UkouiLVVAaTpBJ5JJNjY2cLtdCIJgFCNeWMr5A9EwZamEKKiGgMfx1ppcLhfnz52loqLCeNzSYhQjXnhRtLknkV2NxqwUzWSbUH4A5akLbQ3PTK3lw0sZHw+C4GXUmBnpH+zMB1AKBvJ1bEGWx9ShoTsU2tGCLI+BsrdbUMw6+VJrb0VxRTIQDQ+CNnc94N8uD9/+SIBnCuWYCk7uAbfVgcsjg+8vKbYUWZqIoQ22nGkqvK76ztCkIEstwKTv1KlSb09PtqCJDGj/gIFe4H95+RjHuLRnZAAAAABJRU5ErkJggg==');

        const material = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x118AB2,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
            map: sprite,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.mesh = new THREE.Points(geometry, material);
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('mousemove', (event) => {
            this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
    }

    update() {
        const positions = this.mesh.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            // Update position
            positions[i] += this.velocities[i];
            positions[i + 1] += this.velocities[i + 1];
            positions[i + 2] += this.velocities[i + 2];

            // Mouse influence
            const distanceToMouse = Math.sqrt(
                Math.pow(positions[i] - this.mousePosition.x * 10, 2) +
                Math.pow(positions[i + 1] - this.mousePosition.y * 10, 2)
            );

            if (distanceToMouse < 5) {
                const force = (1 - distanceToMouse / 5) * this.mouseInfluence;
                positions[i] += (this.mousePosition.x * 10 - positions[i]) * force;
                positions[i + 1] += (this.mousePosition.y * 10 - positions[i + 1]) * force;
            }

            // Bounds checking
            if (Math.abs(positions[i]) > 10) this.velocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 10) this.velocities[i + 1] *= -1;
            if (Math.abs(positions[i + 2]) > 10) this.velocities[i + 2] *= -1;
        }

        this.mesh.geometry.attributes.position.needsUpdate = true;
    }

    getMesh() {
        return this.mesh;
    }
}

export default ParticleSystem; 