
let board=document.querySelector(".board") 
let player=document.querySelector(".player") 
let playAgain=document.querySelector(".playAgain") 
let restart=document.querySelector(".restart") 

let box=0 

let possibleWins = [ 
[0, 1, 2, 3], [41, 40, 39, 38],[7, 8, 9, 10], 
[34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], 
[21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], 
[13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], 
[0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22], 
[40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], 
[3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25], 
[37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], 
[6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], 
[41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10], 
[14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], 
[6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31], 
[21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], 
[5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22], 
[2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], 
[40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], 
[11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], 
[5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
[15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], 
[26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], 
[36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], 
[8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], 
[11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34] 
]; 



let currentPlayer= 1

document.addEventListener("DOMContentLoaded", loadDOM)
function loadDOM(){ 
    createBoard() 
    player.innerHTML=currentPlayer 
    let spaces =document.querySelectorAll(".board div") 
    Array.from(spaces).forEach(square=>{ 
    square.addEventListener("click",takeTurn)
    })
    // playAgain.addEventListener("click",reset) 
};

function createBoard(){ 
    for(let i=0;i<49;i++){ 
    let div =document.createElement("div") 
    div.setAttribute("data-id",i) 
    div.className = "square" 
    if (i>=42){ 
    div.className="taken" 
    } 
    board.appendChild(div) 
    } 
};

function takeTurn(){ 
    let spaces = document.querySelectorAll(".board div") 
    let click =parseInt(this.dataset.id) 
    if(spaces[click+7].classList.contains("taken") && !spaces[click].classList.contains("taken")){ 
        if(currentPlayer===1){ 
        currentPlayer=2 
        player.innerHTML=currentPlayer
        this.className="player-one taken" 
        checkWon() 
            }else if(currentPlayer===2){ 
            currentPlayer=1 
            player.innerHTML=currentPlayer 
            this.className="player-two taken" 
            checkWon() 
            } 
                if(box===42){ 
                setTimeout(()=>alert("Tie Game!"),300)
                setTimeout(()=>restart.style.display="flex",500) 
                } 
    }
};

// var pieces = document.getElementsByClassName(".square")
// for(var i = 0; i<pieces.length; i++){
//     pieces[i].addEventListener("click", function(){
//         document.getElementsByClassName("square").style.color = "grey"
//     });
// }
// piece.addEventListener('mouseover', colorChange)
// function colorChange(){
//     document.getElementsByClassName("square").style.color = "grey"
// };




function checkWon(){
    let spaces = document.querySelectorAll(".board div")
    for (let y=0;y<possibleWins.length;y++){
    let square =possibleWins[y]
    if(square.every(q=>spaces[q].classList.contains("player-one"))){
        document.getElementById("change").textContent = "Player 1 Wins!"
      setTimeout(() =>alert("Red wins!"), 200)
      setTimeout(() =>restart.style.display="flex", 500)
      }if(square.every(q=>spaces[q].classList.contains("player-two"))){
        document.getElementById("change").textContent = "Player 2 Wins!"
      setTimeout(() =>alert("Black wins!"), 200)
      setTimeout(() =>restart.style.display="flex", 500)
    }
    }
};




// used these sources for reference // 
//// reference for takeTurn and checkWon https://github.com/kubowania/connect-four
// https://dev.to/fakorededamilola/building-a-connect-four-game-with-javascript-1f45 

// restart the game and clear board 
playAgain.addEventListener("click", reset)
function reset(){
    board.innerHTML="" 
    loadDOM() 
    currentPlayer === 1
}


// animate connect four headers 
let header1 = anime({
    targets: '.currentPlayer',
    translateY: 20, 
    rotate: 360
}); 

//animate other connect four headers 
let animated_words = anime({
    targets: '.move',
    translateY: 20, 
    rotate: 360 
}); 

//animate SVG circles showing player colors 
let disc_drop = anime({
    targets: '.miniconnect', 
    translateY: 15,
    direction: 'alternative',
    loop: false,
    duration: 2000, 
    easing: function(el, i, total){
        return function(t) {
            return Math.pow(Math.sin(t * (i +1)), total)
        }
    }
});

function animate(){
    header1.restart;
    animated_words.restart;
    disc_drop.restart;
    // endgame.restart;
    // bounce_board.restart;
};

document.querySelector('.currentPlayer', ".move", ".miniconnect").onclick = animate();
