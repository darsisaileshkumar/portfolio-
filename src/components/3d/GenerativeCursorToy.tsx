"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Trail() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const count = 100;
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const currentRef = useRef(0);

  useFrame(({ pointer, viewport }) => {
    if (!meshRef.current) return;
    
    // Map pointer to 3D space
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    
    const idx = currentRef.current;
    positions[idx * 3] = x;
    positions[idx * 3 + 1] = y;
    positions[idx * 3 + 2] = 0;
    
    currentRef.current = (idx + 1) % count;

    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      
      // Calculate age/scale
      let dist = currentRef.current - i;
      if (dist < 0) dist += count;
      const scale = Math.max(0, 1 - dist / count);
      
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.2, 16]} />
      <meshBasicMaterial color="#33E0C7" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export function GenerativeCursorToy() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Trail />
      </Canvas>
    </div>
  );
}
