<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>Message: {{ message }}</h3>
    <v-btn class="mx-5 rounded-lg" color="primary" elevation="12">
      <v-icon left>mdi-check</v-icon>Vuetify Button</v-btn
    >
    <v-btn class="mx-5 rounded-lg" color="red darken-4" elevation="12">
      <v-icon left>mdi-human</v-icon>Another Button</v-btn
    >
    <v-divider />
    <!-- <div>
      <br />
      <p
        class="text-uppercase text-decoration-underline font-weight-bold pl-16"
      >
        aviso
      </p>
      <p
        class="d-block text-justify text-h6 pl-12 pr-6 deep-purple accent-2 white--text"
      >
        A agenda mostrada a seguir ainda não possui dados integrados ao
        sistema. utiliza apenas dados simulados, está em construção, e se
        destina apenas à realização de testes de aparência e
        funcionalidades.
      </p>
    </div> -->

    <span>
      1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
      ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </span>
    <p />
    <span>
      2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
      ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </span>
    <p />
    <span>
      3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
      ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </span>
    <p />
    <span>
      4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
      ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "No message"
    }
  }
};
</script>
