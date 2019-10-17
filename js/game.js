class Game{
    constructor(canvasId, keyEvent){
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
        this.state = new State();
        this.foreground = new Foreground(this.canvas, this.context, this.image);
        this.obstacles = new Obstacles(this.canvas, this.context, this.image);
        this.scoreCard = new Score(this.canvas, this.context);
        this.bird = new Bird(this.foreground, this.canvas, this.context, this.image);
        this.getReady = new Getready(this.canvas, this.context, this.image);
        this.gameOver = new GameOver(this.canvas, this.context, this.image);
        this.SWOOSHINGAUDIO = new Audio();
        this.SWOOSHINGAUDIO.src = 'audio/wooshing.wav';
        this.keyEvent = keyEvent;
        console.log(this.keyEvent);
        this.onClick();
        this.onKeyboardEventPressed();

        //PLAY BUTTON

        this.startButton = {
            x : 120,
            y : 263,
            w : 83,
            h : 29
        }
    }

    drawCanvas(){
        let currentState = this.state.getState();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#70c5ce";
        this.context.fillRect(0 , 0, this.canvas.width, this.canvas.height);
        
        //background image
        this.context.drawImage(this.image, 0, 0, 275, 226, 0, this.canvas.height-226 , 275, 226);
        this.context.drawImage(this.image, 0, 0, 275, 226, 275, this.canvas.height-226, 275, 226);
        this.obstacles.draw();
        this.foreground.draw();
        this.bird.draw();
        this.getReady.draw(currentState);
        this.gameOver.draw(currentState);
        this.scoreCard.draw(currentState);
    }

    onClick(){
        var that = this;
        this.canvas.onclick = function(event){
            let state = that.state.getState();
            switch(state){
                case 0:
                    that.state.changeState(1);
                    //that.state.changeState(state.game);
                    that.SWOOSHINGAUDIO.play();
                    break;
                
                case 1:
                    if(that.bird.y - that.bird.radius <= 0) return;
                    if(that.keyEvent == 0){
                        that.bird.flapWings();
                    }
                    break;

                case 2:
                    let rect = that.canvas.getBoundingClientRect();
                    let clickX = event.clientX - rect.left;
                    let clickY = event.clientY - rect.top;
                    // CHECK IF WE CLICK ON THE START BUTTON
                    if(clickX >= that.startButton.x && clickX <= that.startButton.x + that.startButton.w && clickY >= that.startButton.y && clickY <= that.startButton.y + that.startButton.h){
                        
                        that.obstacles.reset();
                        that.bird.resetSpeed();
                        that.scoreCard.reset();
                        that.state.changeState(0);
                    }
                    break;
            }
        }
    }

    onKeyboardEventPressed(){
        var that = this;
        window.addEventListener('keydown', function(event){
            var key = event.key || event.keyCode;
            let state = that.state.getState();
            switch(key){
                
                case ' ':
                    event.preventDefault();
                    if(state == 1){
                        if(that.bird.y - that.bird.radius <= 0) return;
                        if(that.keyEvent == 1){
                            console.log('key');
                            that.bird.flapWings();

                        }

                    }
                    break;
            }
        });
    }

    update(){
        this.bird.update(this.frames,this.state);
        this.foreground.update(this.state.getState());
        this.obstacles.update(this.bird, this.scoreCard, this.frames, this.state);
    }

    loop(){
        this.update();
        this.drawCanvas();
        this.frames++;
        requestAnimationFrame(this.loop.bind(this));
    }
}


