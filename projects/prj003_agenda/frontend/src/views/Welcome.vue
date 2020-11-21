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
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    primeiroTeste() {
      this.$router.push({
        name: "aboutmsg",
        params: { message: "primeiro teste" }
      });
    },
    segundoTeste() {
      // uppon pushing without parameters,
      // router will complain:
      // [vue-router] missing param for named route "about": Expected "message" to be defined
      // but the page is routed, and as prop message has default, everything works
      this.$router.push({ name: "about" });
    }
  }
};
</script>
