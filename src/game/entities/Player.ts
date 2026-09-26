import Phaser from "phaser";
import { DEPTH, PLAYER_SPEED } from "@@/constants";

type Dir = "down" | "left" | "right" | "up";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private dir: Dir = "down";

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player_idle", 0);
    scene.add.existing(this);

    scene.physics.add.existing(this);

    this.setOrigin(1, 1);
    // Small feet hitbox so the player can walk "behind" tall things.
    this.body!.setSize(10, 8);
    // this.body!.setOffset(3, 16);
    this.setCollideWorldBounds(true);
    this.setDepth(DEPTH.world);

    Player.ensureAnimations(scene);
  }

  /** Ensure that the necessary animations are available in the scene. */
  private static ensureAnimations(scene: Phaser.Scene) {
    const dirs_walk = {
      down: [0, 5],
      left: [6, 11],
      right: [12, 17],
      up: [18, 23],
    };

    for (const [dir, [start, end]] of Object.entries(dirs_walk)) {
      scene.anims.create({
        key: `walk_${dir}`,
        frames: scene.anims.generateFrameNumbers("player_walk", {
          start,
          end,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
    const dirs_idle = {
      down: [0, 11],
      left: [12, 23],
      right: [24, 35],
      up: [36, 39],
    };

    for (const [dir, [start, end]] of Object.entries(dirs_idle)) {
      scene.anims.create({
        key: `idle_${dir}`,
        frames: scene.anims.generateFrameNumbers("player_idle", {
          start,
          end,
        }),
        frameRate: dir === "up" ? 3 : 8,
        repeat: -1,
      });
    }

    const dirs_run = {
      down: [0, 7],
      left: [8, 15],
      right: [16, 23],
      up: [24, 31],
    };

    for (const [dir, [start, end]] of Object.entries(dirs_run)) {
      scene.anims.create({
        key: `run_${dir}`,
        frames: scene.anims.generateFrameNumbers("player_run", {
          start,
          end,
        }),
        frameRate: 14,
        repeat: -1,
      });
    }
  }

  /** Apply a normalized movement vector; zero vector = idle. */
  move(vx: number, vy: number) {
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (vx === 0 && vy === 0) {
      body.setVelocity(0, 0);
      this.anims.play(`idle_${this.dir}`, true);
    } else {
      // Preserve analog input magnitude (e.g. virtual joystick). Only
      // normalize when the vector length exceeds 1 (safety clamp).
      const len = Math.hypot(vx, vy);
      let nx = vx;
      let ny = vy;
      if (len > 1) {
        nx = vx / len;
        ny = vy / len;
      }
      body.setVelocity(nx * PLAYER_SPEED, ny * PLAYER_SPEED);
      if (Math.abs(vx) > Math.abs(vy)) this.dir = vx > 0 ? "right" : "left";
      else this.dir = vy > 0 ? "down" : "up";
      this.anims.play(`run_${this.dir}`, true);
    }
    this.setDepth(this.y + 100);
  }
}
