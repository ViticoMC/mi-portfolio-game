import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/store/gameStore";

const RADIUS = 44;

/** Touch controls: analog stick (left) + action button (right). Rendered only on touch devices. */
export function VirtualJoystick() {
  const isTouch = useGameStore((s) => s.isTouch);
  const setIsTouch = useGameStore((s) => s.setIsTouch);
  const setJoystick = useGameStore((s) => s.setJoystick);
  const requestInteract = useGameStore((s) => s.requestInteract);
  const activeModal = useGameStore((s) => s.activeModal);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const origin = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, [setIsTouch]);

  if (!isTouch || activeModal) return null;

  const onMove = (e: React.PointerEvent) => {
    if (!origin.current) return;
    let dx = e.clientX - origin.current.x;
    let dy = e.clientY - origin.current.y;
    const len = Math.hypot(dx, dy);
    if (len > RADIUS) {
      dx = (dx / len) * RADIUS;
      dy = (dy / len) * RADIUS;
    }
    setKnob({ x: dx, y: dy });
    const dead = len < 8;
    setJoystick(dead ? 0 : dx / RADIUS, dead ? 0 : dy / RADIUS);
  };

  const onEnd = () => {
    origin.current = null;
    setKnob({ x: 0, y: 0 });
    setJoystick(0, 0);
  };

  return (
    <>
      <div
        className="glass-dark absolute bottom-24 left-5 z-20 flex h-32 w-32 touch-none items-center justify-center rounded-full"
        onPointerDown={(e) => {
          origin.current = { x: e.clientX, y: e.clientY };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={onMove}
        onPointerUp={onEnd}
        onPointerCancel={onEnd}
      >
        <div
          className="h-14 w-14 rounded-full bg-accent/90 shadow-pixel transition-transform duration-75"
          style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }}
        />
      </div>
      <button
        type="button"
        onPointerDown={requestInteract}
        className="glass font-display absolute right-6 bottom-28 z-20 flex h-20 w-20 touch-none items-center justify-center rounded-full text-2xl active:scale-95"
        aria-label="Interactuar"
      >
        E
      </button>
    </>
  );
}
