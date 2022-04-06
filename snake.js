window.addEventListener('load', () => {
    const ctx = document.getElementById('snake-c').getContext('2d');
    const SNAKE_SIZE = 30;

    let running;
    let snake;
    let speedInterval;
    let move;
    let apple;

    load();
    clickListener();
    setInterval(draw, speedInterval);

    function draw() {
        isSnakeDead()
        if(running) {
            if(!checkHit()) {
                snake.pop();
            } else {
                randomizeApple();
            }
            snake = [[snake[0][0]+move[0], snake[0][1]+move[1]], ...snake];
        }

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = 'red';
        ctx.fillRect(2 + apple[0] * SNAKE_SIZE, 2 + apple[1] * SNAKE_SIZE, SNAKE_SIZE-4, SNAKE_SIZE-4);
    
        ctx.fillStyle = 'green';
        for(let i=1; i<snake.length; i++) {
            ctx.fillRect(2 + snake[i][0] * SNAKE_SIZE, 2 + snake[i][1] * SNAKE_SIZE, SNAKE_SIZE-4, SNAKE_SIZE-4);
        }
        ctx.fillStyle = 'yellow';
        ctx.fillRect(2 + snake[0][0] * SNAKE_SIZE, 2 + snake[0][1] * SNAKE_SIZE, SNAKE_SIZE-4, SNAKE_SIZE-4);
        
    }

    function load() {
        snake = [[5, 5], [4, 5], [3, 5], [2, 5], [1, 5], [0, 5]];
        running = false;
        speedInterval = 200;
        move = [0, 0];
        randomizeApple();
    }


    function checkHit() {
        if(snake[0][0] != apple[0]) {
            return false;
        }
        if(snake[0][1] != apple[1]) {
            return false;
        }
        return true;
    }


    function isSnakeDead() {
        let snakeHeadX = snake[0][0]
        let snakeHeadY = snake[0][1]

        //HIT WALL
        if(snakeHeadX < 0 || snakeHeadX > ctx.canvas.width/SNAKE_SIZE-1
        || snakeHeadY < 0 || snakeHeadY > ctx.canvas.height/SNAKE_SIZE-1) {
            running = false;
            return false;
        }

        //HIT TAIL
        for(let i=1; i<snake.length; i++) {
            if(snake[i][0] != snakeHeadX) continue;
            if(snake[i][1] != snakeHeadY) continue;
            running = false;
            return false;
        }

        return true;
    }

    function randomizeApple() {
        let x;
        let y;
        let ifOutOfSnake = false;
        while(!ifOutOfSnake) {
            x = getRandomInt(0, ctx.canvas.width/SNAKE_SIZE)
            y = getRandomInt(0, ctx.canvas.height/SNAKE_SIZE)

            ifOutOfSnake = true;
            for(let i=0; i<snake.length; i++) {
                if(snake[i][0] != x) continue;
                if(snake[i][1] != y) continue;
                ifOutOfSnake = false;
                break;
            }
        }
        apple = [x, y];
    }

    function clickListener() {
        window.addEventListener('keydown', e => {
            if(e.code.startsWith('Arrow')) {
                e.preventDefault();
                running = true;
            }

            if(e.code == "ArrowLeft" && move[0] != 1 && snake[0][0]-1 != snake[1][0]) {
                move = [-1, 0];
            } else if(e.code == "ArrowUp" && move[1] != 1 && snake[0][1]-1 != snake[1][1]) {
                move = [0, -1];
            } else if(e.code == "ArrowRight" && move[0] != -1 && snake[0][0]+1 != snake[1][0]) {
                move = [1, 0];
            } else if(e.code == "ArrowDown" && move[1] != -1 && snake[0][1]+1 != snake[1][1]) {
                move = [0, 1];
            }
        })
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
})