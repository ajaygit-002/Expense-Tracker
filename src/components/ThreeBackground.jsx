import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particleCount = 50;
    const particles = new THREE.Group();

    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
        transparent: true,
        opacity: 0.4
      });
      const particle = new THREE.Mesh(geometry, material);

      particle.position.x = (Math.random() - 0.5) * 50;
      particle.position.y = (Math.random() - 0.5) * 50;
      particle.position.z = (Math.random() - 0.5) * 50;

      particle.userData = {
        velocity: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.01
        }
      };

      particles.add(particle);
    }
    scene.add(particles);

    // Create abstract shapes
    const shapes = new THREE.Group();
    const shapeGeometries = [
      new THREE.TorusGeometry(3, 0.5, 16, 100),
      new THREE.OctahedronGeometry(2),
      new THREE.TetrahedronGeometry(2.5)
    ];

    shapeGeometries.forEach((geometry, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: [0x6366F1, 0x10B981, 0xF59E0B][index],
        transparent: true,
        opacity: 0.15,
        wireframe: true
      });
      const shape = new THREE.Mesh(geometry, material);
      shape.position.x = (index - 1) * 15;
      shape.position.y = (Math.random() - 0.5) * 10;
      shape.position.z = -10;
      shapes.add(shape);
    });
    scene.add(shapes);

    // Mouse parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 2;
      camera.position.y = targetY * 2;

      // Animate particles
      particles.children.forEach((particle) => {
        particle.position.x += particle.userData.velocity.x;
        particle.position.y += particle.userData.velocity.y;
        particle.position.z += particle.userData.velocity.z;

        // Boundary check
        if (Math.abs(particle.position.x) > 25) particle.userData.velocity.x *= -1;
        if (Math.abs(particle.position.y) > 25) particle.userData.velocity.y *= -1;
        if (Math.abs(particle.position.z) > 25) particle.userData.velocity.z *= -1;
      });

      // Rotate shapes
      shapes.children.forEach((shape, index) => {
        shape.rotation.x += 0.001 * (index + 1);
        shape.rotation.y += 0.002 * (index + 1);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-background" />;
};

export default ThreeBackground;
