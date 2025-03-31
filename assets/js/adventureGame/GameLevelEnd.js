import GamEnvBackground from './GameEnvBackground.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import BackgroundParallax from './BackgroundParallax.js';

class GameLevelEnd {
    constructor(gameEnv) {
        let width = gameEnv.innerWidth;
        let height = gameEnv.innerHeight;
        let path = gameEnv.path;

        // Background Data
        const image_src_end = path + "/images/gamify/endbackground.png";
        const image_data_end = {
            name: 'end',
            greeting: "The End opens before you, a vast black void in the distance. The stone beneath your feet is yellowish and hard, and the air tingles.",
            src: image_src_end,
            pixels: { height: 1140, width: 2460 }
        };

        // Player Data (Chillguy)
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

        // NPC Data (Tux)
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
                    "Which command is used to change directories?\n1. cd\n2. chdir\n3. changedir\n4. changedirectory",
                    "Which command is used to create a new directory?\n1. mkdir\n2. newdir\n3. createdir\n4. makedir",
                    "Which command is used to remove a file?\n1. rm\n2. remove\n3. delete\n4. erase",
                    "Which command is used to remove a directory?\n1. rmdir\n2. removedir\n3. deletedir\n4. erasedir",
                    "Which command is used to copy files?\n1. cp\n2. copy\n3. duplicate\n4. xerox",
                    "Which command is used to move files?\n1. mv\n2. move\n3. transfer\n4. relocate",
                    "Which command is used to view a file?\n1. cat\n2. view\n3. show\n4. display",
                    "Which command is used to search for text in a file?\n1. grep\n2. search\n3. find\n4. locate",
                    "Which command is used to view the contents of a file?\n1. less\n2. more\n3. view\n4. cat"
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

        // List of GameObjects in this level
        this.classes = [
            { class: GamEnvBackground, data: image_data_end }, // Base background (desert)
            { class: BackgroundParallax, data: { src: path + "/images/gamify/stars2.png", position: { x: 0, y: 0 }, velocity: 2, zIndex: 2 } }, // Moving stars
            { class: Player, data: sprite_data_chillguy }, // Player (on top)
            { class: Npc, data: sprite_data_tux } // NPCs (on top)
        ];
    }
}

export default GameLevelEnd;
