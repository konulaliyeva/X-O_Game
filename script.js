const tiles = Array.from(document.querySelectorAll('.tile'));
const diplayPlayer = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

let currentPlayer = 'X';
const playerX_win = 'PlayerX_Win';
const playerO_win = 'PlayerO_Win';
const noWinner = 'No winner, no looser';
let isGaming = true;


let board = ['', '', '','', '', '','', '', '' ];

let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];
function announceWinner(condition){
    switch(condition){
        case playerO_win:
           announcer.innerHTML = 'Player <span class="playerO">O</span> Won  🎉';
           break;
        case playerX_win:
           announcer.innerHTML = 'Player <span class="playerX">X</span> Won  🎉';
            break;
        case noWinner:
            announcer.innerText = `${noWinner}`;
    }
    announcer.classList.remove('hide');
};
function checkWinningConditions(){
    let winRound = false;
    for(let i =0; i<winningConditions.length -1; i++){
    let winCondition = winningConditions[i];
    let firstValue = board[winCondition[0]];
    let secondValue = board[winCondition[1]];
    let thirdValue = board[winCondition[2]];
    if(firstValue === '' || secondValue ==='' || thirdValue === ''){
        continue;
    }
    if(firstValue === secondValue && secondValue === thirdValue){
        winRound = true;
        break;
    }}
    
    if(winRound){
       announceWinner(currentPlayer === 'X'? playerX_win: playerO_win);
       isGaming = false;
       return;
    }
    

    if(!board.includes('')) announceWinner(noWinner);
};

const changePlayer =() => {
    diplayPlayer.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    diplayPlayer.innerText = currentPlayer;
    diplayPlayer.classList.add(`player${currentPlayer}`);
}

const updateBoard = (index) => {
    board[index] = currentPlayer;
}

const isEmptyTile =(tile)=>{
    if( tile.innerText=== 'X' || tile.innerText === 'O'){
        return false;
    }
    return true;
}



tiles.forEach((tile, index) => {
    tile.addEventListener('click',()=>{
        if(isEmptyTile(tile) && isGaming){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            checkWinningConditions();
            changePlayer();}
    });
}
);



function resetBoard(){
    board = ['', '', '','', '', '','', '', '' ];
    isGaming = true;
    announcer.classList.add('hide');
    

    if (currentPlayer === 'O') {
        changePlayer();
    }

    tiles.forEach(tile =>{
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });


}
resetButton.addEventListener('click', resetBoard);