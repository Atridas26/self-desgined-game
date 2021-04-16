var player,player_Image,bg 
var ground,ground_Image
var block,block_Image
var enemy, enemy_Image
var coin, coin_Image
var bg1,bg1_Image
var bg2,bg2_Image
var edges, invisibleGround, blockGroup, coinGroup, score
var spikes,spikes_Image
var gameover,gameover_Image,gameState = 1

function preload(){
player_Image = loadAnimation("p12.png", "p13.png", "p14.png")
bg1_Image = loadImage("Background 1.jpg")
bg2_Image = loadImage("Background 2.jpg")
coin_Image = loadImage("Coin.png")
enemy_Image = loadAnimation("enemy1.png","enemy2.png","enemy3.png")
ground_Image = loadImage("ground.png")
block_Image = loadImage("bock.png")
spikes_Image = loadImage("spikes.png")
gameover_Image = loadImage("gameover.png")
}

function setup(){
createCanvas(1300,800)
bg2 = createSprite(750,400,50,50)
bg2.addImage(bg2_Image)
bg2.scale = 1
bg2.x = bg2.width/2
bg2.velocityX = -1

gameover = createSprite(700,400,200,200)
gameover.addImage(gameover_Image);


ground = createSprite(0,590,3000,50)
ground.addImage(ground_Image)
ground.x = ground.width/2
ground.scale = 10
ground.velocityX = -1

blockGroup = createGroup()
coinGroup = createGroup()
spikesGroup = createGroup()

invisibleGround = createSprite(0,700,3000,50)
invisibleGround.debug = true;
invisibleGround.setCollider("rectangle",20,20,3000,5)
invisibleGround.visible = false;

player = createSprite(80,700,20,20);
player.addAnimation("player",player_Image);
player.scale = 0.3;
player.debug = false;
player.setCollider("rectangle",0,0,230,400)
//player.velocityX = 1

enemy = createSprite(900,675,20,20)
        enemy.addAnimation("enemy",enemy_Image)
        enemy.setCollider("rectangle",0,0,100,70)
        enemy.scale = 0.5;

score = 0;
text("coins collected:"+score,80,700)                
}

function draw(){
background(0)


if (gameState === 1){
    spawnBlocks();
    spawnCoins();
    edges = createEdgeSprites()
    player.collide(edges)

    if(bg2.x<0){
        bg2.x = bg2.width/2
    }
    if(ground.x<0){
        ground.x=ground.width/2
    }
    
    if(keyDown("space") && player.y>=100){
        player.velocityY = -10
        enemy.velocityY = -10
    }
    if(keyDown("RIGHT_ARROW")){
        player.x = player.x+10
    }
    if(keyDown("LEFT_ARROW")){
        player.x = player.x-10
    }
    player.velocityY = player.velocityY+0.8
    player.collide(invisibleGround);
    player.collide(blockGroup)
    
    enemy.bounceOff(edges)
    if (player.collide(enemy)){
        player.destroy()
        gameState = 2
    }
    enemy.collide(invisibleGround)
    
    if(coinGroup.isTouching(player)){
        coinGroup.destroyEach();
        score = score+1
    }
    if(spikesGroup.isTouching(player)){
        player.destroy()
        gameState = 2
    }
    gameover.visible = false
}
if(gameState === 2){
    gameover.visible = true;
    blockGroup.destroyEach()
    spikesGroup.destroyEach()
    coinGroup.destroyEach()
}




drawSprites();
fill("white")
textSize(30);
text("Coins collected:"+score,20,50)
console.log(score)
}

function spawnBlocks(){
if(frameCount%200 === 0){
    block = createSprite(1500,30,40,10)
    spikes = createSprite(1500,600,40,10)
    //spikes.x = block.x
    //spikes.width = block.width
    //spikes,height = 2
    block.addImage(block_Image)
    spikes.addImage(spikes_Image)
    spikes.scale = 0.5
    block.y = Math.round(random(300,500))
    block.velocityX = -3;
    spikes.velocityX = -3
    block.debug = false;
    block.setCollider("rectangle",0,0,300,150)
    spikes.setCollider("rectangle",0,0,320,20)
    spikes.debug = false;
    blockGroup.add(block);
    spikesGroup.add(spikes)
    block.lifetime = 500;
}
}

function spawnCoins(){
    if(frameCount%180 === 0){
   coin = createSprite(1500,30,40,10)
   coin.addImage(coin_Image)
   coin.scale = 0.2;
   coin.y = Math.round(random(100,300))
   coin.velocityX = -6;
   coinGroup.add(coin);
   coin.lifetime = 500;
    }
}






