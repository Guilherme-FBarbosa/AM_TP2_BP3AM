var EntityStatic = Class.extend(function () {
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

  this.constructor = function (width=64, height=64, spriteWidth, spriteHeight, img, src) {
    this.width = width;
    this.height = height;
    this.sprite.sourceWidth = spriteWidth
    this.sprite.sourceHeight = spriteHeight
    this.sprite.img = img
    this.sprite.src = src
  };


});


