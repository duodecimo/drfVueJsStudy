<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title
          >Demo Application (well, demo meaning demonstration, not old nick,
          hehe)</ion-title
        >
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="small">Demo Application</ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        id="container"
        v-bind:class="{ 'top-margin': !users, usersShowing: users }"
      >
        <ion-button @click="showUserModal()">Create user</ion-button>
        <ion-button v-show="!users" @click="loadUsers()"
          >View All Users</ion-button
        >
        <strong v-show="users"> All Users</strong>
        <ion-list>
          <!-- Loops through the users array -->
          <ion-item v-for="user in users" v-bind:key="user.id">
            <ion-label>{{ user.name }} </ion-label>
          </ion-item>
        </ion-list>
        <ion-button v-show="users" @click="users = null" color="danger"
          >Hide Users</ion-button
        >
      </div>
    </ion-content>
    <ion-modal :isOpen="modalOpen">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          <ion-card-title>Card Title</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-input placeholder="Name" type="text"> </ion-input>
          </ion-item>
          <ion-item>
            <ion-input placeholder="E-mail" type="email"> </ion-input>
          </ion-item>
          <ion-item>
            <ion-button @click="showUserModal()">Dismiss</ion-button>
          </ion-item>
        </ion-card-content>
      </ion-card>
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonItem
} from "@ionic/vue";
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonModal,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonItem
  },
  data() {
    return {
      users: null,
      modalOpen: false
    }; // sets users to null on instantiation
  },
  methods: {
    loadUsers() {
      axios.get("http://localhost:8000/api/persons/").then(response => {
        this.users = response.data; // assigns the data from api call to the users variable
      });
    },
    showUserModal() {
      this.modalOpen = !this.modalOpen;
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;

  transform: translateY(-50%);
}
.top-margin {
  top: 20%;
}
.usersShowing {
  margin-top: 10%;
}
</style>
