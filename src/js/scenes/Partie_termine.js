class Partie_termine extends Phaser.Scene {
  constructor() {
    super({ key: "death" });
  }

  preload() {
    this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
    this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
    this.load.image('btn', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner02a.png')
    this.load.image("btn2", "./src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner01a.png");
    this.load.audio('theme', './src/music/main_theme.mp3')
  }

  create() {
    this.theme = this.sound.add('theme', {
      volume: 0.3,
      loop: true,
  });
  this.theme.play();

    let bgF = this.add.image(config.width / 2, config.height / 2, "bgF").setScale(1.6);
    let bgC = this.add.image(config.width / 2, config.height / 2, "bgC").setScale(1.6);

    let btn1 = this.add.image(300, 350, "btn").setScale(3).setInteractive();
    this.txtBtn2 = this.add.text(244, 335, "menu principale", { fontFamily: 'arial' }).setColor('black');
    btn1.on("pointerdown", () => {
      this.theme.stop();
      this.scene.start("acceuil");
    });
    let btn2 = this.add.image(500, 350, "btn").setScale(3).setInteractive();
    this.txtBtn2 = this.add.text(454, 335, "recommencer", { fontFamily: 'arial' }).setColor('black');
    btn2.on("pointerdown", () => {
      this.theme.stop();
      this.scene.start("jeu");
    });
    let vct = this.add.image(400, 150, "btn2").setScale(5).setInteractive();
    this.txtvct = this.add.text(313, 135, "BOOO!!", { fontFamily: "arial" }).setColor("black").setScale(3);
  }

  update() {

  }
}