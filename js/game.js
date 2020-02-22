
//var Titlescreen= 'js/scenes/Titlescreen.js';
//var level1 = 'js/scenes/levels/level1.js';

var config = {
    type: Phaser.AUTO,
      width: 1400,
      height: 768,
      scene: [Scene1, Scene2],
      physics: {
          default: 'arcade',
          arcade: {
              gravity: {y: 500},
              debug: false
          }
      },
     
  };
  
  
  let game = new Phaser.Game(config);