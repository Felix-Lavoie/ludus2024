let score = 0;
const config = {
  //...
  scene: [Jeu, HUD]
};

class HUD extends Phaser.Scene {
  constructor() {
    super({ key: "hud" });
  }

  create() {
    let info = this.add.text(10, 10, "Distance: 0cm", {font: "16px Arial", fill: "#C9CCCF"});

    let jeu = this.scene.get("jeu");
    // Événement personnalisé
    jeu.events.on("addScore", (pts) => {
      score += pts;
      info.setText("Distance : " + score + "m");
    });
  }
}