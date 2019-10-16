class Bird{
    constructor(foreground, canvas, context, image){
        this.canvas = canvas;
        this.context = context;
        this.foreground = foreground;
        this.image = image;
        this.DEGREE = Math.PI/180;
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
        this.FLAPAUDIO = new Audio();
        this.FLAPAUDIO.src = 'audio/flap.wav';
        this.DIEAUDIO = new Audio();
        this.DIEAUDIO.src = 'audio/die.wav';
    }

    draw(){
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotation);
        this.context.drawImage(this.image, this.sX[this.frame], this.sY[this.frame], this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
        this.context.restore();
    }

    flapWings(){
        this.FLAPAUDIO.play();
        this.speed = -this.jump;
    }

    update(frames){
        //When game state == READY, bird flap slowly
        this.period = state.current == state.getReady ? 10 : 5;

        //Increment frame by 1 in each period
        this.frame += frames % this.period == 0 ? 1 : 0;
        //console.log(frames);
        this.frame = this.frame % this.sX.length;

        if(state.current == state.getReady){
            
            this.y = 150; //Reset bird position when game restarts
            this.rotation = 0 * this.DEGREE;

        }
        else{
            
            this.speed += (this.gravity);
            this.y += this.speed;
            
            
            if(this.y + this.h/2 >= this.canvas.height - this.foreground.h){

                this.y = this.canvas.height - this.foreground.h - this.h/2;
                console.log('collision');

                if(state.current == state.game){
                
                    state.current = state.over;
                    this.DIEAUDIO.play();
                    
                }
            }

            if(this.speed >= this.jump){

                this.rotation = 90 * this.DEGREE;
                this.frame = 1;

            }
            else{

                this.rotation = -25 * this.DEGREE;

            }
        
        }

    }

    resetSpeed(){
        this.speed = 0;
    }
}
