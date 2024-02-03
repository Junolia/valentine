import './style.css'
import Phaser from 'phaser'

// GLOBAL VARIABLES
const sizes = {
  width: 1000,
  height: 800
};

class myMenu extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.itemsGroup;
  }

  preload() {
    // Game background
    this.load.image("bg", "/assets/background.png");
    this.load.image("basket", "/assets/background.png");
    // Items
    this.load.image("item1", "/assets/bunny1.svg");
    //Alexa 
    this.load.spritesheet('alexa', '/assets/alexa_idle.png', {
      frameWidth: 290, 
      frameHeight: 531,
    });
  }

  create() {
    // Background
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    // Basket area
    const basket = this.add.image(300, 500, "item1").setInteractive();
    this.input.setDraggable(basket);

    // Items
    this.itemsGroup = this.physics.add.group({
      key: 'item1',
      repeat: 3,  // Adjust the number of items as needed
      setXY: { x: 100, y: 100, stepX: 400 }
    });

    // Alexa
      // Create the sprite
    const gifSprite = this.add.sprite(400, 300, 'alexa');

    // Play the GIF as an animation
    gifSprite.anims.create({
      key: 'playGif',
      frames: this.anims.generateFrameNumbers('alexa', { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1 // Set to -1 to loop indefinitely
    });

    gifSprite.play('playGif');


    // Make items draggable
    this.itemsGroup.children.iterate(item => {
      item.setInteractive();
      this.input.setDraggable(item);
    });

    // Handle drag events
    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xff0000);
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject) {
      gameObject.clearTint();
      // Implement logic to check if the item is dropped in the basket area
      if (Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), basket.getBounds())) {
        // Item is dropped in the basket
        // You can add scoring logic or any other functionality here
        gameObject.destroy();
      }
    });
  }

  update() {
    // Add your game logic here if needed
  }
}