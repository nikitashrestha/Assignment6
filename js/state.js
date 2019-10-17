//  GAME STATE
// const state = {
//     current : 0,
//     getReady : 0,
//     game : 1,
//     over : 2
// }

//maintains overall game state
class State{
    constructor(){
        this.current = 0;
    }

    getState(){
        return this.current;
    }

    changeState(state){
        this.current = state;
    }
}

//GAME KEYSTATE

const keyState = {
    current : 0,
    pressed : 1,
    released : 0
}
