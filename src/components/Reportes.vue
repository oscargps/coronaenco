<template>
  <b-container fluid>
    <b-row>
      <b-col md="4">
        <b-row>
          <b-col>
            <VueCtkDateTimePicker
              formatted="LL"
              onlyDate
              output-format="YYYY-MM-DD"
              label="Fecha Inicio"
              v-model="FechaInicio"
              buttonNowTranslation="Hoy"
            />
          </b-col>
          <b-col>
            <VueCtkDateTimePicker
              formatted="LL"
              onlyDate
              output-format="YYYY-MM-DD"
              label="Fecha de fin"
              v-model="FechaFin"
              buttonNowTranslation="Hoy"
            />
          </b-col>
        </b-row>
        <div class="my-1">
          <b-button-group size="sm" class="mx-1">
            <b-button @click="setDate('ayer')">Ayer</b-button>
            <b-button @click="setDate('hoy')">Hoy</b-button>
            <b-button @click="setDate('last7')" disabled>Ultimos 7 dias</b-button>
            <b-button @click="setDate('mes')">Este mes</b-button>
            <b-button @click="setDate('all')" disabled>Total</b-button>
          </b-button-group>
        </div>
      </b-col>
      <b-col md="3" class="options_report">
        <b-form-group>
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="selected_report"
            :options="options"
            switches
            stacked
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col md="3" class="options_report">
        <b-form-group>
          <b-form-checkbox-group
            id="checkbox-group-2"
            v-model="selected_process"
            :options="procesos"
            switches
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col md="2">
          <b-button variant="primary" block="">Buscar</b-button>
      </b-col>
    </b-row>
    <hr>
  </b-container>
</template>
<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
export default {
  data() {
    return {
      hoy: "",
      FechaInicio: "",
      FechaFin: "",
      options: ["Lavado de Manos", "Desinfeccion de Puesto", "CoronApp"],
      procesos:['ADMON','PQR','SCR','LCF','MTTO','OMOV']
    };
  },
  components: {
    VueCtkDateTimePicker
  },
  mounted() {
    this.setToday();
  },
  computed: {
    ayer() {
      let date = new Date();
      let day = date.getDate() - 1;
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (month < 10) {
        return `${year}-0${month}-${day}`;
      } else {
        return `${year}-${month}-${day}`;
      }
    },
    last7() {
      let date = new Date();
      let day = date.getDate() - 7;
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (month < 10) {
        return `${year}-0${month}-${day}`;
      } else {
        return `${year}-${month}-${day}`;
      }
    },
    firstDayOfMonth() {
      let date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (month < 10) {
        return `${year}-0${month}-1`;
      } else {
        return `${year}-${month}-1`;
      }
    }
  },
  methods: {
    setToday() {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (month < 10) {
        this.hoy = `${year}-0${month}-${day}`;
      } else {
        this.hoy = `${year}-${month}-${day}`;
      }
    },
    setDate(option) {
      switch (option) {
        case "hoy":
          this.FechaInicio = this.hoy;
          this.FechaFin = this.hoy;
          break;
        case "ayer":
          this.FechaInicio = this.ayer;
          this.FechaFin = this.ayer;
          break;
        case "mes":
          this.FechaInicio = this.firstDayOfMonth;
          this.FechaFin = this.hoy;
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="css">
.options_report{
    text-align: left;
}
</style>