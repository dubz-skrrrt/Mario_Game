var groundLayer2, startLayer, map2, boxlayer2, breaklayer2, savePoint2, bglayer2;
class Level2 extends Phaser.Scene{
    constructor(){
        super("playGame2");
    }

    preload(){
        this.load.tilemapTiledJSON('map2', 'assets/maps/map2.json');
        this.load.spritesheet('tiles2', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('stiles2', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('rtiles2', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('dtiles2', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('brtiles2', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('savetiles2', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('bgtiles2', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('btiles2', 'assets/images/ran.png', {frameWidth: 32, frameHeight: 32});
    }

    create(){
        timer = 100;
        savepoint = 2;
        act = true;
        cur_score = score;
        music.mute = false;
        map2 = this.make.tilemap({key: 'map2'});

        var groundTiles2 = map2.addTilesetImage('Tileset', 'tiles2');
        // create the ground layer
        groundLayer2 = map2.createDynamicLayer('graphics', groundTiles2, 0, 0);
        // the player will collide with this layer
        groundLayer2.setCollisionByExclusion([-1]);

        var startTiles = map2.addTilesetImage('Tileset', 'stiles2');
        // create the ground layer
        startLayer = map2.createDynamicLayer('start', startTiles, 0, 0);
        // the player will collide with this layer
        startLayer.setCollisionByExclusion([-1]);

        var coinTiles = map2.addTilesetImage('Coins', 'coins');
        coinLayer = map2.createDynamicLayer('Coins', coinTiles, 0, 0);

        var boxTiles2 = map2.addTilesetImage('BoxC', 'btiles2');
        boxlayer2 = map2.createDynamicLayer('boxcoin', boxTiles2, 0, 0);
        boxlayer2.setCollisionByExclusion([-1]);

        var rc2 = map2.addTilesetImage('Tileset', 'rtiles2');
        recoin = map2.createDynamicLayer('reCoin', rc2, 0, 0);
        recoin.setCollisionByExclusion([-1]);

        var oob2=  map2.addTilesetImage('Tileset', 'dtiles2');
        oobLayer = map2.createDynamicLayer('OOB', oob2, 0, 0);
        oobLayer.setCollisionByExclusion([-1]);
        oobLayer.alpha = 0;

        var breakTiles2 = map2.addTilesetImage('Tileset', 'brtiles2');
        breaklayer2 = map2.createDynamicLayer('break', breakTiles2, 0, 0);
        breaklayer2.setCollisionByExclusion([-1]);

        var pole2 =  map2.addTilesetImage('Tileset', 'savetiles2');
        savePoint2 = map2.createDynamicLayer('Save', pole2, 0, 0);
        savePoint2.setCollisionByExclusion([-1]);

        var bgtiles2 = map2.addTilesetImage('Tileset', 'bgtiles2');
        bglayer2 = map2.createDynamicLayer('Nextlevel', bgtiles2, 0, 0);
        bglayer2.setCollisionByExclusion([-1]);

        this.physics.world.bounds.width = groundLayer2.width;
        this.physics.world.bounds.height = groundLayer2.height;

        player = this.physics.add.sprite(playerX, playerY, 'player').setScale(0.5);
        player.setBounce(0.1); // our player will bounce from items
        player.setCollideWorldBounds(true); // don't go out of the map 
        
        // player.body.setSize(player.width, player.height);
        player.body.gravity.y = 2000;
        player.body.offset.setTo(0, -6);

        cursors = this.input.keyboard.createCursorKeys();

        coinLayer.setTileIndexCallback(337, collectCoin, this);

        this.physics.add.collider(player, groundLayer2);
        this.physics.add.collider(player, startLayer);
        this.physics.add.collider(oobLayer, player, outofBounds, null, this);
        this.physics.add.collider(boxlayer2, player, boxC, null, this);
        this.physics.add.collider(breaklayer2, player, breakT, null, this);
        this.physics.add.collider(recoin, player, reC, null, this);
        this.physics.add.collider(savePoint2, player, save_next, null, this);
        this.physics.add.collider(bglayer2, player, NextLevel2, null, this);
        this.physics.add.overlap(player, coinLayer);

        //breaklayer2.setTileIndexCallback(, collectCoin, this);

        this.cameras.main.setBounds(0, -60, map.widthInPixels, map.heightInPixels);
        
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
          breaklayer2.alpha = 1;

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
          savePoint2.setCollisionByExclusion(0);
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


function NextLevel2(){
    this.scene.start('playGame3');
    playerX = 100;
    playerY = 500;
    act = true;
    clear_d = 20;
  }