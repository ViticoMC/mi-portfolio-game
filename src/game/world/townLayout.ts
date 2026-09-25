import type { ModalId } from "@/data/profile";
import { TILE } from "../constants";

export type BuildingStyle = "house" | "tech" | "workshop" | "library" | "port";

export interface BuildingDef {
  id: ModalId;
  label: string;
  style: BuildingStyle;
  /** Tile coordinates of the top-left corner and size in tiles. */
  tx: number;
  ty: number;
  tw: number;
  th: number;
  wall: string;
  roof: string;
  trim: string;
}

export interface RectDef {
  tx: number;
  ty: number;
  tw: number;
  th: number;
}

export const buildings: BuildingDef[] = [
  {
    id: "about",
    label: "Casa",
    style: "house",
    tx: 8,
    ty: 6,
    tw: 6,
    th: 5,
    wall: "#f1dcb8",
    roof: "#c95d3c",
    trim: "#7a3b23",
  },
  {
    id: "experience",
    label: "Centro Tecnológico",
    style: "tech",
    tx: 18,
    ty: 6,
    tw: 9,
    th: 6,
    wall: "#d9e2ea",
    roof: "#4f6d8f",
    trim: "#2e4460",
  },
  {
    id: "skills",
    label: "Taller del Programador",
    style: "workshop",
    tx: 47,
    ty: 8,
    tw: 7,
    th: 5,
    wall: "#b98a5a",
    roof: "#6d4a2c",
    trim: "#3f2a18",
  },
  {
    id: "education",
    label: "Biblioteca",
    style: "library",
    tx: 7,
    ty: 26,
    tw: 8,
    th: 6,
    wall: "#efe6d2",
    roof: "#6f9c6d",
    trim: "#3d5e3b",
  },
  {
    id: "projects",
    label: "Puerto de Proyectos",
    style: "port",
    tx: 41,
    ty: 30,
    tw: 7,
    th: 4,
    wall: "#a86b4b",
    roof: "#34506b",
    trim: "#1f3246",
  },
];

/** Plaza (paved square) — hosts the fountain, which is the contact interactable. */
export const plaza: RectDef = { tx: 24, ty: 18, tw: 16, th: 10 };
export const fountain = { tx: 30, ty: 21, label: "Plaza Central" };

/** Lake in the bottom-right corner, with a wooden dock from the port. */
export const lake: RectDef = { tx: 46, ty: 36, tw: 18, th: 12 };
export const dock: RectDef = { tx: 44, ty: 38, tw: 8, th: 2 };

/** Stone paths connecting buildings to the plaza. */
export const paths: RectDef[] = [
  { tx: 10, ty: 11, tw: 2, th: 4 }, // house -> down
  { tx: 10, ty: 15, tw: 13, th: 2 }, // -> plaza left
  { tx: 20, ty: 15, tw: 2, th: 4 }, // tech -> plaza top
  { tx: 50, ty: 13, tw: 2, th: 8 }, // workshop -> down
  { tx: 40, ty: 20, tw: 12, th: 2 }, // -> plaza right
  { tx: 10, ty: 32, tw: 2, th: 6 }, // library -> down
  { tx: 10, ty: 36, tw: 2, th: 2 },
  { tx: 10, ty: 27, tw: 14, th: 0 },
  { tx: 15, ty: 28, tw: 10, th: 2 }, // library -> plaza bottom-left
  { tx: 31, ty: 28, tw: 2, th: 6 }, // plaza -> south
  { tx: 31, ty: 32, tw: 11, th: 2 }, // -> port
  { tx: 43, ty: 34, tw: 2, th: 4 }, // port -> dock
];

/** Player spawns just below the house door. */
export const spawn = { x: 22 * TILE, y: 22 * TILE };

/** Lamp posts around the plaza. */
export const lamps: Array<{ tx: number; ty: number }> = [
  { tx: 25, ty: 19 },
  { tx: 38, ty: 19 },
  { tx: 25, ty: 26 },
  { tx: 38, ty: 26 },
];

/** Deterministic pseudo-random for stable decoration placement. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function rectToPx(r: RectDef) {
  return { x: r.tx * TILE, y: r.ty * TILE, w: r.tw * TILE, h: r.th * TILE };
}
