var groundLayer3, startLayer3, map3, boxlayer3, savePoint3, spikelayer3;
var spawnAllowed = true;
var enemyGroup;
var create;
var time_act;
var countD;
var firstwd, secondwd;
class Level3 extends Phaser.Scene{
    constructor(){
        super("playGame3");
    }
    
    preload(){
        this.load.tilemapTiledJSON('map3', 'assets/maps/map3.json');
        this.load.spritesheet('tiles3', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('stiles3', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.image('btiles3', 'assets/images/ran.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('dtiles3', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('savetiles3', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('bgtiles3', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('sktiles3', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});

        this.load.image('canon', 'assets/images/canonD.png', {frameWidth: 30, frameHeight:48});
    }

    create(){

        timer = 100;
        savepoint = 3;
        cur_score = score;
        act = true;
        music.mute = false;
        this.sound.add('canonH');
        map3 = this.make.tilemap({key: 'map3'});
        
        var groundTiles3 = map3.addTilesetImage('Tileset', 'tiles3');
        // create the ground layer
        groundLayer3 = map3.createDynamicLayer('graphics', groundTiles3, 0, 0);
        // the player will collide with this layer
        groundLayer3.setCollisionByExclusion([-1]);

        var startTiles3 = map3.addTilesetImage('Tileset', 'stiles3');
        // create the ground layer
        startLayer3 = map3.createDynamicLayer('start', startTiles3, 0, 0);
        // the player will collide with this layer
        startLayer3.setCollisionByExclusion([-1]);

        var coinTiles = map3.addTilesetImage('Coins', 'coins');
        coinLayer = map3.createDynamicLayer('Coins', coinTiles, 0, 0);

        var boxTiles3 = map3.addTilesetImage('BoxC', 'btiles3');
        boxlayer3 = map3.createDynamicLayer('boxcoin', boxTiles3, 0, 0);
        boxlayer3.setCollisionByExclusion([-1]);

        // var rc2 = map3.addTilesetImage('Tileset', 'rtiles2');
        // recoin = map3.createDynamicLayer('reCoin', rc2, 0, 0);
        // recoin.setCollisionByExclusion([-1]);

        var oob3=  map3.addTilesetImage('Tileset', 'dtiles3');
        oobLayer = map3.createDynamicLayer('OOB', oob3, 0, 0);
        oobLayer.setCollisionByExclusion([-1]);
        oobLayer.alpha = 0;

        var sktiles3 = map3.addTilesetImage('Tileset', 'sktiles3');
        spikelayer3 = map3.createDynamicLayer('spikes', sktiles3, 0, 0);
        spikelayer3.setCollisionByExclusion([-1]);

        var pole3 =  map3.addTilesetImage('Tileset', 'savetiles3');
        savePoint3 = map3.createDynamicLayer('Save', pole3, 0, 0);
        savePoint3.setCollisionByExclusion([-1]);

        var bgtiles3 = map3.addTilesetImage('Tileset', 'bgtiles3');
        bglayer = map3.createDynamicLayer('Nextlevel', bgtiles3, 0, 0);
        bglayer.setCollisionByExclusion([-1]);

        
        this.physics.world.bounds.width = groundLayer3.width;
        this.physics.world.bounds.height = groundLayer3.height;

        player = this.physics.add.sprite(playerX, playerY, 'player').setScale(0.5);
        player.setBounce(0.1); // our player will bounce from items
        player.setCollideWorldBounds(true); // don't go out of the map 
        
        player.body.setSize(player.width, player.height);
        player.body.gravity.y = 2000;
        player.body.offset.setTo(0, -6);
        enemyGroup = this.physics.add.group(); // create group
            createNewEnemy();
        enemyGroup.children.iterate(function (child) {
            //child.setCollideWorldBounds(true);
    
            time_act = true;
            child.body.gravity.y = 500;
        });
        cursors = this.input.keyboard.createCursorKeys();

        coinLayer.setTileIndexCallback(337, collectCoin, this);

        this.physics.add.collider(player, groundLayer3);
        
        this.physics.add.collider(player, startLayer3);
        this.physics.add.collider(player, enemyGroup, CanonHit, null, this);
        this.physics.add.collider(oobLayer, player, outofBounds, null, this);
        this.physics.add.collider(boxlayer3, player, boxC, null, this);
        //this.physics.add.collider(breaklayer2, player, breakT, null, this);
        //this.physics.add.collider(recoin, player, reC, null, this);
        this.physics.add.collider(savePoint3, player, save_next, null, this);
        this.physics.add.collider(spikelayer3, player, outofBounds, null, this);
        this.physics.add.collider(bglayer, player, NextLevel3, null, this);
        this.physics.add.overlap(player, coinLayer);

        //breaklayer2.setTileIndexCallback(, collectCoin, this);

        this.cameras.main.setBounds(0, -60, map3.widthInPixels, map3.heightInPixels);
        
        // make the camera follow the player
        this.cameras.main.startFollow(player);


        // set background color, so the sky is not black    
        this.cameras.main.setBackgroundColor('#ccccff');

        text_lives = this.add.text(1100, 10, 'LIVES', {
      
            fontSize: '30px',
            fill: '#000000'
          });  
          text_lives.setText('LIVES' + '\n  ' + lives);
          text_lives.setScrollFactor(0);
      
          text_time = this.add.text(850, 10, 'TIME', {
            
            fontSize: '30px',
            fill: '#000000'
          });  
          text_time.setText('TIME' + '\n' + timer);
          text_time.setScrollFactor(0);
          var text_world = this.add.text(600, 10, 'WORLD', {
            
            fontSize: '30px',
            fill: '#000000'
          });  
          text_world.setText('WORLD' + '\n' + ' 1-2');
          text_world.setScrollFactor(0);
          text = this.add.text(380, 30, 'x00', {
            
            fontSize: '30px',
            fill: '#000000'
          });
          var img_coin = this.add.image(350, 40, 'coin');  
          text.setText(score_coin   );
      
          text_score = this.add.text(100, 10, 'MARIO', {
            
            fontSize: '30px',
            fill: '#000000'
          });  
          text_score.setText('MARIO' + '\n' + cur_score);
          text_score.setScrollFactor(0);
          // fix the text to the camera
          img_coin.setScrollFactor(0);
          text.setScrollFactor(0);
          
          

    }

    update(time, delta){
        if (time_act){
            if (countD>0){
                countD -= 10;
                //console.log(countD);
            }else{
                createNewEnemy();
                
            }
        }
        if (cursors.left.isDown)
    {
        player.body.setVelocityX(-300);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(300);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
    // jump 
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.setVelocityY(-850);    
        this.sound.play('jumpS');
    }
    //enemy hit

    
    //timer down

    if (timer > 0){
      timer-= 0.03;
      text_time.setText('TIME' + '\n' + Math.round(timer));
      
    }else{
      deadM.play();
      music.mute = true;
      this.scene.start("deathScene");
      timer = 100;
      lives -= 1;
      cur_score = score;
      //console.log(cur_score)
      score_coin = 0;
    }
    if (!act){
        console.log('clear')
        if (clear_d > 0){
          player.body.enable = false;
          clear_d -= 0.5;
        }else{
          player.body.enable = true;
          this.input.enabled = false;
          savePoint3.setCollisionByExclusion(0);
          player.body.setVelocityX(100);
          if (player.body.onFloor()){
            player.anims.play('walk', true);
          }
        }
    }
    }
    
}

function breakT(sprite, tile){
    console.log(player.body.blocked.down);
    if (player.body.blocked.down){
        map2.removeTileAt(tile.x, tile.y, breaklayer2);
        tile.collideUp = false;
        breaklayer2.dirty = true;
        breaklayer2.alpha = 0;
    }
}

function NextLevel3(){
    this.scene.start('playGame4');
    playerX = 60;
    playerY = 50;
    act = true;
}

function createNewEnemy() {
    firstwd = player.body.x - 100;
    secondwd = player.body.x + 200;
    var startY = Phaser.Math.Between(firstwd, secondwd);
    console.log(startY);
    if (spawnAllowed) {
         enemyGroup.createMultiple(
             {
                 key: 'canon',
                 setXY:
                 {
                     x: startY,
                     y: -50,
                     stepX: 500
                 },
                 repeat: 1
             });
             //enemyGroup.create(startY, -50, 'canon', frames); // add sprite to group
         queueEnemy(Phaser.Math.Between(2500, 5000)); // call enemy queue for random between 2.5 and 5 seconds
    }
}

function queueEnemy(timer) {
    countD= timer;
    
    //create = this.game.time.addOnce(timer, createNewEnemy); // add a timer that gets called once, then auto disposes to create a new enemy after the time given
}
function CanonHit(){

    this.sound.play('canonH');
    deadM.play();
    music.mute = true;
    this.scene.start("deathScene");
    delay = 30;
    lives -= 1;
    timer = 100;
  }