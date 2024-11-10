const config = {
    type: Phaser.AUTO,
    parent: "canvas-wrapper",
    pixelArt: true,
    fps: {
      forceSetTimeOut: true,
      target: 60
    },
    width: 800,
    height: 400,
    scene: [Jeu, Acceuil, How, Credit, Partie_termine, Victoire],
    physics: {
        default: "arcade",
        arcade: {
          debug: true
        }
    }
};
const game = new Phaser.Game(config);