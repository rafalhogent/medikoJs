<template>
  <div class="text-center q-pa-lg">
    <div>
      <span class="text-weight-bold">Your platform: </span>
      {{ $q.platform.userAgent }}
    </div>
    <div>
      <q-icon
        class="q-mr-sm"
        :name="store.serverAddress ? 'mdi-check-circle-outline' : 'close'"
      />
      <span> Server is {{ !store.serverAddress ? 'not' : '' }} defined </span>
    </div>
    <div v-if="!isSpaPlatform($q)">
      <q-btn
        class="q-my-lg"
        icon="mdi-server"
        :label="`server-address: `"
        @click="cloudAddressDialog = true"
      />
      <span>{{ store.serverAddress ?? 'unknown' }}</span>
    </div>
  </div>
  <q-dialog v-model="cloudAddressDialog">
    <q-card style="width: 90%; max-width: 600px">
      <q-card-section>
        <div class="text-h6">Edit cloud server address</div>
        <q-input
          autogrow
          autofocus
          v-model="serverAddressRef"
          hint="must be a valid http address"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn icon="close" label="cancel" v-close-popup />
        <q-btn
          color="primary"
          :disable="!serverAddressRef?.length"
          icon="save"
          label="save"
          v-close-popup
          @click="onAddressSave"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import Factory from 'src/services/service-factory';
import { useAppStore } from 'src/stores/app.store';
import { onMounted, Ref, ref } from 'vue';
import { isSpaPlatform } from 'src/utils/app-utils';
const store = useAppStore();

const cloudAddressDialog = ref(false);
const serverAddressRef: Ref<string | undefined> = ref(undefined);
const onAddressSave = () => {
  if (serverAddressRef.value)
    Factory.getAuthService().setBackendUrl(serverAddressRef.value);
};

onMounted(() => {
  Factory.getAuthService().ensureBackendUrlLoaded();
  serverAddressRef.value = store.serverAddress;
  store.settingsCrumbs = [store.settingsCrumb, store.accountCrumb];
});
</script>
