import Phaser from "phaser";
import { generateAllTextures } from "@@/textures/pixelTextures";
import { buildings } from "@@/world/townLayout";

/** Generates all procedural pixel textures, then hands off to the town. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  create() {
    generateAllTextures(this, buildings);
    this.scene.start("Town");
  }
}
