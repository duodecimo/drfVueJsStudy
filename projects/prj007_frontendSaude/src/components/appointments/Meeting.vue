<template>
  <div id="meet" style="height: 100%; width: 100%;"></div>
</template>

<script>
// Reference:
// https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
// import { v4 as uuidv4 } from "uuid";
/*global JitsiMeetExternalAPI*/
/*eslint no-undef: "error"*/
export default {
  name: "meeting",
  data: () => ({
    options: {
      type: Object,
      default: () => ({})
    }
  }),
  computed: {
    ...mapGetters(["user_name", "active_meeting", "authentication"])
  },
  methods: {
    ...mapActions(["set_active_meeting"]),
    startMeeting() {
      // const fromMobile = prompt("Acessando com mobile: ", "sim");

      const testdomain = "meet.jit.si";

      const testoptions = {
        userInfo: {
          email: "",
          displayName: this.user_name
        },
        roomName: "meetingRoom",
        setLanguage: "pt-BR",
        parentNode: document.querySelector("#meet"),
        configOverwrite: {
          prejoinPageEnabled: false,
          enableNoisyMicDetection: false,
          enableWelcomePage: false,
          disableDeepLinking: true,
          p2p: {
            enabled: false
          }
        },
        interfaceConfigOverwrite: {
          SHOW_CHROME_EXTENSION_BANNER: false,
          HIDE_INVITE_MORE_HEADER: true,
          PROVIDER_NAME: true,
          MOBILE_APP_PROMO: false,
          VIDEO_LAYOUT_FIT: "both"
        }
      };
      // if (fromMobile === "sim") {
      //   alert(
      //     "Vamos abrir: " +
      //       "https://play.google.com/store/apps/details?id=org.jitsi.meet&hl=pt-BR/" +
      //       "meetingRoom"
      //   );
      //   // window.open(
      //   //   "https://play.google.com/store/apps/details?id=org.jitsi.meet&hl=pt-BR/" +
      //   //     "meetingRoom"
      //   // );
      //   window.location.href =
      //     "https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=org.jitsi.meet&hl=pt-BR/" +
      //     "meetingRoom";
      // } else {
      var jitsiApi = new JitsiMeetExternalAPI(testdomain, testoptions);
      // }
      if (!jitsiApi) {
        alert("Falha na abertura de GymBrainWeb.");
        this.set_active_meeting(false);
        // // route to appointments
        // this.$router.push("/appointments");
      }
      jitsiApi.addEventListener("videoConferenceLeft", () => {
        this.stopAppoinment();
      });
      // this.atualizarAgendamento("abertura");
      // this.createAppointmentNotification();
    },
    loadScript(src, cb) {
      // To embed Jitsi Meet in your application you need to add a script tag
      // with the Jitsi Meet API library, i.e.:
      // src="https://meet.jit.si/external_api.js"
      const scriptEl = document.createElement("script");
      scriptEl.src = src;
      scriptEl.async = 1;
      console.log(">>> Chamando a url de jitsi. ", scriptEl);
      // document.querySelector("body").appendChild(scriptEl);
      document.querySelector("head").appendChild(scriptEl);
      scriptEl.addEventListener("load", cb);
      scriptEl.addEventListener("error", event => {
        console.log("&&& Evento erro:", event);
        alert(
          "Falha na conexão com o servidor de meeting. A janela será fechada. " +
            "Tente entrar novamente pelo evento marcado."
        );
        this.set_active_meeting(false);
        // route to appointments
        // this.$router.push("/appointments");
      });
    },
    executeCommand(command, ...value) {
      this.jitsiApi.executeCommand(command, ...value);
    },
    stopAppoinment() {
      console.log("Em consultaSessao - método stopAppoinment");
      this.atualizarAgendamento("fechamento");

      this.closeAppointment();
      // this.selectedAppointment = null;
    },
    createAppointmentNotification() {
      if (this.jitAppointment.view) {
        var jsonRequest = {
          notification_type: "appointment",
          properties: {
            id_target_user:
              this.jitAppointment.view === "paciente"
                ? this.jitAppointment.paciente
                : this.jitAppointment.medico,
            // original no backend:
            // "id_target_user":
            // agendamento.paciente.id
            // if request.user.is_patient else agendamento.medico.id,
            // com a mudança no serializer, podemos usar a view para decidir
            appointment_info: {
              domain: this.jitAppointment.domain,
              name: this.jitAppointment.name,
              room: this.jitAppointment.video_identifier
            },
            notifier: {
              user_id: parseInt(this.auth_user.id),
              first_name: this.auth_user.first_name
            }
          }
        };
        this.createNotification(jsonRequest);
      }
    },
    createNotification(notification) {
      console.log("Noticação a enviar: ", notification);
      this.$http
        .post("v1/notifications/", JSON.stringify(notification), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${this.$store.getters.token}`
          }
        })
        .then(
          resp => {
            console.log("Resultado do envio da notificação: ", resp);
          },
          err => console.log("Erro enviando notificação: ", err)
        );
    },
    atualizarAgendamento(tipo = "msg") {
      this.getHorarioServidor().then(response => {
        var payload = {};
        if (tipo == "abertura") {
          console.log("Atualizar abertura");
          payload = {
            abertura: new Date(response.now)
          };
        } else if (tipo == "fechamento") {
          console.log("Atualizar fechamento");
          payload = {
            fechamento: new Date(response.now)
          };
        }
        this.$http
          .put(
            "v1/agendamentos/?id_agendamento=" + this.jitAppointment.id,
            payload,
            {
              headers: {
                Authorization: `Token ${this.$store.getters.token}`
              }
            }
          )
          .then(
            data => {
              console.log(
                "===>>> Resultado da atualização do agendamento (tipo " +
                  tipo +
                  "): ",
                data
              );
            },
            err =>
              console.log(
                "===> Erro atualizando agendamento (tipo " + tipo + "): ",
                err.body
              )
          );
      });
    },
    closeAppointment() {
      this.set_active_meeting(false);
      // route to appointments
      this.$router.push("/appointments");
    },
    addEventListener(event, fn) {
      this.jitsiApi.on(event, fn);
    },
    // Misc
    removeJitsiWidget() {
      if (this.jitsiApi) this.jitsiApi.dispose();
    },
    onIFrameLoad() {
      // do stuff
    },
    getHorarioServidor() {
      // recuperar horario do servidor
      return new Promise((resolve, reject) => {
        this.$http
          .get("v1/agendamento/sys_time/", {
            headers: {
              Authorization: `Token ${this.$store.getters.token}`
            }
          })
          .then(response => response.json())
          .then(
            response => {
              resolve(response);
            },
            error => {
              reject(error);
            }
          );
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadScript("https://meet.jit.si/external_api.js", () => {
        // this.loadScript("https://192.168.25.5:8443/external_api.js", () => {
        if (!window.JitsiMeetExternalAPI) {
          alert(
            "Falha na conexão com o servidor de meeting. A janela será fechada. " +
              "Tente entrar novamente pelo evento marcado."
          );
          this.set_active_meeting(false);
          // route to appointments
          this.$router.push("/appointments");
          throw new Error("Jitsi Meet API não está carregado!");
        }
        this.startMeeting();
      });
    });
  }
};
</script>
