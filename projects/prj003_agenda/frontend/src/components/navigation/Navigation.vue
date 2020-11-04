<template>
  <v-toolbar>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Agenda</v-toolbar-title>

    <router-link class="ml-sm-8" to="/">Welcome</router-link>
    <router-link class="ml-sm-8" to="/about">About</router-link>
    <router-link class="ml-sm-8" to="/login">Login</router-link>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>
