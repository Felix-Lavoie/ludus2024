class Jeu extends Phaser.Scene {
    constructor() {
        super({ key: "jeu" });
      }
      
    preload() {
        this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
        this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
        this.load.image('btn', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Bar01a')
        this.load.spritesheet('player', './src/img/characters/3_SteamMan/SteamMan_climb.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        //temp
        this.load.image('ground', 'https://assets.codepen.io/9367036/Platform%2848x48%29.png')
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
        //temp floor
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(300, 230, "ground").setScale(2).refreshBody();
        // Joueur
        this.player = this.physics.add.sprite(300, 100, "player").setScale(2).refreshBody();;
        this.player.setBounce(0);
        this.player.setSize(21, 37);
        this.player.setOffset(6, 11);
        this.player.body.setGravityY(100);
        this.physics.add.collider(this.player, this.platforms)
        // touches
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });
    }
  
    update() {
    // Déplacements
    const walkSpeed = 150;
    const runSpeed = 250;
    let velocity = walkSpeed;

    if (this.cursors.shift.isDown) {
      velocity = runSpeed;
    }

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-velocity);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(velocity);
    } else if (this.cursors.up.isDown) {
        this.player.setVelocityY(-velocity);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(velocity);
    } else {
        this.player.setVelocityY(20);
        this.player.setVelocityX(0);
    }
    // Saut
    if (this.cursors.jump.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-500);
    }
    // Mort
    if (this.player.y > config.height + this.player.height) {
      this.player.setPosition(config.width / 2, 0);
      this.player.setVelocityY(0);
    }
  }
}