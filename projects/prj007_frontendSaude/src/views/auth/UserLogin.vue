<template>
  <section>
    <v-container>
      <v-card elevation="10" class="mx-auto my-12" :max-width="width">
        <!-- <div id="login-header">Login</div> -->
        <v-card-text>
          <v-row class="text-center">
            <v-col cols="12">
              <v-btn
                class="ml-sm-8"
                v-google-signin-button="clientId"
                color="primary"
                elevation="5"
                raised
                block
                >Entre com o google</v-btn
              >
            </v-col></v-row
          >
          <v-row class="text-center">
            <v-col cols="12">
              <v-btn class="ml-sm-8" color="primary" elevation="5" raised block
                >Entre com o facebook</v-btn
              >
            </v-col></v-row
          >
          <v-row class="text-center">
            <v-col cols="12">
              <v-btn
                class="ml-sm-8"
                color="primary"
                elevation="5"
                raised
                block
                @click="dialog = true"
                >Entre com seus dados</v-btn
              >
            </v-col></v-row
          >
        </v-card-text>
      </v-card>
    </v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="90%">
        <div class="pa-xs-8">
          <v-card height="70vh">
            <v-card-title v-if="registered">Dados registrados</v-card-title>
            <v-card-title v-else>Dados para o registro</v-card-title>
            <v-form ref="form" @submit.prevent v-model="valid">
              <v-col cols="10">
                <v-text-field
                  v-if="!registered"
                  v-model="twcp_user_name"
                  prepend-icon="mdi-account"
                  :counter="20"
                  :rules="nameRules"
                  label="Nome"
                  required
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  v-model="userEmail"
                  :rules="emailRules"
                  prepend-icon="mdi-email"
                  label="E-mail"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  v-model="userPassword"
                  prepend-icon="mdi-lock"
                  :rules="passwordRules"
                  :type="pwShow ? 'text' : 'password'"
                  name="input-10-1"
                  label="Senha"
                  counter
                  required
                  clearable
                  @click:append="pwShow = !pwShow"
                ></v-text-field>
              </v-col>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="login"
                small
              >
                Enviar
              </v-btn>

              <v-btn color="success" class="mr-4" @click="dialog = false" small>
                Cancelar
              </v-btn>
              <v-col cols="10">
                <v-switch
                  v-model="registered"
                  label="Já sou registrado"
                ></v-switch>
              </v-col>
            </v-form>
          </v-card>
        </div>
      </v-dialog>
    </v-row>
  </section>
</template>

<script>
import axios from "axios";
import GoogleSignInButton from "vue-google-signin-button-directive";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  directives: {
    GoogleSignInButton
  },
  computed: {
    ...mapGetters(["user_name", "authentication"]),
    // two way computed property
    // https://vuex.vuejs.org/guide/forms.html#two-way-computed-property
    twcp_user_name: {
      get() {
        return this.user_name;
      },
      set(value) {
        this.set_user_name(value);
      }
    },
    width() {
      if (this.$vuetify.breakpoint.name == "xs") {
        return "100%";
      } else {
        return "60%";
      }
    }
  },
  data: () => ({
    clientId:
      "1056783513430-aaoe4c0u9c6qai5m25akfl4p285p8knb.apps.googleusercontent.com",
    dialog: false,
    valid: true,
    registered: true,
    nameRules: [
      v => !!v || "obrigatório",
      v => (v && v.length >= 4) || "O nome deve ter pelo menos 4 caracteres"
    ],
    userEmail: null,
    // emailRules: [
    //   v => !!v || "E-mail is required",
    //   v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    // ],
    emailRules: [
      v => /^$/.test(v) || /.+@.+\..+/.test(v) || "E-mail precisa ser válido"
    ],
    userPassword: null,
    // passwordRules: [
    //   v => !!v || "Password is required",
    //   v => (v && v.length >= 5) || "Password must have 5+ characters",
    //   v => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
    //   v => /(?=.*\d)/.test(v) || "Must have one number",
    //   v => /([!@$%])/.test(v) || "Must have one special character [!@#$%]"
    // ],
    passwordRules: [
      v => !!v || "É obrigatória",
      v => (v && v.length >= 4) || "A password deve ter 4 ou mais caracteres"
    ],
    pwShow: false
  }),
  methods: {
    ...mapActions(["set_user_name", "set_authentication", "set_tokens"]),
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      // https://pratudo-backend.herokuapp.com/
      console.log("Google sucesso: ", idToken);
      axios
        .post("https://pratudo-backend.herokuapp.com/social/google", {
          auth_token: idToken
        })
        .then(response => this.set_tokens(response.data));
    },
    OnGoogleAuthFail(error) {
      console.log("ERROR GOOGLE: ", error);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    login() {
      console.log("login");
      if (this.registered) {
        console.log(
          "dados a enviar: email: ",
          this.userEmail,
          " senha: ",
          this.userPassword
        );
        axios
          .post("https://pratudo-backend.herokuapp.com/auth/login/", {
            // .post("http://localhost:5000/auth/login/", {
            email: this.userEmail,
            password: this.userPassword
          })
          .then(response => {
            this.set_tokens(response.data.tokens);
            this.$router.push({ path: "/" });
          });
        err => {
          console.log("Em UserLogin - login() - Err status: ", err.status);
          alert("Em UserLogin - login() - Erro: " + err.detail);
        };
      } else {
        axios
          // .post("https://pratudo-backend.herokuapp.com/auth/register/", {
          .post("http://localhost:5000/auth/register/", {
            email: this.userEmail,
            username: this.twcp_user_name,
            password: this.userPassword
          })
          .then(response => {
            this.set_tokens(response.data.tokens);
            this.$router.push({ path: "/" });
          });
        err => {
          console.log("Em UserLogin - login() - Err status: ", err.status);
          alert("Em UserLogin - login() - Erro: " + err.detail);
        };
      }
    },
    logout() {
      console.log("logout");
      this.$http
        .post(
          "http://localhost:8000/rest-auth/logout/",
          {},
          {
            headers: {
              Authorization: this.getAuthentication()
            }
          }
        )
        .then(
          response => {
            console.log("response: ", response.data.detail);
            this.set_authentication(null);
            alert(response.data.detail);
          },
          err => {
            console.log("Em UserLogin - logout() - Err status: ", err.status);
          }
        );
      // Authorization: `Token ${localStorage.getItem("token")}`
    }
  }
};
</script>
