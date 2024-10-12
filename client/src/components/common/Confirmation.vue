<template>
  <q-card style="max-width: 500px">
    <q-card-section>
      <div>{{ props.message }}</div>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn icon="close" color="secondary" label="Cancel" v-close-popup />
      <q-btn
        :icon="props.confirmIcon"
        :color="props.confirmColor"
        :label="props.confirmLabel"
        @click="props.onConfirm"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
export interface ConfirmationProps {
  message?: string;
  confirmIcon?: string;
  confirmColor?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
}
const props = withDefaults(defineProps<ConfirmationProps>(), {
  message: 'Are you sure?',
  confirmIcon: 'check',
  confirmColor: 'primary',
  confirmLabel: ' confirm',
});
</script>
