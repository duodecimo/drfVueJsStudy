<template>
  <section>
    <v-container>
      <v-card elevation="10" class="mx-auto my-12" max-width="60%">
        <div id="login-header">Login</div>
        <v-card-text>
          <v-row class="text-center">
            <v-col cols="12">
              <!-- v-form lazy-validation boolean: If enabled, value will always be true
               unless there are visible validation errors. You can still call validate() 
               to manually trigger validation -->
              <v-form
                ref="form"
                @submit.prevent
                class="ma-sm-8"
                v-model="valid"
              >
                <v-text-field
                  v-model="twcp_user_name"
                  :prepend-icon="'mdi-account'"
                  :counter="10"
                  :rules="nameRules"
                  label="Seu nome"
                  placeholder="Digite seu nome de login"
                  outlined
                  clearable
                ></v-text-field>

                <v-text-field
                  v-model="userEmail"
                  :rules="emailRules"
                  prepend-icon="mdi-email"
                  label="Seu e-mail"
                  placeholder="Digite seu e-mail"
                  outlined
                  clearable
                ></v-text-field>

                <v-text-field
                  v-model="userPassword"
                  prepend-icon="mdi-lock"
                  :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordRules"
                  :type="pwShow ? 'text' : 'password'"
                  name="input-10-1"
                  label="Sua senha"
                  placeholder="Digite sua senha"
                  counter
                  outlined
                  clearable
                  @click:append="pwShow = !pwShow"
                ></v-text-field>
                <!-- <v-text-field-cnpj
                  v-model="userCnpj"
                  label="cnpj"
                  v-bind:properties="{
                    disabled: false,
                    outlined: true,
                    clearable: true,
                    rules: [
                      v => !!v || 'é obrigatório informar o cnpj',
                      v => (v && validateCnpj(v)) || 'cnpj inválido!'
                    ],
                    placeholder: ''
                  }"
                  v-bind:options="{
                    outputMask: '##############',
                    empty: null,
                    applyAfter: true
                  }"
                  v-bind:focus="focus"
                  v-on:focus="focus = false"
                /> -->
                <v-text-field-simplemask
                  v-model="userCnpj2"
                  label="cnpj2"
                  v-bind:properties="{
                    prefix: '',
                    suffix: '',
                    readonly: false,
                    disabled: false,
                    outlined: true,
                    clearable: false,
                    rules: [
                      v => !!v || 'é obrigatório informar o cnpj',
                      v => (v && validateCnpj(v)) || 'cnpj inválido!'
                    ],
                    placeholder: ''
                  }"
                  v-bind:options="{
                    humanMask: '##.###.###/####-##',
                    machineMask: '##.###.###/####-##',
                    empty: null,
                    applyAfter: false,
                    alphanumeric: false,
                    lowercase: false
                  }"
                  v-bind:focus="focus"
                  v-on:focus="focus = false"
                />
                v-model:
                {{
                  userCnpj2 !== null && userCnpj2 !== ""
                    ? userCnpj2
                    : userCnpj2 === null
                    ? "null"
                    : userCnpj2 === ""
                    ? "''"
                    : ""
                }}
                <br />
                <v-btn color="success" class="mr-4" @click="login">
                  Login
                </v-btn>

                <v-btn color="success" class="mr-4" @click="validate">
                  Validate
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset">
                  Reset Form
                </v-btn>

                <v-btn color="warning" class="mr-4" @click="resetValidation">
                  Reset Validation
                </v-btn>

                <v-btn
                  :disabled="!valid"
                  color="error"
                  class="mr-4"
                  @click="logout"
                >
                  Logout
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import SimpleMask from "@/components/SimpleMask.vue";

export default {
  components: {
    "v-text-field-simplemask": SimpleMask
  },
  data: () => ({
    valid: false,
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
      v => !!v || "E-mail is required",
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
    userCnpj: "50703512000192",
    userCnpj2: "50703512000192",
    // cnpjRules: [
    //   v => !!v || "é obrigatório informar o cnpj",
    //   v => (v && v.length !== 14) || "o cnpj deve ter 14 caracteres",
    //   v => (v && v.length == 14 && !this.validateCnpj(v)) || "cnpj inválido!",
    //   v => (v && v.length == 14 && this.validateCnpj(v)) || "ok"
    // ],
    focus: false,
    pwShow: false
  }),
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
    }
  },
  methods: {
    ...mapActions(["set_user_name", "set_authentication"]),
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submitForm() {
      this.$refs.form.validate();
    },
    login() {
      if (this.$refs.form.validate()) {
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
      } else {
        alert("Caramba, o formulário possui campos inválidos!");
      }
    },
    validateCnpj: function(cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, "");
      if (cnpj == "") return false; //"É obrigatório digitar o cnpj";
      if (cnpj.length != 14) return false; // "o cnpj tem 14 caracteres";
      // Elimina CNPJs invalidos conhecidos
      if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
      )
        return false; // "cnpj inválido";
      // Valida DVs
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false; // "cnpj inválido";
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return false; // "cnpj inválido";
      return true;
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
