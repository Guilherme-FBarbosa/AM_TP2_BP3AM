const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const origin = { x: canvas.width / 2, y: canvas.height - 50 }; // onde nasce o jato
const toilet = {
    x: canvas.width / 2,
    y: 150,
    radius: 60,
    borderThickness: 20,
};

let targetAngle = -Math.PI / 2; // Começa apontando pra cima
let control = 0;
let jitter = 0;
let dirtSpots = [];
let maxDirt = 10;
let gameOver = false;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") control -= 0.05;
    if (e.key === "ArrowRight") control += 0.05;
});

function restartGame() {
    dirtSpots = [];
    control = 0;
    jitter = 0;
    gameOver = false;
    document.getElementById("gameOverScreen").style.display = "none";
    requestAnimationFrame(draw);
}

function drawToilet() {
    ctx.beginPath();
    ctx.arc(toilet.x, toilet.y, toilet.radius + toilet.borderThickness, 0, 2 * Math.PI);
    ctx.fillStyle = "#bbb";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(toilet.x, toilet.y, toilet.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();

    dirtSpots.forEach(spot => {
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "yellow";
        ctx.fill();
    });
}

function drawJet(angle) {
    const length = 500; // comprimento do jato
    const endX = origin.x + Math.cos(angle) * length;
    const endY = origin.y + Math.sin(angle) * length;

    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 4;
    ctx.stroke();

    checkHit(endX, endY);
}

function checkHit(x, y) {
    const dist = Math.hypot(x - toilet.x, y - toilet.y);
    if (dist <= toilet.radius) {
        // acertou o centro
        return;
    } else if (dist <= toilet.radius + toilet.borderThickness) {
        // acertou a borda
        dirtSpots.push({ x, y });
        if (dirtSpots.length >= maxDirt) endGame();
    }
}

function endGame() {
    gameOver = true;
    document.getElementById("gameOverScreen").style.display = "flex";
}

function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawToilet();

    // jitter = movimento caótico e amortecido
    jitter += (Math.random() - 0.5) * 0.04;
    jitter *= 0.9;

    const currentAngle = targetAngle + jitter + control;
    drawJet(currentAngle);

    requestAnimationFrame(draw);
}

draw();
