const X_CLASS='x'
const CIRCLE_CLASS='circle'

const WINNING_COMBINATIONS =[[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const nextButton = document.getElementById('Next')
const restartButton=document.getElementById('Restart')
const winningMessageTextElement= document.querySelector('[data-winning-message-text]')
let circleturn




startGame()

nextButton.addEventListener('click', startGame)
restartButton.addEventListener('click', restartGame)

function startGame(){
    circleturn=false;
    cellElements.forEach(cell=> {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click',handleClick, { once:true})
   })
   setBoardHoverClass()
   winningMessageElement.classList.remove('show')

   
} 

function restartGame(){
    counter1=0
    counter2=0
    circleturn=false;
    cellElements.forEach(cell=> {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click',handleClick, { once:true})
   })
   setBoardHoverClass()
   winningMessageElement.classList.remove('show')
   leaderBoardElement.classList.remove('show')
   scoreElement.classList.remove('show')
}

function handleClick(e){
    const cell=e.target
    const currentClass=circleturn? CIRCLE_CLASS:X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
         setBoardHoverClass()
    }
    
    
}
var counter1=0,counter2=0;
const leaderBoardElement = document.getElementById('winningMessage')
const leaderBoardTextElement = document.querySelector('[leaderboard-text]')
const scoreElement = document.getElementById('winningMessage')
const scoreTextElement= document.querySelector('[score-text]')


function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText= 'Draw!'
    }else if(circleturn){
        winningMessageTextElement.innerText = `${ "O's" } Wins!`
        counter1++;
    }
    else if(!circleturn){
        winningMessageTextElement.innerText = `${ "X's" } Wins!`
        counter2++;
    }
    scoreTextElement.innerText = 'LeaderBoard'
    leaderBoardTextElement.innerText = `${"X's Score:"+ " "+counter2 +"\n"+"O's Score:"+" "+ counter1}`

    winningMessageElement.classList.add('show')
    scoreElement.classList.add('show')
    leaderBoardElement.classList.add('show')
}


function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(CIRCLE_CLASS)|| cell.classList.contains(X_CLASS)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleturn=!circleturn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleturn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}