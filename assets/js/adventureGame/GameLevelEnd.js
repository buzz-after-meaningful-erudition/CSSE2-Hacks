import GamEnvBackground from './GameEnvBackground.js';
import BackgroundParallax from './BackgroundParallax.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';

class GameLevelEnd {
    constructor(gameEnv) {
        console.log("Initializing GameLevelEnd...");
        
        // Values dependent on this.gameEnv.create()
        let width = gameEnv.innerWidth;
        let height = gameEnv.innerHeight;
        let path = gameEnv.path;

        // Background data
        const image_src_end = path + "/images/gamify/endbackground.png";
        const image_data_end = {
            name: 'end',
            greeting: "The End opens before you, a vast black void in the distance. The stone beneath your feet is yellowish and hard, and the air tingles.",
            src: image_src_end,
            pixels: { height: 1140, width: 2460 }
        };

        // Parallax Background data
        const parallax_data = {
            src: path + "/images/platformer/backgrounds/snowfall.png",
            zIndex: 1, // Lower zIndex so it stays behind everything
            velocity: 2, // Added velocity to ensure movement
            position: { x: 0, y: 0 } // Added position for proper scrolling
        };
        console.log("Parallax Data Loaded:", parallax_data);

        // Player Data (Chill Guy)
        const sprite_src_chillguy = path + "/images/gamify/chillguy.png";
        const CHILLGUY_SCALE_FACTOR = 5;
        const sprite_data_chillguy = {
            id: 'Chill Guy',
            greeting: "Hi, I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
            src: sprite_src_chillguy,
            SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: width / 16, y: height / 2 },
            pixels: { height: 384, width: 512 },
            orientation: { rows: 3, columns: 4 },
            down: { row: 0, start: 0, columns: 3 },
            left: { row: 2, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            up: { row: 3, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        };

        // NPC Data (Tux - Linux Mascot)
        const sprite_src_tux = path + "/images/gamify/tux.png";
        const sprite_greet_tux = "Hi, I am Tux, the Linux mascot. I am very happy to spend some Linux shell time with you!";
        const sprite_data_tux = {
            id: 'Tux',
            greeting: sprite_greet_tux,
            src: sprite_src_tux,
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 50,
            pixels: { height: 256, width: 352 },
            INIT_POSITION: { x: width / 2, y: height / 2 },
            orientation: { rows: 8, columns: 11 },
            down: { row: 5, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            quiz: {
                title: "Linux Command Quiz",
                questions: [
                    "Which command is used to list files in a directory?\n1. ls\n2. dir\n3. list\n4. show",
                    "Which command is used to change directories?\n1. cd\n2. chdir\n3. changedir\n4. changedirectory"
                ]
            },
            reaction: function () {
                alert(sprite_greet_tux);
            },
            interact: function () {
                let quiz = new Quiz();
                quiz.initialize();
                quiz.openPanel(sprite_data_tux);
            }
        };

        // Add objects to the scene in proper rendering order
        this.classes = [
            { class: BackgroundParallax, data: parallax_data },
            { class: GamEnvBackground, data: image_data_end },
            { class: Player, data: sprite_data_chillguy },
            { class: Npc, data: sprite_data_tux }
        ];
    }
}

export default GameLevelEnd;
