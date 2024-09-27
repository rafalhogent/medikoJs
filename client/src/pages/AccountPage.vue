<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '../components/account/LoginForm.vue';
import Factory from 'src/services/service-factory';
import { useAppStore } from 'src/stores/app.store';

const store = useAppStore();
const showLoginDialog = ref(false);
const onInfoClick = async () => {
  const res = await Factory.getAuthService().getUserInfoFromServer();
  console.log('user info on server: ', res);
};
</script>

<template>
  <q-page>
    <q-card class="q-ma-xl q-pa-lg" flat>
      <q-card-actions align="center" vertical>
        <div class="q-mt-xl q-mb-none">
          <q-icon color="grey" name="mdi-account-box-outline" size="150px" />
        </div>
        <h5 class="q-mt-xs">{{ store.username ?? 'Not logged in' }}</h5>
      </q-card-actions>
      <q-card-actions align="center" class="q-mb-xl">
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
          disable
        />
        <q-btn
          color="primary"
          icon="mdi-account"
          label="info"
          @click="onInfoClick"
        />
      </q-card-actions>
    </q-card>
  </q-page>
  <q-dialog v-model="showLoginDialog">
    <login-form />
  </q-dialog>
</template>
