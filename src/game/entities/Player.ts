import Phaser from "phaser";
import { DEPTH, PLAYER_SPEED } from "@@/constants";

type Dir = "down" | "left" | "right" | "up";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private dir: Dir = "down";
  private shadow: Phaser.GameObjects.Ellipse;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player", "down-0");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5, 1);
    // Small feet hitbox so the player can walk "behind" tall things.
    this.body!.setSize(10, 8);
    this.body!.setOffset(3, 16);
    this.setCollideWorldBounds(true);
    this.setDepth(DEPTH.world);

    this.shadow = scene.add
      .ellipse(x, y - 1, 12, 5, 0x1a2a1a, 0.28)
      .setDepth(DEPTH.shadow);

    // Player.ensureAnimations(scene);
  }

  // private static ensureAnimations(scene: Phaser.Scene) {
  //   const dirs: Dir[] = ["down", "left", "right", "up"];
  //   for (const d of dirs) {
  //     if (scene.anims.exists(`walk-${d}`)) continue;
  //     scene.anims.create({
  //       key: `walk-${d}`,
  //       frames: [
  //         { key: "player", frame: `${d}-1` },
  //         { key: "player", frame: `${d}-0` },
  //         { key: "player", frame: `${d}-2` },
  //         { key: "player", frame: `${d}-0` },
  //       ],
  //       frameRate: 8,
  //       repeat: -1,
  //     });
  //   }
  // }

  /** Apply a normalized movement vector; zero vector = idle. */
  move(vx: number, vy: number) {
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (vx === 0 && vy === 0) {
      body.setVelocity(0, 0);
      this.anims.stop();
      //   this.setFrame(`${this.dir}-0`);
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
      //   this.anims.play(`walk-${this.dir}`, true);
    }
    this.shadow.setPosition(this.x, this.y - 1);
    this.setDepth(DEPTH.world + this.y / 1000);
  }
}
