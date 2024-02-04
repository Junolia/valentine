//Put image imports here

const sizes = {
  width: 768,
  height: 672
}
const speedDown = 500;

export default class MyGame extends Phaser.Scene {

  constructor() {
    super({ key: 'MyGameKey' }); // Make sure to pass the scene key
    this.alexaSprite = null; // Declare alexaSprite as a property
    this.cursor = null;
    this.playerSpeed = speedDown + 50;
    this.itemsGroup;
  }

  preload() {
    // Game background
    this.load.image("bg", "/assets/background.png");
    // Basket image
    this.load.image("basket", "/assets/bunny1.svg");
    // Items
    this.load.image("item1", "/assets/bunny1.svg");
    // Alexa 
    this.load.spritesheet('alexa', '/assets/alexa_idle.png', {
      frameWidth: 290, 
      frameHeight: 531,
    });
  }

  create() {
    //--------------------------------------BACKGROUND--------------------------------------//
    this.add.image(0, 0, "bg").setOrigin(0, 0).setScale(2);

    //--------------------------------------BASKET--------------------------------------//
    const basket = this.add.image(sizes.width - 100, 500, "basket").setInteractive();
    this.input.setDraggable(basket);

    //--------------------------------------ITEMS--------------------------------------//


      this.itemsGroup = this.add.group({
      key: 'item1',
      repeat: 3,
      setXY: { x: 200, y: sizes.height - 100, stepX: 100 }
    });

    
    // Make items draggable
    this.itemsGroup.children.iterate(item => {
      item.setInteractive();
      item.setScale(.5);
      this.input.setDraggable(item);
      this.physics.world.enable(item);
    item.body.allowGravity = false;
    item.body.setCollideWorldBounds(true);
    });

    //--------------------------------------CHARACTERS--------------------------------------//

    //ALEXA
    this.alexaSprite = this.physics.add.sprite(0, 0, 'alexa').setOrigin(0, 0).setScale(.5);
    this.alexaSprite.body.allowGravity = false;

    //Animation
    this.alexaSprite.anims.create({
      key: 'a_playIdle',
      frames: this.anims.generateFrameNumbers('alexa', { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1
    });

    this.alexaSprite.play('a_playIdle');

  //--------------------------------------MOVEMENT--------------------------------------//
  
  // Enable physics for Alexa
  this.physics.world.enable(this.alexaSprite);



  // Set up arrow key input
  this.cursor = this.input.keyboard.createCursorKeys();

    
    //--------------------------------------GAME LOGIC--------------------------------------//

    this.alexaSprite.body.setCollideWorldBounds(true);


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

    //DIALOGUE
    this.dialogueText = this.add.text(sizes.width / 2, sizes.height / 2, '', {
      fontSize: '24px',
      fill: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: {
        x: 10,
        y: 5
      },
    }).setOrigin(0.5).setDepth(1);

    this.dialogueText.setText('Can you help me collect the \nitems before my boyfriend \nwakes up?'); 
  }

  update() {

    // Update Alexa's movement in the update loop
    const speed = 350;

    if (this.cursor.left.isDown) {
      this.alexaSprite.setVelocityX(-speed);
    } else if (this.cursor.right.isDown) {
      this.alexaSprite.setVelocityX(speed);
    } else {
      this.alexaSprite.setVelocityX(0);
    }

    if (this.cursor.up.isDown) {
      this.alexaSprite.setVelocityY(-speed);
    } else if (this.cursor.down.isDown) {
      this.alexaSprite.setVelocityY(speed);
    } else {
      this.alexaSprite.setVelocityY(0);
    }

    //dialogue

    this.physics.world.overlap(this.alexaSprite, this.itemsGroup, this.handleItemCollision, null, this);


  }

  handleItemCollision(alexaSprite, item) {
    // Display dialogue
    this.dialogueText.setText('Item collected!'); // Customize the dialogue text
    // Make the item disappear
    item.destroy();
  }

  endNow(){

  }

}
