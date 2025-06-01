var Entity = Class.extend(function () {
  this.sprite = {
    sourceX: 0,
    sourceY: 0,
    sourceWidth: 64,
    sourceHeight: 64,
    img: "",
    src: "",
  };
  this.x = 0;
  this.y = 0;
  this.width = 64;
  this.height = 64;
  this.alpha = 1;
  this.shadow = {
    active: false,
    shadowColor: "rgba(100, 100, 100, 0.5)",
    shadowOffsetX: 3,
    shadowOffsetY: 3,
    shadowBlur: 3
  };
  this.rotation = 0;
  this.visible = true;

  this.vx = 0;
  this.vy = 0;

  this.constructor = function (width, height, spriteWidth, spriteHeight, img, src) {
    this.width = width;
    this.height = height;
    this.sprite.sourceWidth = spriteWidth
    this.sprite.sourceHeight = spriteHeight
    this.sprite.img = img
    this.sprite.src = src
  };

  this.update = function (keys) {
    switch (keys) {
      case keys['ArrowLeft'] && keys['ArrowUp']:
        this.vx = Math.abs(this.vx) * (-1)
        this.vy = Math.abs(this.vy) * (-1)
        break;
      case keys['ArrowLeft'] && keys['ArrowDown']:
        this.vx = Math.abs(this.vx) * (-1)
        this.vy = Math.abs(this.vy)
        break;
      case keys['ArrowRight'] && keys['ArrowUp']:
        this.vx = Math.abs(this.vx)
        this.vy = Math.abs(this.vy) * (-1)
        break;
      case keys['ArrowRight'] && keys['ArrowDown']:
        this.vx = Math.abs(this.vx)
        this.vy = Math.abs(this.vy)
        break;
      case keys['ArrowLeft']:
        this.vx = Math.abs(this.vx) * (-1)
        break;
      case keys['ArrowRight']:
        this.vx = Math.abs(this.vx)
        break;
      case keys['ArrowUp']:
        this.vy = Math.abs(this.vy) * (-1)
        break;
      case keys['ArrowDown']:
        this.vy = Math.abs(this.vy)
        break;
    }
    this.moveX()
    this.moveY()
  };

  this.scale = function (scale) {
    this.height += scale;
    this.width += scale;
    this.x -= scale / 2;
    this.y -= scale / 2;
  }

  this.scaleX = function (scale) {
    this.width += scale;
    this.x -= scale / 2;

  }

  this.scaleY = function (scale) {
    this.height += scale;
    this.y -= scale / 2;
  }

  this.moveX = function (gameWorld) {
    this.x = Math.max(0, Math.min(this.x + this.vx, gameWorld.width - this.width));
  }
  this.moveY = function () {
    this.y = Math.max(0, Math.min(this.y + this.vy, gameWorld.height - this.height));
  }

  this.getLeftCoord = function () { return this.x; }
  this.getRightCoord = function () { return this.x + this.width; }
  this.getTopCoord = function () { return this.y; }
  this.getBottomCoord = function () { return this.y + this.height; }


});


