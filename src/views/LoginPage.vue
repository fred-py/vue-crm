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

const sendForm = () => {
  // Form submission will be handled here
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