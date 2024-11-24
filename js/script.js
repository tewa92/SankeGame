const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

console.log(ctx);

// lets divide the canvas into 20x20 grids
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
snake[0] = {
    // take random values for x and y
    x: Math.floor(Math.random() * rows) * scale,
    y: Math.floor(Math.random() * columns) * scale
}

let food = {
    x: Math.floor(Math.random() * rows) * scale,
    y: Math.floor(Math.random() * columns) * scale
}

let d = "right";

document.onkeydown = direction;

function direction(e) {
    let key = e.key;
    if (key == "ArrowRight" && d != "left") {
        d = "right";
    } else if (key == "ArrowLeft" && d != "right") {
        d = "left";
    } else if (key == "ArrowUp" && d != "down") {
        d = "up";
    } else if (key == "ArrowDown" && d != "up") {
        d = "down";
    }
}

let playGame = setInterval(draw, 200);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = "red";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
    }

    // draw food
    ctx.fillStyle = "#ff0";
    ctx.strokeStyle = "green";
    ctx.fillRect(food.x, food.y, scale, scale);
    ctx.strokeRect(food.x, food.y, scale, scale);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    console.log(snakeX);

    if (d == "right") {
        snakeX += scale;
    } else if (d == "left") {
        snakeX -= scale;
    } else if (d == "up") {
        snakeY -= scale;
    } else if (d == "down") {
        snakeY += scale;
    }

    if (snakeX > canvas.width) {
        snakeX = 0;
    }
    if (snakeX < 0) {
        snakeX = canvas.width;
    }
    if (snakeY > canvas.height) {
        snakeY = 0;
    }
    if (snakeY < 0) {
        snakeY = canvas.height;
    }

    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor(Math.random() * rows) * scale,
            y: Math.floor(Math.random() * columns) * scale
        }
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // check for collision
    if (eatSelf(newHead, snake)) {
        clearInterval(playGame);
        alert("Game Over");
        return;
    }

    snake.unshift(newHead);
}

function eatSelf(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}