"use client";

import { useRef, useMemo } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, InstancedRigidBodies, RapierRigidBody, InstancedRigidBodyProps } from "@react-three/rapier";

const COUNT = 30;

function Shapes() {
  const instances = useMemo<InstancedRigidBodyProps[]>(() => {
    return Array.from({ length: COUNT }, (_, i) => ({
      key: i,
      position: [
        (Math.random() - 0.5) * 4,
        Math.random() * 5 + 2,
        (Math.random() - 0.5) * 4,
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
    }));
  }, []);

  const colors = ["#6E5BFF", "#33E0C7", "#0F1116"];
  const api = useRef<(RapierRigidBody | null)[]>(null);

  const handlePointerDown = (e: ThreeEvent<PointerEvent> & { instanceId?: number }) => {
    e.stopPropagation();
    if (api.current) {
      const idx = e.instanceId;
      if (idx !== undefined) {
        const body = api.current[idx];
        if (body) {
          body.applyImpulse({ x: (Math.random() - 0.5) * 5, y: 10, z: (Math.random() - 0.5) * 5 }, true);
          body.applyTorqueImpulse({ x: Math.random(), y: Math.random(), z: Math.random() }, true);
        }
      }
    }
  };

  return (
    <InstancedRigidBodies
      ref={api}
      instances={instances}
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
