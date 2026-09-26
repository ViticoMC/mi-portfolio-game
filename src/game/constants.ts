export const TILES_SIZE = 32;
export const WORLD_TILES = { w: 40, h: 40 } as const;
export const WORLD = {
  w: WORLD_TILES.w * TILES_SIZE,
  h: WORLD_TILES.h * TILES_SIZE,
} as const;

export const PLAYER_SPEED = 95;
export const ITERACTION_ZONE_SIZE = {
  x: 6,
  y: 6,
  width: 12,
  height: 12,
};

/** Camera zoom by viewport width (desktop shows most of the town, mobile is close). */
export function zoomForWidth(width: number): number {
  if (width < 640) return 3.0;
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
