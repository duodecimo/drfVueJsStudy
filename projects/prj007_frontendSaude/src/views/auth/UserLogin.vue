<template>
  <section>
    <v-container>
      <v-card elevation="10" class="mx-auto my-12" this. :max-width="width">
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
                >Faça login com o google</v-btn
              >
            </v-col></v-row
          >
          <v-row class="text-center">
            <v-col cols="12">
              <v-btn class="ml-sm-8" color="primary" elevation="5" raised block
                >Faça login com o facebook</v-btn
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
                >Faça login com seu e-mail</v-btn
              >
            </v-col></v-row
          >
        </v-card-text>
      </v-card>
    </v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="90%">
        <div class="pa-xs-8">
          <v-card height="60vh">
            <v-card-title>Preencha seus dados</v-card-title>
            <v-form ref="form" @submit.prevent v-model="valid">
              <v-col cols="10">
                <v-text-field
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
            </v-form>
          </v-card>
        </div>
      </v-dialog>
    </v-row>
  </section>
</template>

<script>
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
    ...mapActions(["set_user_name", "set_authentication"]),
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      console.log("Google sucesso: ", idToken);
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
      this.$http
        .post(
          // "http://localhost:8000/rest-auth/login/",
          // "https://192.168.25.5:8000/rest-auth/login/",
          "rest-auth/login/",
          {
            username: this.user_name,
            email: this.userEmail,
            password: this.userPassword
          }
        )
        .then(
          response => {
            console.log("response: ", response);
            console.log("data key: ", response.data.key);
            console.log("data key: ", `Token response.data.key`);
            this.set_authentication("Token " + response.data.key).then(
              console.log(
                "UserLogin - login() - authentication: ",
                this.authentication
              ),
              this.$router.push({ path: "/" })
            );
            // a55dd1c646dd194e33858836a190391a9ea55474
          },
          err => {
            console.log("Em UserLogin - login() - Err status: ", err.status);
            alert("Em UserLogin - login() - Err status: " + err);
          }
        );
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
