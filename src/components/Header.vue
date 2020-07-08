<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="nav">
      <b-navbar-brand ><router-link to="/" class="title" >CoronAENCO</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item >
            <router-link to="/coronapp" class="nav-link">Reporte CoronApp</router-link>
          </b-nav-item>
          <b-nav-item >
            <router-link to="/lavadomanos" class="nav-link">Lavado de Manos</router-link>
          </b-nav-item>
          <b-nav-item >
            <router-link to="/desinfecpuesto" class="nav-link">Desinfeccion de puesto</router-link>
          </b-nav-item>
          <b-nav-item >
            <router-link to="/autoreporte" class="nav-link">Reporte de Sintomas</router-link>
          </b-nav-item>
          <b-nav-item >
            <router-link to="/reportes" class="nav-link">Reportes</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css" scoped>
.nav {
  background-color: #182c45;
}
.title{
  text-decoration: none;
  color: #0073bf;
}
</style>