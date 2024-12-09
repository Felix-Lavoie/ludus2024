class How extends Phaser.Scene {
      constructor() {
            super({ key: "comment" });
      }

      preload() {
            this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
            this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
            this.load.image('btn1', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner02a.png')
            this.load.image('btn2', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner01a.png')
            this.load.image('img', './src/img/ui/screen.png')
      }

      create() {
            let bgF = this.add.image(config.width / 2, config.height / 2, "bgF").setScale(1.6);
            let bgC = this.add.image(config.width / 2, config.height / 2, "bgC").setScale(1.6);

            let fond = this.add.image(0, 0, "img").setScale(0.6).setOrigin(0, 0)

            let btn1 = this.add.image(400, 350, "btn1").setScale(3).setInteractive();
            this.txtBtn1 = this.add.text(380, 335, "retour", { fontFamily: 'arial' }).setColor('black');
            btn1.on("pointerdown", () => {
                  this.scene.start("acceuil");
            });
            let btn3 = this.add.image(600, 190, "btn2").setScale(3);
            this.txtBtn3 = this.add.text(545, 187, "ne pas touchez", { fontFamily: 'arial' }).setColor('black');
            let btn4 = this.add.image(200, 240, "btn2").setScale(3);
            this.txtBtn4 = this.add.text(135, 237, "surface de grimpe", { fontFamily: 'arial' }).setColor('black');
            let btn5 = this.add.image(365, 120, "btn2").setScale(3);
            this.txtBtn5 = this.add.text(300, 117, "donne de l'energie", { fontFamily: 'arial' }).setColor('black');
            let btn6 = this.add.image(220, 30, "btn2").setScale(3);
            this.txtBtn5 = this.add.text(172, 30, "vie et energie", { fontFamily: 'arial' }).setColor('black');
            let btn7 = this.add.image(600, 300, "btn2").setScale(3);
            this.txtBtn5 = this.add.text(545, 297, "Shift pour sprint", { fontFamily: 'arial' }).setColor('black');
      }

      update() {

      }
}