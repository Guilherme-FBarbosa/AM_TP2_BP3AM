// Exercicio 5.2
// betterScrolling.js

var canvas=undefined;
var drawingSurface=undefined;
var entities = [];
var astroCat=undefined;
var background=undefined;
var camera=undefined;
var gameWorld=undefined;
var teclas= new Array(255);
var spriteSheet=undefined; 

window.addEventListener("load",init, false);

function init(){
	canvas = document.querySelector("canvas");
	drawingSurface = canvas.getContext("2d");
	
	background=new Entity();
	background.sprite.sourceY = 64;
	background.sprite.sourceWidth = 2561;
	background.sprite.sourceHeight = 1922;
	background.width = 2561;
	background.height = 1922;
	background.x = 0;
	background.y = 0;
	entities.push(background);
	
	gameWorld=new GameWorld(0,0,background.width,background.height);
     
	camera= new Camera(0,0,canvas.width,canvas.height);
	 
	camera.center(gameWorld);
	
	astroCat = new Entity();
	astroCat.sprite.sourceX = 0;
	astroCat.sprite.sourceY = 0;
	astroCat.sprite.sourceWidth = 64;
	astroCat.sprite.sourceHeight = 64;
	astroCat.width = 64;
	astroCat.height = 64;
	
	// centrar o gato astronauta
	astroCat.x = (gameWorld.x + gameWorld.width / 2) - astroCat.width / 2;
	astroCat.y = (gameWorld.y + gameWorld.height / 2) - astroCat.height / 2;
	entities.push(astroCat);	
	
	//Load the cat's image 
	spriteSheet = new Image();
	spriteSheet.addEventListener("load", loadHandler, false);
	spriteSheet.src = "assets/images/phobosTileSheet.png";
}
 
function loadHandler(){
  //iniciar o ciclo de anima��o
  update();
  window.addEventListener("keydown",keyDownHandler,false);
  window.addEventListener("keyup",keyUpHandler,false);
}

function keyDownHandler(e){
	var codTecla=e.keyCode;
	teclas[codTecla]=true;  
	  
}

function keyUpHandler(e){
	var codTecla=e.keyCode;
	teclas[codTecla]=false;  
 
}

 
function update(){
  //Create the animation loop

   
  if(teclas[keyboard.LEFT]) 	astroCat.vx =-5;
  if(teclas[keyboard.RIGHT]) 	astroCat.vx =5;
  if(teclas[keyboard.UP]) 		astroCat.vy =-5;
  if(teclas[keyboard.DOWN]) 	astroCat.vy =5;
  
  if(!teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT])astroCat.vx=0;
  if(!teclas[keyboard.UP]  &&  !teclas[keyboard.DOWN]) astroCat.vy=0;
   
  //mover o gato e mante-lo dentro do mundo
  astroCat.x = Math.max(0, Math.min(astroCat.x + astroCat.vx, gameWorld.width - astroCat.width)); 
  astroCat.y = Math.max(0, Math.min(astroCat.y + astroCat.vy, gameWorld.height - astroCat.height));
 
  //fazer scroll da camera
  
  
  
  if(astroCat.x < camera.leftInnerBoundary()) 
	camera.x = Math.floor(astroCat.x - (camera.width * 0.25));
  
  if(astroCat.y < camera.topInnerBoundary())
    camera.y = Math.floor(astroCat.y - (camera.height * 0.25));
  
  if(astroCat.x + astroCat.width > camera.rightInnerBoundary())
    camera.x = Math.floor(astroCat.x + astroCat.width - (camera.width * 0.75));
   
  if(astroCat.y + astroCat.height > camera.bottomInnerBoundary())
    camera.y = Math.floor(astroCat.y + astroCat.height - (camera.height * 0.75));
   
  
   //manter a camara dentro dos limites do mundo
  
  if(camera.x < gameWorld.x)  camera.x = gameWorld.x;
  if(camera.y < gameWorld.y)  camera.y = gameWorld.y;
  if(camera.x + camera.width > gameWorld.x + gameWorld.width)  camera.x = gameWorld.x + gameWorld.width - camera.width;
  if(camera.y + camera.height > gameWorld.height) camera.y = gameWorld.height - camera.height; 
 
  /*
  if(astroCat.x < camera.leftInnerBoundary())  
    camera.x = Math.max(0, Math.min( Math.floor(astroCat.x - (camera.width * 0.25)), gameWorld.width - camera.width));
  
  if(astroCat.y < camera.topInnerBoundary())
    camera.y = Math.max(0, Math.min( Math.floor(astroCat.y - (camera.height * 0.25)), gameWorld.height - camera.height));
 
  if(astroCat.x + astroCat.width > camera.rightInnerBoundary())
    camera.x = Math.max(0, Math.min(Math.floor(astroCat.x + astroCat.width - (camera.width * 0.75)),gameWorld.width - camera.width));
   
  if(astroCat.y + astroCat.height > camera.bottomInnerBoundary())
	  camera.y = Math.max(0, Math.min( Math.floor(astroCat.y + astroCat.height - (camera.height * 0.75)), gameWorld.height - camera.height));
 
  */
  requestAnimationFrame(update, canvas);

  render();
}

function render(){ 
  //limpara a animation frame anterior
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  drawingSurface.save();
 
  // transladar a drawing surface e mante-la posicionada relativamente � camara
  drawingSurface.translate(-camera.x, -camera.y);
   
  if(entities.length !== 0){
	for(var i = 0; i < entities.length; i++){
	var entity = entities[i];
		if(entity.visible){
  		  drawingSurface.drawImage
		  (
			spriteSheet, 
			entity.sprite.sourceX, entity.sprite.sourceY, 
			entity.sprite.sourceWidth, entity.sprite.sourceHeight,
			Math.floor(entity.x), Math.floor(entity.y),  
			entity.width, entity.height
		  );
		}
	}
  }
  // restaurar as defini��es do contexto
  camera.drawFrame(drawingSurface,true);
  drawingSurface.restore();
}
