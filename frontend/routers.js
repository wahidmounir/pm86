import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import IndexView    from 'views/IndexView.vue'
import BucketView   from 'views/BucketView.vue'
import CreateView   from 'views/CreateView.vue'
import ErrorView    from 'views/ErrorView.vue'


const base = 'PM86 - '
const inBrowser = typeof window !== 'undefined'

const router =  new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/',
      component: IndexView,
      meta: {title: `${base}Buckets`}},
    { path: '/buckets',
      component: IndexView,
      meta: {title: `${base}Buckets`}},
    { path: '/create',
      component: CreateView,
      meta: {title: `${base}Create`}},
    { path: '/buckets/:id',
      component: BucketView,
      meta: {title: `${base}Bucket`}},
    { path: '*',
      component: ErrorView,
      meta: {title: `${base}404`}},
  ]
})



router.beforeEach((to, from, next) => {

  if (inBrowser) {
    // const email = localStorage.getItem('email')
    // if (email === 'null' && to.path !== '/login' && to.path !== '/register') {
    //   location.href='/login'
    //   return;
    // }
    document.title = to.meta.title
  }
  next()
})

export default router
