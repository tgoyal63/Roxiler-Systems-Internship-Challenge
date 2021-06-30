// Importing Required Node Modules
require('dotenv').config({
  path: './config/.env'
});
const express = require('express');
const cors = require('cors');
const TodoAPI = require('./todo');
const apiController = require('./apiController');

// App setup
const app = express();
const port = parseInt(process.env.APP_PORT, 10);

app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({
  extended: true,
}));

app.get('/', (req, res) => {
  res.send('Welcome to NodeJS Challenge - Internship v1 (Roxiler Systems)');
});

app.use('', apiController);
const asyncApiCall = async () => {
  const response = await TodoAPI.getTodos();
  console.log(response.data);
}

app.listen(port, ()=> console.log('Service running on port: ' + port));