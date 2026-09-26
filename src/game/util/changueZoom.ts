import { InputSystem } from "../systems/InputSystem";
const LIMITS = {
  max: 5,
  min: 1.3,
};

export function ChangueZome(scena: Phaser.Scene, input$: InputSystem) {
  const zoom = input$.zoom;
  if (zoom) {
    const cam = scena.cameras.main;

    if (cam.zoom + zoom >= LIMITS.min && cam.zoom + zoom <= LIMITS.max) {
      cam.setZoom(cam.zoom + zoom);
    }
  }
}
