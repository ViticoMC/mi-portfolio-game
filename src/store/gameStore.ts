import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import type { ModalId } from "@/data/profile";

export interface NearbyTarget {
  id: ModalId;
  label: string;
}

interface GameState {
  /** Intro (house) has been dismissed and the player is free to explore. */
  hasStarted: boolean;
  activeModal: ModalId | null;
  selectedProjectId: string | null;
  /** Interactable the player is currently standing next to. */
  nearby: NearbyTarget | null;
  /** Virtual joystick vector in [-1, 1]. */
  joystick: { x: number; y: number };
  /** Monotonic counter — Phaser consumes changes as "interact pressed". */
  interactTick: number;
  isTouch: boolean;

  start: () => void;
  openModal: (id: ModalId) => void;
  closeModal: () => void;
  selectProject: (id: string | null) => void;
  setNearby: (target: NearbyTarget | null) => void;
  setJoystick: (x: number, y: number) => void;
  requestInteract: () => void;
  setIsTouch: (v: boolean) => void;
}

export const gameStore = createStore<GameState>()((set) => ({
  hasStarted: false,
  activeModal: null,
  selectedProjectId: null,
  nearby: null,
  joystick: { x: 0, y: 0 },
  interactTick: 0,
  isTouch: false,

  start: () => set({ hasStarted: true, activeModal: null }),
  openModal: (id) => set({ activeModal: id, selectedProjectId: null }),
  closeModal: () => set({ activeModal: null, selectedProjectId: null }),
  selectProject: (id) => set({ selectedProjectId: id }),
  setNearby: (target) =>
    set((s) => (s.nearby?.id === target?.id ? s : { nearby: target })),
  setJoystick: (x, y) => set({ joystick: { x, y } }),
  requestInteract: () => set((s) => ({ interactTick: s.interactTick + 1 })),
  setIsTouch: (v) => set({ isTouch: v }),
}));

export function useGameStore<T>(selector: (state: GameState) => T): T {
  return useStore(gameStore, selector);
}
