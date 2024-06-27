import { createApp } from 'vue'
// State Manegement Library
// Pinia Docs: https://pinia.vuejs.org/getting-started.html
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


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

import BlockViewer from '@/components/BlockViewer.vue';

import { createAuth0 } from '@auth0/auth0-vue';

//import 'primevue/resources/themes/aura-dark-lime/theme.css';  // Theme
//import 'primevue/resources/primevue.min.css';                // Core CSS
import 'primeicons/primeicons.css';                          // Icons

import '@/assets/styles.scss';  // Global Style Config


const pinia = createPinia()
const app = createApp(App);

app.use(createPinia())

app.use(router);
app.use(PrimeVue, {ripple: true});
app.use(ToastService);  // Add Toast service to app

// Auth0 Configuration
app.use(
    createAuth0({
      domain: "dev-hjtuf0lq8il68xek.au.auth0.com",
      clientId: "ixaVAOET2plUE4WRzaTpjXx2IrNZUPMq",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  );

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


app.mount('#app')
