class How extends Phaser.Scene {
      constructor() {
            super({ key: "comment" });
          }

      preload() {
          this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
          this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
          this.load.image('btn', './src/img/ui/01_Flat_Theme/UI_Flat_Banner02a.png')
      }
    
      create() {
          let bgF = this.add.image(config.width / 2, config.height / 2, "bgF").setScale(1.6);
          let bgC = this.add.image(config.width / 2, config.height / 2, "bgC").setScale(1.6);

            let btn1 = this.add.image(400, 350, "btn").setScale(3).setInteractive();
            this.txtBtn3 = this.add.text(380, 335, "retour", { fontFamily: 'arial'}).setColor('black');
            btn1.on("pointerdown", () => {
                  this.scene.start("acceuil");
            });
      }
    
      update() {
    
      }
}