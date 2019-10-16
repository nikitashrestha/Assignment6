class Foreground{
    constructor(canvas, context,image){
        this.canvas = canvas;
        this.context = context;
        this.image = image;
        this.w = 224;
        this.h = 114;
        this.x = 0;
        this.y = this.canvas.height - 112;
        this.dx = 2;
    }

    draw(){
        //foreground image
        this.context.drawImage(this.image, 276, 0, this.w, this.h, this.x, this.y, this.w, this.h);
        this.context.drawImage(this.image, 276, 0, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }

    update(){

        if(state.current == state.game){

            this.x = (this.x - this.dx)%(this.w/2);
            
        }
    }
}