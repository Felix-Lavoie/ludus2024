class Victoire extends Phaser.Scene {
  constructor() {
    super({ key: "victoire" });
  }

  preload() {
    this.load.image("btn", "./src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner02a.png");
    this.load.image("btn2", "./src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner01a.png");
    this.load.image('txtBg', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner03a.png')
    this.load.image("sage", "./src/img/characters/leVenerable.png");
    this.load.audio('theme', './src/music/win_theme.mp3')
    this.load.tilemapTiledJSON('victoire', './src/img/maps/victoire.json')
    this.load.image('victoireAssets', './src/img/snow/SnowPlatSheet.png')
  }

  create() {
    // Tilemap
    const maCarteVictoire = this.make.tilemap({
      key: "victoire"
    });

    // Tileset
    const tileset1 = maCarteVictoire.addTilesetImage("snwo", "victoireAssets");

    // Calques
    const bg = maCarteVictoire.createLayer("Tile Layer 1", [tileset1], 0, 0);

    // player
    this.player = this.physics.add.sprite(430, 270, "playerIdle").setScale(2).refreshBody();;

    this.theme = this.sound.add('theme', {
      volume: 0.3,
      loop: true,
    });
    this.theme.play();

    let btn1 = this.add.image(400, 360, "btn").setScale(3).setInteractive();
    this.txtBtn1 = this.add.text(346, 345, "menu principale", { fontFamily: "arial" }).setColor("black");
    btn1.on("pointerdown", () => {
      this.theme.stop();
      this.scene.start("acceuil");
    });

    let vct = this.add.image(370, 150, "txtBg").setScale(5).setFlipX(true);
    this.txtvct = this.add.text(220, 105, `BRAVO!! Vous avez attein le sommet 
      de la montagne après un voyage
      ardueux et plain de rochez.
      Je vous félicite!`, { fontFamily: "arial" }).setColor("black").setScale(1);
    let venerable = this.add.image(560, 225, 'sage')
  }

  update() { 
    this.player.anims.play('idle', true)
  }
  
}
