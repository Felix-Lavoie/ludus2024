class Acceuil extends Phaser.Scene {
    constructor() {
        super({ key: 'acceuil' });
    }

    preload() {
        this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
        this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
        this.load.image('btn', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner02a.png')
        this.load.image('icon', './src/img/ui/buttonUI.png')
    }

    create() {
        let bgF = this.add.image(config.width / 2, config.height / 2, "bgF").setScale(1.6);
        let bgC = this.add.image(config.width / 2, config.height / 2, "bgC").setScale(1.6);
        
        let btn1 = this.add.image(400, 250, "btn").setScale(3).setInteractive();
        this.txtBtn1 = this.add.text(388, 235, "jeu", { fontFamily: 'arial'}).setColor('black');
        btn1.on("pointerdown", () => {
            this.scene.start("jeu");
        });
        
        let btn2 = this.add.image(400, 300, "btn").setScale(3).setInteractive();
        this.txtBtn2 = this.add.text(344, 285, "comment jouer?", { fontFamily: 'arial'}).setColor('black');
        btn2.on("pointerdown", () => {
            this.scene.start("comment");
        });
        
        let btn3 = this.add.image(400, 350, "btn").setScale(3).setInteractive();
        this.txtBtn3 = this.add.text(381, 335, "credit", { fontFamily: 'arial'}).setColor('black');
        btn3.on("pointerdown", () => {
            this.scene.start("credit");
        });

        let iconOn = this.add.image(-180, -310, 'icon').setOrigin(0, 0).setCrop(97, 160, 16, 16).setScale(2).setInteractive();
        let iconOff = this.add.image(-210, -310, 'icon').setOrigin(0, 0).setCrop(113, 160, 16, 16).setScale(2).setVisible(false);

        iconOn.on('pointerdown', () => {
            iconOn.setVisible(false)
            iconOff.setVisible(true).setInteractive()
        })
        iconOff.on('pointerdown', () => {
            iconOff.setVisible(false)
            iconOn.setVisible(true).setInteractive()
        })
        
        //          _       _
        // Dont work \(-_-)/
        //let scaleX = config.width / img.width;
        //let scaleY = config.height / img.height;
        //let scale = Math.max(scaleX, scaleY);
        //bgF.setScale(scale);
        //bgC.setScale(scale);
    }

    update() {

    }
}