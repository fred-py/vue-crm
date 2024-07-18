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

<script>
//import BaseInput from '@/components/BaseInput.vue'; // Adjust the import path as needed
import axios from 'axios';

// sendFrom is called from the @submit.prevent
export default {
  data () {
    return {
        email: '',
        password: '',
    }
  },
  methods: {
    sendForm (e) {
      axios.post('http://localhost:5000/api/v1/tokens', {
        email: this.email,
        password: this.password
      },
      // Authorization header must be included in request
      // btoa converts email and password to base64 
      {
        headers: {
          Authorization: `Basic ${btoa(`${this.email}:${this.password}`)}`,
        }
      })
      .then(function (response) {
        console.log('Response', response);
      })
      .catch(function (err) {
        console.log('Error', err);
      });
    }
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

