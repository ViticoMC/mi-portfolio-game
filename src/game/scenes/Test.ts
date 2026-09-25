import Phaser from "phaser";

export class Test extends Phaser.Scene {
  constructor() {
    super("Test");
  }

  preload() {
    this.load.tilemapTiledJSON("world", "/mapa.tmj");
    this.load.image("ground", "/tiled_map_portfolio.webp");
    this.load.spritesheet("structures", "/tiled_portfolio_opt.webp", {
      frameWidth: 256,
      frameHeight: 256,
    });
  }

  create() {
    const map = this.make.tilemap({
      key: "world",
    });

    const groundTileset = map.addTilesetImage("ground", "ground");

    const structuresTileset = map.addTilesetImage("structures", "structures");

    if (!groundTileset || !structuresTileset) {
      console.error("Tilesets no encontrados");
      return;
    }

    const layerground = map.createLayer("ground", groundTileset);
    if (!layerground) {
      console.error("No existe la capa ground");
      return;
    }

    const objectLayer = map.getObjectLayer("structures_object");

    if (!objectLayer) {
      console.error("No existe la capa structures");
      return;
    }

    const firstGid = structuresTileset.firstgid;

    objectLayer.objects.forEach((obj) => {
      if (!obj.gid) return;

      const frame = obj.gid - firstGid;

      const sprite = this.add.sprite(
        obj.x ?? 0,
        obj.y ?? 0,
        "structures",
        frame,
      );

      sprite.setOrigin(0, 1);

      sprite.setDepth(sprite.y);

      this.physics.add.existing(sprite, true);

      const body = sprite.body as Phaser.Physics.Arcade.StaticBody;

      const collisionHeight = 64;

      body.setSize(sprite.width, collisionHeight);

      body.setOffset(0, sprite.height - collisionHeight);
    });
  }
}
