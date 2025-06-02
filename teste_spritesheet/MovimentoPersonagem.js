var canvas;
var drawingSurface;
var sprites = [];
var imagemQuartoBackground = new Image();
imagemQuartoBackground.src = "assets/quarto_background.png"; // Imagem de fundo do quarto
var imagemCorredorBackground = new Image();
imagemCorredorBackground.src = "assets/corredor_background.png"; // Imagem de fundo do corredor

// variáveis para o personagem:
var personagem = undefined;
var baseSpeed = 1.5; // velocidade base do personagem
var isRunning = false; // flag para verificar se está correndo
var isAwakePlaying = true; // flag para verificar se o personagem está acordando
var canMove = false; // flag para verificar se o personagem pode se mover
var facingRight = true; // indica se o personagem está virado para a direita
var noCorredor = false; // flag para verificar se o personagem está no corredor

// variáveis para a imagem do personagem:
var imagem = undefined; // imagem do personagem
var idleImage = undefined; // parado
var walkImage = undefined; // andando
var runImage = undefined; // correndo
var awakeImage = undefined; // acordando

// variáveis para rastreamento de frames:
var frameIndex = 0; // Índice do frame atual
var frameCount = 10; // Total de frames no spritesheet
var frameWidth = 28; // Largura de cada frame
var frameHeight = 67; // Altura de cada frame
var frameDelay = 80; // Número de atualizações antes de mudar o frame
var frameCounter = 0; // Contador para controlar o atraso

porta = new Porta(
  1515,
  405,
  1839 - 1515,
  883 - 405,
  1920,
  1080
);

window.addEventListener("load", init, false);
window.addEventListener("resize", resizeCanvas); // Redimensiona também o canvas ao redimensionar a janela

function init() {
  canvas = document.querySelector("canvas");
  drawingSurface = canvas.getContext("2d");
  resizeCanvas(); // Ajusta o tamanho do canvas para a janela ao iniciar

  personagem = new Entity(140, 350);
  personagem.x = 160;
  personagem.y = canvas.height / 2 - 50;
  sprites.push(personagem);

  awakeImage = new Image();
  awakeImage.src = "assets/Awake.png";

  idleImage = new Image();
  idleImage.src = "assets/Idle.png";

  walkImage = new Image();
  walkImage.src = "assets/Walk.png";

  runImage = new Image();
  runImage.src = "assets/Run.png";

  // Começa com a animação de acordar
  imagem = awakeImage;
  frameCount = 5;
  frameWidth = 69;
  frameHeight = 70;
  frameDelay = 100;
  frameIndex = 0;
  frameCounter = 0;
  isAwakePlaying = true;
  canMove = false;

  awakeImage.addEventListener("load", function () {
    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);
    requestAnimationFrame(update);
  }, false);
}

function keyDownHandler(e) {
  if (!canMove) return;
  if (e.key == "ArrowRight") {
    personagem.vx = baseSpeed;
    facingRight = true;
  } else if (e.key == "ArrowLeft") {
    personagem.vx = -baseSpeed;
    facingRight = false;
  } // else if (e.key == "ArrowUp") {
  //   personagem.vy = -baseSpeed;
  // } else if (e.key == "ArrowDown") {
  //   personagem.vy = baseSpeed;
  // }

  if (e.key === "Shift") {
    if (!isRunning) {
      baseSpeed *= 2; // Dobra a velocidade base ao pressionar Shift
      isRunning = true; // Define a flag de corrida
      updateSpeed(); // Atualiza a velocidade do personagem
    }
  }

  if (e.key === "e" || e.key === "E") {
    if (porta.personagemEmFrente(personagem, canvas) && !porta.aberta) {
      porta.abrir();
      // Troca o fundo e move o personagem
      noCorredor = true;
      personagem.x = 0; // Move o personagem para a esquerda
    }
  }
}

function keyUpHandler(e) {
  if (!canMove) return;
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    personagem.vx = 0; // Para o movimento horizontal
  } // else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
  //   personagem.vy = 0; // Para o movimento vertical
  // }

  if (e.key === "Shift") {
    if (isRunning) {
      baseSpeed /= 2; // Restaura a velocidade base ao soltar Shift
      isRunning = false; // Limpa a flag de corrida
      updateSpeed(); // Atualiza a velocidade do personagem
    }
  }
}

function update() {
  if (canMove) {
    personagem.x += personagem.vx;
    personagem.y += personagem.vy;
  }

  // Impede que o personagem saia do canvas
  if (personagem.x < 0) personagem.x = 0;
  if (personagem.y < 0) personagem.y = 0;
  if (personagem.x + personagem.width > canvas.width) personagem.x = canvas.width - personagem.width;
  if (personagem.y + personagem.height > canvas.height) personagem.y = canvas.height - personagem.height;

  if (isAwakePlaying) {
    // Ajusta as dimensões para awake
    personagem.width = 140;
    personagem.height = 350;

    if (frameIndex >= frameCount) {
      isAwakePlaying = false;
      canMove = true;
      imagem = idleImage;
      frameIndex = 0;

      // Atualiza as dimensões para idle
      personagem.width = 140;
      personagem.height = 350;
    }
  } else {
    // Alterna entre Idle, Walk e Run com base no movimento e estado
    switch (true) {
      case (personagem.vx !== 0 || personagem.vy !== 0) && isRunning:
        if (imagem !== runImage) {
          imagem = runImage; // Usa o spritesheet de Run
          personagem.sourceWidth = 54; // Ajusta a largura do personagem para o spritesheet de Run
          personagem.sourceHeight = 70; // Ajusta a altura do personagem para o spritesheet de Run
          personagem.width = 270; // Ajusta a largura do personagem para o spritesheet de Run
          personagem.height = 350; // Ajusta a altura do personagem para o spritesheet de Run
          frameIndex = 0; // Reinicia o índice do frame
        }
        break;
      case (personagem.vx !== 0 || personagem.vy !== 0):
        if (imagem !== walkImage) {
          imagem = walkImage; // Usa o spritesheet de Walk
          personagem.sourceWidth = 40; // Ajusta a largura do personagem para o spritesheet de Walk
          personagem.sourceHeight = 70; // Ajusta a altura do personagem para o spritesheet de Walk
          personagem.width = 200; // Ajusta a largura do personagem para o spritesheet de Walk
          personagem.height = 350; // Ajusta a altura do personagem para o spritesheet de Walk
          frameIndex = 0; // Reinicia o índice do frame
        }
        break;
      default:
        if (imagem !== idleImage) {
          imagem = idleImage; // Usa o spritesheet de Idle
          personagem.sourceWidth = 28; // Ajusta a largura do personagem para o spritesheet de Idle
          personagem.sourceHeight = 67; // Ajusta a altura do personagem para o spritesheet de Idle
          personagem.width = 140; // Ajusta a largura do personagem para o spritesheet de Idle
          personagem.height = 350; // Ajusta a altura do personagem para o spritesheet de Idle
          frameIndex = 0; // Reinicia o índice do frame
        }
        break;
    }
  }

  if (imagem === walkImage) {
    frameCount = 10; // Total de frames no Walk.png
    frameWidth = 40;
    frameHeight = 70;
    frameDelay = 12;
  } else if (imagem === runImage) {
    frameCount = 10; // Total de frames no Run.png
    frameWidth = 54;
    frameHeight = 70;
    frameDelay = 10;
  } else if (imagem === idleImage) {
    frameCount = 6; // Total de frames no Idle.png
    frameWidth = 28;
    frameHeight = 67;
    frameDelay = 30;
  } else if (imagem === awakeImage) {
    frameCount = 5; // Total de frames no Awake.png
    frameWidth = 69;
    frameHeight = 70;
    frameDelay = 80;
  }

  // Atualiza o frame da animação
  frameCounter++;
  if (frameCounter >= frameDelay) {
    frameCounter = 0;
    frameIndex++;

    if (isAwakePlaying) {
      if (frameIndex >= frameCount) {
        // Awake terminou: salta para Idle normal
        isAwakePlaying = false;
        canMove = true;
        imagem = idleImage;
        frameCount = 6;
        frameWidth = 28;
        frameHeight = 67;
        frameDelay = 30;
        frameIndex = 0;
      }
    } else {
      // loop normal de Idle, Walk e Run
      frameIndex = frameIndex % frameCount;
    }
  }

  requestAnimationFrame(update, canvas);
  render();
}

function updateSpeed() {
  // Atualiza a velocidade do personagem com base na direção atual
  if (personagem.vx > 0) {
    personagem.vx = baseSpeed;
  } else if (personagem.vx < 0) {
    personagem.vx = -baseSpeed;
  }

  if (personagem.vy > 0) {
    personagem.vy = baseSpeed;
  } else if (personagem.vy < 0) {
    personagem.vy = -baseSpeed;
  }
}

function render() {
  // desativa o smoothing (antisserrilhamento) do canvas, já que estamos lidando com sprites e pixel arts
  drawingSurface.imageSmoothingEnabled = false;

  // Troca o fundo conforme a flag
  if (noCorredor) {
    if (imagemCorredorBackground.complete) {
      drawingSurface.drawImage(imagemCorredorBackground, 0, 0, canvas.width, canvas.height);
    } else {
      drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
    }
  } else {
    if (imagemQuartoBackground.complete) {
      drawingSurface.drawImage(imagemQuartoBackground, 0, 0, canvas.width, canvas.height);
    } else {
      drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // Desenha o personagem
  if (sprites.length !== 0) {
    for (var i = 0; i < sprites.length; i++) {
      var entity = sprites[i];
      if (entity.visible) {
        drawingSurface.save(); // Salva o estado atual do contexto

        if (!facingRight) {
          // Espelha a imagem horizontalmente
          drawingSurface.scale(-1, 1);
          drawingSurface.drawImage(
            imagem,
            frameIndex * frameWidth, 0, // Posição do frame no spritesheet
            frameWidth, frameHeight, // Tamanho do frame
            -Math.floor(entity.x) - entity.width, Math.floor(entity.y), // Posição no canvas (invertida)
            entity.width, entity.height // Tamanho no canvas
          );
        } else {
          // Desenha normalmente
          drawingSurface.drawImage(
            imagem,
            frameIndex * frameWidth, 0, // Posição do frame no spritesheet
            frameWidth, frameHeight, // Tamanho do frame
            Math.floor(entity.x), Math.floor(entity.y), // Posição no canvas
            entity.width, entity.height // Tamanho no canvas
          );
        }

        drawingSurface.restore(); // Restaura o estado do contexto
      }
    }
  }

  // Desenha o botão "E" se o personagem estiver em frente à porta
  if (porta.personagemEmFrente(personagem, canvas) && !porta.aberta) {
    // Posição central da porta (ajuste se quiser)
    var portaCoords = porta.getCanvasCoords(canvas);
    var centerX = portaCoords.x + portaCoords.width / 2;
    var centerY = portaCoords.y - 40; // um pouco acima da porta

    // Animação de flutuação
    var floatOffset = Math.sin(Date.now() / 400) * 10;

    // Desenha o quadrado arredondado
    drawingSurface.save();
    drawingSurface.globalAlpha = 0.9;
    drawingSurface.beginPath();
    var width = 50, height = 50, radius = 10;
    drawingSurface.moveTo(centerX - width / 2 + radius, centerY + floatOffset - height / 2);
    drawingSurface.lineTo(centerX + width / 2 - radius, centerY + floatOffset - height / 2);
    drawingSurface.quadraticCurveTo(centerX + width / 2, centerY + floatOffset - height / 2, centerX + width / 2, centerY + floatOffset - height / 2 + radius);
    drawingSurface.lineTo(centerX + width / 2, centerY + floatOffset + height / 2 - radius);
    drawingSurface.quadraticCurveTo(centerX + width / 2, centerY + floatOffset + height / 2, centerX + width / 2 - radius, centerY + floatOffset + height / 2);
    drawingSurface.lineTo(centerX - width / 2 + radius, centerY + floatOffset + height / 2);
    drawingSurface.quadraticCurveTo(centerX - width / 2, centerY + floatOffset + height / 2, centerX - width / 2, centerY + floatOffset + height / 2 - radius);
    drawingSurface.lineTo(centerX - width / 2, centerY + floatOffset - height / 2 + radius);
    drawingSurface.quadraticCurveTo(centerX - width / 2, centerY + floatOffset - height / 2, centerX - width / 2 + radius, centerY + floatOffset - height / 2);
    drawingSurface.closePath();
    drawingSurface.fillStyle = "#fff";
    drawingSurface.strokeStyle = "#000";
    drawingSurface.lineWidth = 2;
    drawingSurface.fill();
    drawingSurface.stroke();

    // Desenha a letra "E"
    drawingSurface.fillStyle = "#000";
    drawingSurface.font = "bold 30px Arial";
    drawingSurface.textAlign = "center";
    drawingSurface.textBaseline = "middle";
    drawingSurface.fillText("E", centerX, centerY + floatOffset);
    drawingSurface.restore();
  }
}

// Redimensiona o canvas para ocupar toda a janela
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}