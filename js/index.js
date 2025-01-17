// Setup scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Parameters
    const waveWidth = 40;        // Width of the wave grid
    const waveDepth = 40;        // Depth (shorter wave grid)
    const waveHeight = 2;        // Amplitude of the wave (height)
    const particleSpacing = 0.4; // Spacing between particles
    const waveSpeed = 0.1;       // Speed of wave motion
    const particleSize = 0.02;   // Small particle size
    const particleColor = 0xffffff; // Color of particles
    scene.background = new THREE.Color(0x00000); // Ganti 0x000000 dengan warna yang Anda inginkan
    let interactionIntensity = 0;  // Interaction intensity for effects
    let targetIntensity = 0;  // Target intensity for smooth transition
    const easingFactor = 0.1; // Factor to control the speed of smooth transition
    
    // Create particle positions
    const particles = new THREE.BufferGeometry();
    const particlesPerRow = waveWidth / particleSpacing;
    const rows = waveDepth / particleSpacing;
    const numParticles = particlesPerRow * rows;

    const positions = new Float32Array(numParticles * 3);

    for (let x = 0; x < particlesPerRow; x++) {
      for (let z = 0; z < rows; z++) {
        const index = (x * rows + z) * 3;
        positions[index] = x * particleSpacing - waveWidth / 2; // X position
        positions[index + 1] = 0;                               // Y position
        positions[index + 2] = z * particleSpacing - waveDepth / 2; // Z position
      }
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material for particles
    const particleMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: particleSize,
    });

    // Create particle system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Set camera position (closer to particles)
    camera.position.set(15, 5, 0); // Closer to the grid
    camera.lookAt(0, 0, 0);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      const positions = particles.attributes.position.array;
      const time = Date.now() * 0.001;

      // Smooth transition of interaction intensity towards targetIntensity
      interactionIntensity += (targetIntensity - interactionIntensity) * easingFactor;

      for (let x = 0; x < particlesPerRow; x++) {
        for (let z = 0; z < rows; z++) {
          const index = (x * rows + z) * 3;
          const waveX = x * particleSpacing - waveWidth / 2;
          const waveZ = z * particleSpacing - waveDepth / 2;

          // Melengkung ke kanan (lebih kuat), dengan penambahan efek
          const curveFactor = Math.sin(waveZ * 0.5 + time * waveSpeed) * waveHeight * 0.5;

          // Wave motion dengan lengkungan lebih kuat ke kanan
          positions[index + 1] =
            Math.sin(waveZ * 0.5 + time * waveSpeed) * waveHeight 
            + Math.cos(waveX * 0.3 + waveZ * 0.4 + time * waveSpeed) * waveHeight * 0.3
            + Math.sin(waveX * 0.1 + time * 0.5) * waveHeight * 0.3; // Menambahkan faktor untuk lengkungan lebih kuat

          // Interaction effects (smooth decay)
          positions[index + 1] +=
            Math.sin(waveX * 0.5 + time * 2.0) * interactionIntensity * 0.8;
            + Math.sin(waveZ * 0.3 + time * 2.0) * interactionIntensity * 0.3;
        }
      }

      // Smoothly decay interaction intensity after it reaches peak
      if (targetIntensity === 1) {
        setTimeout(() => {
          targetIntensity = 0.4; // Start to decrease the intensity after some time
        }, 5500); // Time before wave starts to decrease (1.5 seconds)
      }

      particles.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    }

    animate();

    // Handle touch or click interaction
    window.addEventListener('pointerdown', () => {
      targetIntensity = 1; // Boost interaction intensity
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });


 
