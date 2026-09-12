"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

export function HeroCanvasClient(props: { showParticles?: boolean }) {
  return <HeroCanvas {...props} />;
}
