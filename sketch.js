//Create variables here
var dog, happyDog, database, foodS, foodStock;
var count = 0;
function preload()
{
  //load images here
  DogImg = loadImage("images/dogImg.png");
  happydogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('foodmilk');
  foodStock.on("value", readFood,showError);

  
  dog = createSprite(250,400);
  dog.addImage("dogImg",DogImg);
  dog.addImage("dogImg1",happydogImg);
  dog.scale = 0.2;
}


function draw() {  
  background(46, 139, 87)
  if(foodS!== undefined){
  if(keyWentDown("up") && foodS>0 ){
    console.log(foodS);
    feedDog(foodS);
    dog.changeImage("dogImg1",happydogImg);
    count = 30;
  }
  if(count >0){
    count--
  }
  //add styles here
  fill("white");
  stroke("blue");
  strokeWeight(5);
  textSize(20);
 text("Press UP arrow to feed Drago",100,50);
 text("Food Remaining: " + foodS, 200,300);
 if (count <=0){
 dog.changeImage("dogImg",DogImg);
 }
}
drawSprites();
}
function feedDog(milk){
 
  if(milk >0){
    milk --
  } else {
    milk = 0
  }
  database.ref('/').set({'foodmilk':milk});
 
  }

function readFood(data){

  var stock = data.val();
  foodS = stock;
}
function showError(){

  console.log("Error in reading food from database");
}


