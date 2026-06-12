var peer = new Peer();
var conn;
let myID = "";
let turn = "my";

let data = [['','',''],['','',''],['','','']];
let X = 0;
let O = 0;
let count=0;
let cells = document.querySelectorAll(".cell");
let playerDisplay = document.getElementById("playerDisplay");
let currentPlayer = "X";
playerDisplay.innerHTML="Player "+currentPlayer+"'s turn";
function displayUpdate() {
    playerDisplay.innerHTML="Player "+currentPlayer+"'s turn";
}
function input(c,x,y) {
    if(c.src.includes('files/Blank.png')){
        count++;
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
        displayUpdate();
        if(conn){
            turn="friend";
        }
    }
}
function checkWinner(Player) {
    if(data[0][0]==Player && data[1][1]==Player && data[2][2]==Player || data[2][0]==Player && data[1][1]==Player && data[0][2]==Player){
        alert(currentPlayer+" Won!");
        if(currentPlayer=='X'){
            X++;
            document.getElementById(currentPlayer).value=X;
        }
        else{
            O++;
            document.getElementById(currentPlayer).value=O;
        }
        reset();
    }
    for(let i=0;i<3;i++){
        if(data[i][0]==Player && data[i][1]==Player && data[i][2]==Player || data[0][i]==Player && data[1][i]==Player && data[2][i]==Player){
            alert(currentPlayer+" Won!");
            if(currentPlayer=='X'){
                X++;
                document.getElementById(currentPlayer).value=X;
            }
            else{
                O++;
                document.getElementById(currentPlayer).value=O;
            }
            reset();
        }
    }
    if(count>=9){
        alert("Draw");
        reset();
    }
}
function reset() {
    cells.forEach(element => {
        element.src="files/Blank.png";
    });
    data = [['','',''],['','',''],['','','']];
    count=0;
}

function scoreReset(){
    X=0,O=0;
    document.getElementById("X").value=X;
    document.getElementById("O").value=O;
}
cells.forEach(cell => {
    cell.addEventListener('click', (e)=>{
        if(conn && turn=="my" || !conn){
            let c = e.target;
            input(c, c.getAttribute("data-x"), c.getAttribute("data-y"));
            if(conn){
                conn.send(c.id);
            }
        }
    });
});

function friendClick(data){
    let c = document.getElementById(data);
    input(c, c.getAttribute("data-x"), c.getAttribute("data-y"));
}

peer.on("open",function(id){
    myID = id;
});

function multiplayerIDdialog(){
    document.getElementById("mpDialog").showModal();
    document.getElementById("myPeerID").innerHTML=myID;
}

function connectPeer(){
    var friendID = document.getElementById("friendID").value;
    conn = peer.connect(friendID);
    if(conn){
        currentPlayer = "X";
        reset();
        displayUpdate();
        X = 0;
        O = 0;
        document.getElementById("X").value=X;
        document.getElementById("O").value=O;
        turn = "my";
        alert("Connected");
        document.getElementById("mpDialog").close();
    }
    conn.on("data", function(data){
        friendClick(data);
        turn = "my";
    });
    conn.on("close", () => {
        alert("Multiplayer connection Ended.\nYou can still play with someone sitting with you.\nOr try reconnecting");
        reset();
        scoreReset();
        turn = "my";
        conn=null;
    });
}

peer.on("connection", function(connection){
    conn = connection;
    currentPlayer = "X";
    reset();
    displayUpdate();
    X = 0;
    O = 0;
    document.getElementById("X").value=X;
    document.getElementById("O").value=O;
    turn = "friend";
    alert("Connected");
    document.getElementById("mpDialog").close();
    conn.on("data", function(data){
        friendClick(data);
        turn = "my";
    });
    conn.on("close", () => {
        alert("Multiplayer connection Ended.\nYou can still play with someone sitting with you.\nOr try reconnecting");
        reset();
        scoreReset();
        turn = "my";
        conn=null;
    });
});

window.addEventListener('beforeunload', () => {
    conn.close();
});

async function copy(text){
    try{
        await navigator.clipboard.writeText(text);
        alert("ID Copied!");
        document.getElementById("mpDialog").close();
    }
    catch(error){
        alert("Failed to copy text: "+error.message);
    }
}