import { ModalId } from "@/data/profile";
import Phaser from "phaser";
import { Player } from "../entities/Player";
import { InteractionSystem } from "../systems/InteractionSystem";
import { ITERACTION_ZONE_SIZE, TILES_SIZE } from "../constants";

export const ChargueWorld = {
  preload: (scene: Phaser.Scene) => {
    scene.load.tilemapTiledJSON("world", "/mapa.tmj");
    scene.load.image("ground", "/tiled_map_portfolio.webp");
    scene.load.spritesheet("structures", "/tiled_portfolio_opt.webp", {
      frameWidth: 256,
      frameHeight: 256,
    });
    scene.load.image("arboles", "/arboles.webp");
    scene.load.image("mediem_decorations", "/mediem_decorations.webp");
  },
  create: (
    scene: Phaser.Scene,
    player: Player,
    interactions: InteractionSystem,
  ) => {
    const map = scene.make.tilemap({
      key: "world",
    });

    const groundTileset = map.addTilesetImage("ground", "ground");

    if (!groundTileset) {
      console.error("Tilesets no encontrados");
      return;
    }

    const layerground = map.createLayer("ground", groundTileset);
    if (!layerground) {
      console.error("No existe la capa ground");
      return;
    }

    const decorationsTileset = map.addTilesetImage(
      "mediem_decorations",
      "mediem_decorations",
    );

    const treesTileset = map.addTilesetImage("arboles", "arboles");

    if (!decorationsTileset || !treesTileset) {
      console.error("Tilesets no encontrados");
      return;
    }

    map
      .createLayer("nature", [decorationsTileset, treesTileset], 0, 0)
      .setDepth(100000);

    // carga de objetos y estructuras
    const structuresTileset = map.addTilesetImage("structures", "structures");
    const objectLayer = map.getObjectLayer("structures_object");

    if (!objectLayer) {
      console.error("No existe la capa structures_object");
      return;
    }
    if (!structuresTileset) {
      console.error("Tilesets no encontrados");
      return;
    }

    const firstGid = structuresTileset.firstgid;

    objectLayer.objects.forEach((obj, ind) => {
      if (!obj.gid) {
        const modalId = obj.properties?.find(
          (property: { name: string; value: unknown }) =>
            property.name === "modal_id",
        )?.value as ModalId | undefined;

        if (!modalId) {
          return;
        }

        const x = obj.x || 0;
        const y = obj.y || 0;
        const width = obj.width || TILES_SIZE;
        const height = obj.height || TILES_SIZE;

        const zone = new Phaser.Geom.Rectangle(x, y, width, height);

        const colliderZone = scene.add.zone(x, y, width, height).setOrigin(0);
        scene.physics.add.existing(colliderZone, true);
        scene.physics.add.collider(player, colliderZone);

        const interactionZone = scene.add
          .zone(
            x - ITERACTION_ZONE_SIZE.x,
            y - ITERACTION_ZONE_SIZE.y,
            width + ITERACTION_ZONE_SIZE.width,
            height + ITERACTION_ZONE_SIZE.height,
          )
          .setOrigin(0);

        scene.physics.add.existing(interactionZone, true);
        scene.physics.add.overlap(player, interactionZone, () => {
          interactions.touch(modalId, obj.name);
        });

        interactions.add(modalId, obj.name, zone, x + width / 2, y - 4);

        return;
      }
      const frame = obj.gid - firstGid;

      const sprite = scene.add.sprite(
        obj.x ?? 0,
        obj.y ?? 0,
        "structures",
        frame,
      );

      sprite.setDepth(obj.y || ind);
      sprite.setOrigin(0, 1);

      scene.physics.add.existing(sprite, true);

      const body = sprite.body as Phaser.Physics.Arcade.StaticBody;

      const collisionHeight = 128;

      body.setSize(sprite.width, collisionHeight);

      body.setOffset(0, sprite.height - collisionHeight);
    });
  },
};
