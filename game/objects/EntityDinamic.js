var EntityDinamic = Class.extend(function () {

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

  this.x = 0;
  this.y = 0;

  this.constructor = function (vx = 0, vy = 0) {
    this.vx = vx
    this.vy = vy
  };



  this.update = function (keys, gameWorld) {
    if (!keys) return

    switch (true) {
      case keys['ArrowLeft'] && keys['ArrowUp']:
        this.vx = Math.abs(this.vx) * (-1)
        this.vy = Math.abs(this.vy) * (-1)
        this.moveX(gameWorld)
        this.moveY(gameWorld)
        break;
      case keys['ArrowLeft'] && keys['ArrowDown']:
        this.vx = Math.abs(this.vx) * (-1)
        this.vy = Math.abs(this.vy)
        this.moveX(gameWorld)
        this.moveY(gameWorld)
        break;
      case keys['ArrowRight'] && keys['ArrowUp']:
        this.vx = Math.abs(this.vx)
        this.vy = Math.abs(this.vy) * (-1)
        this.moveX(gameWorld)
        this.moveY(gameWorld)
        break;
      case keys['ArrowRight'] && keys['ArrowDown']:
        this.vx = Math.abs(this.vx)
        this.vy = Math.abs(this.vy)
        this.moveX(gameWorld)
        this.moveY(gameWorld)
        break;
      case keys['ArrowLeft']:
        console.log("Left")
        this.vx = Math.abs(this.vx) * (-1)
        this.moveX(gameWorld)
        break;
      case keys['ArrowRight']:
        this.vx = Math.abs(this.vx)
        this.moveX(gameWorld)
        break;
      case keys['ArrowUp']:
        this.vy = Math.abs(this.vy) * (-1)
        this.moveY(gameWorld)
        break;
      case keys['ArrowDown']:
        this.vy = Math.abs(this.vy)
        this.moveY(gameWorld)
        break;
    }
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
    console.log(this.x)
  }

  this.moveY = function (gameWorld) {
    this.y = Math.max(0, Math.min(this.y + this.vy, gameWorld.height - this.height));
  }

  this.getLeftCoord = function () { return this.x; }
  this.getRightCoord = function () { return this.x + this.width; }
  this.getTopCoord = function () { return this.y; }
  this.getBottomCoord = function () { return this.y + this.height; }


});


