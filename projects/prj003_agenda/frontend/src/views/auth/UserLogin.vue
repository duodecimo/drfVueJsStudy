<template>
  <v-form ref="form" class="ma-sm-8" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      placeholder="Digite seu nome de login"
      outlined
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      placeholder="Digite seu e-mail"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="pwShow ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      placeholder="Digite sua password"
      counter
      outlined
      required
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

    <v-btn color="warning" @click="resetValidation">
      Reset Validation
    </v-btn>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length >= 4) || "O nome deve ter pelo menos 4 caracteres"
    ],
    email: "",
    // emailRules: [
    //   v => !!v || "E-mail is required",
    //   v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    // ],
    emailRules: [
      v => /^$/.test(v) || /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
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
        .post("http://localhost:8000/rest-auth/login/", {
          username: this.name,
          email: this.email,
          password: this.password
        })
        .then(
          data => {
            console.log("data: ", data);
            // a55dd1c646dd194e33858836a190391a9ea55474
          },
          err => {
            console.log("Em UserLogin - login() - Err status: ", err.status);
          }
        );
    }
  }
};
</script>
