"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 3000;

function buildParticleGeometry() {
  const basePositions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  const layers = new Float32Array(COUNT);

  const muted = new THREE.Color("#565C68");
  const accent = new THREE.Color("#6E5BFF");

  for (let i = 0; i < COUNT; i++) {
    basePositions[i * 3 + 0] = (Math.random() - 0.5) * 30;
    basePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    basePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    // 5% accent, rest muted
    const isAccent = Math.random() < 0.05;
    const c = isAccent ? accent : muted;
    colors[i * 3 + 0] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    speeds[i] = 0.002 + Math.random() * 0.004;
    layers[i] = Math.floor(Math.random() * 3); // 0, 1, 2 for 3 parallax layers
  }

  // We need to store current positions separately so we can apply forces
  const positions = new Float32Array(basePositions);
  const velocities = new Float32Array(COUNT * 3);

  return { basePositions, positions, colors, speeds, layers, velocities };
}

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, basePositions, colors, speeds, layers, velocities } = useMemo(buildParticleGeometry, []);
  const [repelPoint, setRepelPoint] = useState<THREE.Vector3 | null>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame(({ mouse }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      
      // Upward drift applied to base
      basePositions[i3 + 1] += speeds[i];
      if (basePositions[i3 + 1] > 10) basePositions[i3 + 1] = -10;

      // Repulsion force
      if (repelPoint) {
        const dx = pos[i3] - repelPoint.x;
        const dy = pos[i3 + 1] - repelPoint.y;
        const dz = pos[i3 + 2] - repelPoint.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 16) { // Area of effect
          const force = 0.2 / (distSq + 0.1);
          velocities[i3] += dx * force;
          velocities[i3 + 1] += dy * force;
          velocities[i3 + 2] += dz * force;
        }
      }

      // Parallax
      const layerFactor = (layers[i] + 1) * 0.002;
      const targetX = basePositions[i3] + mouse.x * layerFactor;
      const targetY = basePositions[i3 + 1] + mouse.y * layerFactor;
      const targetZ = basePositions[i3 + 2];

      // Apply velocities and damping
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];

      velocities[i3] *= 0.9;
      velocities[i3 + 1] *= 0.9;
      velocities[i3 + 2] *= 0.9;

      // Spring back to target
      pos[i3] += (targetX - pos[i3]) * 0.05;
      pos[i3 + 1] += (targetY - pos[i3 + 1]) * 0.05;
      pos[i3 + 2] += (targetZ - pos[i3 + 2]) * 0.05;
    }
    
    if (repelPoint) {
      setRepelPoint(null); // Clear repulsion after one frame
    }
    
    posAttr.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.04}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </points>
      {/* Invisible interaction plane */}
      <mesh visible={false} position={[0, 0, 0]} onClick={(e) => setRepelPoint(e.point)}>
        <planeGeometry args={[100, 100]} />
      </mesh>
    </group>
  );
}
