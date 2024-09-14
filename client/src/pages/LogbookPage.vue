<script setup lang="ts">
import { QTableProps } from 'quasar';
import { Log, Logbook } from 'src/models/logbook/logbook';
import { LogbookLocalService } from 'src/services/local/logbook.local.service';
import { computed, onMounted, Ref, ref } from 'vue';
import EditLogbook from 'src/components/logbook/EditLogbook.vue';
import { DateTime } from 'luxon';

//#region refs, computed
const logbooks: Ref<Logbook[]> = ref([]);
const currentLogbook = computed(() => {
  return logbooks.value.find((lb) => lb.id.toString() == tab.value);
});

const showDialog: Ref<boolean> = ref(false);
const currentLog: Ref<Log | undefined> = ref(undefined);

const columns = computed(() => {
  const lgb = currentLogbook.value;
  const cols: QTableProps['columns'] = [
    {
      name: 'moment',
      label: 'Date & Time',
      field: (item: Log) =>
        item.moment
          ? DateTime.fromJSDate(item.moment).toFormat('yyyy-LL-dd HH:mm')
          : ' ? ',
      align: 'center',
      style: 'width: 70px',
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
          headerStyle: 'white-space:pre-wrap; word-wrap:break-word',
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

const tab = ref('1');
const tabs = computed(() => {
  return logbooks.value.map((lb) => ({
    name: lb.id,
    icon: lb.icon,
    label: lb.name,
  }));
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
      for (const key in myLog) {
        if (Object.prototype.hasOwnProperty.call(myLog, key)) {
          (myLog as any)[key] = (log as any)[key];
        }
      }
    } else {
      ourLogbook.logs.push(log);
    }
  }
};

onMounted(() => {
  logbooks.value = LogbookLocalService.getDefaultLogbooks();
});
//#endregion
</script>

<template>
  <q-page class="">
    <q-tabs
      v-model="tab"
      inline-label
      :dense="$q.screen.lt.sm"
      :outside-arrows="!$q.screen.lt.sm"
      class="bg-primary text-white shadow-2"
    >
      <q-tab v-for="t in tabs" :name="t.name" :icon="t.icon" :label="t.label" />
    </q-tabs>

    <div class="">
      <q-table
        style="height: 100%"
        :grid="false && $q.screen.lt.sm"
        :dense="$q.screen.lt.md"
        wrapCells
        bordered
        :title="currentLogbook?.name ?? ''"
        :rows="currentLogbook?.logs ?? []"
        :columns="columns"
        row-key="index"
        virtual-scroll
        :rows-per-page-options="[0]"
        v-on:row-click="editLog"
      >
        <template v-slot:top>
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
    />
  </q-dialog>
</template>
