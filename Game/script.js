// Initial Values
let inputDir = { x: 0, y: 0 };
let actualState = "";
let score = 0;
let lastRefreshTime = 0;

//REMOVE IF WE DO NOT USE SOUNDS
const foodSound = new Audio('src/res/music/food.mp3');
const gameOverSound = new Audio('src/res/music/gameover.mp3');
const moveSound = new Audio('src/res/music/move.mp3');
const musicSound = new Audio('src/res/music/music.mp3');


//game Parameters
let speed = 10;
let gridSize = 18;

//initial positions of the snake and the food ( first launch)
let snakeArr = [
    { x: calculateRandom(), y: calculateRandom() }
];
food = { x: calculateRandom(), y: calculateRandom() };

// Game Functions
function main(ctime) {
    //refresh
    window.requestAnimationFrame(main);
    if ((ctime - lastRefreshTime) / 1000 < 1 / speed) {
        return;
    }
    lastRefreshTime = ctime;

    //game logic
    gameEngine();
}

function isCollide(snake) {
    // collision with your own body
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // collision with a wall
    //if snake head is out of borders
    if (snake[0].x >= gridSize || snake[0].x <= 0 || snake[0].y >= gridSize || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        actualState = "";
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 5, y: 5 }];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });


        //generate random position for the new food
        food = { x: calculateRandom(), y: calculateRandom() }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

function calculateRandom() {
    let a = 2;
    let b = 16;
    return Math.round(a + (b - a) * Math.random());
}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
/*    inputDir = { x: 0, y: 1 } // Start the game*/
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (actualState == "down") {
            } else { 
                inputDir.x = 0;
                inputDir.y = -1;
                actualState = "up";
            }
           
            
            break;

        case "ArrowDown":
            if (actualState == "up") { }
            else {
                inputDir.x = 0;
                inputDir.y = 1;
                actualState = "down";
            }

            break;

        case "ArrowLeft":
            if (actualState == "right") { }
            else {
                inputDir.x = -1;
                inputDir.y = 0;
                actualState = "left";
            }

            break;

        case "ArrowRight":
            if (actualState == "left") { }
            else {
                inputDir.x = 1;
                inputDir.y = 0;
                actualState = "right";
            }
            break;
        default:
            break;
    }

});