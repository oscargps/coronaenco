<template>
  <div>
    <tabletemplate
      v-bind:data="registros"
      v-bind:url="url"
      v-bind:folder="folder"
      :fields="fields"
      :excel="true"
      :Fexcel="fieldsExcel"
      TitleExcel="Reporte de CoronApp"
    />
  </div>
</template>
<script>
// import axios from 'axios'
import tabletemplate from "../components/tabletemplate";
export default {
  data() {
    return {
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

        { key: "actions", label: "" }
      ],
      fieldsExcel: {
        Fecha: "fecha",
        Cedula: "cedula",
        Nombre: "nombre",
        Proceso: "proceso",
      },
      registros: [],
      url:
        "https://coronaenco.000webhostapp.com/coronaenco/webservice/getInfo.php?tipo_reporte=CA",
      folder: "https://coronaenco.000webhostapp.com/coronaenco/CoronApp/old/"
    };
  },
  components: {
    tabletemplate
  }
};
</script>