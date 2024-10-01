const config = {
    type: Phaser.AUTO,
    parent: "canvas-wrapper",
    pixelArt: true,
    width: 800,
    height: 400,
    scene: [Acceuil, Jeu, How, Credit, Partie_termine, Victoire],
    physics: {
        default: "arcade",
        arcade: {
          debug: true
        }
    }
};
const game = new Phaser.Game(config);