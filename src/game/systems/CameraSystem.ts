import Phaser from "phaser";
import { WORLD, zoomForWidth } from "@@/constants";

/** Follows the player and picks a zoom level that fits the current viewport. */
export class CameraSystem {
  private cam: Phaser.Cameras.Scene2D.Camera;

  constructor(scene: Phaser.Scene, target: Phaser.GameObjects.GameObject) {
    this.cam = scene.cameras.main;
    this.cam.setBounds(0, 0, WORLD.w, WORLD.h);
    this.cam.startFollow(target, true, 0.12, 0.12);
    this.cam.setRoundPixels(true);
    this.applyZoom(scene.scale.width);
    scene.scale.on(Phaser.Scale.Events.RESIZE, (size: Phaser.Structs.Size) =>
      this.applyZoom(size.width),
    );
  }

  private applyZoom(width: number) {
    this.cam.setZoom(zoomForWidth(width));
  }
}
