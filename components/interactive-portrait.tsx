"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";

type Locale = "en" | "fa";

type InteractivePortraitProps = {
  locale?: Locale;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export function InteractivePortrait({ locale = "en" }: InteractivePortraitProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const lastPointer = useRef({ x: 0, y: 0 });

  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const applyTilt = (rotateX: number, rotateY: number, lift = 0) => {
    if (!worldRef.current || reducedMotion()) return;
    worldRef.current.style.transform = `translate3d(0, ${lift}px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  };

  const reset = () => {
    if (!worldRef.current) return;
    worldRef.current.style.transform = "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)";
    stageRef.current?.removeAttribute("data-dragging");
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || reducedMotion()) return;

    if (stage.dataset.dragging === "true") {
      const dx = event.clientX - lastPointer.current.x;
      const dy = event.clientY - lastPointer.current.y;
      const currentX = Number(stage.dataset.rotateX ?? 0);
      const currentY = Number(stage.dataset.rotateY ?? 0);
      const nextX = clamp(currentX - dy * 0.08, -5.5, 5.5);
      const nextY = clamp(currentY + dx * 0.11, -9, 9);
      stage.dataset.rotateX = String(nextX);
      stage.dataset.rotateY = String(nextY);
      lastPointer.current = { x: event.clientX, y: event.clientY };
      applyTilt(nextX, nextY, -2);
      return;
    }

    const rect = stage.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    const rotateX = clamp(-ny * 3.4, -4.5, 4.5);
    const rotateY = clamp(nx * 5.2, -7, 7);
    stage.dataset.rotateX = String(rotateX);
    stage.dataset.rotateY = String(rotateY);
    applyTilt(rotateX, rotateY, -1);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion()) return;
    const stage = stageRef.current;
    if (!stage) return;
    stage.dataset.dragging = "true";
    lastPointer.current = { x: event.clientX, y: event.clientY };
    stage.setPointerCapture?.(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    stageRef.current?.releasePointerCapture?.(event.pointerId);
    reset();
  };

  const name = locale === "fa" ? "امین اسدی وسطٰی" : "Amin Asadi Vosta";
  const location = locale === "fa" ? "تهران · همکاری ریموت" : "Tehran · Remote worldwide";
  const ariaLabel = locale === "fa"
    ? "پرتره تعاملی امین اسدی وسطٰی"
    : "Interactive portrait of Amin Asadi Vosta";

  return (
    <div className="interactive-portrait" dir={locale === "fa" ? "rtl" : "ltr"}>
      <div
        ref={stageRef}
        className="interactive-portrait-stage"
        aria-label={ariaLabel}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={reset}
        onPointerLeave={reset}
      >
        <div className="interactive-portrait-float">
          <div ref={worldRef} className="interactive-portrait-world">
            <div className="interactive-portrait-aura" aria-hidden="true" />
            <div className="interactive-portrait-orbit" aria-hidden="true" />
            <div className="interactive-portrait-floor" aria-hidden="true" />
            <img
              className="interactive-portrait-layer interactive-portrait-shadow"
              src="/images/amin-interactive-portrait.webp"
              width="360"
              height="450"
              alt=""
              draggable={false}
            />
            <img
              className="interactive-portrait-layer interactive-portrait-body"
              src="/images/amin-interactive-portrait.webp"
              width="360"
              height="450"
              alt={name}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <img
              className="interactive-portrait-layer interactive-portrait-head"
              src="/images/amin-interactive-portrait.webp"
              width="360"
              height="450"
              alt=""
              draggable={false}
            />
            <div className="interactive-portrait-shine" aria-hidden="true" />
          </div>
        </div>
        <div className="interactive-portrait-hint" aria-hidden="true">
          <span /> {locale === "fa" ? "حرکت بده" : "move / drag"}
        </div>
      </div>

      <div className="interactive-portrait-meta">
        <strong>{name}</strong>
        <span><i aria-hidden="true" />{location}</span>
      </div>
    </div>
  );
}
