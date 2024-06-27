<template>
  <div class="card-container">
  <Card style="
    width: 25rem;
    overflow: hidden;
    align-items: center;
    padding-top: 2rem;
  ">
    <template #header>
    <h4>Login to United Wheelie Wash</h4>
      <!--<form @submit.prevent="authStore.login(email, password)">-->
      <form>
        <div class="flex gap-4">
        <BaseInput
          v-model="email"
          label="Email"
          type="text"
        />
        </div>

        <div class="flex gap-3 mt-1">
        <BaseInput
          v-model="password"
          label="Password"
          type="text"
        />
        </div>

        <Button @click="exportData" type="submit"  >Login</button>
      </form>
    </template>
  </Card>
</div>

</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'; // Adjust the import path as needed
import { ref } from 'vue';
//import { useAuthStore } from '@/stores/AuthStore'; // Adjust the import path as needed
//const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const exportData = () => {
  console.log(email.value, password.value);
  }
</script>

<style scoped>
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>