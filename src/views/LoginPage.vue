<template>
  <div class="card-container">
  <Card style="
    width: 20rem;
    overflow: hidden;
    align-items: center;
    padding-top: 2rem;
  ">
    <template #header>
    <h6>Login to the Dashboard</h6>
      <!--<form @submit.prevent="authStore.login(email, password)">-->
      <!--@submit.prevent stops the form from its default handling
        then the sendForm method can focus exclusively on the logic 
        of submitting the form with axios and not on event handling
        more on that here:https://www.vuemastery.com/courses/vue3-forms/submitting-forms -->  
      <form @submit.prevent="sendForm">
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

        <Button type="submit">Login</button>
      </form>
    </template>
  </Card>
  
</div>
</template>

<style scoped>
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>

<script setup>
import BaseInput from '@/components/BaseInput.vue'; // Adjust the import path as needed
import { useAuthStore } from '@/stores/AuthStore';

import { ref } from 'vue';

// Initialise store
const authStore = useAuthStore();
// Create reactive reference objects 
// for email and password
const email = ref('');
const password = ref('');

// submitFrom is called from the @submit.prevent
const sendForm =  async () => {
  try {
    // access ref objects with .value
    // Send login details to the backend
    // async and await so this func only triggers if event happens
    await authStore.loginUser(email.value, password.value)
  } catch (error) {
    console.error('error logging in', error);
  }
}
</script>

