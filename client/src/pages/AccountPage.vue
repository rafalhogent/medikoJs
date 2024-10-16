<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '../components/account/LoginForm.vue';
import Factory from 'src/services/service-factory';
import { useAppStore } from 'src/stores/app.store';
import RegisterForm from 'src/components/account/RegisterForm.vue';
import { LogbookLocalService } from 'src/services/local/logbook.local.service';
import { useRouter } from 'vue-router';

const store = useAppStore();
const router = useRouter();
const showLoginDialog = ref(false);
const showRegisterDialog = ref(false);
const onInfoClick = async () => {
  const res = await Factory.getAuthService().getUserInfoFromServer();
  if (res)
    store.handleSuccess(
      `You are signed in as ${res.data.username}`,
      `client session id: ${res.data.clientId}`,
    );
};

const isSyncing = ref(false);
const onSyncClick = async () => {
  isSyncing.value = true;
  Factory.getSyncService()
    .syncAllData()
    .then(() => {
      isSyncing.value = false;
    });
};

const onLogoutClick = () => {
  Factory.getAuthLocalStorageService().clearLocalAuthData();
  LogbookLocalService.clearLocalLogbooksData();
};

const onServerSettingsClick = () => {
  router.push('/settings/account');
};
</script>

<template>
  <q-page>
    <q-card class="q-pa-lg" flat>
      <q-card-actions align="center" vertical>
        <div class="q-mt-xl q-mb-none">
          <q-icon color="grey" name="mdi-account-box-outline" size="150px" />
        </div>
        <h5 class="q-mt-xs">{{ store.username ?? 'Not logged in' }}</h5>
      </q-card-actions>
      <q-card-actions align="center" class="q-mb-lg q-gutter-md">
        <q-btn
          color="primary"
          icon="login"
          label="login"
          @click="() => (showLoginDialog = true)"
          :disable="!store.serverAddress"
        />
        <q-btn
          color="primary"
          icon="mdi-account-plus-outline"
          label="register"
          @click="() => (showRegisterDialog = true)"
          :disable="!store.serverAddress"
        />
        <q-btn
          color="primary"
          icon="mdi-logout"
          label="logout"
          @click="onLogoutClick"
          :disable="!store.username"
        />
        <q-btn
          color="primary"
          icon="mdi-account"
          label="info"
          @click="onInfoClick"
          :disable="!store.username || !store.serverAddress"
        />
        <q-btn
          color="primary"
          icon="mdi-sync"
          label="sync"
          @click="onSyncClick"
          :disable="!store.username || !store.serverAddress || isSyncing"
        />
      </q-card-actions>
      <div v-if="!store.serverAddress" class="q-ma-md text-center">
        <q-icon name="error" color="negative" size="md" />
        Cloud-server address not defined. Open server settings to set server
        address.
      </div>
      <q-card-actions align="center">
        <q-btn
          icon="mdi-cloud-outline"
          label="account & server settings"
          @click="onServerSettingsClick"
        />
      </q-card-actions>
    </q-card>
  </q-page>
  <q-dialog v-model="showLoginDialog">
    <login-form />
  </q-dialog>
  <q-dialog v-model="showRegisterDialog">
    <register-form />
  </q-dialog>
</template>
