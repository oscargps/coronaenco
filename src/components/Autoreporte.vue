<template>
  <div>
    <tabletemplate
      v-bind:data="registros"
      v-bind:url="url"
      v-bind:folder="folder"
      :fields="fields"
      :Autoreporte="true"
      :excel="true"
      :Fexcel="fieldsExcel"
      TitleExcel="Autoreporte de sintomas"
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
        {
          key: "temperatura",
          label: "Temperatura",
          sortable: true,
          sortDirection: "desc"
        },

        { key: "actions", label: "" }
      ],
      fieldsExcel: {
        Fecha: "fecha",
        Nombre: "nombre",
        Proceso: "proceso",
        Cedula: "id",
        Temperatura: "temperatura",
        Fiebre: "sintomas.Fiebre",
        Tos: "sintomas.Tos",
        "Dolor de cabeza": "sintomas.Dolor de cabeza",
        "Dolor de garganta": "sintomas.Dolor de garganta",
        "Pérdida del olfato o gusto": "sintomas.Pérdida del olfato o gusto",
        "Malestar general": "sintomas.Malestar general",
        "Dificultad respiratoria": "sintomas.Dificultad respiratoria",
        "Secreciones nasales": "sintomas.Secreciones nasales",
        Diarrea: "sintomas.Diarrea",
        'Contacto con alguien que presente los anteriores sintomas':'sintomas.Contacto con alguien que presente los anteriores sintomas'
      },
      registros: [],
      url:
        "https://coronaenco.000webhostapp.com/coronaenco/webservice/getAutoreporte.php",
      folder: "https://coronaenco.000webhostapp.com/coronaenco/LavadoManos/old/"
    };
  },
  components: {
    tabletemplate
  },
  methods: {
    generarExcel() {}
  }
};
</script>