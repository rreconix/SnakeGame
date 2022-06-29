import { onSnake, expandSnake } from "./snake.js"
import { randomGridPosition } from "./grid.js"
export let score = 0;
let food = { x: 11, y: 1 }
const EXPANSION_RATE = 1

export function update(){
    if(onSnake(food)){
        score++
        document.getElementById("score-amount").textContent = score
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard){
    const foodElement = document.createElement('img')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.className = "apple"
    foodElement.src = 'https://www.google.com/logos/fnbx/snake_arcade/v4/apple_00.png'
    gameBoard.appendChild(foodElement)

}

function getRandomFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }

    return newFoodPosition
}