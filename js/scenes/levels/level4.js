var groundLayer4, startLayer4, map4 , boxlayer4, savePoint4, bglayer4;
class Level4 extends Phaser.Scene{
    constructor(){
        super("playGame4");
    }

    preload(){
        this.load.tilemapTiledJSON('map4', 'assets/maps/map4.json');
        this.load.spritesheet('tiles4', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('stiles4', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('dtiles4', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('savetiles4', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('bgtiles4', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('btiles4', 'assets/images/ran.png', {frameWidth: 32, frameHeight: 32});
    }

    create(){
        act = true;
        timer = 200;
        savepoint = 4;
        cur_score = score;
        music.mute = false;
        map4 = this.make.tilemap({key: 'map4'});

        var groundTiles4 = map4.addTilesetImage('Tileset', 'tiles4');
        // create the ground layer
        groundLayer4 = map4.createDynamicLayer('graphics', groundTiles4, 0, 0);
        // the player will collide with this layer
        groundLayer4.setCollisionByExclusion([-1]);


        var coinTiles = map4.addTilesetImage('Coins', 'coins');
        coinLayer = map4.createDynamicLayer('Coins', coinTiles, 0, 0);

        var boxTiles4 = map4.addTilesetImage('BoxC', 'btiles4');
        boxlayer4 = map4.createDynamicLayer('boxcoin', boxTiles4, 0, 0);
        boxlayer4.setCollisionByExclusion([-1]);

        // var rc4 = map4.addTilesetImage('Tileset', 'rtiles4');
        // recoin = map4.createDynamicLayer('reCoin', rc4, 0, 0);
        // recoin.setCollisionByExclusion([-1]);

        var oob4=  map4.addTilesetImage('Tileset', 'dtiles4');
        oobLayer = map4.createDynamicLayer('OOB', oob4, 0, 0);
        oobLayer.setCollisionByExclusion([-1]);
        oobLayer.alpha = 0;

        var pole4 =  map4.addTilesetImage('Tileset', 'savetiles4');
        savePoint4 = map4.createDynamicLayer('Save', pole4, 0, 0);
        savePoint4.setCollisionByExclusion([-1]);

        var bgtiles4 = map4.addTilesetImage('Tileset', 'bgtiles4');
        bglayer4 = map4.createDynamicLayer('Nextlevel', bgtiles4, 0, 0);
        bglayer4.setCollisionByExclusion([-1]);

        this.physics.world.bounds.width = groundLayer4.width;
        this.physics.world.bounds.height = groundLayer4.height;

        player = this.physics.add.sprite(playerX, playerY, 'player').setScale(0.5);
        player.setBounce(0.1); // our player will bounce from items
        player.setCollideWorldBounds(true); // don't go out of the map 
        
        player.body.setSize(player.width, player.height);
        player.body.gravity.y = 2000;
        player.body.offset.setTo(0, -6);

        cursors = this.input.keyboard.createCursorKeys();

        coinLayer.setTileIndexCallback(338, collectCoin, this);

        this.physics.add.collider(player, groundLayer4);
        //this.physics.add.collider(player, startLayer4);
        this.physics.add.collider(oobLayer, player, outofBounds, null, this);
        this.physics.add.collider(boxlayer4, player, boxC, null, this);
        
        //this.physics.add.collider(recoin, player, reC, null, this);
        this.physics.add.collider(savePoint4, player, save_next, null, this);
        this.physics.add.collider(bglayer4, player, NextLevel4, null, this);
        this.physics.add.overlap(player, coinLayer);

        //breaklayer2.setTileIndexCallback(, collectCoin, this);

        this.cameras.main.setBounds(0, -60, map4.widthInPixels, map4.heightInPixels);
        
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
          savePoint4.setCollisionByExclusion(0);
          player.body.setVelocityX(100);
          if (player.body.onFloor()){
            player.anims.play('walk', true);
          }
        }
    }
    }
    
}


function NextLevel4(){
    this.scene.start('bootGame');
    playerX = 100;
    playerY = 500;
    act = true;
    clear_d = 20;
  }