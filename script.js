//logic for snake game
//Game Constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio();
const gameOverSound = new Audio();
const moveSound = new Audio()
const musicSound = new Audio()
let speed = 5;
let LastPaintTime = 0;
let score = 0;

let snakeArr = [
    { x: 13, y: 15 }
]

food = { x: 6, y: 7 };

//Game Functios
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - LastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    LastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if you bump into your self
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you bump into your wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //part 1: Updating the snake array and Food;
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        moveSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over ,Press any Key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;

    }

    //if you have eaten the food , increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play()
        score += 1;
        scoreBox.innerHTML = "score: " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        const element = snakeArr[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2 ; Display the snake 
    board.innerHTML = " ";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('snake');
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





//Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: onabort, y: 1 }//start the game
    // moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;


            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;

            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;

            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;

            break;

        default:
            break;
    }
});