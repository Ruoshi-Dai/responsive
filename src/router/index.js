import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import MainPage from '@/components/MainPage'
import PicViewer from '@/components/PicViewer'
// import Test from '@/components/Test'
import previews from '@/components/previews'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'previews',
      component: previews
    },
    {
      path: '/',
      name: 'PicViewer',
      component: PicViewer
    }
  ]
})
