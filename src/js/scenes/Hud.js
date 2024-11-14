class Hud extends Phaser.Scene {
  constructor() {
    super({ key: 'hud', active: true });
    this.score = 0;
  }
/*
  create() {
    let info = this.add.text(10, 10, "Distance: 0m", { font: "16px Arial", fill: "#C9CCCF" }).setScale(1);

    let jeu = this.scene.get("jeu");
    // Événement personnalisé
    jeu.events.on("addScore", function() {
      this.score += 1;
      info.setText("Distance : " + this.score + "m");
    });
  }*/
}