/* Initialize tsParticles for constellation-like background */
window.addEventListener('load', () => {
  if (!window.tsParticles) return;

  tsParticles.load('tsparticles', {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: { value: 90, density: { enable: true, area: 1200 } },
      color: { value: '#bfbfbf' },
      shape: { type: 'circle' },
      opacity: { value: 0.92, random: true },
      size: { value: { min: 0.8, max: 3 } },
      links: {
        enable: true,
        distance: 130,
        color: '#9e9ea0',
        opacity: 0.12,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.45,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' }
      }
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 150, links: { opacity: 0.25 } },
        push: { quantity: 3 }
      }
    },
    detectRetina: true,
    background: { color: 'transparent' }
  }).then((container) => {
    // create a subtle central cluster by nudging a subset of particles towards center
    try {
      const conf = container.options.particles;
      // No runtime API to create permanent clusters easily without plugins; perform a mild attract effect
      const canvas = container.canvas.element;
      if (canvas) {
        // gently animate a low-frequency scale pulse so lines cluster occasionally
        let t = 0;
        setInterval(() => {
          t += 0.03;
          const s = 1 + Math.sin(t) * 0.02;
          container.particles.array.forEach((p, i) => {
            // slightly move particles toward center proportional to distance
            const dx = (canvas.width / 2) - p.position.x;
            const dy = (canvas.height / 2) - p.position.y;
            p.position.x += dx * 0.0008 * (i % 3 === 0 ? s : 1);
            p.position.y += dy * 0.0008 * (i % 4 === 0 ? s : 1);
          });
        }, 120);
      }
    } catch (e) {
      // fail silently if internals change
      // console.warn(e)
    }
  });
});
