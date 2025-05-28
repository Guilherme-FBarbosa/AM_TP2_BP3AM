// Exercicio 5.3
// Camera.js
var Camera = Class.extend(function () {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.vx = 0;
	this.vy = 0;
	this.previousX = 0;

	this.constructor = function (x, y, w, h, vx, pvx) {
		if (x != undefined && y != undefined && w != undefined && h != undefined && vx != undefined && pvx != undefined)
			this.setup(x, y, w, h, vx, pvx);
	};

	this.setup = function (x, y, w, h, vx, pvx) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.vx = vx;
		this.previousX = pvx;
	}

	this.center = function (gameWorld) {
		this.x = (gameWorld.x + gameWorld.width / 2) - this.width / 2;
		this.y = (gameWorld.y + gameWorld.height / 2) - this.height / 2;
	}


	this.rightInnerBoundary = function () {
		return this.x + (this.width * 0.75);
	}


	this.leftInnerBoundary = function () {
		return this.x + (this.width * 0.25);
	}


	this.topInnerBoundary = function () {
		return this.y + (this.height * 0.25);
	}


	this.bottomInnerBoundary = function () {
		return this.y + (this.height * 0.75);
	}

	this.scroll = function (trackingEntity) {
		if (trackingEntity.x < this.leftInnerBoundary())
			this.x = Math.floor(trackingEntity.x - (this.width * 0.25));

		if (trackingEntity.y < this.topInnerBoundary())
			this.y = Math.floor(trackingEntity.y - (this.height * 0.25));

		if (trackingEntity.x + trackingEntity.width > this.rightInnerBoundary())
			this.x = Math.floor(trackingEntity.x + trackingEntity.width - (this.width * 0.75));

		if (trackingEntity.y + trackingEntity.height > this.bottomInnerBoundary())
			this.y = Math.floor(trackingEntity.y + trackingEntity.height - (this.height * 0.75));
	}

	this.keepWithinWorld = function (gameWorld) {
		if (this.x < gameWorld.x) this.x = gameWorld.x;
		if (this.y < gameWorld.y) this.y = gameWorld.y;
		if (this.x + this.width > gameWorld.x + gameWorld.width) this.x = gameWorld.x + gameWorld.width - this.width;
		if (this.y + this.height > gameWorld.height) this.y = gameWorld.height - this.height;
	}

	// fun��o de debug. Desenha os limites interiores do rectangulo imagin�rio da c�mara
	this.drawFrame = function (ctx, drawInnerBoundaries, colorF, colorIB) {
		colorF = "red";
		colorIB = "blue";
		if (ctx == undefined || drawInnerBoundaries == undefined) return;
		ctx.strokeStyle = colorF;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = colorF;
		ctx.font = "12px Arial";
		ctx.fillText("Camera frame:" + this.width + "x" + this.height, this.x + 5, this.y + 15);
		ctx.fillText("Camera pos:" + this.x + ":" + this.y, this.x + 5, this.y + 30);
		if (this.vx != undefined) ctx.fillText("Camera vel:" + this.vx + ":" + this.vy, this.x + 5, this.y + 45);
		if (this.leftInnerBoundary == undefined) return;
		if (drawInnerBoundaries) {

			ctx.strokeStyle = colorIB;
			ctx.lineWidth = 1;
			ctx.moveTo(this.leftInnerBoundary(), this.topInnerBoundary() - 10)
			ctx.lineTo(this.leftInnerBoundary(), this.bottomInnerBoundary() + 10);

			ctx.moveTo(this.rightInnerBoundary(), this.topInnerBoundary() - 10)
			ctx.lineTo(this.rightInnerBoundary(), this.bottomInnerBoundary() + 10);

			ctx.moveTo(this.leftInnerBoundary() - 10, this.topInnerBoundary())
			ctx.lineTo(this.rightInnerBoundary() + 10, this.topInnerBoundary());

			ctx.moveTo(this.leftInnerBoundary() - 10, this.bottomInnerBoundary())
			ctx.lineTo(this.rightInnerBoundary() + 10, this.bottomInnerBoundary());
			ctx.stroke();

			ctx.fillStyle = colorIB;
			ctx.font = "12px Arial";
			ctx.fillText(this.leftInnerBoundary(), this.leftInnerBoundary(), this.topInnerBoundary() - 10);
			ctx.fillText(this.rightInnerBoundary(), this.rightInnerBoundary(), this.topInnerBoundary() - 10);

			ctx.fillText("Camera Inner Boundaries", this.leftInnerBoundary() + 5, this.topInnerBoundary() + 15);
		}
	}

});


