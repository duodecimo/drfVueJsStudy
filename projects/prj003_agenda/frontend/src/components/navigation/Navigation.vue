<template>
  <div>
    <v-toolbar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title
        :class="[
          $vuetify.breakpoint.smAndDown
            ? '--text text-sm-caption'
            : '--text text-md-h3'
        ]"
        >Agenda</v-toolbar-title
      >

      <router-link class="ml-md-8" to="/">Welcome</router-link>
      <router-link class="ml-md-8" to="/about">About</router-link>
      <router-link class="ml-md-8" to="/login">Login</router-link>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon @click="(logoutDialog = true), setShowLogout(true)">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <app-logout v-if="logoutDialog" @executed="logoutDialog = false" />
  </div>
</template>

<script>
import Logout from "@/components/auth/Logout";
import { mapActions } from "vuex";
export default {
  components: {
    "app-logout": Logout
  },
  data: () => ({
    logoutDialog: false
  }),
  methods: {
    ...mapActions(["setShowLogout"])
  }
};
</script>
