const config = {
    type: Phaser.AUTO,
    parent: "canvas-wrapper",
    width: 800,
    height: 400,
    scene: [Acceuil, Jeu, How, Credit, Partie_termine, Victoire]
};
const game = new Phaser.Game(config);