var map;
var player, enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8;
var cursors;
var groundLayer, coinLayer, bglayer, boxlayer, savePoint, recoin, oobLayer, pipelayer, piplayer;
var text;
var score_coin = 0;
var score = 0;
var timer = 100;
var playerX = 200;
var playerY = 500;
var text_time;
var text_score;
var lives = 3;
var text_lives;
var cur_score = 0;
var active = true;
var deadM;
var act = true;
var re = 10;
var remain_t;
var win;
var clear_d = 20;
var cur_coin, cur_timer, savepoint, deadpoint;

class Level1 extends Phaser.Scene{
  constructor(){
    super("playGame");
    // this function will be called when the player touches a coin

  }
  preload() {
      // map made with Tiled in JSON format
      this.load.tilemapTiledJSON('map', 'assets/maps/map1.json');
      
      // tiles in spritesheet 
      this.load.spritesheet('tiles', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
      this.load.spritesheet('stiles', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
      this.load.spritesheet('rtiles', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
      this.load.spritesheet('dtiles', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
      this.load.spritesheet('bgtiles', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
      this.load.spritesheet('nexttiles', 'assets/images/Tileset.png', {frameWidth: 50, frameHeight: 50});
      
      // simple coin image
      this.load.image('coins', 'assets/images/pesoGold.png', {frameWidth: 30, frameHeight: 30});
      this.load.image('btiles', 'assets/images/ran.png', {frameWidth: 32, frameHeight: 32});
      this.load.image('ptiles', 'assets/images/PipeUp.png', {frameWidth: 68, frameHeight: 64});
      // player animations
      this.load.atlas('player', 'assets/sprites/player.png', 'assets/sprites/player.json');
      this.load.atlas('enemy', 'assets/sprites/enemy.png', 'assets/sprites/enemy.json');
  }
  create() {
    // load the map 
    savepoint = 1;
    map = this.make.tilemap({key: 'map'});
    //this.add.image(600,220, 'backg').setScrollFactor(0);
    cur_score = score;
    if (deadpoint){
      cur_coin = 0;
      score_coin = 0;
    }
    active = true;
    if (deadpoint){
      playerX = 200;
      playerY = 500;
    }
    // tiles for the ground layer
    
    var groundTiles = map.addTilesetImage('Tileset', 'tiles');
    // create the ground layer
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    var bgtiles = map.addTilesetImage('Tileset', 'bgtiles');
    bglayer = map.createDynamicLayer('Nextlevel', bgtiles, 0, 0);
    bglayer.setCollisionByExclusion([-1]);

    var pipetiles = map.addTilesetImage('pipe', 'ptiles');
    pipelayer = map.createDynamicLayer('Pipes', pipetiles, 0, 0);
    pipelayer.setCollisionByExclusion([-1]);
    // coin image used as tileset
    var coinTiles = map.addTilesetImage('Coins', 'coins');
    coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);
    
    //box coins
    var boxTiles = map.addTilesetImage('BoxC', 'btiles');
    boxlayer = map.createDynamicLayer('boxcoin', boxTiles, 0, 0);
    boxlayer.setCollisionByExclusion([-1]);
    var rc = map.addTilesetImage('Tileset', 'rtiles');
    recoin = map.createDynamicLayer('reCoin', rc, 0, 0);
    recoin.setCollisionByExclusion([-1]);

    //savepoint
    var pole =  map.addTilesetImage('Tileset', 'stiles');
    savePoint = map.createDynamicLayer('Save', pole, 0, 0);
    savePoint.setCollisionByExclusion([-1]);

    //out of bounds
    var oob=  map.addTilesetImage('Tileset', 'dtiles');
    oobLayer = map.createDynamicLayer('OOB', oob, 0, 0);
    oobLayer.setCollisionByExclusion([-1]);
    oobLayer.alpha = 0;
    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // create the player sprite   

    player = this.physics.add.sprite(playerX, playerY, 'player').setScale(0.5);
    player.setBounce(0.1); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map    
    
    enemy = this.physics.add.sprite(700, 500, 'enemy').setScale(.08);
    //enemy.setCollideWorldBounds(true);
    enemy.setActive(true);
    enemy.body.offset.setTo(10, 0);

    enemy2 = this.physics.add.sprite(1600, 500, 'enemy').setScale(.08);
    //enemy2.setCollideWorldBounds(true);
    enemy2.setActive(true);
    enemy2.body.offset.setTo(10, 0);

    enemy3 = this.physics.add.sprite(5000, 500, 'enemy').setScale(.08);
   // enemy3.setCollideWorldBounds(true);
    enemy3.setActive(true);
    enemy3.body.offset.setTo(10, 0);

    enemy4 = this.physics.add.sprite(6500, 300, 'enemy').setScale(.08);
    //enemy4.setCollideWorldBounds(true);
    enemy4.setActive(true);
    enemy4.body.offset.setTo(10, 0);
    //enemy.setSize(100, 100, 100, 100);
    // small fix to our player images, we resize the physics body object slightly

    player.body.setSize(player.width, player.height);
    player.body.gravity.y = 1800;

    // player will collide with the level tiles 
    this.physics.add.collider(savePoint, player, save_next, null, this);
    this.physics.add.collider(groundLayer, player);
    this.physics.add.collider(bglayer, player, NextLevel, null, this);
    this.physics.add.collider(pipelayer, player, underground, null, this);
    
    this.physics.add.collider(oobLayer, player, outofBounds, null, this);
    this.physics.add.collider(boxlayer, player, boxC, null, this);
    this.physics.add.collider(recoin, player, reC, null, this);
    //enemy
    this.physics.add.collider(groundLayer, enemy, BandF, null, this);
    this.physics.add.collider(groundLayer, enemy2, BandF, null, this);
    this.physics.add.collider(groundLayer, enemy3, BandF, null, this);
    this.physics.add.collider(groundLayer, enemy4, BandF, null, this);
    player.body.offset.setTo(0, -6);
    coinLayer.setTileIndexCallback(337, collectCoin, this);
   
    this.physics.add.overlap(player, coinLayer);
    //sounds
    this.sound.add('getcoin');
    deadM = this.sound.add('deathS');
    this.sound.add('jumpS');
    this.sound.add('Ekill');
    this.sound.add('hit');
    win = this.sound.add('clear');
    //enemy collision
    this.physics.add.collider(player, enemy, onCollide, null, this);
    this.physics.add.collider(player, enemy2, onCollide, null, this);
    this.physics.add.collider(player, enemy3, onCollide, null, this);
    this.physics.add.collider(player, enemy4, onCollide, null, this);
    // player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
    });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: 'idle',
        frames: [{key: 'player', frame: 'p1_stand'}],
        frameRate: 10,
    });

    this.anims.create({
      key: 'en_walk',
      frames: this.anims.generateFrameNames('enemy', {prefix: 'walk0', start: 1, end: 8}),
      frameRate: 10,
      repeat: -1
  });

    cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
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
    text_world.setText('WORLD' + '\n' + ' 1-1');
    text_world.setScrollFactor(0);

    text = this.add.text(380, 30, 'x00', {
      
      fontSize: '30px',
      fill: '#000000'
    });
    var img_coin = this.add.image(350, 40, 'coin');  

    text.setText(cur_coin);

    text_score = this.add.text(100, 10, 'MARIO', {
      
      fontSize: '30px',
      fill: '#000000'
    });  
    text_score.setText('MARIO' + '\n' + cur_score);
    text_score.setScrollFactor(0);
    // fix the text to the camera
    img_coin.setScrollFactor(0);
    text.setScrollFactor(0);
    //pipelayer.alpha = 0.1;
    //console.log(player.body.touching.down);
    enemy.body.setVelocityX(-100);
    enemy.anims.play('en_walk', true);
    enemy2.body.setVelocityX(-100);
    enemy2.anims.play('en_walk', true);
    enemy3.body.setVelocityX(-100);
    enemy3.anims.play('en_walk', true);
    enemy4.body.setVelocityX(-100);
    enemy4.anims.play('en_walk', true);
  }
  update(time, delta) {
    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-350);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(350);
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
        savePoint.setCollisionByExclusion(0);
        player.body.setVelocityX(100);
        if (player.body.onFloor()){
          player.anims.play('walk', true);
        }
        
        
      }
        
    }
  }

}

function collectCoin(sprite, tile) {
  //this.scene.start('bootGame');
  this.sound.play('getcoin');
  coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
  score_coin++; // add 10 points to the score
  cur_coin = score_coin;
  score += 200;
  if (score < 1000){
    text_score.setText('MARIO' + '\n' + '000' + score);
  }else if (score < 10000 && score > 999){
    text_score.setText('MARIO' + '\n' + '00' + score);
  }else if (score < 100000 && score > 9999){
    text_score.setText('MARIO' + '\n' + '0' + score);
  }
  
  text.setText(cur_coin); // set the text to show the current score
  return false;
}


function onCollide(sprite, tile){
  if (player.body.blocked.down){
    if (delay > 0){
      delay -= 10;
      this.sound.play('hit');
    }else{
      deadM.play();
      music.mute = true;
      this.scene.start("deathScene");
      delay = 30;
      lives -= 1;
      timer = 100;
    }
  }
  else {
    this.sound.play('Ekill');
    tile.destroy();
    player.body.setVelocityY(-400);
    active = false;
    score += 100;
    if (score < 1000){
      text_score.setText('MARIO' + '\n' + '000' + score);
    }else if (score < 10000 && score > 999){
      text_score.setText('MARIO' + '\n' + '00' + score);
    }else if (score < 100000 && score > 9999){
      text_score.setText('MARIO' + '\n' + '0' + score);
    }
    
    text.setText(score_coin);

  }
  
}

function BandF(tile){
    if(tile.body.blocked.left){
      tile.flipX = true;
      tile.body.setVelocityX(100);
    }else if (tile.body.blocked.right){
      tile.flipX = false;
      tile.body.setVelocityX(-100);
    }
}
function boxC(sprite, tile){
    
    if (player.body.blocked.up){
      
      if (tile.alpha > 0.5){
        this.sound.play('getcoin');
        score += 200;
      if (score < 1000){
        text_score.setText('MARIO' + '\n' + '000' + score);
      }else if (score < 10000 && score > 999){
        text_score.setText('MARIO' + '\n' + '00' + score);
      }else if (score < 100000 && score > 9999){
        text_score.setText('MARIO' + '\n' + '0' + score);
      }
      tile.alpha = 0.5;
      }
  }
}

function reC(sprite, tile){
  
  if (player.body.blocked.up){
    if (re > 0){
      if (tile.alpha > 0.5){
        this.sound.play('getcoin');
        //this.setText(tile.x, tile.y + 10, '200');
        score += 200;
        if (score < 1000){
          text_score.setText('MARIO' + '\n' + '000' + score);
        }else if (score < 10000 && score > 999){
          text_score.setText('MARIO' + '\n' + '00' + score);
        }else if (score < 100000 && score > 9999){
          text_score.setText('MARIO' + '\n' + '0' + score);
        }
        re -= 1;
      }
    }else{
      tile.alpha = 0.5;
    }
  }
}

function save_next(){
    music.mute = true;
    act = false;
    console.log(player.body.blocked.right);
    win.play();
    if (player.body.blocked.right){
      player.body.gravity.y = 500;
    }
    remain_t = Math.round(timer);
    spawnAllowed = false;
    score += Math.round(remain_t * 50);

    if (score < 1000){
      text_score.setText('MARIO' + '\n' + '000' + score);
    }else if (score < 10000 && score > 999){
      text_score.setText('MARIO' + '\n' + '00' + score);
    }else if (score < 100000 && score > 9999){
      text_score.setText('MARIO' + '\n' + '0' + score);
    }
    
}

function outofBounds(){
  deadM.play();
  music.mute = true;
  this.scene.start("deathScene");
  delay = 30;
  lives -= 1;
  timer = 100;
}

function underground(){
  
  if (player.body.blocked.down && cursors.down.isDown){
    console.log('enter');
    this.scene.start('under');
    cur_coin = score_coin;
    cur_score = score;
    cur_timer = timer;
  }
}

function NextLevel(){
  this.scene.start('playGame2');
  playerX = 100;
  playerY = 500;
  act = true;

  clear_d = 20;
}