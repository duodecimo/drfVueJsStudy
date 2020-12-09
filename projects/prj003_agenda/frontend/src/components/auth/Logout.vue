<template>
  <v-row justify="center">
    <v-dialog v-model="show_logout" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Logout?
        </v-card-title>
        <v-card-text
          >Confirme se você deseja sair (logout) do sistema.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="set_show_logout(false), $emit('executed')"
          >
            Não
          </v-btn>
          <v-btn color="green darken-1" text @click="logout()">
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["set_authentication", "set_show_logout"]),
    logout() {
      console.log("logout");
      this.$http
        .post(
          "https://192.168.25.5:8000/rest-auth/logout/",
          // "http://localhost:8000/rest-auth/logout/",
          // "rest-auth/logout/",
          {},
          {
            headers: {
              Authorization: this.authentication
            }
          }
        )
        .then(
          response => {
            console.log("response: ", response.data.detail);
            this.set_authentication(null);
            console.log(response.data.detail);
            this.$router.push({ path: "/login" });
          },
          err => {
            console.log("Em UserLogin - logout() - Err status: ", err.status);
          }
        );
      this.set_show_logout(false);
      this.$emit("executed");
    }
  },
  computed: {
    ...mapGetters(["authentication", "show_logout"])
  }
};
</script>
