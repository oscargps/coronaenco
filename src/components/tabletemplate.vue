<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="5" class="my-1">
        <b-form-group label-cols-sm="3" label="Filtrar" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Buscar.."></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" variant="primary" @click="filter = ''">Limpiar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="4" class>
        <b-form-group label-cols-sm="3" label="Mostrar" class="mb-1">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col md="2">
        <b-button variant="primary" v-on:click="getData()">Actualizar</b-button>
      </b-col>
      <b-col md="1" v-if="reporte">
        <b-button variant="success">
          <download-excel :name="nameExcel" :title="TitleExcel" :fields="Fexcel" :data="items">
            <font-awesome-icon icon="file-excel" />
          </download-excel>
        </b-button>
      </b-col>
    </b-row>

    <hr />

    <div v-if="loading">
      <h2>Cargando....</h2>
    </div>
    <div v-else>

      <!-- Main table element -->
      <b-table
        show-empty
        stacked="md"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        @filtered="onFiltered"
        :tbody-tr-class="rowClass"
        
      >
        <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            @click="infoTable(row.item, row.index, $event.target)"
            v-if="reporte"
          >{{ row.detailsShowing ? 'Cerrar' : 'Ver' }} Detalle</b-button>
          <b-button
            size="sm"
            v-else
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >Evidencia</b-button>
        </template>
        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>
      </b-table>
    </div>

    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <div v-if="reporte">
        <b-table stacked :items="this.infoModal.content"></b-table>
      </div>
      <img v-else class="evidencia" v-bind:src="infoModal.content" />
    </b-modal>
    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sortBy: "fecha",
      sortDesc: true,
      loading: true,
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      filter: null,
      infoModal: {
        id: "info-modal",
        title: "",
        content: [],
        items: []
      }
    };
  },
  props: {
    data: Array,
    url: String,
    folder: String,
    fields: Array,
    reporte: Boolean,
    Fexcel: Object,
    TitleExcel: String,
    clickGenerar: Function
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return {
            text: f.label,
            value: f.key
          };
        });
    },
    nameExcel() {
      return this.TitleExcel + ".xls";
    }
  },
  mounted() {
    this.getData();
    this.totalRows = this.items.length;
    console.log(this.fields);
  },

  methods: {
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.temperatura > 37) return "table-danger";
    },
    infoTable(item, index, button) {
      this.infoModal.title = item.nombre;
      this.infoModal.content = [item.sintomas];
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    info(item, index, button) {
      console.log(item.img);

      this.infoModal.title = item.name;
      this.infoModal.content = this.folder + item.img;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = [];
      this.infoModal.items = [];
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getData() {
      this.loading = true;
      console.log("Getting data of " + this.url);
      return axios
        .get(this.url)
        .then(response => {
          this.items = response.data;
          this.loading = false;
          this.filter = " ";
          this.filter = null;
        })
        .catch(error => {
          console.log(error);
        });
    },
    setData(dato, img) {
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      return axios
        .get(
          "https://coronaenco.000webhostapp.com/coronaenco/webservice/getName.php?cedula=" +
            dato[3]
        )
        .then(response => {
          let dateString = dato[0];
          let year = dateString.substring(0, 4);
          let month = dateString.substring(4, 6);
          let day = dateString.substring(6, 8);
          let num = getRandomInt(0, 5);
          let procesos = ["LCF", "PQR", "SCR", "ADMON", "MTTO", "OMOV"];
          console.log(num);

          // var date = new Date(year, month - 1, day);
          // var currentDate = new Date();
          this.items.push({
            date: year + "/" + month + "/" + day,
            name: response.data,
            proceso: procesos[num],
            img: this.folder + img + ".jpg"
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="css">
.evidencia {
  width: 80%;
}
</style>