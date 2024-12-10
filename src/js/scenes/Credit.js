class Credit extends Phaser.Scene {
      constructor() {
            super({ key: "credit" });
      }

      preload() {
            this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
            this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
            this.load.image('btn', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner02a.png')
            this.load.image('frame', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Frame01a.png')
      }

      create() {
            let bgF = this.add.image(config.width / 2, config.height / 2, "bgF").setScale(1.6);
            let bgC = this.add.image(config.width / 2, config.height / 2, "bgC").setScale(1.6);

            let framme = this.add.image(config.width / 2, config.height / 2, 'frame').setScale(6);
            this.txtBtn3 = this.add.text(125, 40, "Texture de surface de grimpe et obstacle: https://szadiart.itch.io/rpg-worlds-ca", { fontFamily: 'arial' }).setColor('black').setScale(0.9);
            this.txtBtn3 = this.add.text(125, 70, `Roches: https://free-game-assets.itch.io/free-fields-tileset-pixel-art-for-tower-defense`, { fontFamily: 'arial' }).setColor('black').setScale(0.9);
            this.txtBtn3 = this.add.text(125, 100, "Menu background: https://anokolisa.itch.io/basic-140-tiles-grassland-and-mines", { fontFamily: 'arial' }).setColor('black').setScale(0.9);
            this.txtBtn3 = this.add.text(125, 130, "Characters: https://craftpix.net/freebies/free-3-character-sprite-sheets-pixel-art/", { fontFamily: 'arial' }).setColor('black').setScale(0.9);
            this.txtBtn3 = this.add.text(125, 160, "Bouton UI: https://kicked-in-teeth.itch.io/button-ui?download", { fontFamily: 'arial' }).setColor('black').setScale(0.9);
            this.txtBtn3 = this.add.text(125, 190, "Tileset ecran victoire: https://nnekart.itch.io/snow-platform-tileset", { fontFamily: 'arial' }).setColor('black').setScale(0.9);
            this.txtBtn3 = this.add.text(125, 220, "Son mort: https://pixabay.com/sound-effects/retro-video-game-death-95730/", { fontFamily: 'arial' }).setColor('black').setScale(0.9);

            let btn1 = this.add.image(400, 330, "btn").setScale(3).setInteractive();
            this.txtBtn3 = this.add.text(380, 315, "retour", { fontFamily: 'arial' }).setColor('black');
            btn1.on("pointerdown", () => {
                  this.scene.start("acceuil");
            });
      }

      update() {

      }
}