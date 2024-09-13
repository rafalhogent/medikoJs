<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllSleeps } from 'src/services/cloud/sleep.service'
import { SleepDto } from 'src/models/sleep/sleep.dto';
import { CreateSleepDto } from 'src/models/sleep/create.sleep.dto';
import SleepCard from 'src/components/sleep-dream/SleepCard.vue';
import EditSleepForm from 'src/components/sleep-dream/EditSleepForm.vue'
import { plainToInstance } from 'class-transformer';

const sleeps = ref<SleepDto[]>([])
const sleepNoteVm = ref<CreateSleepDto | undefined>(undefined);
const showFormDialog = ref(false);

onMounted(async () => {
  sleeps.value = await getAllSleeps();
})

const handleAddNewSleep = () => {
  sleepNoteVm.value = plainToInstance(CreateSleepDto, {})
  showFormDialog.value = true;
}

</script>

<template>
  <div class="fixed-top-right" style="right: 20px; top: 50px; z-index: 10;">
    <q-btn :icon="'mdi-plus-circle'" :color="'blue-12'" class="q-mx-md q-my-md" @click="handleAddNewSleep"><span
        class="q-mx-md">
        New Sleep note</span>
    </q-btn>
  </div>

  <q-page class="row  justify-evenly q-mx-lg q-my-md">
    <q-timeline color="primary ">
      <sleep-card v-for="sleep in sleeps" :sleep="sleep" :key="sleep.id" />
    </q-timeline>
  </q-page>

  <q-dialog v-model="showFormDialog" persistent>
    <edit-sleep-form />

  </q-dialog>
</template>