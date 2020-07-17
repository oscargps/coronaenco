<template>
  <b-container fluid>
    <b-row class="options_bar">
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
        <b-button variant="primary" block @click="Buscar()">Buscar</b-button>
      </b-col>
    </b-row>
    <hr />
    <div v-if="buscar">
      <h3>Realiza una busqueda</h3>
    </div>
    <tabletemplate
      v-bind:data="registros"
      v-bind:url="url"
      v-bind:folder="folder"
      :fields="fields"
      :excel="true"
      TitleExcel="Reporte Coronaenco"
      v-else
    />
  </b-container>
</template>
<script>
import Swal from "sweetalert2";

import tabletemplate from "../components/tabletemplate";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
export default {
  data() {
    return {
      buscar: true,
      hoy: "",
      selected_process: [],
      selected_report: [],
      FechaInicio: "",
      FechaFin: "",
      options: ["LD", "DP", "CA", "FE"],
      procesos: ["ADMINISTRACIÓN", "PQR", "SCR", "LCF", "MTTO", "OMOV"],
      registros: [],
      url: "",
      folder:
        "https://coronaenco.000webhostapp.com/coronaenco/LavadoManos/old/",
      fields: [
        {
          key: "fecha",
          label: "Fecha",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "nombre",
          label: "Nombre",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "proceso",
          label: "Proceso",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "tipo_reporte",
          label: "Reporte",
          sortable: true,
          sortDirection: "desc"
        }
      ]
    };
  },
  components: {
    VueCtkDateTimePicker,
    tabletemplate
  },
  mounted() {
    this.setToday();
    this.setDate("hoy");
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
    Buscar() {
      this.buscar = true;
      if (
        this.selected_process &&
        this.selected_process.length &&
        this.selected_report &&
        this.selected_report.length
      ) {
        this.url =
          "https://coronaenco.000webhostapp.com/coronaenco/webservice/getReporte.php?tipo_reporte=" +
          this.selected_report +
          "&procesos=" +
          this.selected_process +
          "&fecha1=" +
          this.FechaInicio +
          " 00:00:00&fecha2=" +
          this.FechaFin +
          " 23:59:00";
        setTimeout(() => {
          this.buscar = false;
        }, 1000);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Selecciona por lo menos un proceso y un tipo de reporte",
          showConfirmButton: true
          // timer: 1500
        });
      }
    },
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
.options_report {
  text-align: left;
}
</style>