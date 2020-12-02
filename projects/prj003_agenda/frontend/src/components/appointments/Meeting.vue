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
    ...mapGetters(["active_meeting", "authentication"])
  },
  methods: {
    ...mapActions(["set_active_meeting"]),
    startMeeting() {
      // this.options.name =
      //   this.jitAppointment.view == "paciente"
      //     ? this.jitAppointment.nome_paciente
      //     : this.jitAppointment.nome_medico;
      // this.options.roomName = this.jitAppointment.video_identifier
      //   ? this.jitAppointment.video_identifier
      //   : uuidv4();
      // // this.options.width = 1200;
      // // this.options.height = 500;
      // // this.options.width = "100%";
      // // this.options.height = "100%";
      // this.options.parentNode = document.querySelector("#meet");
      // this.options.noSSL = false;
      // this.options.userInfo = {
      //   email: "",
      //   displayName:
      //     this.jitAppointment.view == "paciente"
      //       ? this.jitAppointment.nome_paciente
      //       : this.jitAppointment.nome_medico
      // };
      // this.options.configOverwrite = {
      //   prejoinPageEnabled: false,
      //   enableNoisyMicDetection: false,
      //   enableWelcomePage: false,
      //   // tentativa para não oferecer opção entre aplicativo e
      //   // página no mobile, ir direto pra pagina
      //   disableDeepLinking: true
      // };
      // this.options.interfaceConfigOverwrite = {
      //   SHOW_JITSI_WATERMARK: false,
      //   SHOW_WATERMARK_FOR_GUESTS: false,
      //   SHOW_CHROME_EXTENSION_BANNER: false,
      //   HIDE_INVITE_MORE_HEADER: true,
      //   PROVIDER_NAME: true
      //   // MOBILE_APP_PROMO: false
      // };
      // // this.options.onload = this.onIFrameLoad;
      // console.log("*** Em startAppointment , checando os dados e opções:");
      // console.log("id do agendamento: ", this.jitAppointment.id);
      // console.log("view: ", this.jitAppointment.view);
      // console.log("url: ", this.jitAppointment.url);
      // console.log("domain: ", this.jitAppointment.domain);
      // console.log("opção - name: ", this.options.name);
      // console.log("opção - roomName: ", this.options.roomName);
      // console.log("opção - width: ", this.options.width);
      // console.log("opção - height: ", this.options.height);
      // console.log(
      //   "opção - configOverwrite - prejoinPageEnabled: ",
      //   this.options.configOverwrite.prejoinPageEnabled
      // );
      // console.log("opção - parentNode: ", this.options.parentNode);

      // var jitsiApi = new JitsiMeetExternalAPI(
      //   this.jitAppointment.domain,
      //   this.options
      // );

      const testdomain = "meet.jit.si";
      const testoptions = {
        roomName: "testroom",
        width: 1200,
        height: 500,
        parentNode: document.querySelector("#meet"),
        configOverwrite: {
          prejoinPageEnabled: false,
          enableNoisyMicDetection: false,
          enableWelcomePage: false,
          // tentativa para não oferecer opção entre aplicativo e
          // página no mobile, ir direto pra pagina
          disableDeepLinking: true
        },
        interfaceConfigOverwrite: {
          SHOW_CHROME_EXTENSION_BANNER: false,
          HIDE_INVITE_MORE_HEADER: true,
          PROVIDER_NAME: true,
          MOBILE_APP_PROMO: false
        }
      };
      var jitsiApi = new JitsiMeetExternalAPI(testdomain, testoptions);

      if (!jitsiApi) {
        alert("Falha na abertura de GymBrainWeb.");
        this.set_active_meeting(false);
        // route to appointments
        this.$router.push("/appointments");
      }
      jitsiApi.addEventListener("videoConferenceLeft", () => {
        this.stopAppoinment();
      });
      this.atualizarAgendamento("abertura");
      this.createAppointmentNotification();
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
    loadScript(src, cb) {
      const scriptEl = document.createElement("script");
      scriptEl.src = src;
      scriptEl.async = 1;
      console.log(">>> Chamando a url de jitsi. ", scriptEl);
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
        this.$router.push("/appointments");
      });
    },
    executeCommand(command, ...value) {
      this.jitsiApi.executeCommand(command, ...value);
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
