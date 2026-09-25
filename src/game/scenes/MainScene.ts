import Phaser from "phaser";
import { DEPTH, TILE, WORLD } from "../constants";
import { Player } from "../entities/Player";
import { CameraSystem } from "../systems/CameraSystem";
import { InputSystem } from "../systems/InputSystem";
import { InteractionSystem } from "../systems/InteractionSystem";
import {
  buildings,
  dock,
  fountain,
  lake,
  lamps,
  paths,
  plaza,
  rectToPx,
  seeded,
  spawn,
  type RectDef,
} from "../world/townLayout";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private input$!: InputSystem;
  private interactions!: InteractionSystem;
  private solids!: Phaser.Physics.Arcade.StaticGroup;
  private waterSprite!: Phaser.GameObjects.TileSprite;
  private waterFrame = 0;
  /** Areas where decorations must not spawn. */
  private reserved: Phaser.Geom.Rectangle[] = [];

  constructor() {
    super("Town");
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
    this.physics.world.setBounds(0, 0, WORLD.w, WORLD.h);
    this.solids = this.physics.add.staticGroup();
    this.interactions = new InteractionSystem(this);

    // this.buildsuelo();
    // this.buildWater();
    // this.buildPlaza();
    // this.buildBuildings();
    // this.buildLamps();
    // this.buildNature();

    this.player = new Player(this, spawn.x, spawn.y);
    this.physics.add.collider(this.player, this.solids);
    this.player.setScale(2);

    this.input$ = new InputSystem(this);
    new CameraSystem(this, this.player);

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

      const collisionHeight = 128;

      body.setSize(sprite.width, collisionHeight);

      body.setOffset(0, sprite.height - collisionHeight);
      this.physics.add.collider(this.player, sprite);
    });
  }

  // Warm ambient light overlay.
  // this.add
  //   .rectangle(0, 0, WORLD.w, WORLD.h, 0xffc98a, 0.08)
  //   .setOrigin(0)
  //   .setDepth(DEPTH.light)
  //   .setBlendMode(Phaser.BlendModes.MULTIPLY);

  // this.time.addEvent({
  //   delay: 420,
  //   loop: true,
  //   callback: () => this.animateWater(),
  // });

  override update() {
    const v = this.input$.vector;
    this.player.move(v.x, v.y);
    this.interactions.update(
      this.player.x,
      this.player.y,
      this.input$.consumeInteract(),
    );

    const zoom = this.input$.zoom;
    if (zoom) {
      const cam = this.cameras.main;
      console.log(cam.zoom);

      if (cam.zoom + zoom >= 1.3 && cam.zoom + zoom <= 5) {
        cam.setZoom(cam.zoom + zoom);
      }
    }
  }

  /* ---------- world construction ---------- */

  private buildGround() {
    this.add
      .tileSprite(0, 0, WORLD.w, WORLD.h, "grass")
      .setOrigin(0)
      .setDepth(DEPTH.ground);
    for (const p of paths) {
      if (p.tw === 0 || p.th === 0) continue;
      const r = rectToPx(p);
      this.add
        .tileSprite(r.x, r.y, r.w, r.h, "path")
        .setOrigin(0)
        .setDepth(DEPTH.ground + 0.1);
      this.reserve(p, 1);
    }
  }

  private buildWater() {
    const r = rectToPx(lake);
    this.waterSprite = this.add
      .tileSprite(r.x, r.y, r.w, r.h, "water0")
      .setOrigin(0)
      .setDepth(DEPTH.water);
    // Sandy shore.
    this.add
      .rectangle(r.x - 4, r.y - 4, r.w + 4, r.h + 4, 0xe6d3a3)
      .setOrigin(0)
      .setDepth(DEPTH.ground + 0.2);
    this.reserve(lake, 2);

    const d = rectToPx(dock);
    this.add
      .tileSprite(d.x, d.y, d.w, d.h, "dock")
      .setOrigin(0)
      .setDepth(DEPTH.water + 0.5);
    this.reserve(dock, 1);
    // Lake colliders, leaving the dock strip walkable.
    this.addSolid(r.x, r.y, r.w, d.y - r.y); // above dock
    this.addSolid(r.x, d.y + d.h, r.w, r.y + r.h - (d.y + d.h)); // below dock
    this.addSolid(d.x + d.w, d.y, r.x + r.w - (d.x + d.w), d.h); // right of dock

    const boat = this.add
      .image(d.x + d.w + 22, d.y + d.h + 14, "boat")
      .setDepth(DEPTH.water + 0.6);
    this.tweens.add({
      targets: boat,
      y: boat.y - 2,
      angle: 2,
      duration: 1600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });
  }

  private buildPlaza() {
    const r = rectToPx(plaza);
    this.add
      .tileSprite(r.x, r.y, r.w, r.h, "plaza")
      .setOrigin(0)
      .setDepth(DEPTH.ground + 0.15);
    this.reserve(plaza, 1);

    const fx = fountain.tx * TILE;
    const fy = fountain.ty * TILE;
    const img = this.add.image(fx + 32, fy + 64, "fountain").setOrigin(0.5, 1);
    img.setDepth(DEPTH.world + (fy + 52) / 1000);
    this.addSolid(fx + 4, fy + 30, 56, 26);
    this.interactions.add(
      "contact",
      fountain.label,
      new Phaser.Geom.Rectangle(fx - 14, fy + 10, 92, 70),
      fx + 32,
      fy + 4,
    );
    // Splash particles.
    this.add
      .particles(fx + 32, fy + 10, "flower2", {
        speedY: { min: 20, max: 45 },
        speedX: { min: -12, max: 12 },
        scale: { start: 0.35, end: 0.1 },
        alpha: { start: 0.9, end: 0 },
        lifespan: 700,
        frequency: 90,
        gravityY: 60,
      })
      .setDepth(DEPTH.world + (fy + 53) / 1000);
  }

  private buildBuildings() {
    for (const b of buildings) {
      const x = b.tx * TILE;
      const y = b.ty * TILE;
      const w = b.tw * TILE;
      const h = b.th * TILE;
      const img = this.add.image(x, y - 12, `bld-${b.id}`).setOrigin(0);
      img.setDepth(DEPTH.world + (y + h) / 1000);
      // Soft ground shadow.
      this.add
        .ellipse(x + w / 2, y + h, w + 8, 8, 0x1a2a1a, 0.22)
        .setDepth(DEPTH.shadow);
      this.addSolid(x + 2, y + 8, w - 4, h - 8);
      this.reserve({ tx: b.tx, ty: b.ty, tw: b.tw, th: b.th }, 1);

      const zone = new Phaser.Geom.Rectangle(x + w / 2 - 28, y + h - 8, 56, 48);
      this.interactions.add(b.id, b.label, zone, x + w / 2, y + h - 18);

      this.add
        .text(x + w / 2, y + h + 22, b.label, {
          fontFamily: "monospace",
          fontSize: "7px",
          color: "#fff6e3",
          stroke: "#3b2a1a",
          strokeThickness: 3,
        })
        .setOrigin(0.5)
        .setDepth(DEPTH.ui)
        .setResolution(4);
    }
  }

  private buildLamps() {
    for (const l of lamps) {
      const x = l.tx * TILE + 8;
      const y = l.ty * TILE + 16;
      this.add
        .image(x, y, "lamp")
        .setOrigin(0.5, 1)
        .setDepth(DEPTH.world + y / 1000);
      const g = this.add
        .image(x, y - 26, "glow")
        .setDepth(DEPTH.light)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setAlpha(0.7);
      this.tweens.add({
        targets: g,
        alpha: 0.45,
        scale: 0.92,
        duration: 1400 + Math.random() * 600,
        yoyo: true,
        repeat: -1,
      });
      this.addSolid(x - 3, y - 6, 6, 6);
    }
  }

  private buildNature() {
    const rnd = seeded(2024);
    const treeSpots: Array<[number, number]> = [];

    // Forest border.
    for (let tx = 0; tx < 64; tx += 2) {
      treeSpots.push([tx, 0], [tx, 46]);
      if (rnd() > 0.5) treeSpots.push([tx + 1, 1.5]);
    }
    for (let ty = 2; ty < 46; ty += 2) {
      treeSpots.push([0, ty], [62, ty]);
      if (rnd() > 0.5) treeSpots.push([1.5, ty + 1]);
    }
    // Scattered groves.
    for (let i = 0; i < 70; i++)
      treeSpots.push([2 + rnd() * 60, 2 + rnd() * 44]);

    for (const [tx, ty] of treeSpots) {
      const x = tx * TILE + 8;
      const y = ty * TILE + 16;
      if (this.isReserved(x, y, 22)) continue;
      this.add
        .image(x, y + 20, "tree")
        .setOrigin(0.5, 1)
        .setDepth(DEPTH.world + (y + 20) / 1000);
      this.addSolid(x - 6, y + 8, 12, 10);
    }

    for (let i = 0; i < 60; i++) {
      const x = rnd() * WORLD.w;
      const y = rnd() * WORLD.h;
      if (this.isReserved(x, y, 6)) continue;
      const key = rnd() > 0.7 ? "bush" : `flower${Math.floor(rnd() * 4)}`;
      this.add.image(x, y, key).setDepth(DEPTH.decor);
    }
  }

  /* ---------- helpers ---------- */

  private addSolid(x: number, y: number, w: number, h: number) {
    const z = this.add.zone(x, y, w, h).setOrigin(0);
    this.solids.add(z);
  }

  private reserve(r: RectDef, padTiles: number) {
    this.reserved.push(
      new Phaser.Geom.Rectangle(
        (r.tx - padTiles) * TILE,
        (r.ty - padTiles - 1) * TILE,
        (r.tw + padTiles * 2) * TILE,
        (r.th + padTiles * 2 + 1) * TILE,
      ),
    );
  }

  private isReserved(x: number, y: number, radius: number) {
    const probe = new Phaser.Geom.Rectangle(
      x - radius,
      y - radius,
      radius * 2,
      radius * 2,
    );
    return this.reserved.some((r) =>
      Phaser.Geom.Intersects.RectangleToRectangle(r, probe),
    );
  }

  private animateWater() {
    this.waterFrame = (this.waterFrame + 1) % 3;
    this.waterSprite.setTexture(`water${this.waterFrame}`);
  }
}
