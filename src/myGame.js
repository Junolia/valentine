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
    // Paddle
    this.load.image("paddle", "/assets/paddle.png");
    // Rug
    this.load.image("rug", "/assets/rug.png");
    // Chair
    this.load.image("chair", "/assets/chair.png");
    // Pillow
    this.load.image("pillow", "/assets/pillow.png");
    // Basket image
    this.load.image("basket", "/assets/basket.png");
    // Items
    this.load.image("sour", "/assets/sourpatch.png");
    this.load.image("soul", "/assets/souleater.png");
    this.load.image("skinny", "/assets/skinnypop.png");
    this.load.image("kombucha", "/assets/kombucha.png");
    this.load.image("onepc", "/assets/onePiece.png");
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
      frameWidth: 235, 
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
    this.bedSprite = this.add.sprite(50, sizes.height - 270, 'bed').setOrigin(0, 0).setScale(.5).setDepth(5);
    this.bedSprite.anims.create({
      key: 'b_playIdle',
      frames: this.anims.generateFrameNumbers('bed', { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1
    });

    this.bedSprite.play('b_playIdle');

    //**SPECIAL CASES**//

    // Rug
    this.rug = this.physics.add.image(255, 350, 'rug').setOrigin(0, 0).setDepth(4); 
    this.rug.body.allowGravity = false;
    this.rug.setInteractive();
    this.input.setDraggable(this.rug);

    // Pillow
    this.pillow = this.physics.add.image(80, 340, 'pillow').setOrigin(0, 0).setDepth(3); 
    this.pillow.body.allowGravity = false;
    this.pillow.setInteractive();
    this.input.setDraggable(this.pillow);

    // Chair
    this.add.image(25, 310, 'chair').setOrigin(0,0);

    //**DRAGGABLE**/

    this.movableObjects = [];

    this.movableObjects.push(this.physics.add.image(450, 240, 'trash').setOrigin(0, 0).setScale(.4));
    this.movableObjects.push(this.physics.add.image(220, 130, 'paddle').setOrigin(0, 0).setScale(.6));

    this.movableObjects.forEach(item => {
      item.setImmovable(true); // Prevents item from being moved by collisions
      item.body.setSize(item.width, item.height); // Set collider size
      item.body.allowGravity = false;
      item.setDepth(1);

      item.setInteractive();
      this.input.setDraggable(item);
      item.body.setCollideWorldBounds(true);

  });
   
    // Desk 
    this.desk = this.physics.add.image(200, 100, "desk").setOrigin(0, 0).setScale(.7);
    this.desk.setImmovable(true); // Prevents desk from being moved by collisions
    this.desk.body.setSize(this.desk.width, this.desk.height); // Set collider size
    this.desk.body.allowGravity = false;

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
        this.collectableItems.push(this.add.sprite(400, 350, 'soul').setOrigin(0, 0).setScale(.5));
        this.collectableItems.push(this.add.sprite(400, sizes.height - 350, 'skinny').setOrigin(0, 0).setScale(.4));
        this.collectableItems.push(this.add.sprite(455, 240, 'kombucha').setOrigin(0, 0).setScale(.3));
        this.collectableItems.push(this.add.sprite(225,180, 'onepc').setOrigin(0, 0).setScale(.3));
        this.collectableItems.push(this.add.sprite(95, 355, 'lindor').setOrigin(0, 0).setScale(.4));
        this.collectableItems.push(this.add.sprite(500, sizes.height - 350, 'airh').setOrigin(0, 0).setScale(.3));
        // Make each collectable item draggable and add properties
        for (let i = 0; i < this.collectableItems.length; ++i){
          this.collectableItems[i].setData('desc', this.itemDescriptions[i]);
        }
        this.collectableItems.forEach(item => {
            item.setInteractive();
            this.physics.world.enable(item);
            item.body.allowGravity = false;
            item.body.setCollideWorldBounds(true);
        });

        // Special settings for lindor
        this.collectableItems[5].setInteractive(false);
        this.physics.world.disable(this.collectableItems[5]);

        //Special settings for soul
        this.collectableItems[1].setInteractive(false);
        this.physics.world.disable(this.collectableItems[1]);
    //--------------------------------------CHARACTERS--------------------------------------//

    //ALEXA
    this.alexaSprite = this.physics.add.sprite(600, 500, 'front_idle').setScale(.4).setDepth(6).setOrigin(.5, .5);
    this.alexaSprite.body.allowGravity = false;
    // Set collisions 
    
   
    this.movableObjects.forEach(item => {
      this.physics.world.enable([item, this.alexaSprite]);
      this.physics.add.collider(item, this.alexaSprite);
    });

    this.alexaSprite.setSize(100, 20);
        this.alexaSprite.setOffset(this.alexaSprite.width/2.7, this.alexaSprite.height - 50);
    // Front idle
    this.alexaSprite.anims.create({
      key: 'a_front_idle',
      frames: this.anims.generateFrameNumbers('front_idle', { start: 0, end: 4 }),
      frameRate: 4,
      repeat: -1,
    });

    // Side Idle
    this.alexaSprite.anims.create({
      key: 'a_side_idle',
      frames: this.anims.generateFrameNumbers('side_idle', { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1,
    });

    // Back Idle
    this.alexaSprite.anims.create({
      key: 'a_back_idle',
      frames: this.anims.generateFrameNumbers('back_idle', { start: 0, end: 4 }),
      frameRate: 4,
      repeat: -1,
    });

    // Front Walk
    this.alexaSprite.anims.create({
      key: 'a_front_walk',
      frames: this.anims.generateFrameNumbers('front_walk', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    // Side Walk
    this.alexaSprite.anims.create({
      key: 'a_side_walk',
      frames: this.anims.generateFrameNumbers('side_walk', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    // Back Walk 
    this.alexaSprite.anims.create({
      key: 'a_back_walk',
      frames: this.anims.generateFrameNumbers('back_walk', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    //this.alexaSprite.setSizeToFrame('front_walk');

    this.alexaSprite.play('a_front_idle');

  //--------------------------------------MOVEMENT--------------------------------------//
  
  // Enable physics for Alexa

  // Set up arrow key input
  this.cursor = this.input.keyboard.createCursorKeys();

    //--------------------------------------GAME LOGIC--------------------------------------//

    this.alexaSprite.body.setCollideWorldBounds(true);


    // Handle drag events
    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xFFB6C1);
    });

    let lindor = 0;
    let soul = 0;
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      if(gameObject.texture.key === 'pillow' && lindor == 0){
        this.physics.world.enable(this.collectableItems[5]);
        times = 1;
      } 

      if(gameObject.texture.key === 'rug' && soul == 0){
        this.physics.world.enable(this.collectableItems[1]);
        times = 1;
      }
    });

    this.input.on('dragend', function (pointer, gameObject) {
      gameObject.clearTint();
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
    
    if (this.cursor.left.isDown) {
      this.alexaSprite.setOffset(100, this.alexaSprite.height - 50);
      this.alexaSprite.setVelocityX(-speed);
      this.alexaSprite.flipX = true;

      this.alexaSprite.play('a_side_walk', true);
  } else if (this.cursor.right.isDown) {
    this.alexaSprite.setOffset(100 , this.alexaSprite.height - 50);
      this.alexaSprite.setVelocityX(speed);
      this.alexaSprite.flipX = false;
      this.alexaSprite.play('a_side_walk', true);
  } else {
      // Restore original origin and collision box
      this.alexaSprite.setOffset(this.alexaSprite.width/2.7, this.alexaSprite.height - 50);
      this.alexaSprite.setVelocityX(0);
  }

    if (this.cursor.up.isDown) {
      this.alexaSprite.setOffset(this.alexaSprite.width/2.7, this.alexaSprite.height - 50);
      this.alexaSprite.setVelocityY(-speed);
      this.alexaSprite.setScale(.4);
      this.alexaSprite.play('a_back_walk', true);
    } else if (this.cursor.down.isDown) {
      this.alexaSprite.setOffset(this.alexaSprite.width/2.7, this.alexaSprite.height - 50);
      this.alexaSprite.setVelocityY(speed)
      this.alexaSprite.setScale(.4);
      this.alexaSprite.play('a_front_walk', true);
    } else {
      this.alexaSprite.setVelocityY(0);

       if (!this.cursor.left.isDown &&this.prevCursorLeft) {
        this.alexaSprite.flipX = true;
        this.alexaSprite.setOffset(20, this.alexaSprite.height - 50);
        this.alexaSprite.play('a_side_idle');
       } else if (!this.cursor.right.isDown &&this.prevCursorRight) {
        this.alexaSprite.setOffset(20, this.alexaSprite.height - 50);
        this.alexaSprite.flipX = false;
        this.alexaSprite.play('a_side_idle');
       } else if (!this.cursor.down.isDown &&this.prevCursorDown) {
        this.alexaSprite.setOffset(this.alexaSprite.width/2.7, this.alexaSprite.height - 50);
        this.alexaSprite.flipX = false;
        this.alexaSprite.play('a_front_idle');
       } else if (!this.cursor.up.isDown &&this.prevCursorUp) {
        this.alexaSprite.setOffset(this.alexaSprite.width/2.7, this.alexaSprite.height - 50);
        this.alexaSprite.flipX = false;
        this.alexaSprite.play('a_back_idle');
       }

    }

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