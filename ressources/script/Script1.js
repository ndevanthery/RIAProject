// JavaScript source code

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Initial Values
let inputDir;
let actualState;
let score;
let lastRefreshTime;
let snakeArr;
let needRefresh = false;
//get last highest score
let hiscore = localStorage.getItem("hiscore");


// get hiscore value
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "record: " + hiscore;
}

//by default, first character is trump
let person = "Trump";
let snakeClass = 'green';


//game Parameters
let speed = 8;
let gridSize = 10;


init();


// Game Functions
function main(ctime) {
    //refresh
    window.requestAnimationFrame(main);
    if ((ctime - lastRefreshTime) / 1000 < 1 / speed) {
        needRefresh = false;
        return;
    }
    lastRefreshTime = ctime;

    //game logic
    gameEngine();
}



function gameEngine() {
    // Part 1: Updating the snake array & Food


    if (isCollide(snakeArr)) {

        alert("Game Over. this is your score : " + score);
        init();

    }
    else {
        // If you have eaten the food, increment the score and regenerate the food
        if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
            score += 1;

            //new record
            if (score > hiscoreval) {
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
            }

            //upgrade score
            scoreBox.innerHTML = "Score: " + score;

            //move one case further
            snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });


            //generate random position for the new food
            food = regenerateFood();
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

                snakeElement.classList.add('head' + person);
            }
            else {
                snakeElement.classList.add(snakeClass + 'Snake');
            }
            board.appendChild(snakeElement);
        });

        //buttons to choose
        const trump = document.getElementById('trump');
        trump.addEventListener('click', function onClick(event) {

            person = "Trump";
        });

        const dalailama = document.getElementById('dalailama');
        dalailama.addEventListener('click', function onClick(event) {
            person = "Dalailama";

        });

        const constantin = document.getElementById('constantin');
        constantin.addEventListener('click', function onClick(event) {
            person = "Constantin";

        });

        const green = document.getElementById('green');
        green.addEventListener('click', function onClick(event) {

            snakeClass = "green";
        });

        const red = document.getElementById('red');
        red.addEventListener('click', function onClick(event) {

            snakeClass = "red";
        });

        const yellow = document.getElementById('yellow');
        yellow.addEventListener('click', function onClick(event) {

            snakeClass = "yellow";
        });

        const grey = document.getElementById('grey');
        grey.addEventListener('click', function onClick(event) {

            snakeClass = "grey";
        });

        const blue = document.getElementById('blue');
        blue.addEventListener('click', function onClick(event) {

            snakeClass = "blue";
        });

        const purple = document.getElementById('purple');
        purple.addEventListener('click', function onClick(event) {

            snakeClass = "purple";
        });


        // Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food' + person);
        board.appendChild(foodElement);
    }
}

function regenerateFood() {
    let calcValue = { x: calculateRandom(), y: calculateRandom() };
    for (const element of snakeArr) {
        if (calcValue.x == element.x && calcValue.x == element.x) {
            calcValue = regenerateFood();
            break;

        }
    }
    return calcValue;
}

function calculateRandom() {
    let a = 2;
    let b = gridSize;
    return Math.round((b - a) * Math.random()) + 1;
}






//initial positions of the snake and the food ( first launch)
function init() {
    inputDir = { x: 0, y: 0 };
    lastRefreshTime = 0;
    actualState = "";

    snakeArr = [
        { x: calculateRandom(), y: calculateRandom() }
    ];
    food = regenerateFood();
    score = 0;
    scoreBox.innerHTML = "Score: " + score;


}


//return boolean for the collisions 
function isCollide(snake) {
    // collision with your own body
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            return true;
        }
    }
    // collision with a wall
    //if snake head is out of borders
    if (snake[0].x > gridSize || snake[0].x <= 0 || snake[0].y > gridSize || snake[0].y <= 0) {
        return true;
    }

    return false;
}



window.requestAnimationFrame(main);

//key listener
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            //if not going down, go up
            if (actualState == "down") {
            } else {
                if (!needRefresh) {
                    inputDir.x = 0;
                    inputDir.y = -1;
                    actualState = "up";
                    needRefresh = true;
                }
            }
            break;
        case "ArrowDown":
            //if not going up, go down
            if (actualState == "up") { }
            else {
                if (!needRefresh) {
                    inputDir.x = 0;
                    inputDir.y = 1;
                    actualState = "down";
                    needRefresh = true;
                }
            }
            break;

        case "ArrowLeft":
            //if not going right, go left
            if (actualState == "right") { }
            else {
                if (!needRefresh) {
                    inputDir.x = -1;
                    inputDir.y = 0;
                    actualState = "left";
                    needRefresh = true;
                }
            }
            break;

        case "ArrowRight":
            //if not going left, go right
            if (actualState == "left") { }
            else {
                if (!needRefresh) {
                    inputDir.x = 1;
                    inputDir.y = 0;
                    actualState = "right";
                    needRefresh = true;
                }
            }
            break;
        default:
            break;
    }

});