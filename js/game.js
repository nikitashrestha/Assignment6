// GAME STATE
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

//GAME KEYSTATE

const keyState = {
    current : 0,
    pressed : 1,
    released : 0
}



class Game{
    constructor(canvasId){
        // this.canvas = canvas;
        // this.context = context;
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', canvasId);
        this.canvas.width = '320';
        this.canvas.height = '480';
        document.body.appendChild(this.canvas);
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.image = new Image();
        this.image.src = 'images/sprite.png';
        this.frames = 0;
        this.foreground = new Foreground(this.canvas, this.context, this.image);
        this.obstacles = new Obstacles(this.canvas, this.context, this.image);
        this.scoreCard = new Score(this.canvas, this.context);
        this.bird = new Bird(this.foreground, this.canvas, this.context, this.image);
        this.getReady = new Getready(this.canvas, this.context, this.image);
        this.gameOver = new GameOver(this.context, this.context, this.image);
        this.SWOOSHINGAUDIO = new Audio();
        this.SWOOSHINGAUDIO.src = 'audio/wooshing.wav';

        //PLAY BUTTON

        this.startButton = {
            x : 120,
            y : 263,
            w : 83,
            h : 29
        }
    }

    drawCanvas(){

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#70c5ce";
        this.context.fillRect(0 , 0, this.canvas.width, this.canvas.height);
        
        //background image
        this.context.drawImage(this.image, 0, 0, 275, 226, 0, this.canvas.height-226 , 275, 226);
        this.context.drawImage(this.image, 0, 0, 275, 226, 275, this.canvas.height-226, 275, 226);
        this.obstacles.draw();
        this.foreground.draw();
        this.bird.draw();
        this.getReady.draw();
        this.gameOver.draw();
        this.scoreCard.draw();
        this.onClick();
        this.onKeyboardEventPressed();
        
    }

    onClick(){
        var that = this;
        this.canvas.onclick = function(event){
            switch(state.current){
                case state.getReady:
                    console.log('get Ready State');
                    state.current = state.game;
                    that.SWOOSHINGAUDIO.play();
                    break;
                
                case state.game:
                    if(that.bird.y - that.bird.radius <= 0) return;
                    that.bird.flapWings();
                    break;

                case state.over:
                    let rect = that.canvas.getBoundingClientRect();
                    let clickX = event.clientX - rect.left;
                    let clickY = event.clientY - rect.top;
                    // CHECK IF WE CLICK ON THE START BUTTON
                    if(clickX >= that.startButton.x && clickX <= that.startButton.x + that.startButton.w && clickY >= that.startButton.y && clickY <= that.startButton.y + that.startButton.h){
                        
                        that.obstacles.reset();
                        that.bird.resetSpeed();
                        that.scoreCard.reset();
                        state.current = state.getReady;

                    }
                    break;
            }
        }
    }

    onKeyboardEventPressed(){
        var that = this;
        window.addEventListener('keydown',function(event){
            var key = event.key || event.keyCode;
        
            switch(key){
                case ' ':
                    event.preventDefault();
                    if(state.current == state.game){

                        that.bird.flapWings();

                    }
            }
        });
    }

    update(){
        this.bird.update(this.frames);
        this.foreground.update();
        this.obstacles.update(this.bird, this.scoreCard, this.frames);
    }

    loop(){
        this.update();
        this.drawCanvas();
        this.frames++;
        window.requestAnimationFrame(this.loop.bind(this));
    }
}