//Game Over 
class GameOver{
    constructor(canvas, context, image){
        this.canvas = canvas;
        this.context = context;
        this.image = image;
        this.sX = 175;
        this.sY = 228;
        this.w = 225;
        this.h = 202;
        this.x = this.canvas.width/2 - this.w/2;
        this.y = 90;
        this.DIEAUDIO = new Audio();
        this.DIEAUDIO.src = 'audio/die.wav';
    }

    draw(){

        if(state.current == state.over){

            this.context.drawImage(this.image, this.sX, this.sY, this.w, this.h, this.x, this.y,this.w, this.h);
        
        }
    }
}
