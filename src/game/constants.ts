export const TILE = 16;
export const WORLD_TILES = { w: 64, h: 48 } as const;
export const WORLD = {
  w: WORLD_TILES.w * TILE,
  h: WORLD_TILES.h * TILE,
} as const;

export const PLAYER_SPEED = 95;

/** Camera zoom by viewport width (desktop shows most of the town, mobile is close). */
export function zoomForWidth(width: number): number {
  if (width < 640) return 3.4;
  if (width < 1024) return 2.7;
  return 2.2;
}

export const DEPTH = {
  ground: 0,
  water: 1,
  decor: 2,
  shadow: 3,
  /** Sortable Y-depth layer for player, trees, buildings. */
  world: 10,
  light: 100,
  ui: 200,
} as const;
