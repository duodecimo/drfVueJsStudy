<template>
  <v-row>
    <v-card>
      <canvas
        @mousedown="startPainting"
        @mouseup="finishedPainting"
        @mousemove="draw"
        width="550"
        height="550"
        id="canvas"
        alt="Parece que seu navegador não suporta canvas para desenhar. Experimente com Firefox ou google Chrome."
      ></canvas>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    canvas: null,
    ctx: null
  }),
  methods: {
    startPainting(e) {
      this.painting = true;
      console.log(this.painting);
      this.draw(e);
    },
    finishedPainting() {
      this.painting = false;
      console.log(this.painting);
      this.ctx.beginPath();
    },
    draw(e) {
      if (!this.painting) return;

      this.ctx.lineWidth = 10;
      this.ctx.lineCap = "round";

      //   this.ctx.lineTo(e.clientX, e.clientY); => erra na posição!
      this.ctx.lineTo(e.offsetX, e.offsetY);

      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(e.offsetX, e.offsetY);
    }
  },
  mounted() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    console.log("canvas pos: ", this.canvas.right);

    // Resize canvas
    // this.canvas.height = window.innerHeight;
    // this.canvas.width = window.innerWidth;
  }
};
</script>

<style>
canvas {
  border: 1px solid black;
}
</style>
