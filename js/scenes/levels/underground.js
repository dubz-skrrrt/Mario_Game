var spipelayer, ugroundLayer, map1_2;
class uG extends Phaser.Scene{
    constructor(){
        super('under');
    }

    preload(){
        this.load.tilemapTiledJSON('map1_2', 'assets/maps/map1_2.json');
        this.load.spritesheet('utiles', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
        
        this.load.image('sptiles', 'assets/images/sidePipe.png', {frameWidth: 68, frameHeight: 64});
    }
    create(){
    cur_score = score;
    map1_2 = this.make.tilemap({key: 'map1_2'});
    var ugroundTiles = map1_2.addTilesetImage('Tileset', 'utiles');
    // create the ground layer
    ugroundLayer = map1_2.createDynamicLayer('graphics', ugroundTiles, 0, 0);
    // the player will collide with this layer
    ugroundLayer.setCollisionByExclusion([-1]);

    var coinTiles = map1_2.addTilesetImage('Coins', 'coins');
    coinLayer = map1_2.createDynamicLayer('Coins', coinTiles, 0, 0);

    var spipetiles = map1_2.addTilesetImage('sidePipe', 'sptiles');
    spipelayer = map1_2.createDynamicLayer('exit', spipetiles, 0, 0);
    spipelayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = ugroundLayer.width;
    this.physics.world.bounds.height = ugroundLayer.height;

    player = this.physics.add.sprite(40, 300, 'player').setScale(0.5);
    player.setBounce(0.1); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map 
    
    player.body.setSize(player.width, player.height);
    player.body.gravity.y = 2000;
    player.body.offset.setTo(0, -6);

    this.physics.add.collider(ugroundLayer, player);
    this.physics.add.collider(spipelayer, player, exitPipe, null, this);
    
    cursors = this.input.keyboard.createCursorKeys();

    coinLayer.setTileIndexCallback(341, collectCoin, this);
   
    this.physics.add.overlap(player, coinLayer);

    this.cameras.main.setBounds(0, -50, map.widthInPixels, map.heightInPixels);
    
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
      text_world.setText('WORLD' + '\n' + ' 1-1');
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
    if (cur_timer > 0){
        cur_timer-= 0.03;
        text_time.setText('TIME' + '\n' + Math.round(cur_timer));
        
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
    }
}

function exitPipe(){
    deadpoint = false;
    if (player.body.blocked.right && cursors.right.isDown){
        console.log('enter');
        this.scene.start('playGame');
        cur_coin = score_coin;
        cur_score = score;
        timer = cur_timer;
        playerX = 5530;
        playerY = 400;
    }
}