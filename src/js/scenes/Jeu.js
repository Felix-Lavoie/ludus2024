class Jeu extends Phaser.Scene {
    constructor() {
        super({ key: "jeu" });
      }
      
    preload() {
        this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
        this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
        this.load.image('btn', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Bar01a')
        this.load.image('assetCheet1', './src/img/tiles_cave/decorative.png')
        this.load.spritesheet('player', './src/img/characters/3_SteamMan/SteamMan_climb.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet('playerDeath', './src/img/characters/3_SteamMan/SteamMan_death.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet('playerHurt', './src/img/characters/3_SteamMan/SteamMan_hurt.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet('playerIdle', './src/img/characters/3_SteamMan/SteamMan_idle.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet('playerJump', './src/img/characters/3_SteamMan/SteamMan_jump.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.tilemapTiledJSON('carte', './src/img/maps/base_lvl.json')
        this.load.image('imgCarte', './src/img/tiles_cave/MainLev2.0.png')
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
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('playerDeath', { start: 0, end: 5 }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('playerHurt', { start: 0, end: 2 }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 3 }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('playerJump', { start: 0, end: 5 }),
            frameRate: 10,
        })

        const roche = this.add.image(0, 0, "assetCheet1").setOrigin(0, 0).setCrop(290, 0, 69, 115).setAngle(180).setPosition(740, 800);
        this.tweens.add({
           targets: roche,
          y: 1500,
          duration: 3000,
          repeat: -1,
        });
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

    // left and right
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-velocity);
        this.player.anims.play('climb', true)
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(velocity);
        this.player.anims.play('climb', true)
    } else {
        this.player.setVelocityX(0);
    }
    
    // up and down
    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-velocity);
        this.player.anims.play('climb', true)
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(velocity);
        this.player.anims.play('climb', true)
    } else { 
        this.player.setVelocityY(20);
    }

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