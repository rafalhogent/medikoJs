<script setup lang="ts">
import { SleepDto } from 'src/models/sleep/sleep.dto';
import { DateTime } from 'luxon'

export interface SleepCardProps {
    sleep: SleepDto
}
defineProps<SleepCardProps>()

</script>

<template>
    <q-timeline-entry :icon="'mdi-bed-clock'" class="q-my-md"
        :subtitle="sleep.begin.toLocaleString({ ...DateTime.DATE_FULL })">
        <q-card class="my-card" flat bordered>
            <q-btn icon="mdi-clock-outline"><span class="q-mx-sm">begin: {{ sleep.begin.toFormat('HH:mm') }} </span>
            </q-btn>
            <q-card-section horizontal class="q-pt-xs">
                <div class=" text-grey">
                    {{ sleep.note }}
                </div>
            </q-card-section>

            <q-card-section vertical>
                <p v-if="sleep.interruptions?.length" class="q-mb-sm text-subtitle1 text-weight-bold">Interruptions:</p>

                <div :key="inter.id" v-for="inter in sleep.interruptions" class="q-my-md">
                    <q-icon name="mdi-clock-outline" :size="'sm'" /> <span class="q-mx-sm">
                        {{ inter.date.toFormat('HH:mm') }}</span>
                    <!-- <q-btn icon="mdi-clock-outline"> -->
                    <span> ( {{ inter.duration }} min )</span>
                    <div class="q-mt-sm q-ml-lg">{{ inter.note }}</div>
                </div>

            </q-card-section>
            <q-btn icon="mdi-clock-outline"><span class="q-mx-sm">wake-up: {{ sleep.wakeUp.toFormat('HH:mm') }}</span>
            </q-btn>
        </q-card>
    </q-timeline-entry>
</template>