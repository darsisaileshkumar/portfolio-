"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const addHover = () => cursor.classList.add("hovered");
    const removeHover = () => cursor.classList.remove("hovered");

    document.addEventListener("mousemove", moveCursor);

    const interactables = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, .project-card, .filter-tab"
    );

    interactables.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return <div id="custom-cursor" ref={cursorRef} />;
}
