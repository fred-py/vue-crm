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
    message: null,
  }),


  actions: {
async loginUser(email, password) {
  try {
    const response = await axios.post('http://localhost:5000/api/v1/tokens',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // It's unclear how userData is structured within response. Assuming `userData` and `name` are directly under `data`.
    // Make sure `response.data` and `response.data.userData` is not null before accessing its properties.
    if (response.data && response.data.userData) {
      console.log(`THIS HERE response:`, response);
      console.log(`THIS HERE:`, response.data.userData.headers); // Assuming headers is a property of userData
      console.log(`THIS HERE:`, response.data.userData);

      if (response.data.token) {
        this.token = response.data.token;
        localStorage.setItem('token', response.data.token);
        console.log(response.data);

        // Ensure `userData.name` exists before using it
        const userName = response.data.userData.name ? response.data.userData.name : 'User';
        showTooltip(`Welcome back ${userName}!`);
        this.isAuthenticated = true;
      } else {
        // Handle case where token is not in response
        console.error('Token not found in response');
        this.isAuthenticated = false;
      }
    } else {
      console.error('User data not found in response');
      this.isAuthenticated = false;
    }
  } catch (error) {
    // Handle login errors (e.g., display error messages)
    console.error('This is the error', error);
    this.message = "Failed to login. Please check your credentials and try again.";
    this.isAuthenticated = false; // Ensure isAuthenticated is set to false on error
    // Consider re-throwing the error only if you want the caller to handle it as well
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
        this.message = response.data.message;
        console.log(response.data.message);
        
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