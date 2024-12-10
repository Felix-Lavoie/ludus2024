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
    scene: [How, Partie_termine,  Victoire, Credit, Jeu, Acceuil],
    physics: {
        default: "arcade",
        arcade: {
          //debug: true
        }
    }
};
const game = new Phaser.Game(config);