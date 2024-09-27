<script setup lang="ts">
import { QTableProps } from 'quasar';
import { Log, Logbook } from 'src/models/logbook/logbook';
import { LogbookLocalService } from 'src/services/local/logbook.local.service';
import { computed, onMounted, onUnmounted, Ref, ref } from 'vue';
import EditLogbook from 'src/components/logbook/EditLogbook.vue';
import { DateTime } from 'luxon';
import { useAppStore } from 'src/stores/app.store';

//#region refs, computed
const logbooks: Ref<Logbook[]> = ref([]);
const currentLogbook = computed(() => {
  return logbooks.value.find((lb) => lb.id.toString() == appStore.selectedTab);
});

const appStore = useAppStore();

const showDialog: Ref<boolean> = ref(false);
const currentLog: Ref<Log | undefined> = ref(undefined);

const columns = computed(() => {
  const lgb = currentLogbook.value;
  const cols: QTableProps['columns'] = [
    {
      name: 'moment',
      label: 'moment',
      field: (item: Log) =>
        item.moment
          ? DateTime.fromJSDate(item.moment).toFormat('yyyy-LL-dd HH:mm')
          : ' ? ',
      align: 'center',
      style: 'width: 95px; min-width: 85px; padding: 10px 0px',
    },
    {
      name: 'comment',
      label: 'comment',
      field: 'comment',
      align: 'left',
      style: '',
    },
  ];

  if (lgb) {
    for (let i = 1; i < 4; i++) {
      const fname: string = `field${i}`;
      const vname: string = `value${i}`;
      const uname: string = `unit${i}`;

      const field = lgb[fname as keyof Logbook] as string;
      const unit = lgb[uname as keyof Logbook] as string;
      if (field) {
        cols.splice(cols.length - 1, 0, {
          name: field,

          headerStyle: 'white-space:pre-wrap; ',
          label: `${field}${unit ? `\n( ${unit} )` : ''}`,
          field: (l: Log) => {
            const vl = l[vname as keyof Log];
            return vl ? `${vl}` : '';
          },
          style: `width: 100px`,
        });
      }
    }
  }
  return cols;
});

//#endregion

//#region hooks, handlers
const editLog = (evt: Event, row: any, index?: number) => {
  currentLog.value = row;
  showDialog.value = true;
};

const onDialogSubmitted = (log: Log) => {
  const ourLogbook = logbooks.value.find(
    (lb) => lb.id == currentLogbook.value?.id,
  );
  if (ourLogbook && log) {
    const myLog = ourLogbook.logs.find((l) => l.id == log.id);
    if (myLog) {
      myLog.update(log);
    } else {
      ourLogbook.logs.push(log);
    }
  }
  currentLog.value = undefined;
};

const onDeleteLog = (id: string) => {
  const ourLogbook = logbooks.value.find(
    (lb) => lb.id == currentLogbook.value?.id,
  );
  if (ourLogbook && id) {
    let idx: number | undefined = undefined;
    const ourLog = ourLogbook.logs.find((l, i) => {
      idx = i;
      return l.id == id;
    });

    if (idx) ourLogbook.logs.splice(idx, 1);
    currentLog.value = undefined;
    showDialog.value = false;
  }
};

onMounted(() => {
  logbooks.value = LogbookLocalService.getDefaultLogbooks();
  appStore.toolbarTabs = logbooks.value.map((lb) => ({
    name: lb.id,
    icon: lb.icon,
    label: lb.name,
  }));
  if (logbooks.value.length && !appStore.selectedTab) {
    appStore.selectedTab = logbooks.value[0].id;
  }
});

onUnmounted(() => {
  appStore.toolbarTabs = [];
});
//#endregion
</script>

<template>
  <q-page class="">
    <div class="">
      <q-table
        v-if="!!currentLogbook"
        style="height: 100%"
        :grid="false && $q.screen.lt.sm"
        :dense="$q.screen.lt.md"
        wrapCells
        separator="horizontal"
        bordered
        :title="currentLogbook?.name ?? '?'"
        :rows="currentLogbook?.logs ?? []"
        :columns="columns"
        row-key="index"
        virtual-scroll
        :rows-per-page-options="[0]"
        v-on:row-click="editLog"
      >
        <template v-slot:top>
          <h6 class="q-my-md text-uppercase">
            {{ currentLogbook?.name ? currentLogbook.name : '?' }}
          </h6>
          <q-space />
          <q-btn
            color="primary"
            icon="add"
            :disable="false"
            label="Add Log"
            @click="editLog"
          />
        </template>
      </q-table>
    </div>
  </q-page>
  <q-dialog v-model="showDialog">
    <edit-logbook
      v-bind:logbook="currentLogbook"
      v-bind:log="currentLog"
      @submited="onDialogSubmitted"
      @delete="onDeleteLog"
    />
  </q-dialog>
</template>
