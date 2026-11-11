class Conway {
  constructor() {
    this.gw = 10;
    this.gh = 10;
    this.grade = [];
    this.gBuffer = [];
    this.px = 10;
  }

  init(canvas) {
    this.gw = Math.round(canvas.width / 10);
    this.gh = Math.round(canvas.height / 10);
    for (let i = 0; i < this.gw; i++){
      this.grade.push([]);
      this.gBuffer.push([]);
      for (let j = 0; j < this.gh; j++){
        this.grade[i].push(Math.random() > 0.5 ? 1 : 0);
        this.gBuffer[i].push(0);
      }
    }
  }

  draw(canvas, ctx) {
    this.#regras();
    for (let i = 0; i < this.gw; i++){
      for (let j = 0; j < this.gh; j++){
        if (this.grade[i][j] == 1) {

          ctx.fillStyle =  "#00aa00";
          ctx.fillRect(i*this.px,j*this.px,this.px,this.px)
        }
      }
    }
    ctx.fillStyle = "rgba(0,0,0,0.2)"
    ctx.fillRect(0,0,canvas.width,canvas.height)
  }

  #regras() {
    for (let i = 0; i < this.gw; i++) {
        this.gBuffer[i].fill(0);
      }
    for (let i = 0; i < this.gw; i++) {
      for (let j = 0; j < this.gh; j++) {
        let soma = 0;
        if (i > 0) {
          soma += this.grade[i - 1][j];
        }
        if (i > 0 && j > 0) {
          soma += this.grade[i - 1][j - 1]
        }
        if (i > 0 && j < this.gh - 1) {
          soma += this.grade[i - 1][j + 1]
        }

        if (j > 0) {
          soma += this.grade[i][j - 1]
        }
        if (j < this.gh - 1) {
          soma += this.grade[i][j + 1]
        }

        if (i < this.gw - 1) {
          soma += this.grade[i + 1][j]
        }
        if (i < this.gw - 1 && j > 0) {
          soma += this.grade[i + 1][j - 1]
        }
        if (i < this.gw - 1 && j < this.gh - 1) {
          soma += this.grade[i + 1][j + 1];
        }

        if (this.grade[i][j] == 1) {
          if (soma < 2 || soma > 3) {
            this.gBuffer[i][j] = 0;
          } else {
            this.gBuffer[i][j] = 1;
          }
        } else {
          if (soma == 3) {
            this.gBuffer[i][j] = 1;
          }
        }
      }
    }
    for (let i = 0; i < this.gw; i++) {
        for (let j = 0; j < this.gh; j++) {
          this.grade[i][j] = this.gBuffer[i][j];
        }
      }
  }

  clear(canvas, ctx) {

  }
}
