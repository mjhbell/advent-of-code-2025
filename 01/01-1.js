const fs = require('node:fs');
const readline = require('readline');

let commands = new Array();
const startPos = 50;
const positionsCount = 100;

//Stream reader to process input file
var reader = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

//Push column values into their respective arrays
reader.on('line', function (line) {
    let direction = 1; //clockwise
    if(line.substring(0,1) === 'L'){
        direction = -1; //anticlockwise
    };
    let positions = parseInt(line.substring(1));
    positions = positions % positionsCount;
    if(positions < 0){
        positions = positions * -1;
    }
    let command = {"direction":direction, "positions":positions};
    commands.push(command);
})

//Listen for end of read stream and start calculation.
reader.on('close', calculateAnswer);

function calculateAnswer(){

    let zerocount = 0;
    currentPos = startPos;

    for(let i=0; i<commands.length; i++){
        console.log(currentPos);
        console.log(commands[i]);
        if(commands[i].direction < 0){
            currentPos = currentPos - commands[i].positions;
        }else{
            currentPos = currentPos + commands[i].positions;
        }
        if(currentPos < 0){
            currentPos = 100+currentPos;
        }
        if(currentPos > 99){
            currentPos = currentPos-100;
        }
        console.log(currentPos);
        if(currentPos === 0){
            zerocount += 1;
        }
    }

    console.log(zerocount);
    
}