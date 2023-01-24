import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import MainPage from '@/components/MainPage'
// import PicViewer from '@/components/PicViewer'
// import Test from '@/components/Test'
// import previews from '@/components/previews'
// import PicBook from '@/components/PicBook'
import Curling from '@/components/Curling'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Curling',
      component: Curling
    }
    // {
    //   path: '/',
    //   name: 'PicBook',
    //   component: PicBook
    // },
    // {
    //   path: '/',
    //   name: 'previews',
    //   component: previews
    // },
    // {
    //   path: '/',
    //   name: 'PicViewer',
    //   component: PicViewer
    // }
  ]
})
