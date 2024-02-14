//Put image imports here
export default class MyEnd extends Phaser.Scene {
    preload(){
        this.load.image('endscene', "/assets/endscene.png");
    }

    create(){
        const myTitle = this.add.sprite(0, 0, 'endscene').setOrigin(0,0);
        this.spaceKey = this.input.keyboard.addKey("SPACE");

    }

    update(){
        if(this.spaceKey.isDown){
            this.scene.start("MyGameKey");
        }
    }
}