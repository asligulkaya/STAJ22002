/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import * as THREE from "three";

const BouncingBall = ({ color, speed, soundEnabled, isPlaying }) => {
  const mountRef = useRef(null);
  const sound = useRef(null);

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

    sound.current = new Audio("/sound.mp3");

    const animate = function () {
      if (isPlaying) {
        if (positionX > 7 - ballRadius || positionX < -7 + ballRadius) {
          speedX = -speedX;
          if (soundEnabled && sound.current) {
            sound.current.currentTime = 0;
            sound.current.play();
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
  }, [color, speed, soundEnabled, isPlaying]);

  return <div ref={mountRef}></div>;
};

export default BouncingBall;
