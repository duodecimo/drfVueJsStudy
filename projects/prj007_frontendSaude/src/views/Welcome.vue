<template>
  <div class="mt-10">
    <span
      :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-4']"
      class="font-weight-black"
    >
      PraTudo SAÚDE
    </span>
    <p />
    <span class="text-subtitle-2">
      Sua consulta de saúde do jeito que você precisa.
    </span>
    <v-divider />
    <v-card class="mx-auto" max-width="300" tile v-if="entities">
      <v-list dense>
        <v-subheader>ENTIDADES</v-subheader>
        <v-list-item-group v-model="selectedEntity" color="primary">
          <v-list-item v-for="(entity, i) in entities.results" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="entity.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <div>
      <v-row class="mt-4 ma-4">
        <v-col>
          <!-- insert user photo -->
          <v-img
            :src="photoSrc"
            max-height="150"
            max_width="110"
            contain
          ></v-img>
        </v-col>
        <v-col>
          <v-file-input
            :rules="avatarRules"
            accept="image/png, image/jpeg"
            placeholder="Escolha um avatar"
            prepend-icon="mdi-account-box"
            label="Avatar"
            show-size
            filled
            v-model="avatarFile"
            @change="setPhotoSrc()"
          ></v-file-input>
        </v-col>
      </v-row>
    </div>
    <div>
      <app-takePicture
        user="TestUser"
        @changeUserPhoto="setPhotoSrcFromCamera($event)"
      ></app-takePicture>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import takePicture from "../multimedia/takePicture.vue";

export default {
  data: () => ({
    filter: null,
    entities: null,
    selectedEntity: null,
    avatarRules: [
      value =>
        !value ||
        (value.size > 3000 && value.size < 50000) ||
        "Avatar size should be between 3k and 50k."
    ],
    avatarFile: null,
    photoSrc: null,
    photoFile: null
  }),
  components: {
    "app-takePicture": takePicture
  },
  methods: {
    setPhotoSrc() {
      console.log("---> setting photoSrc.");
      if (this.avatarFile) {
        const reader = new FileReader();
        reader.addEventListener("load", e => {
          this.photoSrc = e.target.result;
          this.photoFile = this.avatarFile;
        });
        reader.addEventListener("error", e => {
          this.photoSrc = this.getPhotoURL();
          this.photoFile = null;
          console.log("Error: ", e);
        });
        reader.readAsDataURL(this.avatarFile);
      } else {
        this.photoSrc = this.getPhotoURL();
        this.photoFile = null;
      }
      // this.checkPhotoSrc();
    },
    setPhotoSrcFromCamera(event) {
      var photoFile = event.get("file");
      console.log("---> setting photoSrc from taken picture.");
      if (photoFile) {
        const reader = new FileReader();
        reader.addEventListener("load", e => {
          this.photoSrc = e.target.result;
          this.photoFile = photoFile;
          this.avatarFile = null;
        });
        reader.addEventListener("error", e => {
          this.photoSrc = this.getPhotoURL();
          this.photoFile = null;
          this.avatarFile = null;
          console.log("Error: ", e);
        });
        reader.readAsDataURL(photoFile);
      } else {
        this.photoSrc = this.getPhotoURL();
        this.photoFile = null;
        this.avatarFile = null;
      }
    },
    getPhotoURL() {
      // return window.location.origin + "/userPhoto/" + this.pluser.id;
      return window.location.origin + "/userPhoto/" + "1";
    },
    updateAvatar() {
      let payload = new FormData();
      payload.append("photoFile", this.photoFile);
    }
  },
  mounted() {
    axios
      .get("https://pratudo-backend.herokuapp.com/api/entities/")
      // .post("http://localhost:5000/api/entities/")
      .then(response => {
        this.entities = response.data;
        console.log("Obtidas ", this.entities.count, " entidades");
        console.log("response data; ", response.data);
      });
    err => {
      console.log("Em UserLogin - login() - Err status: ", err.status);
      alert("Em UserLogin - login() - Erro: " + err.detail);
    };
  }
};
</script>
