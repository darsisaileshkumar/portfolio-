"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { VideoModal } from "./VideoModal";

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  tools: string[];
  aspectRatio?: "video" | "square";
  videoUrl?: string;
}

interface ProjectCardProps {
  project: ProjectMeta;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article className="project-card group" style={{ width: "100%" }}>
        {/* 9:16 Video Container */}
        <div
          style={{
            aspectRatio: "9/16",
            width: "100%",
            background: "#000",
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          {project.videoUrl ? (
            <iframe
              src={project.videoUrl}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "auto",
              }}
              allow="autoplay; fullscreen"
              allowFullScreen
              title={project.title}
            />
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid var(--color-divider)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Play
                  size={20}
                  style={{ color: "var(--color-text-muted)", marginLeft: "4px" }}
                />
              </div>
            </div>
          )}

          {/* Fullscreen Expand Button Overlay */}
          <button
            onClick={() => setIsModalOpen(true)}
            title="Expand Video"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              zIndex: 10,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent-primary)";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.6)";
              e.currentTarget.style.color = "#fff";
            }}
          >
            <ExternalLink size={12} />
            <span>Pop Out</span>
          </button>
        </div>
      </article>

      {isModalOpen && (
        <VideoModal
          videoUrl={project.videoUrl || null}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
