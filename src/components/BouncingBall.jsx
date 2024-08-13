/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const BouncingBall = ({ color, speed, soundEnabled, isPlaying }) => {
  const mountRef = useRef(null);
  const sound = useRef(new Audio("/sound.mp3"));
  sound.current.loop = true;
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight * 0.9);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({ color, shininess: 30 });
    const ball = new THREE.Mesh(geometry, material);
    scene.add(ball);

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(10, 10, 10).normalize();
    scene.add(light);

    camera.position.z = 5;

    let speedX = speed;
    let positionX = 0;
    const ballRadius = 1;

    const animate = function () {
      if (isPlaying && isUserInteracted) {
        if (positionX > 7 - ballRadius || positionX < -7 + ballRadius) {
          speedX = -speedX;
          if (soundEnabled && sound.current && !sound.current.paused) {
            sound.current.play().catch((error) => {
              console.error("Sound play error:", error);
            });
          }
        }
        positionX += speedX;
        ball.position.x = positionX;

        renderer.render(scene, camera);
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [color, speed, soundEnabled, isPlaying, isUserInteracted]);

  const handleUserInteraction = () => {
    setIsUserInteracted(true);
    if (soundEnabled && sound.current.paused && isPlaying) {
      sound.current.play().catch((error) => {
        console.error("Sound play error:", error);
      });
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      sound.current.pause();
    } else if (isUserInteracted && soundEnabled) {
      sound.current.play().catch((error) => {
        console.error("Sound play error:", error);
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!soundEnabled) {
      sound.current.pause();
    } else if (isUserInteracted && isPlaying) {
      sound.current.play().catch((error) => {
        console.error("Sound play error:", error);
      });
    }
  }, [soundEnabled]);

  return (
    <div ref={mountRef}>
      {!isUserInteracted && (
        <button onClick={handleUserInteraction}>Start</button>
      )}
    </div>
  );
};

export default BouncingBall;
