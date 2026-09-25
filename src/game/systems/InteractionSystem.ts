import Phaser from "phaser";
import type { ModalId } from "@/data/profile";
import { useGameStore } from "@/store/gameStore";
import { DEPTH } from "@@/constants";

interface Interactable {
  id: ModalId;
  label: string;
  zone: Phaser.Geom.Rectangle;
  marker: Phaser.GameObjects.Text;
}

/** Detects when the player stands inside an interaction zone and opens the matching modal. */
export class InteractionSystem {
  private items: Interactable[] = [];
  private current: Interactable | null = null;

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
    this.items.push({ id, label, zone, marker });
  }

  update(px: number, py: number, interactPressed: boolean) {
    const next = this.items.find((i) => i.zone.contains(px, py)) ?? null;
    if (next !== this.current) {
      this.current?.marker.setVisible(false);
      next?.marker.setVisible(true);
      this.current = next;
      useGameStore
        .getState()
        .setNearby(next ? { id: next.id, label: next.label } : null);
    }
    if (next && interactPressed && !useGameStore.getState().activeModal) {
      useGameStore.getState().openModal(next.id);
    }
  }
}
