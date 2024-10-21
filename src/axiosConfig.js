import axios from 'axios';

// Set Axios Global Defaults
// Development
axios.defaults.baseURL = 'http://localhost:5000/api/v1/'
// Production
//axios.defaults.baseURL = 'https://www.wheeliewash.au/api/v1/'

axios.defaults.headers.post['Content-Type'] = 'application/json'//'x-www-form-urlencoded';
