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
    this.ping;
  }

  preload() {
    // Game background
    this.load.image("bg", "/assets/room.png");
    // Basket image
    this.load.image("basket", "/assets/basket.png");
    // Items
    this.load.image("item1", "/assets/bunny1.svg");
    // Alexa 
    this.load.spritesheet('front_idle', '/assets/front_idle.png', {
      frameWidth: 288, 
      frameHeight: 512,
    });

    this.load.spritesheet('side_idle', '/assets/a_sideidle.png', {
      frameWidth: 112, 
      frameHeight: 504,
    });

    this.load.spritesheet('back_idle', '/assets/back_idle.png', {
      frameWidth: 288, 
      frameHeight: 512,
    });

    this.load.spritesheet('front_walk', '/assets/front_walk.png', {
      frameWidth: 208, 
      frameHeight: 512,
    });

    this.load.spritesheet('back_walk', '/assets/back.png', {
      frameWidth: 208, 
      frameHeight: 512,
    });

    // Bed
    this.load.spritesheet('bed', '/assets/bed.png', {
      frameWidth: 520, 
      frameHeight: 408,

    });

    //sounds
    this.load.audio("ping", ["/assets/ping.mp3"]);
  }

  create() {
    //--------------------------------------BACKGROUND--------------------------------------//
    // Room
    this.add.image(-10, -100, "bg").setOrigin(0, 0).setScale(.6);
    // Bed
    this.bedSprite = this.add.sprite(50, sizes.height - 253, 'bed').setOrigin(0, 0).setScale(.5);
    this.bedSprite.anims.create({
      key: 'b_playIdle',
      frames: this.anims.generateFrameNumbers('bed', { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1
    });

    this.bedSprite.play('b_playIdle');

    //--------------------------------------BASKET--------------------------------------//
    const basket = this.add.image(sizes.width - 150, 500, "basket").setInteractive().setScale(.4);
    this.input.setDraggable(basket);

    //--------------------------------------ITEMS--------------------------------------//
      this.itemsGroup = this.add.group({
      key: 'item1',
      repeat: 2,
      setXY: { x: 400, y: sizes.height - 100, stepX: 100 }
    });

    
    // Make items draggable
    this.itemsGroup.children.iterate(item => {
      item.setInteractive();
      item.setScale(.3);
      this.input.setDraggable(item);
      this.physics.world.enable(item);
    item.body.allowGravity = false;
    item.body.setCollideWorldBounds(true);
    });

    //--------------------------------------CHARACTERS--------------------------------------//

    //ALEXA
    this.alexaSprite = this.physics.add.sprite(50, sizes.height - 531, 'front_idle').setOrigin(0.5, 0.5).setScale(.4);
    this.alexaSprite.body.allowGravity = false;

    // Front idle
    this.alexaSprite.anims.create({
      key: 'a_front_idle',
      frames: this.anims.generateFrameNumbers('front_idle', { start: 0, end: 4 }),
      frameRate: 4,
      repeat: -1
    });

    // Side Idle
    this.alexaSprite.anims.create({
      key: 'a_side_idle',
      frames: this.anims.generateFrameNumbers('side_idle', { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1
    });

    // Back Idle
    this.alexaSprite.anims.create({
      key: 'a_back_idle',
      frames: this.anims.generateFrameNumbers('back_idle', { start: 0, end: 4 }),
      frameRate: 4,
      repeat: -1
    });

    // Front Walk
    this.alexaSprite.anims.create({
      key: 'a_front_walk',
      frames: this.anims.generateFrameNumbers('front_walk', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    // Side Walk

    // Back Walk 
    this.alexaSprite.anims.create({
      key: 'a_back_walk',
      frames: this.anims.generateFrameNumbers('back_walk', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    this.alexaSprite.play('a_front_idle');

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

    this.ping = this.sound.add('ping', { volume: 0.1, loop: false });

    //DIALOGUE
    this.dialogueText = this.add.text(sizes.width / 2, 150, '', {
      fontSize: '24px',
      fill: '#fff',
      backgroundColor: 'rgb(86,61,45,0.5)',
      padding: {
        x: 10,
        y: 5
      },
    }).setOrigin(0.5).setDepth(1);
    this.bedSprite.setInteractive();
    this.bedSprite.on('pointerdown', this.handleBedClick, this);

    this.dialogueText.setText('Can you help me collect the \nitems before my boyfriend \nwakes up?'); 

    
  }


  update() {

    // Update Alexa's movement in the update loop
    const speed = 350;

    if (this.cursor.left.isDown) {
      this.alexaSprite.setVelocityX(-speed);
       // Check if the cursor direction has changed from right to left

    } else if (this.cursor.right.isDown) {
      this.alexaSprite.setVelocityX(speed);
    } else {
      this.alexaSprite.setVelocityX(0);
    }

    if (this.cursor.up.isDown) {
      this.alexaSprite.setVelocityY(-speed);
      this.alexaSprite.play('a_back_walk', true);
    } else if (this.cursor.down.isDown) {
      this.alexaSprite.setVelocityY(speed);
      this.alexaSprite.play('a_front_walk', true);
    } else {
      this.alexaSprite.setVelocityY(0);

       if (!this.cursor.left.isDown &&this.prevCursorLeft) {
        this.alexaSprite.flipX = true;
        this.alexaSprite.play('a_side_idle');
       } else if (!this.cursor.right.isDown &&this.prevCursorRight) {
        this.alexaSprite.flipX = false;
        this.alexaSprite.play('a_side_idle');
       } else if (!this.cursor.down.isDown &&this.prevCursorDown) {
        this.alexaSprite.flipX = false;
        this.alexaSprite.play('a_front_idle');
       } else if (!this.cursor.up.isDown &&this.prevCursorUp) {
        this.alexaSprite.flipX = false;
        this.alexaSprite.play('a_back_idle');
       }
    }

    this.prevCursorLeft = this.cursor.left.isDown;
    this.prevCursorRight = this.cursor.right.isDown;
    this.prevCursorDown = this.cursor.down.isDown;
    this.prevCursorUp = this.cursor.up.isDown;
    //dialogue
    this.physics.world.overlap(this.alexaSprite, this.itemsGroup, this.handleItemCollision, null, this);


  }
  handleBedClick(pointer, localX, localY, event) {
        // Change the dialogue text when alexaSprite is clicked
        this.dialogueText.setText('Shh, he\'s sleeping!'); // Change this to your desired text
      }
  handleItemCollision(alexaSprite, item) {
    // Display dialogue
    this.dialogueText.setText('Item collected!'); // Customize the dialogue text
    // Make the item disappear
    item.destroy();

    // Play the ping sound
    this.ping.play();
  }

  endNow(){

  }

}
