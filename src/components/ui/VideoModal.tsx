"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
}

export function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (videoUrl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [videoUrl]);

  if (!videoUrl) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Blurred backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          cursor: "pointer",
        }}
      />

      {/* Video Container */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "90%",
          maxWidth: "1000px",
          height: "85vh",
          background: "#000",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
        >
          <X size={20} />
        </button>

        <iframe
          src={videoUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
