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

    // Desk 
    this.load.image("desk", "/assets/desk.png");
    // Trash
    this.load.image("trash", "/assets/trash.png");
    // Basket image
    this.load.image("basket", "/assets/basket.png");
    // Items
    this.load.image("sour", "/assets/sourpatch.png");
    this.load.image("soul", "/assets/souleater.png");
    this.load.image("skinny", "/assets/skinnypop.png");
    this.load.image("kombucha", "/assets/kombucha.png");
    this.load.image("onepc", "/assets/onePeice.png");
    this.load.image("lindor", "/assets/lindor.png");
    this.load.image("airh", "/assets/airhead.png");


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

    this.load.spritesheet('side_walk', '/assets/side_walk.png', {
      frameWidth: 116, 
      frameHeight: 252,
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

   
    // Desk 
    this.desk = this.physics.add.image(200, 100, "desk").setOrigin(0, 0).setScale(.7);
    this.desk.setImmovable(true); // Prevents desk from being moved by collisions
    this.desk.body.setSize(this.desk.width, this.desk.height); // Set collider size
    this.desk.body.allowGravity = false;

    //Trash bin
    this.trashcan = this.physics.add.image(360, 200, 'trash').setOrigin(0, 0).setScale(.4);
    this.trashcan.setImmovable(true); // Prevents trashcan from being moved by collisions
    this.trashcan.body.setSize(this.trashcan.width, this.trashcan.height); // Set collider size
    this.trashcan.body.allowGravity = false;
    //--------------------------------------BASKET--------------------------------------//
    const basket = this.add.image(sizes.width - 150, 500, "basket").setInteractive().setScale(.4);
    this.input.setDraggable(basket);

    //--------------------------------------ITEMS--------------------------------------//

    //*** COLLECTABLES ***/

        // Create an array to hold all collectable items
        this.collectableItems = [];
        this.itemDescriptions = [];

        this.itemDescriptions.push('A candy that my boyfriend used to eat all the time.\n He does have good taste.')
        this.itemDescriptions.push('He\'s a huge terraria ner--I mean fan,\n I hope this little critter won\'t scare his roomate!');
        this.itemDescriptions.push('Also known as "dinner". Maybe I shouldn\'t\n be feeding into his bad eating habits...');
        this.itemDescriptions.push('Oh this? Definately not going in the basket.');
        this.itemDescriptions.push('You found the one peice?! Oh...it\'s\n just stickers. It\'ll have to do.');
        this.itemDescriptions.push('Reminiscent of our first picnic at my\n house, something sweet for someone sweet. ');
        this.itemDescriptions.push('This would do nicely!');

        // Add each collectable item to the array and set them up individually
        this.collectableItems.push(this.add.sprite(300, sizes.height - 350, 'sour').setOrigin(0, 0).setScale(.3));
        this.collectableItems.push(this.add.sprite(200, sizes.height - 350, 'soul').setOrigin(0, 0).setScale(.5));
        this.collectableItems.push(this.add.sprite(400, sizes.height - 350, 'skinny').setOrigin(0, 0).setScale(.4))
        this.collectableItems.push(this.add.sprite(250, sizes.height - 350, 'kombucha').setOrigin(0, 0).setScale(.4))
        this.collectableItems.push(this.add.sprite(500 , sizes.height - 253, 'onepc').setOrigin(0, 0).setScale(.3))
        this.collectableItems.push(this.add.sprite(400, sizes.height - 253, 'lindor').setOrigin(0, 0).setScale(.4))
        this.collectableItems.push(this.add.sprite(500, sizes.height - 350, 'airh').setOrigin(0, 0).setScale(.3))
        // Make each collectable item draggable and add properties

        for (let i = 0; i < this.collectableItems.length; ++i){
          this.collectableItems[i].setData('desc', this.itemDescriptions[i]);
        }
        this.collectableItems.forEach(item => {
            item.setInteractive();
            item.setScale(.3);
            this.input.setDraggable(item);
            this.physics.world.enable(item);
            item.body.allowGravity = false;
            item.body.setCollideWorldBounds(true);
        });
    // Sour patch
      /**
       * A candy that my boyfriend used to eat all the time. He does have good taste.
       */
    // Soul eater
      /**
       * He's a huge terraria ner--I mean fan, I hope this little critter won't scare his roomate!
       */
    // Skinny Pop
      /**
       * Also known as "dinner". Maybe I shouldn't be feeding into his bad eating habits...
       */
    // Kombucha
      /**
       * Oh this? Definately not going in the basket.
       */
    // One Peice
      /**
       * You found the one peice?! Oh...it's just stickers. It'll have to do. 
       */

    // Lindor Chocolates
      /**
       * Reminiscent of our first picnic at my house, something sweet for someone sweet. 
       */
      // Air heads
      /**
       * This would do nicely!
       */

    //*** COLLECTABLES ***/

    //--------------------------------------CHARACTERS--------------------------------------//

    //ALEXA
    this.alexaSprite = this.physics.add.sprite(50, sizes.height - 400, 'front_idle').setOrigin(0.5, 0.5).setScale(.4);
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
    this.alexaSprite.anims.create({
      key: 'a_side_walk',
      frames: this.anims.generateFrameNumbers('side_walk', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
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
      gameObject.setTint(0xFFB6C1);
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
    this.dialogueText = this.add.text(sizes.width / 2, 50, '', {
      fontSize: '20px',
      fill: '#fff',
      backgroundColor: 'rgb(86,61,45, .5)',
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
    let scale = 0.4; 

    if (this.cursor.left.isDown) {
      this.alexaSprite.setVelocityX(-speed);
      this.alexaSprite.flipX = true;
      // Adjust origin and collision box when flipping horizontally
      this.alexaSprite.setOrigin(0.5, 0.5);

      scale = .8;
      this.alexaSprite.play('a_side_walk', true);
  } else if (this.cursor.right.isDown) {
      this.alexaSprite.setVelocityX(speed);
      this.alexaSprite.flipX = false;
      this.alexaSprite.setOrigin(0.5, 0.5);
      scale = .8;
      this.alexaSprite.play('a_side_walk', true);
  } else {
      // Restore original origin and collision box
      this.alexaSprite.setOrigin(0.5, 0.5);
      scale = .4;
      this.alexaSprite.setVelocityX(0);
  }

    if (this.cursor.up.isDown) {
      this.alexaSprite.setVelocityY(-speed);
      this.alexaSprite.setScale(.4);
      scale = .4;
      this.alexaSprite.play('a_back_walk', true);
    } else if (this.cursor.down.isDown) {
      this.alexaSprite.setVelocityY(speed)
      this.alexaSprite.setScale(.4);
      scale = .4;
      this.alexaSprite.play('a_front_walk', true);
    } else {
      this.alexaSprite.setVelocityY(0);

       if (!this.cursor.left.isDown &&this.prevCursorLeft) {
        this.alexaSprite.flipX = true;
        scale = .4;
        this.alexaSprite.play('a_side_idle');
       } else if (!this.cursor.right.isDown &&this.prevCursorRight) {
        this.alexaSprite.flipX = false;
        scale = .4;
        this.alexaSprite.play('a_side_idle');
       } else if (!this.cursor.down.isDown &&this.prevCursorDown) {
        this.alexaSprite.flipX = false;
        scale = .4;
        this.alexaSprite.play('a_front_idle');
       } else if (!this.cursor.up.isDown &&this.prevCursorUp) {
        this.alexaSprite.flipX = false;
        scale = .4;
        this.alexaSprite.play('a_back_idle');
       }
    }

    this.alexaSprite.setScale(scale);
    this.alexaSprite.body.setSize(this.alexaSprite.width, this.alexaSprite.height, false); 

    this.prevCursorLeft = this.cursor.left.isDown;
    this.prevCursorRight = this.cursor.right.isDown;
    this.prevCursorDown = this.cursor.down.isDown;
    this.prevCursorUp = this.cursor.up.isDown;
    //dialogue
    this.physics.world.overlap(this.alexaSprite, this.collectableItems, this.handleItemCollision, null, this);

  

  }
  handleBedClick(pointer, localX, localY, event) {
        // Change the dialogue text when alexaSprite is clicked
        this.dialogueText.setText('Shh, he\'s sleeping!'); // Change this to your desired text
      }
  handleItemCollision(alexaSprite, item) {
    // Display dialogue
    this.dialogueText.setText(item.getData('desc')); // Customize the dialogue text
    // Make the item disappear
    item.destroy();

    // Play the ping sound
    this.ping.play();
  }

  endNow(){

  }

}