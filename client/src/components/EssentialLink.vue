<template title="titelek">
  <q-item clickable tag="a" :target="link ? 'blank' : undefined" :href="link" :to="route">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
      <!-- <q-tooltip self="center right">{{ $props.title }}</q-tooltip> -->
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  route?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  icon: '',
});
</script>
