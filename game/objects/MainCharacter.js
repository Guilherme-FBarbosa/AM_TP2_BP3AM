var MainCharacter = Entity.extend(function () {

    this.constructor = function () {
        this.super();
    };

    this.states = {
        IDLE: {
            sheetWidth: 768,
            sheetHeight: 128,
            currentFrame: 0,
            frames: 5, // começa no 0
            frameWidth: this.states.IDLE.sheetWidth / this.states.IDLE.frames,
            frameX: this.states.IDLE.currentFrame * this.states.IDLE.sheetWidth,
            delay: 30,
            img: new Image(this.states.IDLE.sheetWidth, this.states.IDLE.sheetHeight),
            imgSource: '/assets/characters/main_character/Idle.png'


        },
        WALK: {
            sheetWidth: 1280,
            sheetHeight: 128,
            currentFrame: 0,
            frames: 9, // começa no 0
            frameWidth: this.states.WALK.sheetWidth / this.states.WALK.frames,
            frameX: this.states.WALK.currentFrame * this.states.WALK.sheetWidth,
            delay: 10,
            img: new Image(this.states.WALK.sheetWidth, this.states.WALK.sheetHeight),
            imgSource: '/assets/characters/main_character/Walk.png'
        },
        RUN: {
            sheetWidth: 1280,
            sheetHeight: 128,
            frames: 9, // começa no 0
            frameWidth: this.states.RUN.sheetWidth / this.states.RUN.frames,
            frameX: this.states.RUN.currentFrame * this.states.RUN.sheetWidth,
            currentFrame: 0,
            delay: 10,
            img: new Image(this.states.RUN.sheetWidth, this.states.RUN.sheetHeight),
            imgSource: '/assets/characters/main_character/Run.png'
        },
        ATTACK:{
            sheetWidth: 512,
            sheetHeight: 128,
            frames: 3, // começa no 0
            frameWidth: this.states.ATTACK.sheetWidth / this.states.ATTACK.frames,
            frameX: this.states.ATTACK.currentFrame * this.states.ATTACK.sheetWidth,
            currentFrame: 0,
            delay: 10,
            img: new Image(this.states.ATTACK.sheetWidth, this.states.ATTACK.sheetHeight),
            imgSource: '/assets/characters/main_character/Attack.png'
        },
        HURT: {
            sheetWidth: 384,
            sheetHeight: 128,
            frames: 2, // começa no 0
            frameWidth: this.states.HURT.sheetWidth / this.states.HURT.frames,
            frameX: this.states.HURT.currentFrame * this.states.HURT.sheetWidth,
            currentFrame: 0,
            delay: 10,
            img: new Image(this.states.HURT.sheetWidth, this.states.HURT.sheetHeight),
            imgSource: '/assets/characters/main_character/Hurt.png'},
        DEAD:  {
            sheetWidth: 640,
            sheetHeight: 128,
            frames: 4, // começa no 0
            frameWidth: this.states.DEAD.sheetWidth / this.states.DEAD.frames,
            frameX: this.states.DEAD.currentFrame * this.states.DEAD.sheetWidth,
            currentFrame: 0,
            delay: 10,
            img: new Image(this.states.DEAD.sheetWidth, this.states.DEAD.sheetHeight),
            imgSource: '/assets/characters/main_character/Hurt.png'}
    }
    this.update = function () { };
    this.moveLeft = function () {
        
    }
    this.moveRight = function () {
        
    }
    
})