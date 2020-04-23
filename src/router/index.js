import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (from, to, next) => {
      if (store.state.user) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    props: (route) => ({ ...route.params }),
    beforeEnter: (from, to, next) => {
      if (store.state.user) {
        next();
      } else {
        next({ name: 'Login' });
      }
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
      },
      {
        path: '/reports',
        name: 'Reports',
        component: () => import('../views/reports/Reports.vue'),
      },
      {
        path: '/operators',
        name: 'Operators',
        component: () => import('../views/Operators.vue'),
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue'),
      },
      {
        path: '/report',
        name: 'Report',
        props: true,
        component: () => import('../views/reports/Report.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
