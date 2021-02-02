<template>
  <div>
    <v-toolbar dark color="blue darken-2">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title class=" text-body-1 text-md-h3 "
        >PraTudo Saúde</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="(logoutDialog = true), set_show_logout(true)">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <template>
        <div class="text-center">
          <v-menu
            v-model="menu"
            :close-on-content-click="true"
            :nudge-width="200"
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-list dense>
                <v-list-item to="/sobre">
                  <v-list-item-content>
                    <v-list-item-title>Sôbre PraTudo Saúde</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  :to="{
                    name: 'aboutmsg',
                    params: { message: 'testando mensagens' }
                  }"
                >
                  <v-list-item-content>
                    <v-list-item-title>About</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/">
                  <v-list-item-content>
                    <v-list-item-title>Welcome</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/login">
                  <v-list-item-content>
                    <v-list-item-title>Login</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </template>
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
    logoutDialog: false,
    menu: false,
    items: [{ text: "Sôbre o Pratudo Saúde" }]
  }),
  methods: {
    ...mapActions(["set_show_logout"])
  }
};
</script>
