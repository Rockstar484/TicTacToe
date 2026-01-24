let data = [['','',''],['','',''],['','','']];
let c1 = document.getElementById("1");
let c2 = document.getElementById("2");
let c3 = document.getElementById("3");
let c4 = document.getElementById("4");
let c5 = document.getElementById("5");
let c6 = document.getElementById("6");
let c7 = document.getElementById("7");
let c8 = document.getElementById("8");
let c9 = document.getElementById("9");
let playerDisplay = document.getElementById("playerDisplay");
let currentPlayer = "X";
playerDisplay.innerHTML="Player "+currentPlayer+"'s turn";
function displayUpdate() {
    playerDisplay.innerHTML="Player "+currentPlayer+"'s turn";
}
function input(c,x,y) {
    if(c.src.includes('files/Blank.png')){
        data[x][y]=currentPlayer;
        if (currentPlayer==="X") {
            c.setAttribute('src','files/C.png');
            checkWinner(currentPlayer);
            currentPlayer="O";
        } else {
            c.setAttribute('src','files/O.png');
            checkWinner(currentPlayer);
            currentPlayer="X";
        }
    }
}
function checkWinner(Player) {
    if(data[0][0]==Player && data[1][1]==Player && data[2][2]==Player){
        alert(currentPlayer+" Won!");
    }
}
c1.addEventListener('mousedown', ()=>input(c1,0,0));
c2.addEventListener('mousedown', ()=>input(c2,0,1));
c3.addEventListener('mousedown', ()=>input(c3,0,2));
c4.addEventListener('mousedown', ()=>input(c4,1,0));
c5.addEventListener('mousedown', ()=>input(c5,1,1));
c6.addEventListener('mousedown', ()=>input(c6,1,2));
c7.addEventListener('mousedown', ()=>input(c7,2,0));
c8.addEventListener('mousedown', ()=>input(c8,2,1));
c9.addEventListener('mousedown', ()=>input(c9,2,2));