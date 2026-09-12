import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useProgress } from "@react-three/drei";
import { useAppStore } from "@/lib/store";

export function IntroSequence() {
  const roadRef = useRef<THREE.Group>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 2, -10));
  const { progress } = useProgress();
  const setIntroFinished = useAppStore((state) => state.setIntroFinished);

  const lines = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [0, 0, -i * 10] as [number, number, number],
    }));
  }, []);

  useEffect(() => {
    // If progress is 100 or 3.5s have passed, end intro
    const timeout = setTimeout(() => {
      setIntroFinished(true);
    }, 3500);
    return () => clearTimeout(timeout);
  }, [setIntroFinished]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setIntroFinished(true), 500); // Small buffer
    }
  }, [progress, setIntroFinished]);

  useFrame((state, delta) => {
    if (!roadRef.current) return;
    
    // Move road towards camera
    roadRef.current.position.z += 25 * delta;
    if (roadRef.current.position.z > 10) {
      roadRef.current.position.z -= 10;
    }

    // Camera look
    state.camera.position.lerp(new THREE.Vector3(0, 1.5, 5), 0.1);
    state.camera.lookAt(0, 1.5, -10);
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, -10]} intensity={1} color="#6E5BFF" />
      
      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -50]}>
        <planeGeometry args={[20, 200]} />
        <meshStandardMaterial color="#0F1116" roughness={0.9} />
      </mesh>

      {/* Dividers */}
      <group ref={roadRef}>
        {lines.map((line, i) => (
          <mesh key={i} position={line.position}>
            <boxGeometry args={[0.2, 0.05, 4]} />
            <meshBasicMaterial color="#6E5BFF" />
          </mesh>
        ))}
      </group>

      {/* Side Pylons */}
      <group position={[-3, 0, 0]}>
        {lines.map((line, i) => (
          <mesh key={`L-${i}`} position={[0, 0.5, line.position[2]]}>
            <cylinderGeometry args={[0.1, 0.2, 1]} />
            <meshBasicMaterial color="#33E0C7" />
          </mesh>
        ))}
      </group>
      <group position={[3, 0, 0]}>
        {lines.map((line, i) => (
          <mesh key={`R-${i}`} position={[0, 0.5, line.position[2]]}>
            <cylinderGeometry args={[0.1, 0.2, 1]} />
            <meshBasicMaterial color="#33E0C7" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
