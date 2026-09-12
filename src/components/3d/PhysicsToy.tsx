"use client";

import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, InstancedRigidBodies } from "@react-three/rapier";
import * as THREE from "three";

const COUNT = 30;

function Shapes() {
  const [positions] = useState(() =>
    Array.from({ length: COUNT }, () => [
      (Math.random() - 0.5) * 4,
      Math.random() * 5 + 2,
      (Math.random() - 0.5) * 4,
    ])
  );
  
  const [rotations] = useState(() =>
    Array.from({ length: COUNT }, () => [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ])
  );

  const colors = ["#6E5BFF", "#33E0C7", "#0F1116"];
  const api = useRef<any>(null);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    if (api.current) {
      const idx = e.instanceId;
      if (idx !== undefined) {
        api.current.at(idx).applyImpulse({ x: (Math.random() - 0.5) * 5, y: 10, z: (Math.random() - 0.5) * 5 }, true);
        api.current.at(idx).applyTorqueImpulse({ x: Math.random(), y: Math.random(), z: Math.random() }, true);
      }
    }
  };

  return (
    <InstancedRigidBodies
      ref={api}
      positions={positions as any}
      rotations={rotations as any}
      colliders="cuboid"
    >
      <instancedMesh args={[undefined, undefined, COUNT]} onPointerDown={handlePointerDown}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={colors[0]} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}

export function PhysicsToy() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-10, 5, -10]} intensity={0.5} color="#33E0C7" />
        
        <Physics>
          <Shapes />
          
          {/* Floor */}
          <RigidBody type="fixed" position={[0, -0.5, 0]}>
            <CuboidCollider args={[10, 0.5, 10]} />
            <mesh>
              <boxGeometry args={[20, 1, 20]} />
              <meshStandardMaterial color="#07080B" />
            </mesh>
          </RigidBody>
          
          {/* Invisible Walls to keep them in view */}
          <RigidBody type="fixed" position={[0, 5, -10]}>
            <CuboidCollider args={[10, 10, 0.5]} />
          </RigidBody>
          <RigidBody type="fixed" position={[0, 5, 10]}>
            <CuboidCollider args={[10, 10, 0.5]} />
          </RigidBody>
          <RigidBody type="fixed" position={[-10, 5, 0]}>
            <CuboidCollider args={[0.5, 10, 10]} />
          </RigidBody>
          <RigidBody type="fixed" position={[10, 5, 0]}>
            <CuboidCollider args={[0.5, 10, 10]} />
          </RigidBody>
        </Physics>
      </Canvas>
    </div>
  );
}
