<template>
  <v-card class="mx-auto">
    <v-card-title class="justify-center"
      >Tela para desenhar formas (polígonos) com linhas retas</v-card-title
    >
    <v-card-subtitle class="justify-center">
      <h4>Instruções:</h4>
      Existem dois estados: <b>apontando</b>
      <v-icon>
        mdi-cursor-pointer
      </v-icon>
      e <b>desenhando</b>
      <v-icon>
        mdi-hospital
      </v-icon>
      .<br />
      Quando <b>apontando</b> <v-icon> mdi-cursor-pointer </v-icon>, clique em
      alguma posição na tela para iniciar o desenho de uma forma (polígono). O
      estado muda para <b>desenhando</b> <v-icon> mdi-hospital </v-icon>, e ao
      mover o mouse, uma linha guia aparece.<br />
      Quando <b>desenhando</b> <v-icon> mdi-hospital </v-icon>, cada vez que
      clicar com o mouse, um novo vértice do polígono é criado, e uma linha
      (lado) é desenhada unindo o vértice anterior a este.<br />
      Siga clicando e criando vértices, até fechar o seu polígono. Então,
      pressione a tecla <b>ESC</b> para mudar de volta para <b>apontando</b>
      <v-icon> mdi-cursor-pointer </v-icon>.<br />
      Comece de novo em algum outro ponto da tela, se deseja desenhar mais uma
      forma, até terminar seu desenho.
    </v-card-subtitle>
    <v-card-text class="wrapper">
      <canvas
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @keydown="escPressed"
        width="620"
        height="300"
        :id="canvas_id"
        tabindex="1"
        alt="Parece que seu navegador não suporta canvas para desenhar. Experimente com Firefox ou Google Chrome."
      ></canvas>
      <canvas
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
        @keydown="escPressed"
        width="620"
        height="300"
        :id="canvas_trace_id"
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
  props: {
    livre: {
      type: Boolean,
      required: true
    },
    canvas_id: {
      type: String,
      required: true
    },
    canvas_trace_id: {
      type: String,
      required: true
    }
  },
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
      if (!this.livre) {
        console.log("ESC pressed! ", e.keyCode);
        if (e.keyCode == 27) {
          this.ctx_trace.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.painting = false;
          this.canvas_trace.style.cursor = "pointer";
        }
      }
    },
    mouseDown(e) {
      if (this.livre) {
        this.painting = true;
        this.pos = [e.offsetX, e.offsetY];
        this.ctx.moveTo(this.pos[0], this.pos[1]);
      } else {
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
          this.pos = [e.offsetX, e.offsetY];
          this.ctx.moveTo(this.pos[0], this.pos[1]);
          // this.painting = false;
          // this.canvas_trace.style.cursor = "auto";
        }
      }
    },
    mouseMove(e) {
      if (this.livre) {
        if (this.painting) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.pos[0], this.pos[1]);
          this.ctx.lineTo(e.offsetX, e.offsetY);
          this.ctx.stroke();
          this.pos = [e.offsetX, e.offsetY];
        }
      } else {
        if (this.painting) {
          this.ctx_trace.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx_trace.beginPath();
          this.ctx_trace.moveTo(this.pos[0], this.pos[1]);
          this.ctx_trace.lineTo(e.offsetX, e.offsetY);
          this.ctx_trace.stroke();
        }
      }
    },
    mouseUp(e) {
      if (this.livre) {
        this.pos = [e.offsetX, e.offsetY];
        this.painting = false;
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
      if (this.livre) {
        this.painting = false;
      }
    }
  },
  mounted() {
    this.canvas = document.getElementById(this.canvas_id);
    this.ctx = this.canvas.getContext("2d");
    this.canvas_trace = document.getElementById(this.canvas_trace_id);
    this.ctx_trace = this.canvas_trace.getContext("2d");
    this.ctx.lineWidth = 10;
    this.ctx.lineCap = "round";
    this.ctx_trace.lineWidth = 3;
    this.ctx_trace.lineCap = "round";
    this.ctx_trace.strokeStyle = "rgba(0, 100, 0, 0.25)";
    this.canvas_trace.style.cursor = "pointer";
  }
};
</script>

<style>
.wrapper {
  position: relative;
  width: 620px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}
.wrapper canvas {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  background-color: transparent;
  border: 1px solid black;
}
</style>
