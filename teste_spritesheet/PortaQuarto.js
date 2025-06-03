var Porta = Class.extend(function () {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.aberta = false;
  this.bgOriginalWidth = 1920;
  this.bgOriginalHeight = 1080;

  this.constructor = function (x, y, width, height, bgOriginalWidth, bgOriginalHeight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.aberta = false;
    this.bgOriginalWidth = bgOriginalWidth;
    this.bgOriginalHeight = bgOriginalHeight;
  };

  this.getCanvasCoords = function (canvas) {
    var scaleX = canvas.width / this.bgOriginalWidth;
    var scaleY = canvas.height / this.bgOriginalHeight;
    return {
      x: this.x * scaleX,
      y: this.y * scaleY,
      width: this.width * scaleX,
      height: this.height * scaleY
    };
  };

  this.personagemEmFrente = function (personagem, canvas) {
    var portaCanvas = this.getCanvasCoords(canvas);
    return (
      personagem.x + personagem.width > portaCanvas.x &&
      personagem.x < portaCanvas.x + portaCanvas.width &&
      personagem.y + personagem.height > portaCanvas.y &&
      personagem.y < portaCanvas.y + portaCanvas.height
    );
  };

  this.abrir = function () {
    this.aberta = true;
  };
});