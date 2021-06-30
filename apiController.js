const router = require('express').Router();
const axios = require('axios');
const BASE_URL = 'https://jsonplaceholder.typicode.com';

const commonUtils = require('./utils/commonUtils');

router.get('/todos', async (req, res) => {
  let response;
  try {
    const data = await axios({
      method: 'GET',
      url: BASE_URL + '/todos'
    });
    const modifiedData = data.data.map(({userId, ...remainingAttrs}) => remainingAttrs)
    response = commonUtils.generateResponse(200, 'Successful', modifiedData);
  } catch (err) {
    response = commonUtils.generateResponse(500, err.message);
  }
  return res.status(response.statusCode).send(response.data);
});

router.get('/user/:userId', async (req, res) => {
  let response;
  try {
    const userData = await axios({
      method: 'GET',
      url: BASE_URL + '/users/'+req.params.userId
    });
    const todoData = await axios({
      method: 'GET',
      url: BASE_URL + '/todos'
    });
    userData.data.todos = [];
    todoData.data.forEach(element => {
      if(userData.data.id === element.userId) {
        userData.data.todos.push(element);
      }
    });
    response = commonUtils.generateResponse(200, 'Successful', userData.data);
  } catch (err) {
    response = commonUtils.generateResponse(500, err.message);
  }
  return res.status(response.statusCode).send(response.data);
});

module.exports = router;