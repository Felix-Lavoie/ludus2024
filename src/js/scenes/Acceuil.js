class Acceuil extends Phaser.Scene {
    constructor() {
        super({ key: 'acceuil' });
    }

    preload() {
        this.load.image('bgF', './src/img/tiles/tiles/Assets/Background_2.png')
        this.load.image('bgC', './src/img/tiles/tiles/Assets/Background_1.png')
        this.load.image('btn', './src/img/ui/01_Flat_Theme/Sprites/UI_Flat_Banner02a.png')
        this.load.image('icon', './src/img/ui/buttonUI.png')
        this.load.image('logo', './src/img/ui/logo.png')
    }

    create() {
        let bgF = this.add.image(config.width / 2, config.height / 2, "bgF").setScale(1.6);
        let bgC = this.add.image(config.width / 2, config.height / 2, "bgC").setScale(1.6);

        let logo = this.add.image(375, 150, "logo").setScale(2).setOrigin(0.5, 0.5);

        let btn1 = this.add.image(400, 250, "btn").setScale(3).setInteractive();
        this.txtBtn1 = this.add.text(360, 235, "commencer", { fontFamily: 'arial' }).setColor('black');
        btn1.on("pointerdown", () => {
            this.scene.start("jeu");
        });

        let btn2 = this.add.image(400, 300, "btn").setScale(3).setInteractive();
        this.txtBtn2 = this.add.text(344, 285, "comment jouer?", { fontFamily: 'arial' }).setColor('black');
        btn2.on("pointerdown", () => {
            this.scene.start("comment");
        });

        let btn3 = this.add.image(400, 350, "btn").setScale(3).setInteractive();
        this.txtBtn3 = this.add.text(381, 335, "credit", { fontFamily: 'arial' }).setColor('black');
        btn3.on("pointerdown", () => {
            this.scene.start("credit");
        });
    }
}