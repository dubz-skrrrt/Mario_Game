var text_lives;
var game_over;
var delay = 30;
class death extends Phaser.Scene{
    constructor(){
        super('deathScene');
    }

    preload(){
        this.load.image('backg', 'assets/images/background.jpg');
        this.load.atlas('player', 'assets/sprites/player.png', 'assets/sprites/player.json');
        this.load.image('gOver', 'assets/images/gameOver.png');
    }

    create(){
        
        this.add.image(690,190, 'backg');
        game_over = this.physics.add.image(690, -150, 'gOver').setScale(0.5);
        text_lives = this.add.text(675, 390, 'lives', {
      
            fontSize: '30px',
            fill: '#000000'
          });
        text_lives.setText('x' + lives);

    }
    update(){
        
        if (lives == 0){
            cur_score = score;
            if (delay > 0){

                
                if (game_over.y < 350){
                    game_over.body.velocity.y = 200;
                }else{
                    game_over.y = 349;
                    game_over.body.velocity.y = 0;
                }
                text_lives.setText('');
                delay -= 0.1;

            }else{
            this.scene.start('bootGame');
            lives = 3;
            }
        }else{
            //console.log(playerX, playerY);
            if (delay > 0){
                delay -= 0.1;
                this.add.image(690, 334, 'player');
                game_over.body.velocity.y = -100;
            }else{
                text_lives.setText('x' + lives);
                if (savepoint == 1){
                    deadpoint = true;
                    score = 0;
                    delay = 30;
                    active = true;
                    this.scene.start('playGame');
                    music.mute = false;
                    music.play();
                    console.log('scene1');
                }else if (savepoint == 2){
                    score = cur_score
                    deadpoint = true;
                    delay = 30;
                    active = true;
                    this.scene.start('playGame2');
                    music.mute = false;
                    music.play();
                    console.log('scene2');
                }else if (savepoint == 3){
                    score = cur_score
                    deadpoint = true;
                    delay = 30;
                    active = true;
                    this.scene.start('playGame3');
                    music.mute = false;
                    music.play();
                    console.log('scene3');
                }else if (savepoint == 4){
                    score = cur_score
                    deadpoint = true;
                    delay = 30;
                    active = true;
                    this.scene.start('playGame4');
                    music.mute = false;
                    music.play();
                    console.log('scene4');
                }
                
            }
        }
    }
}