<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { Logbook } from 'src/models/logbook/logbook';
import { LogbookLocalService } from 'src/services/local/logbook.local.service';
import EditLogbook from 'src/components/logbook/EditLogbook.vue';
import Confirmation from 'src/components/common/Confirmation.vue';
import { useAppStore } from 'src/stores/app.store';
const store = useAppStore();

const logbooks: Ref<Logbook[]> = ref([]);
const showDialog: Ref<boolean> = ref(false);
const currentLogbook: Ref<Logbook | undefined> = ref(undefined);

const showRemoveDialog = ref(false);
const logbookToRemove: Ref<Logbook | undefined> = ref(undefined);
const onRemoveClicked = (logbook: Logbook) => {
  logbookToRemove.value = logbook;
  showRemoveDialog.value = true;
};
const onRemoveConfirmed = () => {
  if (logbookToRemove.value) {
    LogbookLocalService.removeLogbook(logbookToRemove.value.id);
    refreshLogbooks();
  }
};

const refreshLogbooks = () => {
  logbooks.value = LogbookLocalService.getLocalLogbooks();
};

onMounted(() => {
  store.settingsCrumbs = [store.settingsCrumb, store.logbooksCrumb];
  refreshLogbooks();
});

const onSwitch = (lb: Logbook) => {
  lb.updatedAt = new Date();
  LogbookLocalService.saveLogbooksData(logbooks.value);
};

const onEditClicked = (logbook: Logbook) => {
  currentLogbook.value = logbook;
  showDialog.value = true;
};

const onCreateClicked = () => {
  currentLogbook.value = undefined;
  showDialog.value = true;
};

const onLogbookSubmitted = () => {
  refreshLogbooks();
};
</script>

<template>
  <!-- <q-separator spaced /> -->
  <div class="" style="max-width: 500px">
    <div class="row no-wrap items-center q-mt-md q-pa-sm q-pl-lg">
      <span class="text-subtitle2">Select visible logbooks:</span>
      <q-space />
      <q-btn
        color="primary"
        icon="mdi-pencil-plus-outline"
        label="create"
        @click="onCreateClicked"
      />
    </div>

    <q-item v-for="lb in logbooks" tag="label" v-ripple>
      <q-item-section side top>
        <q-checkbox
          v-model="lb.isChoosen"
          @update:model-value="() => onSwitch(lb)"
        />
        <!-- <q-toggle v-model="lb.isChoosen" /> -->
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ lb.name }}</q-item-label>
        <q-item-label caption>
          {{ lb.field1 }}
          {{ lb.field2 }}
          {{ lb.field3 }}
          {{ lb.field4 }}
        </q-item-label>
      </q-item-section>
      <q-btn
        icon="edit"
        title="Edit logbook"
        @click="
          () => {
            onEditClicked(lb);
          }
        "
      />
      <q-btn icon="delete" @click="() => onRemoveClicked(lb)" />
    </q-item>

    <!-- <q-separator spaced /> -->
  </div>

  <q-dialog class="" v-model="showDialog">
    <EditLogbook :logbook="currentLogbook" @submitted="onLogbookSubmitted" />
  </q-dialog>
  <q-dialog v-model="showRemoveDialog">
    <Confirmation
      message="Are you sure you want delete this logbook?"
      confirm-color="negative"
      @confirm="onRemoveConfirmed"
    />
  </q-dialog>
</template>
