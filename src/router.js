import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import AddDataSource from './views/AddDataSource.vue'
import ManageDataSources from './views/ManageDataSources.vue'
import GraphSearch from './views/GraphSearch.vue'
import KeywordSearch from './views/KeywordSearch.vue'
import AddFile from './views/AddFile.vue'
import ManageFiles from './views/ManageFiles.vue'
import ImageSearch from './views/ImageSearch.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/add-data-source',
      name: 'add-data-sources',
      component: AddDataSource
    },
    {
      path: '/manage-data-sources',
      name: 'manage-data-sources',
      component: ManageDataSources
    },
    {
      path: '/graph-search',
      name: 'graph-search',
      component: GraphSearch
    },
    {
      path: '/keyword-search',
      name: 'keyword-search',
      component: KeywordSearch
    },
    {
      path: '/image-search',
      name: 'image-search',
      component: ImageSearch
    },
    {
      path: '/add-file',
      name: 'keyword-search',
      component: AddFile
    },
    {
      path: '/manage-files',
      name: 'keyword-search',
      component: ManageFiles
    },
    {
      path: '/tables',
      name: 'tables',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "tables" */ './views/Tables.vue')
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import(/* webpackChunkName: "forms" */ './views/Forms.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
    },
    {
      path: '/client/new',
      name: 'client.new',
      component: () => import(/* webpackChunkName: "client-form" */ './views/ClientForm.vue')
    },
    {
      path: '/client/:id',
      name: 'client.edit',
      component: () => import(/* webpackChunkName: "client-form" */ './views/ClientForm.vue'),
      props: true
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
