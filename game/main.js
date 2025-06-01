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
    camera.keepWithinWorld(gameWorld)

    mainCharacter = new MainCharacter()
    mainCharacter.state = mainCharacter.states.IDLE

    // Calculate frame width
    mainCharacter.state.frameWidth = (mainCharacter.state.sheetWidth / mainCharacter.state.frames)
    mainCharacter.state.frameX = (mainCharacter.state.currentFrame * mainCharacter.state.sheetWidth)
    // Center main character
    mainCharacter.x = (gameWorld.x + gameWorld.width / 2) - mainCharacter.state.frameWidth / 2
    mainCharacter.y = (gameWorld.y + gameWorld.height / 2) - mainCharacter.state.sheetHeight / 2;


    mainCharacter.width = mainCharacter.state.frameWidth
    mainCharacter.height = mainCharacter.state.frameWidth

    // Image of the main character
    mainCharacter.state.img = new Image(mainCharacter.state.sheetWidth, mainCharacter.state.sheetHeight)
    mainCharacter.state.img.src = mainCharacter.state.imgSource

    entities.push(mainCharacter)


    mainCharacter.state.img.addEventListener("load", onload)
    background.sprite.img.addEventListener("load", onload)

    window.addEventListener("keydown", keyDownHandler, false)
    window.addEventListener("keyup", keyUpHandler, false)
}

function onload() {
    render()
    gameCicle()
}

function keyDownHandler(e) {
    keys[e.code] = true
}
function keyUpHandler(e) {
    keys[e.code] = false
}

function update() {
    // Update position and frames
    mainCharacter.update(keys, gameWorld)
    // Fazer scroll da camera
    camera.scroll(mainCharacter)
}

function gameCicle() {
    update()
    mainCharacter.updateFrames()
    render()
    requestAnimationFrame(gameCicle)
}

function render() {
    drawingSurface.clearRect(0, 0, canvas.width, canvas.height);

    // Salva o estado do contexto antes de transladar
    drawingSurface.save();
    // Translada o contexto para simular o movimento da câmara
    drawingSurface.translate(canvas.width / 2 - mainCharacter.x,
        canvas.height / 2 - mainCharacter.y);

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (entity instanceof MainCharacter) {
            console.log(entity)
            //const frameX = entity.state.currentFrame * entity.state.frameWidth;
            drawingSurface.drawImage(
                entity.state.img,
                entity.state.frameX, 0,
                entity.state.frameWidth, entity.state.frameWidth,
                Math.floor(entity.x), Math.floor(entity.y),
                entity.state.frameWidth * 3, entity.state.frameWidth * 3
            );
        } else {
            console.log(entity)
            drawingSurface.drawImage(
                entity.sprite.img,
                entity.sprite.sourceX, entity.sprite.sourceY,
                entity.sprite.sourceWidth, entity.sprite.sourceHeight,
                Math.floor(entity.x), Math.floor(entity.y),
                entity.sprite.sourceWidth, entity.sprite.sourceHeight
            );
        }
    }

    // Desenha o frame da câmara (no mundo)
    camera.drawFrame(drawingSurface, false);

    // Restaura o contexto para desenhar elementos fixos no ecrã (UI, HUD, etc)
    drawingSurface.restore();

    // Opcional: desenha o retângulo da viewport da câmara no canvas
    drawingSurface.strokeStyle = "black";
    drawingSurface.strokeRect(0, 0, camera.width, camera.height);
}

