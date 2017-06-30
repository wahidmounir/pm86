import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import IndexView    from 'pages/IndexView.vue'
import BucketView   from 'pages/BucketView.vue'
import CreateView   from 'pages/CreateView.vue'
import ErrorView    from 'pages/ErrorView.vue'
import Charts       from 'pages/Charts.vue'

const base = 'PM86 - '

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
    { path: '/charts',
      component: Charts,
      meta: {title: `${base}Charts`}},
    { path: '*',
      component: ErrorView,
      meta: {title: `${base}404`}},
  ]
})



router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
