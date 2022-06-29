import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from "./snake.js"
import { update as updateFood, draw as drawFood, score } from "./apple.js"
import { outsideGrid } from "./grid.js"

let lastRenderedTime = 0;
let gameOver = false
const gameBoard = document.getElementById('game-board')

const highscore = localStorage.getItem('highscore') | 0

window.onload = () => {
    document.getElementById('highscore-amount').textContent = highscore;
}

function main(currentTime){
    if(gameOver){
        if(score > highscore) localStorage.setItem('highscore', score)
        if(confirm("You lost. Press 'OK' to play again")){
            window.location = "/"
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime-lastRenderedTime)/1000
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderedTime = currentTime

    update()
    draw()
}


window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}