var highscore_text;
var highscore = 0;
var music;
var savepoint = 0;
class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  preload(){
    
    this.load.spritesheet('btn1', 'assets/images/play.png',{frameWidth:370,frameHeight:220});
    this.load.image('backg', 'assets/images/background.jpg');
    this.load.image('gametitle', 'assets/images/game_title.png');
    this.load.image('coin', 'assets/images/pesoGold.png');
    this.load.audio('getcoin', 'assets/sound_fx/sound_lib/Mp3/Collect_Point_00.mp3', {
        instances: 1
    });
    this.load.audio('deathS', 'assets/sound_fx/sound_lib/Mp3/Jingle_Lose_00.mp3', {
        instances: 1
    });
    this.load.audio('jumpS', 'assets/sound_fx/sound_lib/Mp3/Jump_03.mp3', {
      instances: 1
    });
    this.load.audio('Ekill', 'assets/sound_fx/sound_lib/Mp3/Shoot_01.mp3', {
      instances: 1
    });
    this.load.audio('hit', 'assets/sound_fx/sound_lib/Mp3/Hit_00.mp3', {
      instances: 1
    });
    this.load.audio('clear', 'assets/sound_fx/sound_lib/Mp3/Jingle_Win_00.mp3', {
      instances: 1
    });
    this.load.audio('canonH', 'assets/sound_fx/sound_lib/Mp3/Explosion_02.mp3', {
      instances: 1
    });
    this.load.audio('Theme', 'assets/sound_fx/theme.mp3');
  }
  create() {
    music = this.sound.add('Theme');
    music.play();
    this.add.image(600,190, 'backg');
    this.add.image(690, 190, 'gametitle');
    highscore_text = this.add.text(560, 560, 'Top-', {
      fontSize: '40px',
      fill: '#000000'
  });
    if (cur_score > highscore){ 
      highscore = cur_score;
      highscore_text.setText('Top-' + cur_score);
    }else{
      highscore_text.setText('Top-' + highscore);
    }
    
    text = this.add.text(1000, 10, 'TIME', {
      
      fontSize: '30px',
      fill: '#000000'
    });  
    text.setText('TIME');
  
    text = this.add.text(750, 10, 'WORLD', {
      
      fontSize: '30px',
      fill: '#000000'
    });  
    text.setText('WORLD' + '\n' + ' 1-1');

    text = this.add.text(530, 30, 'x00', {
      
      fontSize: '30px',
      fill: '#000000'
    });
    this.add.image(500, 40, 'coin');  
    text.setText('x00');

    text = this.add.text(250, 10, 'MARIO', {
      
      fontSize: '30px',
      fill: '#000000'
    });  
    text.setText('MARIO' + '\n' + '000000');
    const helloButton = this.add.sprite(670, 420, 'btn1', { fill: '#ffb6c1' });
    helloButton.setInteractive();
    helloButton.on('pointerover', function pointer(pointer){
        helloButton.setFrame(1);
    })
    helloButton.on('pointerout', function pointer(pointer){
        helloButton.setFrame(0);
    }) 
    helloButton.on('pointerdown', () => { 
      score = 0;
      this.scene.start("playGame");
    });

    
  }
}



