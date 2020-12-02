<template>
  <div id="app">
    <v-app id="inspire" :style="fontSize">
      <v-main>
        <balloon v-if="active_meeting" title="WebMeeting" position="top-left">
          <meeting />
        </balloon>
        <app-navigation />
        <keep-alive>
          <router-view />
        </keep-alive>
        <div class="mt-8">
          <v-footer class="justify-center" color="indigo" app dark height="50">
            <div>
              &copy; {{ new Date().getFullYear() }} — Agenda 💜 by Duodécimo
            </div>
          </v-footer>
        </div>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
import Balloon from "vue-balloon";
import Meeting from "@/components/appointments/Meeting.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    "app-navigation": Navigation,
    balloon: Balloon,
    meeting: Meeting
  },
  created() {
    this.$vuetify.theme.dark = false;
    console.log("@@@ All begins !!!");
    console.log("breakpoint name: ", this.$vuetify.breakpoint.name);
    console.log("breakpoint width: ", this.$vuetify.breakpoint.width);
  },
  computed: {
    ...mapGetters(["active_meeting"]),
    fontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "font-size:0.5em";
        default:
          return "font-size:2em";
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
