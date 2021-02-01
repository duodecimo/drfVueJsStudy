<template>
  <div class="mt-10">
    <span
      :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-4']"
      class="font-weight-black"
    >
      AGENDA
    </span>
    <p />
    <span>
      A agenda é uma demonstração e um campo de testes para funcionalidades
      vueJs/vuetify, utilizando router e vuex.
    </span>
    <v-divider />
    <h5>
      Botões com ações para testar passagem de parâmetros para a página: about
    </h5>
    <!-- <v-divider />
    <div>
      <v-btn
        class="ml-sm-8"
        v-google-signin-button="clientId"
        color="primary"
        elevation="5"
        raised
        >Login com o google</v-btn
      >
    </div> -->
    <v-divider />
    <div>
      <v-btn color="primary" elevation="5" raised @click.stop="primeiroTeste"
        >Primeiro teste</v-btn
      >
      <v-btn
        class="ml-sm-8"
        color="primary"
        elevation="5"
        raised
        @click.stop="segundoTeste"
        >Segundo teste</v-btn
      >
      <v-btn
        class="ml-sm-8"
        color="primary"
        elevation="5"
        raised
        @click.stop="readFile"
        >PDF Show</v-btn
      >
    </div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          scrollable
          max-width="1200px"
          :fullscreen="$vuetify.breakpoint.smAndDown"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Ler Termos
            </v-btn>
          </template>
          <v-card>
            <v-card-title>TERMOS DE USO</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 600px">
              <iframe
                src="https://elasticbeanstalk-sa-east-1-968044076875.s3-sa-east-1.amazonaws.com/docs/Termo3.pdf"
                frameborder="0"
                width="100%"
                height="600px"
              />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Disagree
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <button v-google-signin-button="clientId" class="google-signin-button">
        Continue with Google
      </button>
    </template>
  </div>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId:
      "1056783513430-aaoe4c0u9c6qai5m25akfl4p285p8knb.apps.googleusercontent.com",
    dialog: false
  }),
  methods: {
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      console.log("Google sucesso: ", idToken);
    },
    OnGoogleAuthFail(error) {
      console.log("ERROR GOOGLE: ", error);
    },
    primeiroTeste() {
      this.$router.push({
        name: "aboutmsg",
        params: {
          message: "primeiro teste"
        }
      });
    },
    segundoTeste() {
      // uppon pushing without parameters,
      // router will complain:
      // [vue-router] missing param for named route "about": Expected "message" to be defined
      // but the page is routed, and as prop message has default, everything works
      this.$router.push({
        name: "about"
      });
    },
    readFile() {
      window.open(
        "https://elasticbeanstalk-sa-east-1-968044076875.s3-sa-east-1.amazonaws.com/docs/Termo3.pdf"
      );
    }
  }
};
</script>
<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
