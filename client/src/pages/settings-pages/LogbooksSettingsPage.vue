<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { Logbook } from 'src/models/logbook/logbook';
import { LogbookLocalService } from 'src/services/local/logbook.local.service';
import EditLogbook from 'src/components/logbook/EditLogbook.vue';

const logbooks: Ref<Logbook[]> = ref([]);
const showDialog: Ref<boolean> = ref(false);
const currentLogbook: Ref<Logbook | undefined> = ref(undefined);

onMounted(() => {
  logbooks.value = LogbookLocalService.getLocalLogbooks();
});

const onSwitch = (lb: Logbook) => {
  lb.updatedAt = new Date();
  LogbookLocalService.saveLogbooksData(logbooks.value);
};

const onEditClicked = (logbook: Logbook) => {
  currentLogbook.value = logbook;
  showDialog.value = true;
};
</script>

<template>
  <div>
    <!-- <q-separator spaced /> -->
    <q-item-label header>Select visible logbooks</q-item-label>

    <q-item
      v-for="lb in logbooks"
      tag="label"
      v-ripple
      style="max-width: 500px"
    >
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
    </q-item>

    <!-- <q-separator spaced /> -->
  </div>

  <q-dialog class="" v-model="showDialog">
    <EditLogbook :logbook="currentLogbook" />
  </q-dialog>
</template>
