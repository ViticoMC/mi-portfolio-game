import Phaser from "phaser";
import { TILE } from "../constants";
import type { BuildingDef } from "../world/townLayout";
import { seeded } from "../world/townLayout";

type Ctx = CanvasRenderingContext2D;

function canvas(scene: Phaser.Scene, key: string, w: number, h: number) {
  const tex = scene.textures.createCanvas(key, w, h);
  if (!tex) throw new Error(`Could not create canvas texture ${key}`);
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;
  return { tex, ctx };
}

function rect(ctx: Ctx, x: number, y: number, w: number, h: number, c: string) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

function px(ctx: Ctx, x: number, y: number, c: string, w = 1, h = 1) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

/* ---------- Ground tiles ---------- */

function grassTile(scene: Phaser.Scene) {
  const { tex, ctx } = canvas(scene, "grass", TILE * 4, TILE * 4);
  const rnd = seeded(7);
  px(ctx, 0, 0, "#7bb458", TILE * 4, TILE * 4);
  for (let i = 0; i < 140; i++) {
    const x = Math.floor(rnd() * 64);
    const y = Math.floor(rnd() * 64);
    px(ctx, x, y, rnd() > 0.5 ? "#6fa64f" : "#8bc264");
  }
  for (let i = 0; i < 18; i++) {
    const x = Math.floor(rnd() * 62);
    const y = Math.floor(rnd() * 62);
    px(ctx, x, y, "#5f9443", 1, 2);
    px(ctx, x + 1, y - 1, "#5f9443", 1, 2);
  }
  tex.refresh();
}

function pathTile(scene: Phaser.Scene) {
  const { tex, ctx } = canvas(scene, "path", TILE * 2, TILE * 2);
  const rnd = seeded(11);
  px(ctx, 0, 0, "#c9b28b", 32, 32);
  for (let y = 0; y < 32; y += 8) {
    for (let x = (y / 8) % 2 === 0 ? 0 : 5; x < 32; x += 10) {
      px(ctx, x, y + 1, "#b89d76", 7, 5);
      px(ctx, x + 1, y + 1, "#d5c09c", 5, 1);
    }
  }
  for (let i = 0; i < 20; i++)
    px(ctx, Math.floor(rnd() * 32), Math.floor(rnd() * 32), "#a88c66");
  tex.refresh();
}

function plazaTile(scene: Phaser.Scene) {
  const { tex, ctx } = canvas(scene, "plaza", TILE, TILE);
  px(ctx, 0, 0, "#d8c6a5", 16, 16);
  px(ctx, 0, 0, "#c7b18d", 16, 1);
  px(ctx, 0, 0, "#c7b18d", 1, 16);
  px(ctx, 8, 8, "#c7b18d", 8, 1);
  px(ctx, 8, 8, "#c7b18d", 1, 8);
  px(ctx, 2, 2, "#e4d4b5", 4, 1);
  tex.refresh();
}

function waterTiles(scene: Phaser.Scene) {
  for (let f = 0; f < 3; f++) {
    const { tex, ctx } = canvas(scene, `water${f}`, TILE * 2, TILE * 2);
    px(ctx, 0, 0, "#4f9ac9", 32, 32);
    for (let y = 0; y < 32; y += 8) {
      const off = ((y / 8 + f) % 3) * 4;
      px(ctx, (off + 2) % 32, y + 2, "#7dc0e6", 6, 1);
      px(ctx, (off + 16) % 32, y + 5, "#3f86b5", 5, 1);
      px(ctx, (off + 24) % 32, y + 3, "#a9dcf3", 2, 1);
    }
    tex.refresh();
  }
}

function dockTile(scene: Phaser.Scene) {
  const { tex, ctx } = canvas(scene, "dock", TILE, TILE);
  px(ctx, 0, 0, "#8a5a36", 16, 16);
  for (let y = 0; y < 16; y += 4) {
    px(ctx, 0, y, "#6c4327", 16, 1);
    px(ctx, 3, y + 2, "#a06d44", 6, 1);
  }
  tex.refresh();
}

/* ---------- Decorations ---------- */

function tree(scene: Phaser.Scene) {
  const { tex, ctx } = canvas(scene, "tree", 32, 40);
  ctx.fillStyle = "rgba(20,40,20,0.28)";
  ctx.beginPath();
  ctx.ellipse(16, 37, 12, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  px(ctx, 13, 26, "#6b4426", 6, 11);
  px(ctx, 13, 26, "#4d2f18", 1, 11);
  px(ctx, 16, 28, "#8a5a36", 1, 6);
  const layers: Array<[number, number, number, number, string]> = [
    [4, 12, 24, 16, "#3f7a3a"],
    [6, 6, 20, 14, "#4d9046"],
    [9, 2, 14, 10, "#63a85a"],
    [11, 4, 6, 3, "#86c47a"],
    [6, 20, 20, 5, "#356a31"],
  ];
  for (const [x, y, w, h, c] of layers) rect(ctx, x, y, w, h, c);
  px(ctx, 2, 16, "#3f7a3a", 2, 8);
  px(ctx, 28, 16, "#3f7a3a", 2, 8);
  tex.refresh();
}

function bush(scene: Phaser.Scene) {
  const { tex, ctx } = canvas(scene, "bush", 16, 12);
  px(ctx, 2, 4, "#3f7a3a", 12, 8);
  px(ctx, 4, 1, "#4d9046", 8, 8);
  px(ctx, 6, 2, "#86c47a", 3, 2);
  px(ctx, 10, 6, "#e46f6f", 2, 2);
  px(ctx, 4, 7, "#e46f6f", 2, 2);
  tex.refresh();
}

function flowers(scene: Phaser.Scene) {
  const colors = ["#f2c14e", "#ef8fb0", "#f5f0ff", "#f28c5c"];
  colors.forEach((c, i) => {
    const { tex, ctx } = canvas(scene, `flower${i}`, 8, 8);
    px(ctx, 3, 4, "#4d9046", 1, 4);
    px(ctx, 2, 2, c, 3, 3);
    px(ctx, 3, 1, c, 1, 1);
    px(ctx, 3, 3, "#ffe9a8", 1, 1);
    tex.refresh();
  });
}

function fountain(scene: Phaser.Scene) {
  const { tex, ctx } = canvas(scene, "fountain", 64, 64);
  ctx.fillStyle = "rgba(20,30,40,0.25)";
  ctx.beginPath();
  ctx.ellipse(32, 58, 28, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#9aa3ad";
  ctx.beginPath();
  ctx.ellipse(32, 44, 30, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#c7ced6";
  ctx.beginPath();
  ctx.ellipse(32, 41, 30, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#4f9ac9";
  ctx.beginPath();
  ctx.ellipse(32, 42, 25, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  px(ctx, 14, 40, "#a9dcf3", 8, 1);
  px(ctx, 40, 44, "#a9dcf3", 6, 1);
  px(ctx, 28, 20, "#b3bcc5", 8, 22);
  px(ctx, 26, 18, "#d7dde3", 12, 4);
  px(ctx, 30, 6, "#7dc0e6", 4, 14);
  px(ctx, 28, 10, "#a9dcf3", 2, 4);
  px(ctx, 34, 12, "#a9dcf3", 2, 4);
  tex.refresh();
}

function lamp(scene: Phaser.Scene) {
  const { tex, ctx } = canvas(scene, "lamp", 12, 32);
  px(ctx, 4, 8, "#3a3f47", 4, 24);
  px(ctx, 2, 30, "#2b2f36", 8, 2);
  px(ctx, 2, 2, "#3a3f47", 8, 8);
  px(ctx, 3, 3, "#ffd27a", 6, 6);
  px(ctx, 5, 0, "#2b2f36", 2, 2);
  tex.refresh();
}

function glow(scene: Phaser.Scene) {
  const { tex, ctx } = canvas(scene, "glow", 96, 96);
  const g = ctx.createRadialGradient(48, 48, 4, 48, 48, 48);
  g.addColorStop(0, "rgba(255,200,120,0.55)");
  g.addColorStop(1, "rgba(255,200,120,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 96, 96);
  tex.refresh();
}

function boat(scene: Phaser.Scene) {
  const { tex, ctx } = canvas(scene, "boat", 28, 20);
  px(ctx, 2, 12, "#8a5a36", 24, 6);
  px(ctx, 0, 12, "#6c4327", 2, 4);
  px(ctx, 26, 12, "#6c4327", 2, 4);
  px(ctx, 4, 11, "#a06d44", 20, 1);
  px(ctx, 13, 0, "#4d2f18", 2, 12);
  px(ctx, 15, 1, "#f4ecd8", 9, 9);
  px(ctx, 15, 1, "#c95d3c", 9, 2);
  tex.refresh();
}

/* ---------- Buildings ---------- */

export function building(scene: Phaser.Scene, b: BuildingDef) {
  const w = b.tw * TILE;
  const h = b.th * TILE + 12; // extra room for roof peak
  const { tex, ctx } = canvas(scene, `bld-${b.id}`, w, h);
  const roofH = b.style === "tech" ? 10 : Math.floor(h * 0.42);
  const wallTop = roofH;
  const wallH = h - wallTop;
  const dark = shade(b.wall, -28);

  // wall
  rect(ctx, 2, wallTop, w - 4, wallH, b.wall);
  rect(ctx, 2, wallTop, 1, wallH, dark);
  rect(ctx, w - 3, wallTop, 1, wallH, dark);
  rect(ctx, 2, h - 1, w - 4, 1, dark);

  if (b.style === "workshop") {
    for (let y = wallTop + 4; y < h; y += 6)
      rect(ctx, 3, y, w - 6, 1, shade(b.wall, -16));
  }
  if (b.style === "library") {
    for (let x = 6; x < w - 8; x += 12) {
      rect(ctx, x, wallTop, 4, wallH, "#f7f1e2");
      rect(ctx, x, wallTop, 1, wallH, "#cbbf9f");
    }
  }
  if (b.style === "tech") {
    for (let y = wallTop + 4; y < h - 20; y += 10) {
      for (let x = 6; x < w - 8; x += 12) {
        rect(ctx, x, y, 8, 6, "#8fc3e8");
        rect(ctx, x, y, 8, 1, "#d8f0ff");
        rect(ctx, x + 4, y, 1, 6, "#5b90b5");
      }
    }
  }

  // roof
  if (b.style === "tech") {
    rect(ctx, 0, 0, w, roofH, b.roof);
    rect(ctx, 0, roofH - 2, w, 2, b.trim);
    rect(ctx, 4, 2, 6, 3, "#a9dcf3");
    rect(ctx, w - 12, 0, 3, 8, b.trim);
  } else {
    const peak = 8;
    for (let y = 0; y < roofH; y++) {
      const t = y < peak ? y / peak : 1;
      const inset = Math.round((1 - t) * (w / 2 - 4));
      rect(
        ctx,
        inset,
        y,
        w - inset * 2,
        1,
        y % 4 === 3 ? shade(b.roof, -18) : b.roof,
      );
    }
    rect(ctx, 0, roofH - 2, w, 2, b.trim);
    rect(ctx, Math.round(w / 2) - 1, 0, 2, 2, b.trim);
    if (b.style === "house") {
      rect(ctx, w - 12, 3, 6, 10, "#8c5a44");
      rect(ctx, w - 13, 2, 8, 2, "#5e3a2b");
    }
  }

  // windows
  if (b.style !== "tech") {
    const wy = wallTop + 6;
    const winColor = "#ffe9a8";
    for (const wx of [6, w - 14]) {
      rect(ctx, wx, wy, 8, 8, winColor);
      rect(ctx, wx + 3, wy, 2, 8, b.trim);
      rect(ctx, wx, wy + 3, 8, 2, b.trim);
      rect(ctx, wx - 1, wy + 8, 10, 1, b.trim);
    }
  }

  // door
  const dw = b.style === "port" ? 16 : 10;
  const dh = b.style === "port" ? 16 : 14;
  const dx = Math.round(w / 2 - dw / 2);
  rect(ctx, dx - 1, h - dh - 1, dw + 2, dh + 1, b.trim);
  rect(ctx, dx, h - dh, dw, dh, b.style === "port" ? "#3b5468" : "#7a4a2b");
  rect(ctx, dx + 1, h - dh + 1, dw - 2, 2, "rgba(255,255,255,0.15)");
  rect(ctx, dx + dw - 3, h - dh / 2, 1, 1, "#ffd27a");

  // sign
  const sw = Math.min(w - 12, 22);
  const sx = Math.round(w / 2 - sw / 2);
  rect(ctx, sx, wallTop + 1, sw, 6, "#f4ecd8");
  rect(ctx, sx, wallTop + 1, sw, 1, b.trim);
  rect(ctx, sx, wallTop + 6, sw, 1, b.trim);
  rect(ctx, sx + 2, wallTop + 3, sw - 4, 2, b.trim);

  tex.refresh();
}

/* ---------- Player spritesheet ---------- */

/** 16x24 frames; rows: down, left, right, up; cols: idle, walk1, walk2. */
export function player(scene: Phaser.Scene) {
  const fw = 16;
  const fh = 24;
  const { tex, ctx } = canvas(scene, "player", fw * 3, fh * 4);
  const dirs = ["down", "left", "right", "up"] as const;

  dirs.forEach((dir, row) => {
    for (let col = 0; col < 3; col++) {
      const ox = col * fw;
      const oy = row * fh;
      const legOff = col === 0 ? 0 : col === 1 ? 1 : -1;
      // legs
      rect(
        ctx,
        ox + 5,
        oy + 18 + Math.max(0, legOff),
        3,
        5 - Math.max(0, legOff),
        "#3f4a6b",
      );
      rect(
        ctx,
        ox + 8,
        oy + 18 + Math.max(0, -legOff),
        3,
        5 - Math.max(0, -legOff),
        "#3f4a6b",
      );
      rect(ctx, ox + 5, oy + 22, 3, 2, "#4d2f18");
      rect(ctx, ox + 8, oy + 22, 3, 2, "#4d2f18");
      // body (teal hoodie)
      rect(ctx, ox + 4, oy + 11, 8, 8, "#1f8a8a");
      rect(ctx, ox + 3, oy + 12, 1, 5, "#1f8a8a");
      rect(ctx, ox + 12, oy + 12, 1, 5, "#1f8a8a");
      rect(ctx, ox + 4, oy + 11, 8, 1, "#2aa6a6");
      if (dir !== "up") rect(ctx, ox + 7, oy + 12, 2, 4, "#e9e2d2");
      // head
      rect(ctx, ox + 4, oy + 3, 8, 8, "#f0c8a0");
      rect(ctx, ox + 3, oy + 1, 10, 4, "#4a3222");
      rect(ctx, ox + 4, oy + 0, 8, 2, "#4a3222");
      if (dir === "down") {
        rect(ctx, ox + 5, oy + 6, 1, 2, "#2b1d14");
        rect(ctx, ox + 10, oy + 6, 1, 2, "#2b1d14");
        rect(ctx, ox + 5, oy + 9, 6, 1, "#8a6a4a");
      } else if (dir === "left") {
        rect(ctx, ox + 4, oy + 6, 1, 2, "#2b1d14");
        rect(ctx, ox + 3, oy + 3, 2, 6, "#4a3222");
      } else if (dir === "right") {
        rect(ctx, ox + 11, oy + 6, 1, 2, "#2b1d14");
        rect(ctx, ox + 11, oy + 3, 2, 6, "#4a3222");
      } else {
        rect(ctx, ox + 4, oy + 3, 8, 6, "#4a3222");
      }
      tex.add(`${dir}-${col}`, 0, ox, oy, fw, fh);
    }
  });
  tex.refresh();
}

/* ---------- helpers ---------- */

function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + amount);
  const g = clamp(((n >> 8) & 0xff) + amount);
  const b = clamp((n & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/** Generates every procedural texture. Replace with real spritesheets in /src/game/assets when available. */
export function generateAllTextures(scene: Phaser.Scene, bldgs: BuildingDef[]) {
  grassTile(scene);
  pathTile(scene);
  plazaTile(scene);
  waterTiles(scene);
  dockTile(scene);
  tree(scene);
  bush(scene);
  flowers(scene);
  fountain(scene);
  lamp(scene);
  glow(scene);
  boat(scene);
  player(scene);
  bldgs.forEach((b) => building(scene, b));
}
