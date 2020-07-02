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
            url:"https://coronaenco.000webhostapp.com/coronaenco/webservice/getLavado.php?folder=DesinfecPuesto",
            folder:"https://coronaenco.000webhostapp.com/coronaenco/Desinfecpuesto/"
        }
    },
    components:{
        tabletemplate
    }
}
</script>