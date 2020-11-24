<template>
  <v-data-table
    :headers="headers"
    :items="appointments"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Eventos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="descrição"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      ref="dt_ini_menu"
                      v-model="dt_ini_menu"
                      :close-on-content-click="false"
                      :return-value.sync="editedItem.dt_begins_at"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.dt_begins_at"
                          label="Data de inicio"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.dt_begins_at"
                        locale="pt-br"
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="dt_ini_menu = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            $refs.dt_ini_menu.save(editedItem.dt_begins_at)
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.ends_at"
                      label="fim"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <!-- <template v-slot:item.actions="{ item }"> -->
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dt_ini_menu: false,
    headers: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "title"
      },
      { text: "descrição", value: "description" },
      { text: "inicio", value: "dt_begins_at" },
      { text: "fim", value: "ends_at" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    appointments: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      description: "",
      dt_begins_at: "",
      ends_at: ""
    },
    defaultItem: {
      title: "",
      description: "",
      dt_begins_at: "",
      ends_at: ""
    }
  }),

  computed: {
    ...mapGetters(["authentication"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    formatDate(str) {
      // moment.locale("pt-br");
      const result = moment(str)
        .locale("pt-br")
        .format("ddd, LL , hh:mm:ss");
      return result;
    },
    initialize() {
      this.getAppointments();
    },

    editItem(item) {
      this.editedIndex = this.appointments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.appointments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.appointments.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.appointments[this.editedIndex], this.editedItem);
      } else {
        this.appointments.push(this.editedItem);
      }
      this.close();
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
                (appointment.dt_begins_at = appointment.begins_at.substr(
                  0,
                  10
                )),
                  (appointment.ends_at = this.formatDate(appointment.ends_at));
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
  }
};
</script>
