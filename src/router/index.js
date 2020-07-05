import Vue from 'vue'
import Router from 'vue-router'
import LavadoManos from '@/components/LavadoManos'
import desinfecpuesto from '@/components/DesinfecPuesto'
import coronapp from '@/components/CoronApp'
import Home from '@/components/Home'
// import tabletest from '@/components/tabletest'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lavadomanos',
      name: 'LavadoManos',
      component: LavadoManos
    },
    {
      path: '/desinfecpuesto',
      name: 'desinfecpuesto',
      component: desinfecpuesto
    },
    {
      path: '/coronapp',
      name: 'coronapp',
      component: coronapp
    },
    // {
    //   path: '/table',
    //   name: 'tabletest',
    //   component: tabletest
    // },
    // {
    //   path: '/newpermiso',
    //   name: 'newpermiso',
    //   component: newpermiso
    // },
    // {
    //   path: '/permisos',
    //   name: 'permisos',
    //   component: permisos
    // }
  ]
})