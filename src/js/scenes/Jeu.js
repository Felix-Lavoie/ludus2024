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
        this.load.tilemapTiledJSON('carte', './src/img/maps/base_lvl.json')
        this.load.image('imgCarte', './src/img/tiles_cave/MainLev2.0.png')
        //temp
        this.load.image('ground', 'https://assets.codepen.io/9367036/Platform%2848x48%29.png')
    }
  
    create() {
        // Monde
        this.worldWidth = 1600;
        this.worldHeight = 2000;
        this.physics.world.setBounds(
            this.worldWidth / -2,
            this.worldHeight / -2,
            this.worldWidth,
            this.worldHeight
        );
        // Tilemap
        const maCarte = this.make.tilemap({ key: "carte" });

        // Tileset
        const tileset = maCarte.addTilesetImage("MainLev2.0", "imgCarte");

        // Calques
        const bgLayer = maCarte.createLayer("base", [tileset], 0, 0);
        const collisionLayer = maCarte.createLayer("roche", [tileset], 0, 0);

        collisionLayer.setCollisionByProperty({ collision: true });
        bgLayer.setCollisionByProperty({ collision: true });
        // Joueur
        this.player = this.physics.add.sprite(300, 950, "player").setScale(2).refreshBody();;
        this.player.setBounce(0);
        this.player.setSize(21, 37);
        this.player.setOffset(6, 11);
        this.player.body.setGravityY(100);
        // colliders
        this.physics.add.collider(this.player, collisionLayer)
        this.physics.add.collider(this.player, bgLayer)
        // Caméra
        this.cameras.main.setBounds(
            this.worldWidth / -2,
            this.worldHeight / -2,
        );
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        // touches
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });
        // animations
        this.anims.create({
            key: 'climb',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })
        // UI
        //let bgF = this.add.image(config.width / 2, config.height / 2, "bgF").setScale(1.6);
        //let bgC = this.add.image(config.width / 2, config.height / 2, "bgC").setScale(1.6);

        let btn1 = this.add.image(400, 350, "btn").setScale(3).setInteractive();
        this.txtBtn3 = this.add.text(378, 335, "quitter", { fontFamily: 'arial'}).setColor('black');
        btn1.on("pointerdown", () => {
              this.scene.start("acceuil");
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
        this.player.anims.play('climb', true)
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(velocity);
        this.player.anims.play('climb', true)
    } else {
        this.player.setVelocityX(0);
    }
    
    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-velocity);
        this.player.anims.play('climb', true)
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(velocity);
        this.player.anims.play('climb', true)
    } else { 
        this.player.setVelocityY(20);
    }
    //console.log(this.player.x, this.player.y)

    // Saut
    if (this.cursors.jump.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-500);
    }
    // Mort
    if (this.player.y > 1000 + this.player.height) {
        this.player.setPosition(config.width / 2, 950);
        this.player.setVelocityY(0);
    } else if (this.player.y < -40 + this.player.height) {
        this.player.setPosition(config.width / 2, 950);
        this.player.setVelocityY(0);
    }
  }
}