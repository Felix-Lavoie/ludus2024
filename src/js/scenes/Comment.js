class How extends Phaser.Scene {
      constructor() {
            super({ key: "comment" });
      }

      preload() {
            this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
            this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
            this.load.image('btn1', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner02a.png')
            this.load.image('btn2', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner01a.png')
            this.load.image('rocher', './src/img/objects/2_Objects/4_Stone/11.png')
            this.load.image('enemyBullet', './src/img/objects/2_Objects/4_Stone/9.png')
            this.load.image('climbSurface', './src/img/tiles_cave/climb_stuff.png')
            this.load.image('barre', './src/img/tiles_cave/barre.png')
      }

      create() {
            let bgF = this.add.image(config.width / 2, config.height / 2, "bgF").setScale(1.6);
            let bgC = this.add.image(config.width / 2, config.height / 2, "bgC").setScale(1.6);

            let roche = this.add.image(100, 150, "rocher").setScale(3)
            let bullet = this.add.image(300, 150, "enemyBullet").setScale(3)
            let climbSurface = this.add.image(500, 150, "climbSurface").setScale(0.7)
            let barre = this.add.image(700, 150, "barre").setScale(0.7)

            let btn1 = this.add.image(400, 350, "btn1").setScale(3).setInteractive();
            this.txtBtn1 = this.add.text(380, 335, "retour", { fontFamily: 'arial' }).setColor('black');
            btn1.on("pointerdown", () => {
                  this.scene.start("acceuil");
            });
            let btn2 = this.add.image(100, 40, "btn2").setScale(3);
            this.txtBtn2 = this.add.text(45, 37, "ne pas touchez", { fontFamily: 'arial' }).setColor('black');
            let btn3 = this.add.image(300, 40, "btn2").setScale(3);
            this.txtBtn3 = this.add.text(245, 37, "ne pas touchez", { fontFamily: 'arial' }).setColor('black');
            let btn4 = this.add.image(500, 40, "btn2").setScale(3);
            this.txtBtn4 = this.add.text(435, 37, "permet de grimper", { fontFamily: 'arial' }).setColor('black');
            let btn5 = this.add.image(700, 40, "btn2").setScale(3);
            this.txtBtn5 = this.add.text(636, 37, "donne de l'energie", { fontFamily: 'arial' }).setColor('black');
            let btn6 = this.add.image(200, 300, "btn2").setScale(3);
            this.txtBtn5 = this.add.text(145, 297, "Shift pour sprint", { fontFamily: 'arial' }).setColor('black');
            let btn7 = this.add.image(600, 300, "btn2").setScale(3);
            this.txtBtn5 = this.add.text(531, 297, "attention a l'energie", { fontFamily: 'arial' }).setColor('black');
      }

      update() {

      }
}