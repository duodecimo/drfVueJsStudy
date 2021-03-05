<template>
  <v-card class="mx-auto">
    <v-card-title>Tela para Desenho</v-card-title>
    <v-card-text>
      <canvas
        @mousedown="startPainting"
        width="500"
        height="300"
        id="canvas"
        alt="Parece que seu navegador não suporta canvas para desenhar. Experimente com Firefox ou Google Chrome."
      ></canvas>
    </v-card-text>
    <v-card-actions>
      <v-btn @click.stop="save()">salvar</v-btn>
      <v-btn @click.stop="clear()">limpar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    canvas: null,
    ctx: null,
    painting: false
  }),
  methods: {
    startPainting(e) {
      if (!this.painting) {
        this.ctx.lineWidth = 10;
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
        this.painting = true;
      } else {
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        this.painting = false;
      }
    },
    async save() {
      var data_url = this.canvas.toDataURL("image/png");
      console.log("Em makeSketch, save(), data_url length: ", data_url);
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
  }
};
</script>

<style>
canvas {
  border: 1px solid black;
}
</style>
