
// 1-->Activates keyboard event to flap the bird
// 0 --> Activate mouse event to flap the bird

game1 = new Game('canvas1', 1);
game1.loop();


game2 = new Game('canvas2', 0);
game2.loop();

