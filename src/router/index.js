import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import MainPage from '@/components/MainPage'
import Album from '@/components/Album'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Album',
      component: Album
    }
  ]
})
