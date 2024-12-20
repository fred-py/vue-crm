import { createApp } from 'vue';
// State Manegement Library
// Pinia Docs: https://pinia.vuejs.org/getting-started.html
import { createPinia } from 'pinia';
import axios from 'axios';
import interceptors from './interceptors';
//import axios from './axiosConfig';
import { useAuthStore } from './stores/AuthStore';
import App from './App.vue';
import router from './router';


import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

// Import modules needed for PrimeVue design
// Eg. input forms, tables etc...
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import Chart from 'primevue/chart';
import Checkbox from 'primevue/checkbox';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import Menu from 'primevue/menu';
import Ripple from 'primevue/ripple';
import SelectButton from 'primevue/selectbutton';
import Sidebar from 'primevue/sidebar';
import StyleClass from 'primevue/styleclass';
import Toast from 'primevue/toast';
import Tooltip from 'primevue/tooltip';
import Toolbar from 'primevue/toolbar';
import Password from 'primevue/password';

import BlockViewer from '@/components/BlockViewer.vue';

// Custom components
import BaseInput from './components/BaseInput.vue';

import { createAuth0 } from '@auth0/auth0-vue';

//import 'primevue/resources/themes/aura-dark-lime/theme.css';  // Theme
//import 'primevue/resources/primevue.min.css';                // Core CSS
import 'primeicons/primeicons.css';                          // Icons

import '@/assets/styles.scss';  // Global Style Config



const app = createApp(App);
const pinia = createPinia()
//app.use(createPinia())

//app.use(createPinia())


app.use(router);
app.use(pinia);
app.use(PrimeVue, {ripple: true});
app.use(ToastService);  // Add Toast service to app



// Retrieve token from localStorage on app initialisation
const storedToken = localStorage.getItem('token');
if (storedToken) {
  console.log('from main,js', storedToken)
  useAuthStore().setToken(storedToken)
}

// Register the interceptor before making any Axios requests
// This will intercept all requests and include the token in the header
axios.interceptors.request.use(interceptors.request, interceptors.response);


app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

app.component('BlockViewer', BlockViewer);

// Add PrimeVue components to app
app.component('Button', Button);
app.component('Card', Card);
app.component('Column', Column);
app.component('Chart', Chart);
app.component('Checkbox', Checkbox);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('FloatLabel', FloatLabel);
app.component('InputText', InputText);
app.component('InputSwitch', InputSwitch);
app.component('Menu', Menu);
app.component('SelectButton', SelectButton);
app.component('Sidebar', Sidebar);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);
app.component('Password', Password);

//Make BaseInput Component Globally available
app.component('BaseInput', BaseInput);


app.mount('#app')
