<template>
    <div>
        <tabletemplate v-bind:data="registros"  v-bind:url="url" v-bind:folder="folder"/>
    </div>
</template>
<script>
// import axios from 'axios'
import tabletemplate from '../components/tabletemplate'
export default {
    data(){
        return{
            registros: [],
            url:"https://coronaenco.000webhostapp.com/coronaenco/webservice/getInfo.php?tipo_reporte=LD",
            folder:"https://coronaenco.000webhostapp.com/coronaenco/LavadoManos/old/"
        }
    },
    components:{
        tabletemplate
    }
}
</script>