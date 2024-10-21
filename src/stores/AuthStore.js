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
          // Authorization header must be included in request
          // btoa converts email and password to base64 
          {
            headers: {
              Authorization: `Basic ${btoa(`${email}:${password}`)}`,
            },
          }
        );



    //console.log('Response', response);
    // Check if response data exists eg. successfull api request
    if (response.data) {
        const token = response.data.token;
        // Store token on Pinia State
        this.token = token;
        this.isAuthenticated = true;

        localStorage.setItem('token', token);
    } 
    // Return response object after processing
    return response;

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

        this.user = response.data.user;
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

    setToken(token) {
    // Update store state and localStorage
      //this.token = token;  
      //this.isAuthenticated = true;
      localStorage.setItem('token', token);
    }
  },

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },
});