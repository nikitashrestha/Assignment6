var canvas = document.getElementById('canvas');
var context = this.canvas.getContext('2d');
var image = new Image();
image.src = 'images/sprite.png';

let frames = 0;
const DEGREE = Math.PI/180;

// GAME STATE
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

//PLAY BUTTON

const startButton = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
}




class Bird{
    constructor(foreground){
        this.foreground = foreground;
        this.x = 50;
        this.y = 150;
        this.w = 34;
        this.h = 26;
        this.radius = 12;
        this.frame = 0;
        this.gravity = 0.25;
        this.jump = 4.6;
        this.speed = 0;
        this.rotation = 0;
        this.sX = [276, 276, 276, 276];
        this.sY = [112, 139, 164, 139]
    }

    draw(){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.drawImage(image, this.sX[this.frame], this.sY[this.frame], this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
        context.restore();
    }

    flapWings(){
        this.speed = -this.jump;
    }

    update(){
        //When game state == READY, bird flap slowly
        this.period = state.current == state.getReady ? 10 : 5;

        //Increment frame by 1 in each period
        this.frame += frames % this.period == 0 ? 1 : 0;
        this.frame = this.frame % this.sX.length;

        if(state.current == state.getReady){
            
            this.y = 150; //Reset bird position when game restarts
            this.rotation = 0 * DEGREE;

        }
        else{

            this.speed += this.gravity;
            this.y += this.speed;

            if(this.y + this.h/2 >= canvas.height - this.foreground.h){

                this.y = canvas.height - this.foreground.h - this.h/2;

                if(state.current == state.game){

                    state.current = state.over;

                }
            }

            if(this.speed >= this.jump){

                this.rotation = 90 * DEGREE;
                this.frame = 1;

            }
            else{

                this.rotation = -25 * DEGREE;

            }
        }

    }

    resetSpeed(){
        this.speed = 0;
    }
}


class Obstacles{
    constructor(){
        this.position = [];
        this.gap = 85;
        this.w = 53;
        this.h = 400;
        this.dx = 2;
        this.maxYpos = -150;
    }

    draw(){
        for(let i = 0; i < this.position.length; i++){

            let p = this.position[i];
            let topYposition = p.y;
            console.log(p.y);
            console.log(p.x);
            //console.log(image);
            let buttomYposition = p.y + this.h + this.gap;

            //drawing top pipe
            context.drawImage(image, 553, 0, this.w, this.h,p.x, topYposition, this.w,this.h);

            //drawing bottom pipe
            context.drawImage(image, 502, 0, this.w, this.h, p.x, buttomYposition, this.w, this.h);

        }
    }

    update(bird,score){

        if(state.current != state.game){
            
            return;

        }

        if((frames % 100) == 0){

            this.position.push({
                x : canvas.width,
                y : this.maxYpos * ( Math.random() + 1)
            });
        }
       
        for(let i = 0; i<this.position.length; i++){

            let p = this.position[i];
            
            let bottomPipeYPos = p.y + this.h + this.gap;

            //Detecting Collision
            //Top Pipe
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h){

                state.current = state.over;

            }

            //Bottom Pipe
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h){

                state.current = state.over;

            }

            // move pipes to left
            p.x -= this.dx;
            if(p.x + this.w <= 0){
                this.position.shift();
                score.value += 1;
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    }

    reset(){
        this.position = [];
    }
}


//Get Ready Window 
class Getready{
    constructor(){
        this.sX = 0;
        this.sY = 228;
        this.w = 173;
        this.h = 152;
        this.x = canvas.width/2 - this.w/2;
        this.y = 80;
    }

    draw(){

        if(state.current == state.getReady){

            context.drawImage(image, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)  ;          
        
        }
    }
}


//Game Over 
class GameOver{
    constructor(){
        this.sX = 175;
        this.sY = 228;
        this.w = 225;
        this.h = 202;
        this.x = canvas.width/2 - this.w/2;
        this.y = 90;
    }

    draw(){
        
        if(state.current == state.over){

            context.drawImage(image, this.sX, this.sY, this.w, this.h, this.x, this.y,this.w, this.h);

        }
    }
}

class Foreground{
    constructor(){
        this.w = 224;
        this.h = 114;
        this.x = 0;
        this.y = canvas.height - 112;
        this.dx = 2;
    }

    draw(){
        //foreground image
        context.drawImage(image, 276, 0, this.w, this.h, this.x, this.y, this.w, this.h);
        context.drawImage(image, 276, 0, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }

    update(){

        if(state.current == state.game){

            this.x = (this.x - this.dx)%(this.w/2);

        }
    }
}


class Score{
    constructor(){
        this.best = parseInt(localStorage.getItem("best")) || 0;
        this.value = 0;
    }

    draw(){
        context.fillStyle = "#FFF";
        context.strokeStyle = "#000";
        if(state.current == state.game){

            context.lineWidth = 2;
            context.font = '35px Arial';
            context.fillText(this.value, canvas.width/2, 50);
            context.strokeText(this.value, canvas.width/2, 50);

        }
        else if(state.current == state.over){

            // SCORE VALUE
            context.font = "25px Arial";
            context.fillText(this.value, 225, 186);
            context.strokeText(this.value, 225, 186);
            // BEST SCORE
            context.fillText(this.best, 225, 228);
            context.strokeText(this.best, 225, 228);

        }
    }

    reset(){
        this.value = 0;
    }
}


class Game{
    constructor(){
        this.foreground = new Foreground();
        this.obstacles = new Obstacles();
        this.scoreCard = new Score();
        this.bird = new Bird(this.foreground);
        this.getReady = new Getready();
        this.gameOver = new GameOver();
    }

    drawCanvas(){
        context.fillStyle = "#70c5ce";
        context.fillRect(0 ,0 ,canvas.width, canvas.height);

        //background image
        context.drawImage(image,0,0,275,226,0,canvas.height-226,275,226);
        context.drawImage(image,0,0,275,226,275,canvas.height-226,275,226);
        this.obstacles.draw();
        this.foreground.draw();
        this.bird.draw();
        this.getReady.draw();
        this.gameOver.draw();
        this.scoreCard.draw();
        this.onClick();
        
    }

    onClick(){
        canvas.onclick = function(event){
            switch(state.current){
                case state.getReady:
                    state.current = state.game;
                    break;
                
                case state.over:
                    let rect = canvas.getBoundingClientRect();
                    let clickX = event.clientX - rect.left;
                    let clickY = event.clientY - rect.top;
            }
        }
    }

    update(){
        this.bird.update();
        this.foreground.update();
        this.obstacles.update(this.bird,this.scoreCard);
    }
}

function loop(){
    game = new Game();
    game.update();
    game.drawCanvas();
    frames++;
    window.requestAnimationFrame(loop);
}

loop();

