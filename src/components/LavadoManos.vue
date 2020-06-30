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
            url:"http://190.121.135.158/coronaenco/webservice/getLavado.php?folder=LavadoManos",
            folder:"http://190.121.135.158/coronaenco/LavadoManos/"
        }
    },
    components:{
        tabletemplate
    }
}
</script>