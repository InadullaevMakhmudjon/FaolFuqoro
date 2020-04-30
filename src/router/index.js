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
    path: '/create-report',
    name: 'CreateReport',
    component: () => import('../views/CreateReport.vue'),
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
        path: 'reports',
        props: (route) => ({ ...route.params }),
        name: 'Reports',
        component: () => import('../views/reports/Reports.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/settings/Settings.vue'),
        children: [
          {
            path: 'organizations',
            name: 'Organizations',
            component: () => import('../views/settings/Organizations.vue'),
          },
          {
            path: 'operators',
            name: 'Operators',
            props: (route) => ({ ...route.params }),
            component: () => import('../views/settings/Operators.vue'),
          },
        ],
      },
      {
        path: 'report',
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
