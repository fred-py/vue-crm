import { defineStore } from 'pinia';
import axios from 'axios';


// Pass a string for the name of the store
// as the first parameter, this must be unique.
// In this case, 'auth'
// Pinia will use this to track state in each store
// This will also show up on DevTools
export const useAuthStore = defineStore('auth', {
  state: () => ({
    // This is the response from the API (user name/email)
    userData: null,  
    // Token if auth is valid
    token: null,
    isAuthenticated: false,
  }),


  actions: {
    async loginUser(email, password) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/v1/login/',
          { email, password }
        );
        this.token = response.data.token;
        // Optionally store token (if your backend provides it) in localStorage:
        localStorage.setItem('token', response.data.token);
        console.log(response.data);

        showTooltip('Welcome back ${this.userData.name}!');
        this.isAuthenticated = true; // This can be improved with an if statement?

        // Assuming your backend sends user data in response
        // this.user = response.data.user; 
        // this.isAuthenticated = true;
      } catch (error) {
        // Handle login errors (e.g., display error messages)
        console.error(error);
        throw error;
      }
    },

    async register(email, password) {
      try {
        const response = await axios.post(
          'https://www.wheeliewash.au/api/v1/register/', { // Adjust your backend API endpoint
          email, 
          password,
        });

        this.user = response.data.user; // Assuming your backend sends user data in response
        this.isAuthenticated = true;
        // Return email sent for verification
        // Optionally store token (if your backend provides it) in localStorage:
        // localStorage.setItem('token', response.data.token);

      } catch (error) {
        // Handle registration errors (e.g., display error messages)
        console.error(error);
        throw error;
      }
    },

    async logout() {
      this.user = null;
      this.isAuthenticated = false;
      // Clear any stored token:
      // localStorage.removeItem('token');
    },

    // Additional actions (e.g., register, check authentication status) can be added here.
  },

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },
});