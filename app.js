// Entry point of the game. Run it with: node app.js
//
// This file should:
// 1. Import PromptSync (from 'prompt-sync') and create the `prompt` function.
// 2. Import the Riddle class, the Player class, and the array of all riddles (from riddles/index.js).
// 3. Show a welcome message and ask the player for their name, then create a Player object.
// 4. Loop over all riddles. For each riddle:
//    - save the start time (Date.now())
//    - create a Riddle object and call its ask() method
//    - save the end time (Date.now())
//    - save the time using player.recordTime()
// 5. After the loop, call player.showStats() to show total time and average time per riddle.
import PromptSync from 'prompt-sync';
import AllRiddles from './riddles/index.js';
import Player from './classes/Player.js';
import Riddle from './classes/Riddle.js';


const prompt = PromptSync();

console.log('welcome to Riddle games!')
let inputName = prompt(`wath's is your name?`)
const player1 = new Player(inputName)
const level = prompt('Choose difficulty:easy/medium/hard')

AllRiddles.forEach(riddle => {


    if (riddle.difficulty === level) {

        const newRiddle = new Riddle(riddle.id, riddle.name, riddle.taskDescription, riddle.correctAnswer,riddle.difficulty,riddle.timeLimit,riddle.hint)
        let startTime = Date.now();
        newRiddle.ask(prompt);
        let endTime = Date.now();
        if ((endTime - startTime) / 1000 > riddle.timeLimit) {
            riddle.penalty ? player1.recordTime(startTime / 1000, (endTime / 1000) + 15) : player1.recordTime(startTime / 1000, (endTime / 1000) + 5)
            console.log("Too slow! 5 seconds penalty applied")
        }
        else
            riddle.penalty ? player1.recordTime(startTime / 1000, (endTime / 1000) + 10) : player1.recordTime(startTime / 1000, endTime / 1000)

    }


});
for (let i = AllRiddles.length - 1; i > 0; i--) {
        
        const j = Math.floor(Math.random() * (i + 1));
        
        [AllRiddles[i], AllRiddles[j]] = [AllRiddles[j], AllRiddles[i]];
    }
    console.log(AllRiddles)
player1.showStats();


