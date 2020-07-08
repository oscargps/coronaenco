<template>
  <div>
    <tabletemplate v-bind:data="registros" v-bind:url="url" v-bind:folder="folder" :fields="fields" :reporte=true />
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
        {
          key: "temperatura",
          label: "Temperatura",
          sortable: true,
          sortDirection: "desc"
        },

        { key: "actions", label: "" }
      ],
      registros: [],
      url:
        "http://coronaenco.000webhostapp.com/coronaenco/webservice/getAutoreporte.php",
      folder: "https://coronaenco.000webhostapp.com/coronaenco/LavadoManos/old/"
    };
  },
  components: {
    tabletemplate
  }
};
</script>