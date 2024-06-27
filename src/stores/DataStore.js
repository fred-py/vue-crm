import { defineStore } from 'pinia'
import axios from 'axios';



// https://vueschool.io/lessons/define-your-first-pinia-store?friend=vuerouter
// Takes two arguments, id and options (both can be omitted)
// id is used to connect the store to the devtools
// Using same name as the file makes it easy to navigate from DevTools
// export to expose the store to the app
// It is convention to prefix const name with use
// This is the same convention used by Vue  composables
export const useDataStore = defineStore('DataStore', {
    // State, defines data accessible by components
    state: () => ({
        customers: [],
        totalOrders: 0,
    }),
    
    // Actions are methods that can be called from components
    actions: {
        // Fetch data from the server
        async fetchCustomers() {
            // Fetch data from the server
            const response = await axios.get('https://www.wheeliewash.au/api/v1/customers/');
            // Set the data to the store
            this.customers = response.data;
        },
        async fetchTotalOrders() {
            // Fetch data from the server
            const response = await axios.get('https://www.wheeliewash.au/api/v1/orders/');
            // Set the data to the store
            console.log(response.data);
            this.totalOrders = response.data;
        },
        async viewInvoice(url) {          // window.open is a built-in JS function that opens a new browser window
            window.open(url, '_blank');  // _blank opens the link in a new tab
        },

    },
    // Getters are used to get data from the store
    getters: {
        // Get the number of customers
        getCustomer() {
            return this.customers;  // state.customers returns an array of customer objects
        },
        getTotalOrders() {
            return this.totalOrders;
        },
    },
});