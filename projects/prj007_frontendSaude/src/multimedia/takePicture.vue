<template>
  <v-row justify="center">
    <v-col>
      <div v-if="isCameraOpen">
        <video
          v-show="!isPhotoTaken"
          ref="camera"
          width="200"
          height="400"
          autoplay
        ></video>
        <canvas
          v-show="isPhotoTaken"
          id="photoTaken"
          ref="canvas"
          :width="354"
          :height="472"
        ></canvas>
      </div>
      <div>
        <v-toolbar dense floating>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="toggleCamera" dense tile v-bind="attrs" v-on="on">
                <v-icon left v-if="!isCameraOpen">mdi-camera</v-icon>
                <v-icon left v-else>mdi-camera-offx</v-icon>
              </v-btn>
            </template>
            <span v-if="!isCameraOpen">use a camera</span>
            <span v-else>dispense a camera</span>
          </v-tooltip>
          <div v-if="isCameraOpen">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="takePhoto" v-bind="attrs" v-on="on">
                  <v-icon>mdi-camera</v-icon></v-btn
                >
              </template>
              <span>Tire uma foto</span>
            </v-tooltip>
          </div>
          <div v-if="isPhotoTaken && isCameraOpen">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="savePhoto" v-bind="attrs" v-on="on">
                  <v-icon>mdi-content-save</v-icon></v-btn
                >
              </template>
              <span>salvar a foto</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </div>
    </v-col>
  </v-row>
</template>

<script>
//import { mapGetters } from "vuex";

export default {
  props: ["user"],
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      canvas: null,
      video: null,
      stream: null,
      videoBlob: null,
      mediaRecorder: null,
      file: null,
      chunks: [],
      type: "image/jpeg",
      isToggled: true
    };
  },
  computed: {
    /* ...mapGetters(["$t"]) */
  },
  methods: {
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },
    createCameraElement() {
      const constraints = (window.constraints = {
        audio: false,
        video: {
          width: { exact: 354 },
          height: { exact: 472 }
        }
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.$refs.camera.srcObject = stream;
        })
        .catch(error => {
          alert("May the browser didn't support or there is some errors.");
          console.error("Error setting camera: ", error);
        });
    },
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    },
    async takePhoto() {
      this.isPhotoTaken = !this.isPhotoTaken;
      const context = this.$refs.canvas.getContext("2d");
      await context.drawImage(this.$refs.camera, 0, 0, 354, 472);
    },
    async savePhoto() {
      var blobBin = await atob(
        this.$refs.canvas
          .toDataURL()
          //.replace("image/png", "image/octet-stream")
          .split(",")[1]
      );
      var array = [];
      for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      var blobData = await new Blob([new Uint8Array(array)], {
        type: "image/png"
      });
      var name = "Photo.png";
      this.file = await new File([blobData], name, {
        type: "image/png"
      });
      let data = new FormData();
      await data.append("file", this.file, name);
      //await data.append("file", this.videoBlob);
      await data.append("user", this.user ? this.user : "userName");
      // for now, we stop file upload
      // await this.setMultipartUpload(data);
      await this.$emit("changeUserPhoto", data);
      await this.toggleCamera();
    }
    /*

        var config = {
        headers: {
            Authorization: ...,
            "Content-Type": "multipart/form-data"
        }
        };
        axios
        .post("/...", payload, config)
        .then(

    */
  }
};
</script>
