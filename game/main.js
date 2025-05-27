var canvas
var drawingSurface
var entities = []

// scenery
var background = undefined
var camera = undefined
var gameWorld = undefined

// characters
var character = undefined
var characters = []

// backgrounds
var backgrounds = []

window.onload(init)

function init() {
    canvas = document.querySelector("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawingSurface = canvas.getContext("2d")

    // construção de entidades, fundos, personagens, etc...
    // background = new Entity();
    // background.sprite.sourceWidth = 1920;
    // background.sprite.sourceHeight = 1080;
    // background.width = 1920;
    // background.height = 1080;
    // background.x = 0;
    // background.y = 0;
    // backgrounds.push(background)
    

    // gameWorld = new GameWorld(0, 0, background.width, background.height);

    // camera = new Camera(0, 0, canvas.width, canvas.height);

    // camera.center(gameWorld);

    // character = new Entity(28, 67);
    // character.x = (gameWorld.x + gameWorld.width / 2) - character.width / 2;
    // character.y = (gameWorld.y + gameWorld.height / 2) - character.height / 2;
    // character.vx = 0;
    // character.vy = 0;
    // characters.push(character)

}



