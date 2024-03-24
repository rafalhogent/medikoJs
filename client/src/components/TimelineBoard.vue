<script setup lang="ts">

const body = 'Example Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam soluta laudantium atque magnam quas quo debitis necessitatibus, labore corrupti voluptatibus doloribus ab exercitationem voluptas odio, ratione iste ea. Corporis, rem!';
</script>

<template>
  <div class="q-px-lg q-py-md">

    <q-timeline color="secondary">
      <q-timeline-entry heading body="Mediko Timeline" />

      <q-timeline-entry title="new Sleep & Dream added" subtitle="February 22, 2024"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :body="'After school I could not sleep, watched movie, petting cat...'" />

      <q-timeline-entry title="New Labo-Results" subtitle="February 21, 1986" icon="info" color="red"
        :body="'new blood test: HTC: 47%, HGB: 13,8, CREA: 1,13'">
      </q-timeline-entry>

      <q-timeline-entry heading body="November, 2023" />

      <q-timeline-entry title="New Event Title" subtitle="February 22, 1986" icon="today" color="green" :body="body" />

      <q-timeline-entry title="Event Title" subtitle="February 22, 1986" :body="body" />

      <q-timeline-entry title="Example Event Title" subtitle="February 22, 1986" color="orange" icon="done_all"
        :body="body" />

      <q-timeline-entry title="Event Title" subtitle="February 22, 1986" :body="body" />

      <q-timeline-entry title="Event Title" subtitle="February 22, 1986" :body="body" />
    </q-timeline>
  </div>
</template>
