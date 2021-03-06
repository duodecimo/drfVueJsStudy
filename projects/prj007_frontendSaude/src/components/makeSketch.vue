<template>
  <v-card class="mx-auto">
    <v-card-title class="justify-center"
      >Tela para desenhar formas com linhas retas</v-card-title
    >
    <v-card-subtitle class="d-flex justify-center">
      Instruções:
      <br />
      Ao clicar com o mouse em um ponto qualquer da tela, o desenho de uma linha
      reta começa, e o cursor muda para uma cruzinha. <br />Posicione o mouse
      aonde deseja o fim da linha, e clique de novo com o mouse: a linha reta
      aparece, o cursor volta ao normal.
      <br />
      Se deseja continuar para fazer uma forma, clique imediatamente no ponto
      final, e o processo reinicia. <br />
      Faça isso até fechar sua forma, e em seguida, comece de novo em algum
      outro ponto da tela, se deseja desenhar mais uma forma, até terminar seu
      desenho.
    </v-card-subtitle>
    <v-card-text class="wrapper align-center justify-center">
      <canvas
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @keydown="escPressed"
        v-on:keyup.13="escPressed"
        width="620"
        height="300"
        id="canvas"
        tabindex="1"
        alt="Parece que seu navegador não suporta canvas para desenhar. Experimente com Firefox ou Google Chrome."
      ></canvas>
      <canvas
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @keydown="escPressed"
        v-on:keyup.13="escPressed"
        width="620"
        height="300"
        id="canvas_trace"
        tabindex="1"
        alt="Parece que seu navegador não suporta canvas para desenhar. Experimente com Firefox ou Google Chrome."
      ></canvas>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn @click.stop="save()">salvar</v-btn>
      <v-btn @click.stop="clear()">limpar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    canvas: null,
    canvas_trace: null,
    ctx: null,
    ctx_trace: null,
    painting: false,
    pos: null,
    paths: []
  }),
  methods: {
    escPressed(e) {
      console.log("ESC pressed! ", e.keyCode);
    },
    mouseDown(e) {
      if (!this.painting) {
        this.ctx.beginPath();
        this.pos = [e.offsetX, e.offsetY];
        this.ctx.moveTo(this.pos[0], this.pos[1]);
        this.painting = true;
        this.canvas_trace.style.cursor = "crosshair";
      } else {
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        this.ctx_trace.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.painting = false;
        this.canvas_trace.style.cursor = "auto";
      }
    },
    mouseMove(e) {
      if (this.painting) {
        this.ctx_trace.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx_trace.beginPath();
        this.ctx_trace.moveTo(this.pos[0], this.pos[1]);
        this.ctx_trace.lineTo(e.offsetX, e.offsetY);
        this.ctx_trace.stroke();
      }
    },
    async save() {
      var data_url = this.canvas.toDataURL("image/png");
      console.log("Em makeSketch, save(), data_url length: ", data_url.length);
      this.$emit("setSketch", data_url);
      //   await this.canvas.toBlob(blob => (blobBin = blob));
      //   let data = new FormData();
      //   await data.append("nome", "sketch.png");
      //   await data.append("file", blobBin);
      //   console.log("Em makeSketch, save(), data: ", data);
      //   await this.$emit("setSketch", data);
    },
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  },
  mounted() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas_trace = document.getElementById("canvas_trace");
    this.ctx_trace = this.canvas_trace.getContext("2d");
    this.ctx.lineWidth = 15;
    this.ctx.lineCap = "round";
    this.ctx_trace.lineWidth = 3;
    this.ctx_trace.lineCap = "round";
    this.ctx_trace.strokeStyle = "rgba(0, 100, 0, 0.25)";
  }
};
</script>

<style>
.wrapper {
  position: relative;
  width: 620px;
  height: 300px;
}
.wrapper canvas {
  position: absolute;
  left: 10;
  top: 0;
  z-index: 0;
  background-color: transparent;
  border: 1px solid black;
}
</style>
