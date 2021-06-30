const axios = require('axios');
const BASE_URL = 'https://jsonplaceholder.typicode.com';

module.exports = {
  getTodos: () => axios({
    method: 'GET',
    url: BASE_URL + '/todos'
  })
};