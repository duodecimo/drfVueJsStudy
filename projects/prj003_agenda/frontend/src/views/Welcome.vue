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
      <!-- <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
        >Acesse Nomes com sua conta no google</GoogleLogin
      > -->
      <GoogleLogin
        class="ml-sm-8"
        color="primary"
        :params="params"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
        >Entrar com o Google</GoogleLogin
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
      <!-- <button v-google-signin-button="clientId" class="google-signin-button">
        Continue with Google
      </button> -->
    </template>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
// import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  // directives: {
  //   GoogleSignInButton
  // },
  components: {
    GoogleLogin
  },
  data: () => ({
    params: {
      client_id:
        "673702991038-cgj9t0h0ns50b4464pbgvb7f8sdc9rtd.apps.googleusercontent.com"
    },
    renderParams: {
      width: 250,
      height: 50,
      theme: "dark",
      longtitle: true
    },
    dialog: false
  }),
  methods: {
    onSuccess(googleUser) {
      // console.log("sucesso google login: ", googleUser);
      // let's try to break googleUdser
      console.log("Valores recebidos:");
      // console.log("uc: ", googleUser.uc);
      console.log("token type: ", googleUser.uc.token_type);
      console.log("id token: ", googleUser.uc.id_token);

      // This only gets the user information: id, name, imageUrl and email
      // console.log(
      //   "   >>> google login profile: ",
      //   googleUser.getBasicProfile()
      // );
      // veja os métodos em: https://developers.google.com/identity/sign-in/web/reference#googleusergetbasicprofile
      console.log("Nome completo: ", googleUser.getBasicProfile().getName());
      console.log("e-mail: ", googleUser.getBasicProfile().getEmail());
      console.log("avatar url: ", googleUser.getBasicProfile().vI);
      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: ", id_token);
      console.log("=== Objeto completo: ", googleUser);
    },
    onFailure() {
      console.log("!!! Falha no Google login!");
    },
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
