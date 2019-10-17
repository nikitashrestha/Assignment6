//Get Ready Window 
class Getready{
    constructor(canvas, context, image){
        this.canvas = canvas;
        this.context = context;
        this.image = image;
        this.sX = 0;
        this.sY = 228;
        this.w = 173;
        this.h = 152;
        this.x = this.canvas.width/2 - this.w/2;
        this.y = 80;
    }

    draw(state){

        if(state == 0){

            this.context.drawImage(this.image, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)  ;          
        
        }
    }
}