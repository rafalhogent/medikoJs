<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '../components/account/LoginForm.vue';
import Factory from 'src/services/service-factory';
import { useAppStore } from 'src/stores/app.store';
import RegisterForm from 'src/components/account/RegisterForm.vue';

const store = useAppStore();
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

const onSyncClick = async () => {
  store.handleSuccess('sync begun...');
  await Factory.getSyncService().syncLogbooks();
};
</script>

<template>
  <q-page>
    <q-card class="q-my-xl q-pa-lg" flat>
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
        />
        <q-btn
          color="primary"
          icon="mdi-account-plus-outline"
          label="register"
          @click="() => (showRegisterDialog = true)"
        />
        <q-btn
          color="primary"
          icon="mdi-account"
          label="info"
          @click="onInfoClick"
        />
        <q-btn
          color="primary"
          icon="mdi-sync"
          label="sync"
          @click="onSyncClick"
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
