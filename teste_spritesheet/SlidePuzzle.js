var SlidePuzzle = Class.extend(function () {
  this.size = 3; // 3x3 puzzle
  this.tiles = [];
  this.empty = { x: 2, y: 2 };
  this.tileSize = 120;
  this.solved = false;
  this.animating = false;
  this.offset = { x: 0, y: 0 };
  this.dragTile = null;

  this.constructor = function (size) {
    if (size) this.size = size;
    this.reset();
  };

  this.reset = function () {
    // Inicializa as peças em ordem e embaralha
    this.tiles = [];
    for (var y = 0; y < this.size; y++) {
      for (var x = 0; x < this.size; x++) {
        if (x === this.size - 1 && y === this.size - 1) continue;
        this.tiles.push({ x: x, y: y, value: y * this.size + x + 1 });
      }
    }
    this.empty = { x: this.size - 1, y: this.size - 1 };
    this.shuffle();
    this.solved = false;
    this.animating = false;
    this.dragTile = null;
  };

  this.shuffle = function () {
    // Embaralha o puzzle com movimentos válidos
    for (var i = 0; i < 100; i++) {
      var moves = this.getValidMoves();
      var move = moves[Math.floor(Math.random() * moves.length)];
      this.moveTile(move.x, move.y);
    }
  };

  this.getValidMoves = function () {
    var moves = [];
    var dirs = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ];
    for (var i = 0; i < dirs.length; i++) {
      var nx = this.empty.x + dirs[i].x;
      var ny = this.empty.y + dirs[i].y;
      if (nx >= 0 && nx < this.size && ny >= 0 && ny < this.size) {
        moves.push({ x: nx, y: ny });
      }
    }
    return moves;
  };

  this.moveTile = function (x, y) {
    var tile = this.getTile(x, y);
    if (!tile) return false;
    if (Math.abs(tile.x - this.empty.x) + Math.abs(tile.y - this.empty.y) === 1) {
      var ex = this.empty.x, ey = this.empty.y;
      this.empty.x = tile.x;
      this.empty.y = tile.y;
      tile.x = ex;
      tile.y = ey;
      return true;
    }
    return false;
  };

  this.getTile = function (x, y) {
    for (var i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].x === x && this.tiles[i].y === y) return this.tiles[i];
    }
    return null;
  };

  this.checkSolved = function () {
    for (var i = 0; i < this.tiles.length; i++) {
      var tile = this.tiles[i];
      var correctX = (tile.value - 1) % this.size;
      var correctY = Math.floor((tile.value - 1) / this.size);
      if (tile.x !== correctX || tile.y !== correctY) return false;
    }
    return true;
  };

  this.handleMouseDown = function (mx, my) {
    if (this.solved) return;
    var x = Math.floor((mx - this.offset.x) / this.tileSize);
    var y = Math.floor((my - this.offset.y) / this.tileSize);
    var tile = this.getTile(x, y);
    if (tile && Math.abs(tile.x - this.empty.x) + Math.abs(tile.y - this.empty.y) === 1) {
      this.dragTile = tile;
    }
  };

  this.handleMouseUp = function (mx, my) {
    if (this.solved || !this.dragTile) return;
    var tile = this.dragTile;
    if (this.moveTile(tile.x, tile.y)) {
      if (this.checkSolved()) this.solved = true;
    }
    this.dragTile = null;
  };

  this.handleMouseMove = function (mx, my) {
    // Para highlight ou animação, se quiser
  };

  this.render = function (ctx, canvas) {
    // Centraliza o puzzle
    this.offset.x = Math.floor((canvas.width - this.size * this.tileSize) / 2);
    this.offset.y = Math.floor((canvas.height - this.size * this.tileSize) / 2);

    // Fundo
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Tiles
    for (var i = 0; i < this.tiles.length; i++) {
      var tile = this.tiles[i];
      var px = this.offset.x + tile.x * this.tileSize;
      var py = this.offset.y + tile.y * this.tileSize;
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(px, py, this.tileSize - 8, this.tileSize - 8, 18);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#222";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(tile.value, px + (this.tileSize - 8) / 2, py + (this.tileSize - 8) / 2);
      ctx.restore();
    }

    // Highlight empty
    ctx.save();
    ctx.strokeStyle = "#aaa";
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 3;
    ctx.strokeRect(
      this.offset.x + this.empty.x * this.tileSize,
      this.offset.y + this.empty.y * this.tileSize,
      this.tileSize - 8,
      this.tileSize - 8
    );
    ctx.restore();

    // Mensagem de vitória
    if (this.solved) {
      ctx.save();
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = "#fff";
      ctx.fillRect(this.offset.x, this.offset.y + this.tileSize, this.size * this.tileSize, 80);
      ctx.fillStyle = "#1a7e1a";
      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Puzzle Resolvido!", this.offset.x + (this.size * this.tileSize) / 2, this.offset.y + this.tileSize * this.size + 40);
      ctx.restore();
    }
  };
});