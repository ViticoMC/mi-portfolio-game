import Phaser from "phaser";
import type { ModalId } from "@/data/profile";
import { gameStore } from "@/store/gameStore";
import { DEPTH } from "@@/constants";

interface Interactable {
  id: ModalId;
  label: string;
  marker: Phaser.GameObjects.Text;
}

/** Tracks the current interactable and opens the matching modal on E. */
export class InteractionSystem {
  private items = new Map<ModalId, Interactable>();
  private current: Interactable | null = null;
  private lastTouchAt = 0;
  private readonly touchTimeoutMs = 180;

  constructor(private scene: Phaser.Scene) {}

  add(
    id: ModalId,
    label: string,
    zone: Phaser.Geom.Rectangle,
    markerX: number,
    markerY: number,
  ) {
    const marker = this.scene.add
      .text(markerX, markerY, "E", {
        fontFamily: "monospace",
        fontSize: "8px",
        color: "#3b2a1a",
        backgroundColor: "#ffe9a8",
        padding: { x: 3, y: 1 },
      })
      .setOrigin(0.5, 1)
      .setDepth(DEPTH.ui)
      .setVisible(false)
      .setResolution(4);
    this.scene.tweens.add({
      targets: marker,
      y: markerY - 3,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });
    this.items.set(id, { id, label, marker });
  }

  touch(id: ModalId, label: string, now = this.scene.time.now) {
    const item = this.items.get(id);
    if (!item) return;

    if (this.current?.id !== id) {
      this.current?.marker.setVisible(false);
      this.current = item;
    }

    this.current.label = label;
    this.current.marker.setVisible(true);
    this.lastTouchAt = now;
    gameStore.getState().setNearby({ id, label });
  }

  update(now: number, interactPressed: boolean) {
    if (this.current && now - this.lastTouchAt > this.touchTimeoutMs) {
      this.current.marker.setVisible(false);
      this.current = null;
      gameStore.getState().setNearby(null);
    }

    if (this.current && interactPressed && !gameStore.getState().activeModal) {
      gameStore.getState().openModal(this.current.id);
    }
  }
}
