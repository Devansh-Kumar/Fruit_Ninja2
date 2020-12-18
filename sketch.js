//creating variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOver_image,gameOver_sound;
var sword,sword_image,swordSwoosh_sound;
var fruitGroup,fruit1,fruit2,fruit3,fruit4;
var bacteriaGroup,bacteria_image;
var score = 0;

//creating a function for loading images and sounds to the sprites
function preload(){
sword_image = loadImage("sword.png"); 
fruit1 = loadImage("fruit1.png"); 
fruit2 = loadImage("fruit2.png"); 
fruit3 = loadImage("fruit3.png"); 
fruit4 = loadImage("fruit4.png"); 
bacteria_image = loadImage("alien1.png");
gameOver_image = loadImage("gameover.png");
  
swordSwoosh_sound = loadSound("knifeSwooshSound.mp3");
gameOver_sound = loadSound("gameover.mp3");  
}

function setup(){
createCanvas(400,400); 
  
//variable for sword  
sword = createSprite(50,200,10,10);
sword.addImage("swordImage",sword_image); 
sword.scale = 0.5;

//variable for game over  
gameOver = createSprite(200,200);
gameOver.addImage("gameOver",gameOver_image);
gameOver.scale = 0.5;  
 
//creating groups  
fruitGroup = new Group();
bacteriaGroup = new Group();
  
//fruitGroup.debug = true;
//bacteriaGroup.debug = true;
//bacteriaGroup2.debug = true;  
}

function draw(){
background("turquoise");
 
//creating a statement in which what should happen if the game state is play  
if (gameState === PLAY){
gameOver.visible = false;  

//adding my functions  
spawnFruits();
spawnBacterias(); 
  
//sword will be moving with mouse x and y positions  
sword.x = mouseX;
sword.y = mouseY;  

//if the sword will touch the fruit group it will destroy and the score will be incremented by 1  
if (sword.isTouching(fruitGroup)){
fruitGroup.destroyEach();
swordSwoosh_sound.play();  
score = score+1;  
}  

//if the sword will touch the bacteria group the game state changes to end and they will be destroyed and the sword position will be x = 200 and y = 250
if (sword.isTouching(bacteriaGroup)){
gameState = END;
gameOver_sound.play();  
gameOver.visible = true;  
fruitGroup.destroyEach();
bacteriaGroup.destroyEach();
fruitGroup.velocityX = 0;
bacteriaGroup.velocityX = 0;
sword.x = 200;
sword.y = 250;  
}  
}
  
if (score === 4){
fruitGroup.velocityX = -10;  
}  
  
//drawing the sprites  
drawSprites();
  
//displaying the score
stroke(15);  
textSize(20);  
fill("red");  
text("Score:- "+score,290,25);  
}

//creating a function to spawn fruits and it is called in draw function in PLAY state
function spawnFruits(){
if (World.frameCount%100 === 0){
position = Math.round(random(1,2));    
var fruit = createSprite(400,200,20,20);
fruit.scale = 0.2;
n = Math.round(random(1,4));
if (n === 1){
fruit.addImage("fruit1_image",fruit1);  
} else if (n === 2){
fruit.addImage("fruit2_image",fruit2);  
} else if (n === 3){
fruit.addImage("fruit3_image",fruit3);  
} else if (n === 4){
fruit.addImage("fruit4_image",fruit4);  
}
fruit.y = Math.round(random(50,340));
fruit.lifetime = 110;
if (position === 1){
fruit.x = 400;
fruit.velocityX = -(8+(score/4));
}  
else {
if (position === 2){
fruit.x = 0;
  
fruit.velocityX = (15+(score/4));  
}  
}  
fruitGroup.add(fruit);  
}  
}

//creating a function to spawn bacterias and it is called in draw function in PLAY state
function spawnBacterias(){
if (World.frameCount%200 === 0){
position = Math.round(random(1,2));      
var bacteria = createSprite(450,250,20,20);
bacteria.scale = 1;
bacteria.addImage("bacteria_image",bacteria_image);  
bacteria.y = Math.round(random(100,300));
bacteria.lifetime = 100;  
bacteria.velocityX = -(20+(score/10));  
if (position === 1){
bacteria.x = 400;
bacteria.velocityX = -(8+(score/4));
}  
else {
if (position === 2){
bacteria.x = 0;
}
}
bacteriaGroup.add(bacteria);  
}  
}