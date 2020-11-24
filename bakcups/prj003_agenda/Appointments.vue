<template>
  <div>
    <v-card>
      <v-card-title>Compromissos</v-card-title>
      <v-card-text>
        <div v-if="appointments">
          <div v-for="appointment in appointments" :key="appointment.id">
            <v-row>
              <v-col cols="2">
                <v-text-field
                  v-model="appointment.user"
                  label="Nome"
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-text-field
                  v-model="appointment.title"
                  label="Título"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="appointment.description"
                  label="Descrição"
                  class="text-caption"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="appointment.begins_at"
                  label="Inicio"
                  class="text-subtitle-2"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="appointment.ends_at"
                  label="Fim"
                  class="text-subtitle-2"
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn
                  @click.stop="selectAction(appointment)"
                  icon
                  color="blue"
                >
                  <v-icon>mdi-select</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <br />
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  data: () => ({
    appointments: null
  }),
  methods: {
    formatDate(str) {
      // moment.locale("pt-br");
      const result = moment(str)
        .locale("pt-br")
        .format("ddd, LL , hh:mm:ss");
      return result;
    },
    selectAction(appointment) {
      console.log("Appointment selecionado - id: ", appointment.id);
    },
    getAppointments() {
      return new Promise((resolve, reject) => {
        console.log(
          "Em getAppointments, authentication: ",
          `${this.authentication}`
        );
        // .get("http://127.0.0.1:8000/api/appointments/", {
        this.$http
          .get("api/appointments/", {
            headers: {
              Authorization: `${this.authentication}`
            }
          })
          .then(response => response.json())
          .then(
            response => {
              console.log("response: ", response);
              this.appointments = response;
              this.appointments.forEach(appointment => {
                console.log(
                  "appointment - id: ",
                  appointment.id,
                  " user: ",
                  appointment.user,
                  " title: ",
                  appointment.title
                );
                appointment.begins_at = this.formatDate(appointment.begins_at);
                appointment.ends_at = this.formatDate(appointment.ends_at);
              });
              resolve(response);
            },
            error => {
              if (error.status == 400) {
                alert(
                  "Unable to get appointments. " +
                    JSON.stringify(error.bodyText).replace(/[\\,,{,}"]/g, "")
                );
              } else {
                alert("We are sorry, there was a failure. Try again latter!");
              }
              console.log("Error: ", error);
              reject(error);
            }
          );
      });
    }
  },
  computed: {
    ...mapGetters(["authentication"])
  },
  mounted() {
    console.log("teste ", this.formatDate("2020-11-04T10:00:00-03:00"));
    this.getAppointments();
  }
};
</script>
