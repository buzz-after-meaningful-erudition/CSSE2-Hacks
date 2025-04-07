import GamEnvBackground from './GameEnvBackground.js';
import BackgroundParallax from './BackgroundParallax.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';

class GameLevelEnd {
  constructor(gameEnv) {
    console.log("Initializing GameLevelEnd...");

    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    console.log("GameLevelEnd dimensions:", { width, height, path });

    this.createPathDebugger(path);

    // Parallax Background
    const image_src_parallax = path + "/images/gamify/parallaxbg.png";
    this.testImageExists(image_src_parallax, "parallax");

    const image_data_parallax = {
      name: 'parallax_background',
      id: 'parallax-background',
      greeting: "A mysterious parallax effect in the background.",
      src: image_src_parallax,
      pixels: { height: 1140, width: 2460 },
      position: { x: 0, y: 0 },
      velocity: 0.2,
      layer: 0,
      zIndex: 1
    };

    // End Background
    const image_src_end = path + "/images/gamify/TransparentEnd.png";
    this.testImageExists(image_src_end, "end");

    const image_data_end = {
      name: 'end',
      id: 'end-background',
      greeting: "The End opens before you, a vast black void in the distance. The stone beneath your feet is yellowish and hard, and the air tingles.",
      src: image_src_end,
      pixels: { height: 1140, width: 2460 },
      layer: 1,
      zIndex: 5
    };

    // Steve (replacing Chill Guy)
    const sprite_src_tsvee = path + "/images/gamify/steve.png";
    const STEVE_SCALE_FACTOR = 5;

    const sprite_data_tsvee = {
      id: 'Steve',
      greeting: "Hey, I'm Steve, ready for blocky adventures!",
      src: sprite_src_tsvee,
      SCALE_FACTOR: STEVE_SCALE_FACTOR,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 100,
      INIT_POSITION: { x: width / 16, y: height / 2 },
      pixels: { height: 512, width: 128 }, // 8 rows x 4 columns
      orientation: { rows: 8, columns: 4 },
      down: { row: 0, start: 0, columns: 4 },
      left: { row: 1, start: 0, columns: 4 },
      right: { row: 2, start: 0, columns: 4 },
      up: { row: 3, start: 0, columns: 4 },
      hitbox: { widthPercentage: 0.4, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 },
      zIndex: 10
    };

    // Endereye NPC
    const sprite_src_endereye = path + "/images/gamify/endereye.png";

    const greetings = [
      "Greetings, traveler. I see you’ve crossed paths with me today. Welcome to the world of endless wonders and mysteries. May your journey be ever enlightening.",
      "Ah, another wanderer. Welcome to the realm of secrets. I hope you are ready for what lies ahead.",
      "Welcome, brave soul. This land is full of challenges and rewards. What brings you here today?",
      "You’ve arrived at an interesting time. The winds of fate are always changing. May your path be guided by wisdom.",
      "The journey is long and fraught with unknowns, but fear not. I shall guide you through the shadows."
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
      pixels: { height: 256, width: 256 },
      INIT_POSITION: { x: width / 2, y: height / 2 },
      orientation: { rows: 2, columns: 2 },
      down: { row: 1, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      zIndex: 10,
      quiz: {
        title: "Linux Command Quiz",
        questions: [
          "It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! \n1. huh\n2. what\n3. ...\n4. ok bye"
        ]
      },
      reaction: function () {
        alert(getRandomGreeting());
      },
      interact: function () {
        let quiz = new Quiz();
        quiz.initialize();
        quiz.openPanel(sprite_data_endereye);
      }
    };

    console.log("Setting up classes array");

    this.classes = [
      { class: BackgroundParallax, data: image_data_parallax },
      { class: GamEnvBackground, data: image_data_end },
      { class: Player, data: sprite_data_tsvee },
      { class: Npc, data: sprite_data_endereye }
    ];

    console.log("Classes array created with", this.classes.length, "items");
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
        html += `<div style="margin-bottom: 5px;">
                  <span>${testPath}: </span>
                  <img src="${testPath}" style="width: 50px; height: 30px; border: 1px solid #fff;" onerror="this.style.borderColor='red'" onload="this.style.borderColor='green'">
                </div>`;
      }

      html += `<h3>Canvas Info</h3>`;
      const canvases = document.querySelectorAll('canvas');
      html += `<p>Total canvases: ${canvases.length}</p>`;
      canvases.forEach((canvas, i) => {
        html += `<p>Canvas #${i}: id=${canvas.id}, z-index=${getComputedStyle(canvas).zIndex}, visibility=${getComputedStyle(canvas).visibility}, display=${getComputedStyle(canvas).display}</p>`;
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
