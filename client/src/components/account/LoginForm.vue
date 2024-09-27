<template>
  <q-card style="width: 100%; max-width: 500px">
    <q-form @submit="onSubmitClick">
      <q-card-section class="q-mb-none">
        <div class="text-h6"><q-icon name="mdi-server" /> Login to server</div>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input autofocus v-model="model.username" label="Username" />
        <q-input v-model="model.password" label="Password" type="password" />
      </q-card-section>
      <q-card-actions class="q-my-md" align="center">
        <q-btn
          icon="login"
          color="primary"
          label="Submit"
          v-close-popup
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { LoginDto } from 'src/models/account/login.dto';
import Factory from 'src/services/service-factory';
import { ref, Ref } from 'vue';

const model: Ref<LoginDto> = ref({
  username: '',
  password: '',
});

const onSubmitClick = async (e: any) => {
  const res = await Factory.getAuthService().loginToServer(model.value);
};
</script>
