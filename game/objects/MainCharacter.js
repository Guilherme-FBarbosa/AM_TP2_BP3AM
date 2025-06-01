var MainCharacter = EntityDinamic.extend(function () {

    this.constructor = function (state="") {
        this.super(3,3);
        this.state = state
    };

    this.state = ''
    this.states = {
        IDLE: {
            sheetWidth: 768,
            sheetHeight: 128,
            currentFrame: 0,
            characterWidth: 28 ,
            characterHeight: 67,
            frames: 5, // começa no 0
            delay: 30,
            img: "",
            imgSource: 'assets/characters/main_character/Idle.png'
        },
        WALK: {
            sheetWidth: 1280,
            sheetHeight: 128,
            currentFrame: 0,
            characterWidth: 40 ,
            characterHeight: 70,
            frames: 9, // começa no 0
            delay: 10,
            img: "",
            imgSource: 'assets/characters/main_character/Walk.png'
        },
        RUN: {
            sheetWidth: 1280,
            sheetHeight: 128,
            frames: 9, // começa no 0
            currentFrame: 0,
            characterWidth: 54 ,
            characterHeight: 70,
            delay: 10,
            img: "",
            imgSource: 'assets/characters/main_character/Run.png'
        },
        ATTACK: {
            sheetWidth: 512,
            sheetHeight: 128,
            frames: 3, // começa no 0
            currentFrame: 0,
            characterWidth: 28 ,
            characterHeight: 67,
            delay: 10,
            img: "",
            imgSource: 'assets/characters/main_character/Attack.png'
        },
        HURT: {
            sheetWidth: 384,
            sheetHeight: 128,
            frames: 2, // começa no 0
            currentFrame: 0,
            characterWidth: 28 ,
            characterHeight: 67,
            delay: 10,
            img: "",
            imgSource: 'assets/characters/main_character/Hurt.png'
        },
        DEAD: {
            sheetWidth: 640,
            sheetHeight: 128,
            frames: 4, // começa no 0
            currentFrame: 0,
            characterWidth: 28 ,
            characterHeight: 67,
            delay: 10,
            img: "",
            imgSource: 'assets/characters/main_character/Dead.png'
        }
    }

    this.updateFrames = function () {
        if (this.state.currentFrame < this.state.frames) {
            this.state.currentFrame += 1
        } else {
            this.state.currentFrame = 0
        }
    }
})