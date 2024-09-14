<script setup lang="ts">
import { DateTime } from 'luxon';
import { Log, Logbook } from 'src/models/logbook/logbook';
import { LogbookLocalService } from 'src/services/local/logbook.local.service';
import { onMounted, Ref, ref } from 'vue';

//#region types, props
export interface EditLogbookProps {
  caption?: string;
  link?: string;
  icon?: string;
  logbook?: Logbook;
  log?: Log;
  route?: string;
}
const props = withDefaults(defineProps<EditLogbookProps>(), {
  caption: '',
  icon: '',
  logbook: undefined,
});

type InputValueFields = {
  propName: string;
  fieldName: string;
  fieldValue: number | undefined;
  unitName: string;
};

const emit = defineEmits({
  submited(payload: Log) {
    return true;
  },
});
//#endregion

//#region refs
const logDate = ref(
  (props.log?.moment
    ? DateTime.fromJSDate(props.log.moment)
    : DateTime.now()
  ).toFormat('yyyy-LL-dd HH:mm'),
);
const valueInputs: Ref<InputValueFields[]> = ref([]);

const comment = ref<string | undefined>(
  props.log ? props.log.comment : undefined,
);
//#endregion

//#region hooks, handlers
const submitForm = () => {
  if (props.logbook) {
    const lg = new Log();
    if (props.log?.id) lg.id = props.log.id;
    lg.moment = new Date(logDate.value);
    lg.comment = comment.value;
    for (const element of valueInputs.value) {
      (lg as Log as any)[element.propName] = element.fieldValue;
    }
    try {
      LogbookLocalService.upsertLog(lg, props.logbook.id);
    } catch (error) {
      //TODO add message/error notification
      console.log('Error when saving log', error);
    } finally {
      emit('submited', lg);
    }
  }
};

onMounted(() => {
  const lgb = props.logbook;
  const lg = props.log;
  const inputFIelds: InputValueFields[] = [];
  if (lgb) {
    for (let i = 1; i < 4; i++) {
      const fname: string = `field${i}`;
      const vname: string = `value${i}`;
      const uname: string = `unit${i}`;

      const field = lgb[fname as keyof Logbook] as string;
      const unit = lgb[uname as keyof Logbook] as string;
      if (field) {
        inputFIelds.push({
          propName: vname,
          fieldName: `${field} ${unit ? ` ( ${unit} )` : ''}`,
          fieldValue: lg ? (lg as any)[vname] : undefined,
          unitName: unit,
        });
      }
    }
  }
  valueInputs.value = inputFIelds;
});
//#endregion
</script>

<template>
  <q-card style="width: 100%; max-width: 500px">
    <q-form class="q-gutter-sm" @submit="submitForm">
      <q-card-section>
        <div class="text-h6">
          {{ $props.log ? 'Edit ' : 'Create ' }} {{ $props.logbook?.name }} log
        </div>
      </q-card-section>

      <div class="q-px-sm" style="max-width: 300px">
        <q-input filled v-model="logDate" :label="'Log moment...'">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="logDate" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="logDate" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <q-card-section class="q-my-xs">
        <q-input
          v-for="vl in valueInputs"
          autofocus
          class="q-my-xs"
          v-model.number="vl.fieldValue"
          type="number"
          outlined
          style="max-width: 200px"
          :label="vl.fieldName"
          input-style="text-align: right; "
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          class="q-my-md"
          dense
          v-model="comment"
          autogrow
          placeholder="Comment ..."
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Save" v-close-popup type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
