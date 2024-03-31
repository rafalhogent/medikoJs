<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllSleeps } from 'src/services/sleep.service'
import { SleepDto } from 'src/models/sleep/sleep.dto';

const sleeps = ref<SleepDto[]>([])

onMounted(async () => {
  sleeps.value = await getAllSleeps();

})

const prompt = ref(false)
const address = ref('example sleep note')
</script>

<template>
  <div class="q-fixed-right">
    <q-btn :icon="'mdi-plus-circle'" :color="'blue-12'" class="q-mx-md q-my-md"
      @click="() => { prompt = true }"><span class="q-mx-md">
        New Sleep</span>
    </q-btn>
  </div>

  <q-page class="row  justify-evenly q-mx-lg">
    <q-timeline color="primary ">
      <q-timeline-entry v-for="sleep in sleeps" :key="sleep.id" :subtitle="sleep.begin" :icon="'mdi-bed-clock'">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class=" text-grey">
                {{ sleep.note }}
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-section vertical>
            <q-btn icon="event"><span class="q-mx-md">begin: {{ sleep.begin }}</span> </q-btn>
            <q-btn icon="event"><span class="q-mx-md">wake-up: {{ sleep.wakeUp }}</span> </q-btn>
            <h6 v-if="sleep.interruptions?.length" class="q-mb-sm">Interruptions:</h6>
            <ul>
              <li :key="inter.id" v-for="inter in sleep.interruptions" class="q-my-md">
                <q-btn icon="mdi-clock-outline"><span class="q-mx-md"> {{ inter.date }}</span> </q-btn>
                <div>{{ inter.note }}</div>
              </li>
            </ul>

          </q-card-section>
        </q-card>
      </q-timeline-entry>
    </q-timeline>
  </q-page>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New sleep&dream note:</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>