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
          type="email"
          :error="emailError"
        />
        </div>

        <div class="flex gap-3 mt-1">
        
        <BaseInput
          v-model="password"
          label="Password"
          type="password"
          :error="passwordError"
        />
        </div>

        <Button type="submit">Login</button>
      </form>
    </template>
  </Card>
  
</div>
</template>

<script setup>
// https://github.com/Code-Pop/validating-vue3-forms/blob/lesson3/end/src/views/LoginForm.vue
import BaseInput from '@/components/BaseInput.vue'; // Adjust the import path as needed
import PasswordInput from '@/components/PasswordInput.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';

// Initialise store
const authStore = useAuthStore();
// Create reactive reference objects 
// for email and password

//const email = ref ('');
//const password = ref('');

// Note email ref has been replaced by the useField function from vee-validate validation
//const { value: email, errorMessage: emailError } = useField('email', (value) => {

const validation = {
  email: value => {
    if (!value) return 'Email is required';

    //const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regex = /^[^\s@]+@[^\s@]+\.(?:com|au)$/i;
    if (!regex.test(String(value).toLowerCase())) {
      return 'Please enter a valid email address';
    }
    return true
  },
  password: value => {
    const requiredMessage = 'This field is required'
    if (value === undefined || value === null) return requiredMessage
    // If length not greater than zero
    if (!String(value).length) return requiredMessage

    return true
  }
}
//  https://www.vuemastery.com/courses/validating-vue3-forms/validating-at-form-level
useForm({
  validationSchema: validation
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

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

<style scoped>
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
