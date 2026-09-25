import Phaser from "phaser";
import { MainScene } from "@@/scenes/MainScene";
import { BootScene } from "@@/scenes/BootScene";
import { Test } from "./scenes/Test";

/** Creates the Phaser game inside `parent`. Call only in the browser (after hydration). */
export function createGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: "#5f9443",
    pixelArt: true,
    roundPixels: true,
    antialias: false,
    scale: {
      mode: Phaser.Scale.RESIZE,
      width: "100%",
      height: "100%",
    },
    physics: { default: "arcade", arcade: { debug: true } },
    input: { keyboard: true, touch: true },
    scene: [BootScene, MainScene],
    // scene: [Test],
  });
}
