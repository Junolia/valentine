
//Put image imports here

export default class MyMenu extends Phaser.Scene {
    preload(){
        this.load.spritesheet('titleKey', "/assets/title_screen.png", {
            frameWidth: 768,
            frameHeight: 672,
          });

        this.load.audio("lofi", ["/assets/music.wav"]);
    }

    create(){
        const myTitle = this.add.sprite(0, 0, 'titleKey').setOrigin(0,0);

        const lofiSound = this.sound.add('lofi', { volume: 0.1, loop: true });

        // Play the lofi sound
        lofiSound.play();
        // Play the GIF as an animation
        myTitle.anims.create({
            key: 'playTitle',
            frames: this.anims.generateFrameNumbers('titleKey', { start: 0, end: 29 }),
            frameRate: 13,
            repeat: -1 // Set to -1 to loop indefinitely
        });

        myTitle.play('playTitle');

        //Listen for space
        this.spaceKey = this.input.keyboard.addKey("SPACE");

    }

    update(){
        if(this.spaceKey.isDown){
            this.scene.start("MyGameKey");
        }
    }
}