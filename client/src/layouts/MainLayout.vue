<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-heart-pulse"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-tabs
          v-model="appStore.selectedTab"
          shrink
          stretch
          inline-label
          :dense="$q.screen.lt.sm"
          :outside-arrows="!$q.screen.lt.sm"
          class="bg-primary text-white shadow-2"
        >
          <q-tab
            v-for="t in appStore.toolbarTabs"
            :name="t.name"
            :icon="t.icon"
            :label="t.label"
          />
        </q-tabs>

        <q-toolbar-title
          v-if="!appStore.toolbarTabs?.length"
          class="text-center"
        >
          Mediko
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="flex q-mb-md">
        <q-icon name="mdi-heart-pulse" color="blue" size="lg" left />
        <span class="text-h6">Mediko</span>
        <q-space />
        <q-btn
          flat
          dense
          round
          icon="mdi-chevron-double-left"
          @click="toggleLeftDrawer"
        />
      </div>
      <q-list>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :title="link.title"
        />
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
import { useAppStore } from 'src/stores/app.store';

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
    title: 'Logbooks',
    caption: 'Body parameters',
    icon: 'mdi-scale',
    route: '/logbook',
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

const appStore = useAppStore();
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
