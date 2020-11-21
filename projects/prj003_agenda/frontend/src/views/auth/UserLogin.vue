<template>
  <v-form ref="form" @submit.prevent class="ma-sm-8" v-model="valid">
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Seu nome"
      placeholder="Digite seu nome de login"
      outlined
      required
      clearable
    ></v-text-field>

    <v-text-field
      v-model="userEmail"
      :rules="emailRules"
      label="Seu e-mail"
      placeholder="Digite seu e-mail"
      outlined
      clearable
    ></v-text-field>

    <v-text-field
      v-model="userPassword"
      :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="pwShow ? 'text' : 'password'"
      name="input-10-1"
      label="Sua senha"
      placeholder="Digite sua senha"
      counter
      outlined
      required
      clearable
      @click:append="pwShow = !pwShow"
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
      Login
    </v-btn>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset">
      Reset Form
    </v-btn>

    <v-btn color="warning" class="mr-4" @click="resetValidation">
      Reset Validation
    </v-btn>

    <v-btn :disabled="!valid" color="error" class="mr-4" @click="logout">
      Logout
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    name: null,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length >= 4) || "O nome deve ter pelo menos 4 caracteres"
    ],
    userEmail: null,
    // emailRules: [
    //   v => !!v || "E-mail is required",
    //   v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    // ],
    emailRules: [
      v => /^$/.test(v) || /.+@.+\..+/.test(v) || "E-mail must be valid"
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
      v => !!v || "É obrigatório fornecer password",
      v => (v && v.length >= 4) || "A password deve ter 4 ou mais caracteres"
    ],
    pwShow: false
  }),

  methods: {
    ...mapActions(["setAuthentication"]),
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
        .post("http://127.0.0.1:8000/rest-auth/login/", {
          username: this.name,
          email: this.userEmail,
          password: this.userPassword
        })
        .then(
          response => {
            console.log("response: ", response);
            console.log("data key: ", response.data.key);
            console.log("data key: ", `Token response.data.key`);
            this.setAuthentication("Token " + response.data.key).then(
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
            this.setAuthentication(null);
            alert(response.data.detail);
          },
          err => {
            console.log("Em UserLogin - logout() - Err status: ", err.status);
          }
        );
      // Authorization: `Token ${localStorage.getItem("token")}`
    }
  },
  computed: {
    ...mapGetters(["authentication"])
  }
};
</script>
