import GamEnvBackground from './GameEnvBackground.js';
import BackgroundParallax from './BackgroundParallax.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';

let balance = 0; // Global balance variable

class GameLevelEnd {
  constructor(gameEnv) {
    console.log("Initializing GameLevelEnd...");
    
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    this.createPathDebugger(path);

    const image_src_parallax = path + "/images/gamify/parallaxbg.png";
    this.testImageExists(image_src_parallax, "parallax");

    const image_data_parallax = {
        name: 'parallax_background',
        id: 'parallax-background',
        greeting: "A mysterious parallax effect in the background.",
        src: image_src_parallax,
        pixels: {height: 1140, width: 2460},
        position: { x: 0, y: 0 },
        velocity: 0.2,
        layer: 0,
        zIndex: 1
    };

    const image_src_end = path + "/images/gamify/TransparentEnd.png";
    this.testImageExists(image_src_end, "end");

    const image_data_end = {
        name: 'end',
        id: 'end-background',
        greeting: "The End opens before you, a vast black void in the distance.",
        src: image_src_end,
        pixels: {height: 1140, width: 2460},
        layer: 1,
        zIndex: 5
    };

    const sprite_src_chillguy = path + "/images/gamify/chillguy.png";
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
        id: 'Chill Guy',
        greeting: "Hi, I am Chill Guy, the desert wanderer.",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: width / 16, y: height / 2 },
        pixels: {height: 384, width: 512},
        orientation: {rows: 3, columns: 4},
        down: {row: 0, start: 0, columns: 3},
        downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/8},
        downLeft: {row: 2, start: 0, columns: 3, rotate: -Math.PI/8},
        left: {row: 2, start: 0, columns: 3},
        right: {row: 1, start: 0, columns: 3},
        up: {row: 3, start: 0, columns: 3},
        upLeft: {row: 2, start: 0, columns: 3, rotate: Math.PI/8},
        upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/8},
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 },
        zIndex: 10
    };

    const sprite_src_endereye = path + "/images/gamify/endereye.png";

    const greetings = [
        "Greetings, traveler.",
        "Ah, another wanderer.",
        "Welcome, brave soul.",
        "You’ve arrived at an interesting time.",
        "The journey is long and fraught with unknowns."
    ];

    function getRandomGreeting() {
        const randomIndex = Math.floor(Math.random() * greetings.length);
        return greetings[randomIndex];
    }

    const sprite_data_endereye = {
        id: 'Endereye',
        greeting: getRandomGreeting(),
        src: sprite_src_endereye,
        SCALE_FACTOR: 8,
        ANIMATION_RATE: 1000000,
        pixels: {height: 256, width: 256},
        INIT_POSITION: { x: (width / 2), y: (height / 2) },
        orientation: {rows: 2, columns: 2 },
        down: {row: 1, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,
        quiz: { 
          title: "Linux Command Quiz",
          questions: [
            "Which command is used to list files?\n1. ls\n2. cd\n3. rm\n4. mkdir",
            "Which command changes directories?\n1. ls\n2. cd\n3. rm\n4. pwd",
            "Which command deletes a file?\n1. touch\n2. cat\n3. rm\n4. mv"
          ],
          answers: ["1", "2", "3"] // Correct answers by index
        },
        interact: function() {
            let quiz = new Quiz();
            quiz.initialize();

            quiz.questions = sprite_data_endereye.quiz.questions;
            quiz.answers = sprite_data_endereye.quiz.answers;

            quiz.checkAnswer = function(npcData) {
                const input = this.panel.querySelector("#quiz-answer").value.trim();
                const correctAnswer = this.answers[this.currentQuestionIndex];
                const feedback = this.panel.querySelector("#feedback");

                if (input === correctAnswer) {
                    feedback.textContent = "✅ Correct! +10 points";
                    balance += 10;
                } else {
                    feedback.textContent = "❌ Incorrect. -5 points";
                    balance -= 5;
                }

                setTimeout(() => {
                    this.currentQuestionIndex++;
                    if (this.currentQuestionIndex < this.questions.length) {
                        this.renderQuestion(npcData);
                    } else {
                        this.endQuiz();
                    }
                }, 1500);
            };

            quiz.openPanel(sprite_data_endereye);
        }
    };

    this.classes = [
        { class: BackgroundParallax, data: image_data_parallax },
        { class: GamEnvBackground, data: image_data_end },
        { class: Player, data: sprite_data_chillguy },
        { class: Npc, data: sprite_data_endereye }
    ];
  }

  testImageExists(imageSrc, label) {
    const img = new Image();
    img.onload = () => console.log(`✅ ${label} image exists:`, imageSrc);
    img.onerror = () => console.error(`❌ ${label} image NOT FOUND:`, imageSrc);
    img.src = imageSrc;
  }

  createPathDebugger(path) {
    const debugBtn = document.createElement('button');
    debugBtn.textContent = 'Debug Paths';
    debugBtn.style.position = 'fixed';
    debugBtn.style.top = '50px';
    debugBtn.style.right = '10px';
    debugBtn.style.zIndex = '9999';
    debugBtn.style.backgroundColor = '#f00';
    debugBtn.style.color = '#fff';
    debugBtn.style.border = 'none';
    debugBtn.style.padding = '5px 10px';
    debugBtn.style.cursor = 'pointer';
    
    debugBtn.onclick = () => {
      const debugInfo = document.createElement('div');
      debugInfo.style.position = 'fixed';
      debugInfo.style.top = '100px';
      debugInfo.style.right = '10px';
      debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      debugInfo.style.color = '#fff';
      debugInfo.style.padding = '15px';
      debugInfo.style.zIndex = '9999';
      debugInfo.style.maxWidth = '80%';
      debugInfo.style.overflowY = 'auto';
      debugInfo.style.maxHeight = '80%';

      const testImages = [
        "/images/gamify/parallaxbg.png",
        path + "/images/gamify/parallaxbg.png",
        "images/gamify/parallaxbg.png",
        "../images/gamify/parallaxbg.png",
        "../../images/gamify/parallaxbg.png",
        "/portfolio_2025/images/gamify/parallaxbg.png"
      ];

      let html = `<h3>Path Debug</h3>
                  <p>Base Path: ${path}</p>
                  <p>Current URL: ${window.location.href}</p>
                  <p>Testing image paths:</p>`;

      for (const testPath of testImages) {
        const img = new Image();
        img.style.width = '50px';
        img.style.height = '30px';
        img.style.border = '1px solid #fff';
        img.style.marginRight = '5px';
        img.src = testPath;
        img.onload = () => img.style.borderColor = 'green';
        img.onerror = () => img.style.borderColor = 'red';

        html += `<div style="margin-bottom: 5px;">
                  <span>${testPath}: </span>
                  <img src="${testPath}" style="width: 50px; height: 30px;" />
                </div>`;
      }

      html += `<h3>Canvas Info</h3>`;
      const canvases = document.querySelectorAll('canvas');
      html += `<p>Total canvases: ${canvases.length}</p>`;
      canvases.forEach((canvas, i) => {
        html += `<p>Canvas #${i}: id=${canvas.id}, z-index=${getComputedStyle(canvas).zIndex}</p>`;
      });

      debugInfo.innerHTML = html;

      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Close';
      closeBtn.style.marginTop = '10px';
      closeBtn.onclick = () => document.body.removeChild(debugInfo);
      debugInfo.appendChild(closeBtn);

      document.body.appendChild(debugInfo);
    };

    document.body.appendChild(debugBtn);
  }
}

export default GameLevelEnd;
