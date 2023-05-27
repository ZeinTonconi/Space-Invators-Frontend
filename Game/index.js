import enemycontroller from "./enemycontroller.js";
import player from "./player.js";
import BulletController from "./BulletController.js";
import PowerUpController from "./PowerUpController.js";
import Ghost from "./Ghost.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1754;
canvas.height = 1240;

const background = new Image();
background.src = "../imagenes/rjscenary.png";

const balaDelJugador = new BulletController(canvas,10,"red",true,"../imagenes/balaestrella.png");
const balaDelGhost = new BulletController(canvas, 10, "red", true, "../imagenes/balaestrella.png");
const enemybulletcontroller = new BulletController(canvas,4,"white",false,"../imagenes/balaenemigo.png");
const powerUpcontroller = new PowerUpController(canvas,"");
const controladoreEnemigo = new enemycontroller(
    canvas, 
    enemybulletcontroller, 
    balaDelJugador,
    balaDelGhost,
    powerUpcontroller
);

const ghost = new Ghost(canvas, 3, balaDelGhost);
const jugador = new player(canvas, 3, balaDelJugador, ghost);

powerUpcontroller.setEnemyController(controladoreEnemigo);
powerUpcontroller.setJugador(jugador);

let isGameOver = false;
let didwin = false;
let shownGameOver = false;

const msgs = ["No te rindas", "Levantate", "No puedes rendirte"];

function game(){
    checkGameOver();
    ctx.drawImage(background,0,0,canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver){
        controladoreEnemigo.draw(ctx);
        jugador.draw(ctx);
        balaDelJugador.draw(ctx);
        balaDelGhost.draw(ctx);
        enemybulletcontroller.draw(ctx);

        
        powerUpcontroller.draw(ctx);
        powerUpcontroller.collideWith(jugador);
    }
    
}

function displayGameOver(){
    if(isGameOver && !shownGameOver){

        shownGameOver = true;

        const div = document.createElement('div');
        div.className = "newPlayer"

        const idMsg = Math.floor(Math.random()*3);
        div.innerHTML = `<h1>${msgs[idMsg]}</h1>
                        <label>Me Rindo :(</label>
                        <br>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Maff" id="nombreJugador" >
                            <button class="btn btn-outline-secondary ok" type="button" id="enviarJugador">OK</button>
                            <br>
                        </div>
                        <div class="input-group">
                            <button>Reintentar</button>
                        </div>
                        `
        document.body.appendChild(div);
        document.getElementById('enviarJugador').onclick=enviar;

        // let text = didwin ? "You Win" : "Game Over";
        // let textOffset = didwin ? 7.35 : 5;

        // ctx.fillStyle = "white";
        // ctx.font = "70px Roboto";
        // ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);

    }
}


function checkGameOver(){
    if(isGameOver){
        return;
    }
 
    if(enemybulletcontroller.collideWith(jugador)){
        console.log("golpear jugador")
        isGameOver = true;
    }

    if(controladoreEnemigo.collideWith(jugador)){
        isGameOver = true;

    }

    if(controladoreEnemigo.enemyRows.length === 0){
        didwin = true;
        isGameOver = true;
    }

    
}

const enviar = async () => {
    const nombreJugador = document.getElementById('nombreJugador').value;
    console.log(nombreJugador);
    const jugador = {
        name: nombreJugador,
        score: document.getElementById("score").innerHTML
    }
    try {
        await fetch('http://localhost:8080/api/player', {
            method: "POST" ,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jugador)
        });   
        console.log("Enviado")
        window.location.href = 'http://localhost:5500/ScoreBoard/score.html'
    } catch (error) {
        console.log(error);
    }
    
}   

setInterval(game,1000/60);

// const enviarJugador = document.getElementById('enviarJugador');
// enviarJugador.onclick = enviar;