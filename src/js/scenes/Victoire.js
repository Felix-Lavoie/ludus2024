class Victoire extends Phaser.Scene {
  constructor() {
    super({ key: "victoire" });
  }

  preload() {
    this.load.image("btn", "./src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner02a.png");
    this.load.image("btn2", "./src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner01a.png");
    this.load.image("sage", "./src/img/characters/leVenerable.png");
    this.load.audio('theme', './src/music/win_theme.mp3')
    this.load.spritesheet('playerIdle', './src/img/characters/3_SteamMan/SteamMan_idle.png', {
      frameWidth: 48,
      frameHeight: 48
    })
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

    let btn1 = this.add.image(300, 360, "btn").setScale(3).setInteractive();
    this.txtBtn1 = this.add.text(246, 345, "menu principale", { fontFamily: "arial" }).setColor("black");
    btn1.on("pointerdown", () => {
      this.theme.stop();
      this.scene.start("acceuil");
    });
    let btn2 = this.add.image(500, 360, "btn").setScale(3).setInteractive();
    this.txtBtn2 = this.add.text(454, 345, "recomencer", { fontFamily: "arial" }).setColor("black");
    btn2.on("pointerdown", () => {
      this.theme.stop();
      this.scene.start("jeu");
    });
    let vct = this.add.image(562, 150, "btn2").setScale(3).setInteractive();
    this.txtvct = this.add.text(500, 137, "BRAVO!!", { fontFamily: "arial" }).setColor("black").setScale(2);
    let venerable = this.add.image(560, 225, 'sage')
  }

  update() { 
    this.player.anims.play('idle', true)
  }
  
}
