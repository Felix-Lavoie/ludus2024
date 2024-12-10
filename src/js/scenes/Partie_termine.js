class Partie_termine extends Phaser.Scene {
  constructor() {
    super({ key: "death" });
  }

  preload() {
    this.load.image('btn', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner02a.png')
    this.load.image("btn2", "./src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner01a.png")
    this.load.image('golb', './src/img/hell/golb.png')
    this.load.image('txtBg', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner03a.png')
    this.load.audio('theme', './src/music/loseTheme.mp3')
    this.load.tilemapTiledJSON('hell', './src/img/maps/hell.json')
    this.load.image('redAssets', './src/img/hell/red.png')
    this.load.image('grayAssets', './src/img/hell/platformPack_tilesheet_walls.png')
  }

  create() {
    // Tilemap
    const maCarteHell = this.make.tilemap({
      key: "hell"
    });

    // Tileset
    const tileset1 = maCarteHell.addTilesetImage("red", "redAssets");
    const tileset2 = maCarteHell.addTilesetImage("gray", "grayAssets");

    // Calques
    const red = maCarteHell.createLayer("layer1", [tileset1, tileset2], 0, 0);
    const gray = maCarteHell.createLayer("layer2", [tileset1, tileset2], 0, 0);

    this.theme = this.sound.add('theme', {
      volume: 0.3,
      loop: true,
  });
  this.theme.play();

    this.golb = this.add.image(550, 130, 'golb').setScale(2).setFlipX(true);
    this.player = this.physics.add.sprite(400, 175, "playerIdle").setScale(2).refreshBody();;

    let btn1 = this.add.image(300, 350, "btn").setScale(3).setInteractive();
    this.txtBtn2 = this.add.text(244, 335, "menu principale", { fontFamily: 'arial' }).setColor('black');
    btn1.on("pointerdown", () => {
      this.theme.stop();
      this.scene.start("acceuil");
    });
    let btn2 = this.add.image(500, 350, "btn").setScale(3).setInteractive();
    this.txtBtn2 = this.add.text(447, 335, "vendre son âme", { fontFamily: 'arial' }).setColor('black');
    btn2.on("pointerdown", () => {
      this.theme.stop();
      this.nbMort++
      localStorage.setItem('sauvegardeJeu', JSON.stringify(this.nbMort));
      this.scene.start("jeu");
    });

    this.nbMort = 0
    this.nbMort = JSON.parse(localStorage.getItem('sauvegardeJeu'));
    let hellTxtBg = this.add.image(340, 70, "txtBg").setScale(5).setFlipX(true);
    this.hellTxt1 = this.add.text(190, 25, `OH Noonn! Tu es mort. 
      Mais en échange de ton âme. 
      Je te donnerai une nouvelle chance. 
      À la vie!`, { fontFamily: "arial" }).setColor("black").setScale(1).setVisible(false);
    this.hellTxt2 = this.add.text(190, 25, `De nouveau retour?
      Tu es déjà mort ${this.nbMort} fois!
      Mais n'aie pas peur.
      Je te prendrais ton âme sans souci.`, { fontFamily: "arial" }).setColor("black").setScale(1).setVisible(false);

  }
  
  update() {
    if (this.nbMort >= 1) {
      this.hellTxt1.setVisible(false)
      this.hellTxt2.setVisible(true)
    } else {
      this.hellTxt2.setVisible(false)
      this.hellTxt1.setVisible(true)
    }
    this.player.anims.play('idle', true)
  }
}