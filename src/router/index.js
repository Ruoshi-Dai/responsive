import Vue from 'vue'
import Router from 'vue-router'
import CurlingV2 from '@/components/CurlingV2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CurlingV2',
      component: CurlingV2
    }
  ]
})
