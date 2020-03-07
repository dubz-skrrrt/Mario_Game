
//var Titlescreen= 'js/scenes/Titlescreen.js';
//var level1 = 'js/scenes/levels/level1.js';

var config = {
    type: Phaser.AUTO,
      width: 1400,
      height: 768,
      scene: [Scene1, Level1, Level2, Level3, Level4, death, uG],
      physics: {
          default: 'arcade',
          
          arcade: {
              gravity: {y: 500},
              debug: true,
              overlapBias: 20
          }
      },
     
  };
  

  let game = new Phaser.Game(config);