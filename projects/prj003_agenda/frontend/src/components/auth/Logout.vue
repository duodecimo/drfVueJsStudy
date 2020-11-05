<template>
  <v-row justify="center">
    <v-dialog v-model="showLogout" persistent max-width="290">
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
            @click="setShowLogout(false), $emit('executed')"
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
    ...mapActions(["setAuthentication", "setShowLogout"]),
    logout() {
      console.log("logout");
      this.$http
        .post(
          "http://localhost:8000/rest-auth/logout/",
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
            this.setAuthentication(null);
            alert(response.data.detail);
            this.$router.push({ path: "/login" });
          },
          err => {
            console.log("Em UserLogin - logout() - Err status: ", err.status);
          }
        );
      this.setShowLogout(false);
      this.$emit("executed");
    }
  },
  computed: {
    ...mapGetters(["authentication", "showLogout"])
  }
};
</script>
