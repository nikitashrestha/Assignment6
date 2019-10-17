class Score{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.best = parseInt(localStorage.getItem("best")) || 0;
        this.value = 0;
    }

    draw(state){
        this.context.fillStyle = "#FFF";
        this.context.strokeStyle = "#000";
        if(state.current == state.game){

            this.context.lineWidth = 2;
            this.context.font = '35px Arial';
            this.context.fillText(this.value, this.canvas.width/2, 50);
            this.context.strokeText(this.value, this.canvas.width/2, 50);

        }
        else if(state.current == state.over){

            // SCORE VALUE
            this.context.font = "25px Arial";
            this.context.fillText(this.value, 225, 186);
            this.context.strokeText(this.value, 225, 186);
            // BEST SCORE
            this.context.fillText(this.best, 225, 228);
            this.context.strokeText(this.best, 225, 228);

        }
    }

    reset(){
        this.value = 0;
    }
}