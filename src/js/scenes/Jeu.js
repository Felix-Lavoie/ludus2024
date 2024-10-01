class Jeu extends Phaser.Scene {
    constructor() {
        super({ key: "jeu" });
      }
      
    preload() {
        this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
        this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
        this.load.image('btn', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Bar01a')
        this.load.image('player', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Bar10a.png')
    }
  
    create() {
        // UI
        let bgF = this.add.image(config.width / 2, config.height / 2, "bgF").setScale(1.6);
        let bgC = this.add.image(config.width / 2, config.height / 2, "bgC").setScale(1.6);

        let btn1 = this.add.image(400, 350, "btn").setScale(3).setInteractive();
        this.txtBtn3 = this.add.text(378, 335, "quitter", { fontFamily: 'arial'}).setColor('black');
        btn1.on("pointerdown", () => {
              this.scene.start("acceuil");
        });
        // Joueur
        this.player = this.physics.add.sprite(config.width / 2, 0, "player");
        this.player.setBounce(0);
        this.player.setSize(10, 18);
        this.player.setOffset(10, 8);
        this.player.body.setGravityY(1000);
    }
  
    update() {
  
    }
}