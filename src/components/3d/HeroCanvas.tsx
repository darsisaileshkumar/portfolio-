"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { CoreHeroMesh } from "./CoreHeroMesh";
import { ParticleField } from "./ParticleField";
import { useReducedMotion } from "@/components/providers/ReducedMotionProvider";
import { IntroSequence } from "./IntroSequence";
import { useAppStore } from "@/lib/store";

function Lights() {
  return (
    <>
      {/* Key light: top-right, white */}
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFFFFF" />
      {/* Rim light: back-left, cyan-mint */}
      <directionalLight position={[-5, 2, -5]} intensity={0.6} color="#33E0C7" />
      {/* Ambient fill */}
      <ambientLight intensity={0.1} color="#6E5BFF" />
    </>
  );
}

interface HeroCanvasProps {
  showParticles?: boolean;
}

export function HeroCanvas({ showParticles = true }: HeroCanvasProps) {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  // Need to read from store, but guard against hydration mismatch since sessionStorage is client-only
  const [mounted, setMounted] = useState(false);
  const introFinished = useAppStore((state) => state.introFinished);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (reducedMotion) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(110,91,255,0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
    );
  }

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Lights />
      <Suspense fallback={null}>
        <CoreHeroMesh isMobile={isMobile} />
        {showParticles && <ParticleField />}
      </Suspense>
    </Canvas>
  );
}
