var canvas = undefined
var drawingSurface = undefined
var keys = new Array(255);
var entities = []

// scenery
var background = undefined
var backgroundImage = undefined
var camera = undefined
var gameWorld = undefined

// characters
var mainCharacter = undefined
var characters = []

// backgrounds

window.addEventListener('load', init)

function init() {
    canvas = document.getElementById("canvas")
    console.log(window.innerWidth + "WIDTH")
    console.log(window.innerHeight + "HEIGHT")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawingSurface = canvas.getContext("2d")

    // construção de entidades, fundos, personagens, etc...
    background = new Background();
    background.width = 1920;
    background.height = 1080;
    background.x = 0;
    background.y = 0;
    entities.push(background)


    gameWorld = new GameWorld(0, 0, background.width, background.height);

    camera = new Camera(0, 0, canvas.width, canvas.height);

    camera.center(gameWorld);

    mainCharacter = new MainCharacter()

    mainCharacter.x = (gameWorld.x + gameWorld.width / 2) - mainCharacter.width / 2
    mainCharacter.y = (gameWorld.y + gameWorld.height / 2) - mainCharacter.height / 2;

    entities.push(mainCharacter)

    window.addEventListener("keydown", keyDownHandler, false)
    window.addEventListener("keyup", keyUpHandler, false)
}

function keyDownHandler(e) {
    keys[e.keyCode] = true
}
function keyUpHandler(e) {
    keys[e.keyCode] = false
}

function update() {
    mainCharacter.update(keys)

    //mover o gato e mante-lo dentro do mundo
    mainCharacter.x = Math.max(0, Math.min(mainCharacter.x + mainCharacter.vx, gameWorld.width - mainCharacter.width));
    mainCharacter.y = Math.max(0, Math.min(mainCharacter.y + mainCharacter.vy, gameWorld.height - mainCharacter.height));

    //fazer scroll da camera
    if (astroCat.x < camera.leftInnerBoundary())
        camera.x = Math.floor(astroCat.x - (camera.width * 0.25));

    if (astroCat.y < camera.topInnerBoundary())
        camera.y = Math.floor(astroCat.y - (camera.height * 0.25));

    if (astroCat.x + astroCat.width > camera.rightInnerBoundary())
        camera.x = Math.floor(astroCat.x + astroCat.width - (camera.width * 0.75));

    if (astroCat.y + astroCat.height > camera.bottomInnerBoundary())
        camera.y = Math.floor(astroCat.y + astroCat.height - (camera.height * 0.75));
}

