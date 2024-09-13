<script setup lang="ts">
import { plainToInstance } from 'class-transformer';
import { DateTime } from 'luxon';
import { CreateSleepDto } from 'src/models/sleep/create.sleep.dto';
import { createNewSleep } from 'src/services/cloud/sleep.service';
import { ref } from 'vue';

const note = ref<string | undefined>(undefined)
const sleepBeginDate = ref(DateTime.now().startOf('day').plus({ hours: -2 }).toFormat('yyyy-LL-dd HH:mm'))
const wakeupDate = ref(DateTime.now().startOf('day').plus({ hours: 7 }).toFormat('yyyy-LL-dd HH:mm'))

const submitForm = () => {
    const newSleepNote = plainToInstance(CreateSleepDto, {
        begin: sleepBeginDate.value,
        wakeUp: wakeupDate.value,
        note: note.value
    })
    createNewSleep(newSleepNote)
}
</script>

<template>
    <q-card style=" width: 90%;  max-width: 500px">
        <q-form class="q-gutter-md" @submit="submitForm">
            <q-card-section>
                <div class="text-h6">New sleep & dream note:</div>
            </q-card-section>

            <div class="q-pa-md" style="max-width: 300px">
                <q-input filled v-model="sleepBeginDate" :label="'Sleep begin...'">
                    <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="sleepBeginDate" mask="YYYY-MM-DD HH:mm">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>

                    <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="sleepBeginDate" mask="YYYY-MM-DD HH:mm" format24h>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>

            <q-card-section class="q-pt-none">
                <q-input dense v-model="note" autofocus autogrow placeholder="my sleep & dreams note ..." />
            </q-card-section>



            <div class="q-pa-md" style="max-width: 300px">
                <q-input filled v-model="wakeupDate" :label="'Wakeup moment...'">
                    <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="wakeupDate" mask="YYYY-MM-DD HH:mm">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>

                    <template v-slot:append>

                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="wakeupDate" mask="YYYY-MM-DD HH:mm" format24h>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>



            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat label="Add" v-close-popup type="submit" />
            </q-card-actions>
        </q-form>
    </q-card>
</template>