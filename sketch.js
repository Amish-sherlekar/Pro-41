var dog, sadDog, happyDog, garden, washroom, livingRoom, database;
var foodS, foodStock;
var fedTime, lastFed, currentTime;
var feed, addFood;
var foodObj;
var milk;
var food1
var gameState, readState;

function preload() {
   milk = loadImage("images/milk.png")
   sadDog = loadImage("images/dogImg.png");
   happyDog = loadImage("images/dogImg1.png");
   garden = loadImage("images/Garden.png");
   washroom = loadImage("images/Wash Room.png");
   bedroom = loadImage("images/Bed Room.png");
   livingRoom = loadImage("images/Living Room.png");
}

function setup() {
   database = firebase.database();
   createCanvas(800, 800);

   database.ref('food').on("value",readPosition)

   foodObj = new Food();

   foodStock = database.ref('Food');
   foodStock.on("value", readStock);

   fedTime = database.ref('FeedTime');
   fedTime.on("value", (data) => {
      lastFed = data.val();
   });

   //read game state from database
   readState = database.ref('gameState');
   readState.on("value", (data) => {
      gameState = data.val();
   });

   dog = createSprite(400, 400, 150, 150);
   dog.addImage(sadDog);
   dog.scale = 0.15;

   milkBotltle = createSprite(100, 400, 150, 150);
   milkBotltle.addImage(milk)
   milkBotltle.scale = 0.15;

}

function draw() {
   background("yellow");
   foodObj.display();
   writeStock(foodS)


   text("food remaining: " +food1, 300, 100)

   if (keyDown(UP_ARROW)) {
      foodS = foodS - 1;
   }

   if (foodS == 0) {
      dog.addImage(happyDog)
      milkBotltle.visible = false;
   } else {
      dog.addImage(sadDog)
      milkBotltle.visible = true;
   }


   // GAME STATE 3
   var Bath = createButton("I want to take bath")
   Bath.position(580, 125)
   if (Bath.mousePressed(() => {
         gameState = 3;
         database.ref('/').update({
            'gameState': gameState
         })
      }))
      if (gameState === 3) {
         dog.addImage(washroom)
         dog.scale = 2;
         milkBotltle.visible = false;
      }

   // GAME STATE 4
   var Sleep = createButton("I am very sleepy")
   Sleep.position(710, 125);
   if (Sleep.mousePressed(() => {
         gameState = 4;
         database.ref('/').update({
            'gameState': gameState
         });
      }))
      if (gameState === 4) {
         dog.addImage(bedroom)
         dog.scale = 2;
         milkBotltle.visible = false;
      }

   // GAME STATE 5
   var Play = createButton("Let play !")
   Play.position(500, 160)
   if (Play.mousePressed(() => {
         gameState = 5;
         database.ref('/').update({
            'gameState': gameState
         });
      }))
      if (gameState === 5) {
         dog.addImage(livingRoom)
         dog.scale = 2;
         milkBotltle.visible = false
      }

   // GAME STATE 6
   var PlayInGarden = createButton("Lets play in park")
   PlayInGarden.position(590, 160)
   if (PlayInGarden.mousePressed(() => {
         gameState = 6;
         database.ref('/').update({
            'gameState': gameState
         });
      }))
      if (gameState === 6) {
         dog.y = 175
         dog.addImage(garden)
         dog.scale = 2;
         milkBotltle.visible = false
      }

   // Feed the dog
   var button = createButton("Feed the Dog!");
   button.position(396, 125)
   if (button.mousePressed(() => {
   food1 = food1- 1
   gameState =1;
   database.ref('/').update({'gameState': gameState});  
   }))
      // GAME STATE 1
      if (gameState === 1) {
         dog.addImage(happyDog)
         dog.scale = 0.175;
         dog.y = 250;
         milkBotltle.visible = true;
      }
   // Add Food
   var addFood = createButton("AddFood!");
   addFood.position(500, 125)
   if (addFood.mousePressed(() => {
         food1 = food1 + 1;
         gameState = 2;
         database.ref('/').update({
            'gameState': gameState
         });
      }))
      // GAME STATE 2
      if (gameState === 2) {
         dog.addImage(sadDog)
         dog.scale = 0.175;
         milkBotltle.visible = false;
         dog.y = 250;
      }
   drawSprites();
}

function keyPressed() {
   if (keyWentDown(UP_ARROW) && food !== 0) {
      food1--
      writeStock(food1)
   }
}

//function to read food Stock
function readStock(data) {
   foodS = data.val();
}

function readPosition(data) {
   food1 = data.val();
}

function writeStock(data) {
   database.ref('/').update({
      // food1: data
   })
}
//update gameState
function update(state) {
   database.ref('/').update({
      gameState: state
   })
}