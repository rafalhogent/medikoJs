<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> <q-icon name="mdi-heart-pulse" size="md" /> Mediko </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Application Links </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" :title="link.title" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Timeline',
    caption: 'Home page',
    icon: 'mdi-timeline-text-outline',
    route: '/',
  },
  {
    title: 'Sleepbook',
    caption: 'Sleep & dreams book',
    icon: 'mdi-bed',
    route: '/sleep',
  },
  {
    title: 'Labo',
    caption: 'Medical examination results',
    icon: 'mdi-flask-empty-outline',
  },
  {
    title: 'Measurements',
    caption: 'Body parameters',
    icon: 'mdi-scale',
  },
  {
    title: 'Medications',
    caption: 'Medications schemes',
    icon: 'mdi-pill',
  },
  {
    title: 'Meals',
    caption: 'Diet food & drinks',
    icon: 'mdi-food-apple',
  },
  {
    title: 'Docs',
    caption: 'Documentation',
    icon: 'mdi-text-box-search-outline',
  },
  {
    title: 'About',
    caption: 'Application Info',
    icon: 'mdi-information-outline',
  },
  {
    title: 'Github',
    caption: 'github.com/rafalhogent/mediko2js',
    icon: 'mdi-github',
    link: 'https://github.com/rafalhogent/mediko2js',
  },
  {
    title: 'Settings',
    caption: 'Application & user-profile settings',
    icon: 'mdi-account-cog',    
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
