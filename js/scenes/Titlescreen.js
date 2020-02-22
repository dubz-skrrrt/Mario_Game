class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  preload(){
    this.load.spritesheet('btn1', 'assets/images/playbtn.png',{frameWidth:400,frameHeight:200});
    this.load.image('backg', 'assets/images/background.jpg');
  }
  create() {
    this.add.image(600,150, 'backg');
    text = this.add.text(560, 50, 'Mario', {
      fontSize: '100px',
      fill: '#000000'
  });
    text.setText('Mario');
   
    const helloButton = this.add.sprite(700, 340, 'btn1', { fill: '#ffb6c1' });
    helloButton.setInteractive();
    helloButton.on('pointerover', function pointer(pointer){
        helloButton.setFrame(1);
    })
    helloButton.on('pointerout', function pointer(pointer){
        helloButton.setFrame(0);
    }) 
    helloButton.on('pointerdown', () => { 
      this.scene.start("playGame");
    });

    
  }
  
}

