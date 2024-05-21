// Get the canvas element from the HTML document
let canvas = document.getElementById('game');
// Get the 2D rendering context for the canvas
let context = canvas.getContext('2d');

// Define the size of each square in the grid
let box = 32;
// Initialize the snake as an array of objects with x and y coordinates
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// Initialize the obstacles as an array of objects with x and y coordinates
let obstacles = [
    {x: 3 * box, y: 3 * box},
    {x: 5 * box, y: 7 * box},
    {x: 9 * box, y: 4 * box},
    // Add more obstacles as needed
];

// Set the initial direction of the snake
let direction = "right";

// Place the food at a random position in the grid
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Initialize the score
let score = 0;

// Function to draw the game background
function createBG() {
    context.fillStyle = "white";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the obstacles
function drawObstacles() {
    for(let i = 0; i < obstacles.length; i++) {
        context.fillStyle = "gray";
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Event listener for arrow keys to change the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Main game function
function startGame() {
    // If the snake hits the border, it appears on the opposite side
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Check if the snake has collided with itself
    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Draw the game elements
    createBG();
    createSnake();
    drawFood();
    drawObstacles();

    // Get the current head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Determine the new head position based on the current direction
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // If the new head position is where the food is, generate a new food position
    // Otherwise, remove the tail (the last element of the snake array)
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        document.getElementById('score').innerHTML = 'Score: ' + score;
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    } else {
        snake.pop();
    }

    // Create the new head and add it to the beginning of the snake array
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    
    // Check if the snake has collided with an obstacle
    for(let i = 0; i < obstacles.length; i++) {
        if(Math.round(snake[0].x) == Math.round(obstacles[i].x) && Math.round(snake[0].y) == Math.round(obstacles[i].y)){
            clearInterval(game);
            alert('Game Over :(');
         }
    }
}

// Call the startGame function every 100ms
let game = setInterval(startGame, 280);