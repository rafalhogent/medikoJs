<template>
  <q-page>
    <!-- <h3 class="absolute-center">About</h3> -->
    <div class="absolute-center text-center">
      <h4 class="q-mb-sm">About <q-icon name="mdi-heart-pulse" /> MedikoJs</h4>
      <div class="q-mb-lg">version: {{ version }}</div>
      <p class="text-center">
        Mediko-JS is a solution te help users store and analyze health data
        (body parameters, diet, medications schema, ...). Client is a
        <a href="https://vuejs.org/">Vue.Js </a> based
        <a href="https://quasar.dev/">Quasar</a> application.
      </p>
      <div>
        source-code:
        <q-icon class="q-mr-xs" name="mdi-github" />
        <a href="https://github.com/rafalhogent/medikojs"
          >github.com/rafalhogent/medikojs</a
        >
      </div>
      <div>Quasar version: {{ $q.version }}</div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { version } from '../../package.json';
</script>
