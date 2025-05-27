var Entity = Class.extend(function () {
  this.sprite = {
    sourceX: 0,
    sourceY: 0,
    sourceWidth: 64,
    sourceHeight: 64,
    img: "",
    imgURL: "",
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

  this.constructor = function (width, height, spriteWidth, spriteHeight, img, imgURL) {
    this.width = width;
    this.height = height;
    this.sprite.sourceWidth = spriteWidth
    this.sprite.sourceHeight = spriteHeight
    this.sprite.img = img
    this.sprite.imgURL = imgURL
  };

  this.update = function () { };

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

  this.getLeftCoord = function () { return this.x; }
  this.getRightCoord = function () { return this.x + this.width; }
  this.getTopCoord = function () { return this.y; }
  this.getBottomCoord = function () { return this.y + this.height; }


});


