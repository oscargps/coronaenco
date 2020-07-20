<template>
  <div>
    <tabletemplate
      v-bind:data="registros"
      v-bind:url="url"
      v-bind:folder="folder"
      :fields="fields"
      :familiar="true"
      :excel="true"
      :Fexcel="fieldsExcel"
      TitleExcel="Reporte de Familiares"
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
          key: "familiar",
          label: "Familiar",
          sortable: true,
          sortDirection: "desc"
        },

        { key: "actions", label: "" }
      ],
      fieldsExcel: {
        Cedula: "cedula",
        Nombre: "nombre",
        Proceso: "proceso",
        "Nombre familiar": "familiar",
        "Telefono de contacto": "telefono",
        "Correo electronico": "correo"
      },
      registros: [],
      url:
        "https://coronaenco.000webhostapp.com/coronaenco/webservice/getFamiliares.php",
      folder: "https://coronaenco.000webhostapp.com/coronaenco/CoronApp/old/"
    };
  },
  components: {
    tabletemplate
  }
};
</script>