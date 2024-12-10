class Jeu extends Phaser.Scene {
    constructor() {
        super({
            key: "jeu"
        });
    }

    preload() {
        this.load.audio('mainTheme', './src/music/main_theme.mp3')
        this.load.audio('soundWin', './src/music/badge-coin-win-14675.mp3')
        this.load.audio('soundDeath', './src/music/retro-video-game-death-95730.mp3')
        this.load.audio('soundHurt', './src/music/retro-hurt-2-236675.mp3')
        this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
        this.load.image('bgHealth', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Bar06a.png')
        this.load.image('health', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_BarFill01c.png')
        this.load.image('stam', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_BarFill01a.png')
        this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
        this.load.image('txtBg', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner03a.png')
        this.load.image('txtNext', './src/img/ui/buttonPlay.png')
        this.load.image('assetCheet1', './src/img/tiles_cave/decorative.png')
        this.load.image('enemyBullet', './src/img/objects/2_Objects/4_Stone/9.png')
        this.load.image('rocher', './src/img/objects/2_Objects/4_Stone/11.png')
        this.load.image('barre', './src/img/tiles_cave/barre.png')
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
        this.load.spritesheet('playerWalk', './src/img/characters/3_SteamMan/SteamMan_walk.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet('enemyAttack', './src/img/characters/1_Woodcutter/Woodcutter_attack3.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet('enemyIddle', './src/img/characters/1_Woodcutter/Woodcutter_idle.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.tilemapTiledJSON('carte', './src/img/maps/base_lvl_fn.json')
        this.load.image('imgCarte', './src/img/tiles_cave/MainLev2.0.png')
        this.load.image('imgCarte_ground', './src/img/tiles_front/Texture/ground.png')
        this.load.image('imgCarte_obj', './src/img/tiles_front/Texture/objet.png')
    }

    create() {
        // hud
        this.crop = 32;
        this.hudBgHealth = this.add.image(50, 20, "bgHealth").setScale(3);
        this.health = this.add.image(50, 20, "health").setScale(2.6)
        this.healthMid = this.add.image(50, 20, `health`).setCrop(0, 0, 16, 3).setScale(2.6)
        this.hudBgStam = this.add.image(50, 40, "bgHealth").setScale(3);
        this.stam = this.add.image(50, 40, "stam").setScale(2.6)
        this.heightTxt = this.add.text(5, 55, `hauter: 0`)

        // Monde
        this.worldWidth = 1280;
        this.worldHeight = 3150;
        this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);

        // Tilemap
        const maCarte = this.make.tilemap({
            key: "carte"
        });

        // Tileset
        const tileset1 = maCarte.addTilesetImage("MainLev2.0", "imgCarte");
        const tileset2 = maCarte.addTilesetImage("start", "imgCarte_ground");
        const tileset3 = maCarte.addTilesetImage("objects", "imgCarte_obj");

        // Calques
        const bjLayer = maCarte.createLayer("background", [tileset1, tileset2, tileset3], 0, 0);
        const baseLayer = maCarte.createLayer("base", [tileset1, tileset2, tileset3], 0, 0);
        const collisionLayer = maCarte.createLayer("roche", [tileset1, tileset2, tileset3], 0, 0);
        const videLayer = maCarte.createLayer("vide", [tileset1, tileset2, tileset3], 0, 0);
        const objLayer = maCarte.createLayer("obj", [tileset1, tileset2, tileset3], 0, 0);

        collisionLayer.setCollisionByProperty({
            collision: true
        });
        objLayer.setCollisionByProperty({
            collision: true
        });
        baseLayer.setCollisionByProperty({
            collision: true
        });
        videLayer.setCollisionByProperty({
            vide: true
        });

        // enemy
        this.enemy = this.physics.add.sprite(1030, 1735, "enemyIddle").setScale(2).refreshBody();;
        this.enemy.setBounce(0);
        this.enemy.setSize(21, 37);
        this.enemy.setOffset(24, 11);
        this.enemy.setOrigin(0.75, 0.5);
        this.enemy.body.setGravityY(0);
        this.enemy.setFlipX(true);
        this.isShouting = false;

        this.enemyBullets = this.physics.add.group({
            defaultKey: "enemyBullet",
            maxSize: 5
        });

        this.enemyFiring = this.time.addEvent({
            delay: 1500,
            loop: true,
            callback: () => {
                const bullet = this.enemyBullets.get(this.enemy.x - 5, this.enemy.y);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(-(Math.floor(Math.random() * 200) + 100), (Math.floor(Math.random() * 100) + 20));
                    this.isShouting = true
                }
            }
        });


        // Joueur
        this.player = this.physics.add.sprite(300, 2670, "player").setScale(2).refreshBody();;
        this.player.setBounce(0);
        this.player.setSize(21, 37);
        this.player.setOffset(6, 11);
        this.player.body.setGravityY(100);
        this.pointDeVie = 2;
        this.isdead = false
        this.played = false
        this.tooFast = false
        this.hurted = false
        this.stamina = 1000
        this.player.body.setGravityY(1000);
        this.player.setCollideWorldBounds(true);

        // colliders
        this.physics.add.collider(this.player, collisionLayer)
        this.physics.add.collider(this.player, baseLayer)
        this.physics.add.collider(this.player, objLayer)

        this.physics.add.collider(this.enemy, collisionLayer)
        this.physics.add.collider(this.enemy, baseLayer)
        this.physics.add.collider(this.enemy, objLayer)

        // Caméra
        this.cameras.main.setBounds(this.worldWidth / -2, this.worldHeight / -2,);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        this.cameraWorld = this.cameras.add(2280, 0, 1280, 3000)
        this.cameraHud = this.cameras.add(0, 0, 200, 200)


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
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('playerWalk', {
                start: 0,
                end: 5
            }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('playerDeath', {
                start: 0,
                end: 5
            }),
            frameRate: 10,
            repeat: 0
        })

        this.anims.create({
            key: 'deathEnd',
            frames: this.anims.generateFrameNumbers('playerDeath', {
                start: 5,
                end: 5
            }),
            frameRate: 10,
            repeat: 0
        })

        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('playerHurt', {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: 0
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('playerIdle', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
        })

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('playerJump', {
                start: 0,
                end: 5
            }),
            frameRate: 10,
        })

        // enemy
        this.anims.create({
            key: 'eAttack',
            frames: this.anims.generateFrameNumbers('enemyAttack', {
                start: 0,
                end: 5
            }),
            frameRate: 10,
            repeat: 0
        })

        this.anims.create({
            key: 'eIdle',
            frames: this.anims.generateFrameNumbers('enemyIddle', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
        })

        // obstacle
        this.roche = this.physics.add.group({
            defaultKey: "rocher",
            maxSize: 30
        });

        this.roche1 = this.time.addEvent({
            delay: 1500,
            loop: true,
            callback: () => {
                const bullet = this.roche.get(700, 1300);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(0, (Math.floor(Math.random() * 150) + 100));
                    this.isShouting = true
                }
            }
        });
        this.roche2 = this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: () => {
                const bullet = this.roche.get(600, 1300);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(0, (Math.floor(Math.random() * 150) + 100));
                    this.isShouting = true
                }
            }
        });
        this.roche3 = this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                const bullet = this.roche.get(500, 1200);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(0, (Math.floor(Math.random() * 150) + 100));
                    this.isShouting = true
                }
            }
        });
        this.roche4 = this.time.addEvent({
            delay: 4000,
            loop: true,
            callback: () => {
                const bullet = this.roche.get(940, 1320);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(0, (Math.floor(Math.random() * 150) + 100));
                    this.isShouting = true
                }
            }
        });
        this.roche5 = this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                const bullet = this.roche.get(1050, 2230);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(0, (Math.floor(Math.random() * 150) + 100));
                    this.isShouting = true
                }
            }
        });

        this.roche6 = this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                const bullet = this.roche.get(500, 980);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(-(Math.floor(Math.random() * 100) + 50), 0);
                    bullet.setGravityY(100)
                    this.isShouting = true
                }
            }
        });

        this.roche7 = this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                const bullet = this.roche.get(955, 1150);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(-(Math.floor(Math.random() * 100) + 50), 0);
                    bullet.setGravityY(100)
                    this.isShouting = true
                }
            }
        });

        this.roche8 = this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                const bullet = this.roche.get(740, 1150);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity((Math.floor(Math.random() * 100) + 50), 0);
                    bullet.setGravityY(100)
                    this.isShouting = true
                }
            }
        });

        this.roche9 = this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                const bullet = this.roche.get(260, 1260);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity((Math.floor(Math.random() * 100) + 50), 0);
                    bullet.setGravityY(100)
                    this.isShouting = true
                }
            }
        });

        // collectible
        this.barre = this.physics.add.group({
            defaultKey: "barre",
            maxSize: 4
        });
        this.barre1 = this.time.addEvent({
            delay: 0,
            loop: false,
            callback: () => {
                const bullet = this.barre.get(900, 2100).setScale(0.3);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(0, 0);
                }
            }
        });
        this.barre2 = this.time.addEvent({
            delay: 0,
            loop: false,
            callback: () => {
                const bullet = this.barre.get(350, 1700).setScale(0.3);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(0, 0);
                }
            }
        });
        this.barre3 = this.time.addEvent({
            delay: 0,
            loop: false,
            callback: () => {
                const bullet = this.barre.get(850, 1200).setScale(0.3);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(0, 0);
                }
            }
        });
        this.barre4 = this.time.addEvent({
            delay: 0,
            loop: false,
            callback: () => {
                const bullet = this.barre.get(650, 750).setScale(0.3);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.setVelocity(0, 0);
                }
            }
        });

        // overlap
        this.isOnSurface = true
        this.physics.add.overlap(
            this.player, videLayer, () => {
                this.isOnSurface = false
                this.time.delayedCall(10, () => {
                    this.isOnSurface = true
                })
            }, (player, tile) => {
                return tile && tile.properties && tile.properties.vide === true;
            }
        );

        this.physics.add.overlap(
            this.player,
            this.enemyBullets,
            (player, bullet) => {
                if (player.alpha != 1) return;
                bullet.setActive(false);
                bullet.setVisible(false);
                bullet.y = -999999;
                this.pointDeVie -= 1;
                this.hurted = true
                this.soundHurt.play();
            });

        this.physics.add.overlap(
            this.player,
            this.roche,
            (player, roche) => {
                if (player.alpha != 1) return;
                roche.setActive(false);
                roche.setVisible(false);
                roche.y = -999999;
                this.pointDeVie -= 1;
                this.hurted = true
                this.soundHurt.play();
            }
        )

        this.physics.add.overlap(
            this.player,
            this.barre,
            (player, barre) => {
                if (player.alpha != 1) return;
                barre.setActive(false);
                barre.setVisible(false);
                barre.y = -999999;
                this.stamina += 500
            }
        )

        // music
        this.bgMusic = this.sound.add('mainTheme', {
            volume: 0.3,
            loop: true,
        });
        this.bgMusic.play();
        this.soundHurt = this.sound.add('soundHurt', {
            volume: 0.3,
            loop: false,
        });
        this.soundDeath = this.sound.add('soundDeath', {
            volume: 0.3,
            loop: false,
        });
        this.soundWin = this.sound.add('soundWin', {
            volume: 0.7,
            loop: false,
            seek: 2
        });

        // ludique

        this.txtCount = 0
        this.txtBg = this.add.image(470, 2580, "txtBg").setScale(5);
        this.txt1 = this.add.text(335, 2550, `Vous vous retrouvez dans une montagne.
            Après l'avoir vue au loin.`, {
            fontFamily: 'arial'
        }).setColor('black');
        this.txtNext = this.add.image(600, 2590, "txtNext").setScale(2).setInteractive();
        this.txtNext.on("pointerdown", () => {
            this.txt1.setVisible(false)
            this.txt2 = this.add.text(330, 2550, `Rien ne vous tente plus que de la monter.
                 Alors, qu'attendez-vous ?`, {
                fontFamily: 'arial'
            }).setColor('black');
            this.txtCount++
        });

        this.txtBgStatue = this.add.image(1120, 2990, "txtBg").setScale(2);
        this.txt3 = this.add.text(1063, 2980, `Vous êtes coincé!`, {
            fontFamily: 'arial'
        }).setColor('black').setScale(0.9);
    }

    update() {
        // Déplacements
        const walkSpeed = 150;
        const runSpeed = 300;
        const stamWalk = 1
        const stamSpeed = 2
        let stam = stamWalk
        let velocity = walkSpeed;

        // stam math
        this.crop = this.stamina / 32 + 0.75
        this.stam.setCrop(0, 0, this.crop, 3)

        if (this.cursors.shift.isDown) {
            velocity = runSpeed;
            stam = stamSpeed
        }

        // ludique
        if (this.txtCount >= 2) {
            this.txt2.setVisible(false)
            this.txtBg.setVisible(false)
            this.txtNext.setVisible(false)
        }

        if (this.player.body.y > 2970) {
            this.txtBgStatue.setVisible(true)
            this.txt3.setVisible(true)
        } else {
            this.txtBgStatue.setVisible(false)
            this.txt3.setVisible(false)
        }
        console.log(this.player.body.velocity.y)
        console.log(this.stamina)
        // left and right
        if (this.cursors.left.isDown && this.isdead == false && this.stamina > 0) {
            this.player.setVelocityX(-velocity);
            this.stamina -= stam
        } else if (this.cursors.right.isDown && this.isdead == false && this.stamina > 0) {
            this.player.setVelocityX(velocity);
            this.stamina -= stam
        } else {
            this.player.setVelocityX(0);
        }

        // up and down
        if (this.cursors.up.isDown && this.isOnSurface == true && this.isdead == false && this.stamina > 0) {
            this.player.setVelocityY(-velocity);
            this.stamina -= stam
        } else if (this.cursors.down.isDown && this.isOnSurface == true && this.isdead == false && this.stamina > 0) {
            this.player.setVelocityY(velocity);
            this.stamina -= stam
        } else if (this.isOnSurface == true && this.isdead == false && this.stamina > 0) {
            this.player.setVelocityY(20);
        }
        if(this.stamina < 100 && this.player.body.velocity.y === 0) {
            this.stamina =+ 10
        }

        //jump
        if (this.cursors.jump.isDown && this.player.body.blocked.down && this.isdead == false && this.stamina > 0) {
            this.player.setVelocityY(-300);
        }

        // anim 
        if (this.isdead == true && this.played == false) {
            this.player.anims.play('death', true)
            this.soundDeath.play();
            this.cameras.main.flash(600);
            this.cameras.main.shake(100);
            this.time.delayedCall(600, () => {
                this.played = true
                this.player.anims.play('deathEnd', true)
            })
        } else if (this.hurted == true && this.isdead == false) {
            this.player.anims.play('hurt', true)
            this.cameras.main.flash(300);
            this.cameras.main.shake(100);
            this.time.delayedCall(300, () => {
                this.hurted = false
                this.player.stop()
            })
        } else if (this.isOnSurface == true && this.isdead == false) {
            this.player.anims.play('climb', true)
            this.player.setFlipX(false);
        } else if (this.isOnSurface == false && this.player.body.blocked.down && this.cursors.left.isDown && this.isdead == false) {
            this.player.anims.play('walk', true)
            this.player.setFlipX(true);
            this.player.setOffset(24, 11);
            this.player.setOrigin(0.75, 0.5);
        } else if (this.isOnSurface == false && this.player.body.blocked.down && this.cursors.right.isDown && this.isdead == false) {
            this.player.anims.play('walk', true)
            this.player.setFlipX(false);
            this.player.setOffset(6, 11);
            this.player.setOrigin(0.5, 0.5);
        } else if (this.isOnSurface == false && this.player.body.blocked.down && this.player.body.velocity.x == 0 && this.isdead == false) {
            this.player.anims.play('idle', true)
        }

        if (this.isShouting == false) {
            this.enemy.anims.play('eIdle', true)
        } else if (this.isShouting == true) {
            this.enemy.anims.play('eAttack', true)
            this.time.delayedCall(600, () => {
                this.isShouting = false
            })
        }

        // Mort
        if (this.player.body.velocity.y >= 1000) {
            this.player.setVelocityY(1000);
        }
        if (this.pointDeVie <= 0) {
            this.isdead = true
            this.player.setVelocityX(0);
        }
        if (this.player.body.velocity.y >= 800) {
            this.tooFast = true
        } else if (this.isOnSurface == true && this.stamina > 0) {
            this.tooFast = false
        }
        if (this.tooFast == true && this.player.body.blocked.down) {
            this.isdead = true
        }
        if (this.isdead == true) {
            this.time.delayedCall(3000, () => {
                this.bgMusic.stop();
                this.scene.start("death")
            })
        }

        // hud
        if (this.pointDeVie === 2) {
            this.health.visible = true
        } else if (this.pointDeVie === 1) {
            this.health.visible = false
            this.healthMid.visible = true
        } else if (this.pointDeVie <= 0) {
            this.healthMid.visible = false
        }

        this.height = -((Math.floor(this.player.body.y)) - 3010);
        this.heightTxt.setText(`hauter: ${this.height}`)

        // score
        if (this.cursors.up.isDown) {
            this.events.emit("addScore");
        }


        // win
        if (this.player.body.y > 50) {
            this.soundWin.play();;
        } else if (this.player.body.y < 50) {
            this.bgMusic.stop();
            this.scene.start("victoire")
        }

        // projectiles
        this.enemyBullets.children.each((bullet) => {
            let cachee = !this.cameraWorld.worldView.contains(bullet.x, bullet.y);
            if (bullet.active && cachee) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });

        this.roche.children.each((bullet) => {
            let cachee = !this.cameraWorld.worldView.contains(bullet.x, bullet.y);
            if (bullet.active && cachee) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });

    }
}