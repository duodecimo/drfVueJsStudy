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
