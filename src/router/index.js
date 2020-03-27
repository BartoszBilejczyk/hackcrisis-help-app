import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/people',
    name: 'People',
    component: () => import(/* webpackChunkName: "about" */ '../views/People.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/requests',
    name: 'Requests',
    component: () => import(/* webpackChunkName: "about" */ '../views/Requests.vue')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ranking.vue')
  },
  {
    path: '*',
    redirect: () => '/people'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
