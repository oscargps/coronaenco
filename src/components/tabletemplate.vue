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
      <b-col md="3">
        <b-button variant="primary" v-on:click="getData()">Actualizar</b-button>
      </b-col>
    </b-row>
    <hr />
    <div v-if="loading">
      <h2>Cargando....</h2>
    </div>
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
      v-else
    >
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">Ver Foto</b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <img class="evidencia" v-bind:src="infoModal.content" />
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
      sortBy: 'date',
      sortDesc: true,
      loading: true,
      items: [],
      fields: [
        {
          key: "date",
          label: "Fecha",
          sortable: true,
          sortDirection: "desc"
        },

        {
          key: "name",
          label: "Nombre",
          sortable: true,
          sortDirection: "desc"
        },

        { key: "actions", label: "" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      filter: null,
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      }
    };
  },
  props: {
    data: Array,
    url: String,
    folder: String
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
    }
  },
  mounted() {
    this.getData();
    this.totalRows = this.items.length;
    this.filter = " "
  },

  methods: {
    info(item, index, button) {
      this.infoModal.title = item.name;
      this.infoModal.content = item.img;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getData() {
      this.items = [];
      this.loading = true;
      console.log("Getting data of " + this.folder);
      axios.get(this.url).then(response => {
        this.loading = false;
        let registros = response.data.split(".jpg/");
        registros.map(registro => {
          let dato = registro.split("_");          
          if (dato.length != 1) {
            this.setData(dato, registro);
          }
        });
      });
    },
    setData(dato, img) {
      axios
        .get(
          "https://190.121.135.158/coronaenco/webservice/getName.php?cedula=" +
            dato[3]
        )
        .then(response => {
          let dateString = dato[0];
          let year = dateString.substring(0, 4);
          let month = dateString.substring(4, 6);
          let day = dateString.substring(6, 8);

          // var date = new Date(year, month - 1, day);
          // var currentDate = new Date();
          this.items.push({
            date: year + "/" + month + "/" + day,
            name: response.data,
            img: this.folder + img + ".jpg"
          });
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