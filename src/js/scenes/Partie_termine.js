class Partie_termine extends Phaser.Scene {
      constructor() {
          super({ key: "death" });
        }
  
      preload() {
          this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
          this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
          this.load.image('btn', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Bar01a')
      }
    
      create() {
          let bgF = this.add.image(config.width / 2, config.height / 2, "bgF").setScale(1.6);
          let bgC = this.add.image(config.width / 2, config.height / 2, "bgC").setScale(1.6);

          let btn1 = this.add.image(400, 300, "btn").setScale(3).setInteractive();
        this.txtBtn2 = this.add.text(344, 285, "recommencer", { fontFamily: 'arial'}).setColor('black');
        btn1.on("pointerdown", () => {
            this.scene.start("jeu");
        });
  
          let btn2 = this.add.image(400, 350, "btn").setScale(3).setInteractive();
              this.txtBtn2 = this.add.text(378, 335, "menu principale", { fontFamily: 'arial'}).setColor('black');
              btn2.on("pointerdown", () => {
                    this.scene.start("acceuil");
              });
      }
    
      update() {
    
      }
  }