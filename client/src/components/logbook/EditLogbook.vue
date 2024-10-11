<script setup lang="ts">
import { Logbook } from 'src/models/logbook/logbook';
import { LogbookLocalService } from 'src/services/local/logbook.local.service';
import { onMounted, Ref, ref } from 'vue';
import { useAppStore } from 'src/stores/app.store';

const store = useAppStore();

//#region types, props, emits
export interface EditLogbookProps {
  caption?: string;
  link?: string;
  icon?: string;
  logbook?: Logbook;
  route?: string;
}
const props = withDefaults(defineProps<EditLogbookProps>(), {
  caption: '',
  icon: '',
  logbook: undefined,
});

const emit = defineEmits<{
  (e: 'submitted', logbook?: Logbook): void;
}>();
//#endregion

//#region refs
const viewModel: Ref<Logbook> = ref({ name: '' } as Logbook);

//#endregion

//#region hooks, handlers
const submitForm = () => {
  try {
    LogbookLocalService.upsertLogbookDefinition(viewModel.value);
  } catch (error: any) {
    store.handleError('Failed to save Logbook definition', error.message);
  } finally {
    emit('submitted');
  }
};

onMounted(() => {
  props.logbook;
  if (props.logbook) {
    viewModel.value = props.logbook;
  }
});
//#endregion

const numberFieldStyle = 'text-align: center; padding: 2px ';
</script>

<template>
  <q-card style="width: 100%; max-width: 700px">
    <q-form class="q-gutter-xs" @submit="submitForm">
      <q-card-section>
        <div class="text-h6">
          {{ $props.logbook ? 'Edit ' : 'Create ' }}
          {{ $props.logbook?.name }} logbook
        </div>
      </q-card-section>

      <q-card-section class="q-my-xs">
        <q-input v-model="viewModel.name" label="Name" autofocus />
      </q-card-section>

      <q-card-section class="row items-start q-gutter-sm">
        <q-input
          class="col-4"
          dense
          v-model="viewModel.field1"
          placeholder="field 1"
        />
        <q-input
          class="col-4"
          dense
          v-model="viewModel.unit1"
          placeholder="unit 1 "
        />
        <q-input
          dense
          class="q-pa-none col-3"
          v-model.number="viewModel.precision1"
          type="number"
          placeholder="digits"
          :input-style="numberFieldStyle"
        />
      </q-card-section>
      <q-card-section class="row items-start q-gutter-sm">
        <q-input
          class="col-4"
          dense
          v-model="viewModel.field2"
          placeholder="field 2"
        />
        <q-input
          class="col-4"
          dense
          v-model="viewModel.unit2"
          placeholder="unit 2"
        />
        <q-input
          dense
          class="q-pa-none col-3"
          v-model.number="viewModel.precision2"
          type="number"
          placeholder="digits"
          :input-style="numberFieldStyle"
        />
      </q-card-section>
      <q-card-section class="row items-start q-gutter-sm">
        <q-input
          class="col-4"
          dense
          v-model="viewModel.field3"
          placeholder="field 3"
        />
        <q-input
          class="col-4"
          dense
          v-model="viewModel.unit3"
          placeholder="unit 3"
        />
        <q-input
          dense
          class="q-pa-none col-3"
          v-model.number="viewModel.precision3"
          type="number"
          placeholder="digits"
          :input-style="numberFieldStyle"
        />
      </q-card-section>
      <q-card-section class="row items-start q-gutter-sm">
        <q-input
          class="col-4"
          dense
          v-model="viewModel.field4"
          placeholder="field 4"
        />
        <q-input
          class="col-4"
          dense
          v-model="viewModel.unit4"
          placeholder="unit 4"
        />
        <q-input
          dense
          class="q-pa-none col-3"
          v-model.number="viewModel.precision4"
          type="number"
          placeholder="digits"
          :input-style="numberFieldStyle"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-space />
        <q-btn icon="close" color="secondary" label="Cancel" v-close-popup />
        <q-btn
          icon="save"
          color="primary"
          label="Save"
          v-close-popup
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
