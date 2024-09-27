import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/sleep', component: () => import('pages/SleepPage.vue') },
      { path: '/logbook', component: () => import('pages/LogbookPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      { path: 'account', component: () => import('pages/AccountPage.vue') },
    
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
