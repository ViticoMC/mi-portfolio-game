export const ChargueTexturesPlayer = {
  preload: (scene: Phaser.Scene) => {
    scene.load.spritesheet("player_idle", "/assets/player/Player_Idle.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet("player_walk", "/assets/player/Player_Walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet("player_run", "/assets/player/Player_Run.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  },
};
