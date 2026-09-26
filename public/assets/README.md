# Assets del juego

El MVP **no necesita archivos externos**: todas las texturas se generan proceduralmente en
`src/game/textures/pixelTextures.ts` (césped, caminos, agua animada, árboles, edificios, jugador…).

Cuando quieras sustituirlas por arte real, coloca aquí los archivos y cárgalos en `BootScene.preload()`
con `this.load.image(...)` / `this.load.spritesheet(...)`, manteniendo las mismas claves de textura:

| Clave            | Archivo sugerido            | Tamaño            | Notas                                   |
| ---------------- | --------------------------- | ----------------- | --------------------------------------- |
| `grass`          | `tiles/grass.png`           | 64×64 (tileable)  | Tile base del suelo                     |
| `path`           | `tiles/path.png`            | 32×32 (tileable)  | Camino de piedra                        |
| `plaza`          | `tiles/plaza.png`           | 16×16             | Pavimento de la plaza                   |
| `water0..2`      | `tiles/water_{0,1,2}.png`   | 32×32 (tileable)  | 3 frames de agua animada                |
| `dock`           | `tiles/dock.png`            | 16×16             | Tablones del muelle                     |
| `tree`           | `decor/tree.png`            | 32×40             | Origen abajo-centro                     |
| `bush`           | `decor/bush.png`            | 16×12             |                                         |
| `flower0..3`     | `decor/flower_{0..3}.png`   | 8×8               |                                         |
| `fountain`       | `decor/fountain.png`        | 64×64             | Interactuable de contacto               |
| `lamp` / `glow`  | `decor/lamp.png`, `glow.png`| 12×32 / 96×96     | Glow con blend ADD                      |
| `boat`           | `decor/boat.png`            | 28×20             |                                         |
| `bld-<modalId>`  | `buildings/<modalId>.png`   | (tw×16)×(th×16+12)| `about`, `experience`, `skills`, `education`, `projects` |
| `player`         | `characters/player.png`     | 48×96 spritesheet | Frames 16×24; filas: abajo, izq, der, arriba; cols: idle, paso1, paso2 |

Fuentes recomendadas de arte libre: Kenney (CC0), itch.io "Sprout Lands", OpenGameArt (LPC).
