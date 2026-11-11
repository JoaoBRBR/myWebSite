class CanvasManager {
  constructor(){
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.currentDemo = null;
    this.animationFrame = null;
  }

  resizeCanvas() {
    const holder = document.getElementById("canvas-holder").getBoundingClientRect();
    this.canvas.width = holder.width;
    this.canvas.height = holder.height - 20;
  }

  setDemo(demo) {
    this.resizeCanvas();
    this.currentDemo = demo;
    this.currentDemo.init(this.canvas);
  }

  start() {
    const loop = (currentTime) => {
      if (this.currentDemo) {
        if (this.currentDemo.clear) {
          this.currentDemo.clear(this.canvas, this.ctx);
        } else {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        const delta = currentTime - lastTime;
        if (delta >= delay) {
          lastTime = currentTime - (delta % delay);
          this.currentDemo.draw(this.canvas, this.ctx);
        }
      }

      this.animationFrame = requestAnimationFrame(loop);
    }

    loop();
  }
}
let lastTime = 0;
const fps = 10;
const delay = 1000 / fps;

const manager = new CanvasManager();
const conway = new Conway();

manager.setDemo(conway);

manager.start();
