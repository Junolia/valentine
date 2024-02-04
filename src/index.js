import '/style.css'
import Phaser from 'phaser'

import MyMenu from './myMenu';
import MyGame from './myGame';
import MyEnd from './myEnd';

const config = {
  type: Phaser.AUTO,
  width: 768,
  height: 672,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false // Set to true for debugging physics
    }
  },
};

const game = new Phaser.Game(config);

game.scene.add("MyMenuKey", MyMenu);
game.scene.add("MyGameKey", MyGame);
game.scene.add("MyEndKey", MyEnd);

game.scene.start("MyMenuKey");