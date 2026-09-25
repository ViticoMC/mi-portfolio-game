import Phaser from "phaser";
import { useGameStore } from "@/store/gameStore";

/** Unifies keyboard (WASD / arrows / E) and the React virtual joystick. */
export class InputSystem {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd: Record<"W" | "A" | "S" | "D", Phaser.Input.Keyboard.Key>;
  private cameraZoom: Record<"Z" | "X", Phaser.Input.Keyboard.Key>;
  private keyE: Phaser.Input.Keyboard.Key;
  private lastInteractTick: number;

  constructor(scene: Phaser.Scene) {
    const kb = scene.input.keyboard!;
    this.cursors = kb.createCursorKeys();
    this.wasd = kb.addKeys("W,A,S,D") as InputSystem["wasd"];
    this.keyE = kb.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.cameraZoom = kb.addKeys("Z,X") as InputSystem["cameraZoom"];
    this.lastInteractTick = useGameStore.getState().interactTick;
    // Don't steal keys (space, arrows) from the page while a modal is focused.
    kb.on("keydown", (e: KeyboardEvent) => {
      if (useGameStore.getState().activeModal) e.stopImmediatePropagation();
    });
  }

  /** Movement vector in [-1, 1] on both axes. Empty while a modal is open. */
  get vector(): { x: number; y: number } {
    const { activeModal, joystick } = useGameStore.getState();
    if (activeModal) return { x: 0, y: 0 };

    let x = 0;
    let y = 0;
    if (this.cursors.left.isDown || this.wasd.A.isDown) x -= 1;
    if (this.cursors.right.isDown || this.wasd.D.isDown) x += 1;
    if (this.cursors.up.isDown || this.wasd.W.isDown) y -= 1;
    if (this.cursors.down.isDown || this.wasd.S.isDown) y += 1;
    if (x === 0 && y === 0) return joystick;
    return { x, y };
  }

  /** True exactly once per E press or virtual button tap. */
  consumeInteract(): boolean {
    const tick = useGameStore.getState().interactTick;
    const fromButton = tick !== this.lastInteractTick;
    this.lastInteractTick = tick;
    return fromButton || Phaser.Input.Keyboard.JustDown(this.keyE);
  }

  /** True exactly once per Z or X press. */
  get zoom(): number | null {
    if (this.cameraZoom.Z.isDown) {
      return 0.05;
    }
    if (this.cameraZoom.X.isDown) {
      return -0.05;
    }
    return null;
  }
}
