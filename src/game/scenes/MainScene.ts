import Phaser from "phaser";
import { WORLD } from "../constants";
import { Player } from "../entities/Player";
import { CameraSystem } from "../systems/CameraSystem";
import { InputSystem } from "../systems/InputSystem";
import { InteractionSystem } from "../systems/InteractionSystem";
// import { gameStore } from "@/store/gameStore";

import { spawn } from "../world/townLayout";
import { ChargueWorld } from "../world/chargueWorldTextures";
import { ChangueZome } from "../util/changueZoom";
import { ChargueTexturesPlayer } from "../textures/chargueTexturesPlayer";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private input$!: InputSystem;
  private interactions!: InteractionSystem;
  private solids!: Phaser.Physics.Arcade.StaticGroup;
  // private waterSprite!: Phaser.GameObjects.TileSprite;
  // private waterFrame = 0;

  /** Areas where decorations must not spawn. */
  // private reserved: Phaser.Geom.Rectangle[] = [];

  constructor() {
    super("Town");
  }

  preload() {
    ChargueWorld.preload(this);
    ChargueTexturesPlayer.preload(this);
  }

  create() {
    // const store = gameStore.getState();
    // store.closeModal();
    // store.setNearby(null);
    // store.setJoystick(0, 0);

    this.physics.world.setBounds(0, 0, WORLD.w, WORLD.h);
    this.solids = this.physics.add.staticGroup();
    this.interactions = new InteractionSystem(this);

    this.player = new Player(this, spawn.x, spawn.y);
    this.physics.add.collider(this.player, this.solids);
    this.player.setScale(2).setDepth(1000);

    this.input$ = new InputSystem(this);
    new CameraSystem(this, this.player);

    ChargueWorld.create(this, this.player, this.interactions);
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
    this.interactions.update(this.time.now, this.input$.consumeInteract());
    ChangueZome(this, this.input$);
  }
}
