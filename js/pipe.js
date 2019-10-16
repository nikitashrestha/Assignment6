class Obstacles{
    constructor(canvas, context, image){
        this.canvas = canvas;
        this.context = context;
        this.image = image;
        this.position = [];
        this.gap = 85;
        this.w = 53;
        this.h = 400;
        this.dx = 2;
        this.maxYpos = -150;
        this.HITAUDIO = new Audio();
        this.HITAUDIO.src = 'audio/hit.wav';
        this.SCOREAUDIO = new Audio();
        this.SCOREAUDIO.src = 'audio/point.wav';
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
            this.context.drawImage(this.image, 553, 0, this.w, this.h,p.x, topYposition, this.w,this.h);

            //drawing bottom pipe
            this.context.drawImage(this.image, 502, 0, this.w, this.h, p.x, buttomYposition, this.w, this.h);

        }
    }

    update(bird,score,frames){

        if(state.current != state.game){
            
            return;

        }

        if((frames % 100) == 0){

            this.position.push({
                x : this.canvas.width,
                y : this.maxYpos * ( Math.random() + 1)
            });
        }
       
        for(let i = 0; i<this.position.length; i++){

            let p = this.position[i];
            
            let bottomPipeYPos = p.y + this.h + this.gap;

            //Detecting Collision
            //Top Pipe
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h){
                
                this.HITAUDIO.play();
                state.current = state.over;

            }

            //Bottom Pipe
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h){

                this.HITAUDIO.play();
                state.current = state.over;

            }

            // move pipes to left
            p.x -= this.dx;
            if(p.x + this.w <= 0){
                this.position.shift();
                score.value += 1;
                this.SCOREAUDIO.play();
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    }

    reset(){
        this.position = [];
    }
}
