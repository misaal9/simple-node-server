const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n');
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return '2017';
});

hbs.registerHelper('scream', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.send({
    name: 'rohit',
    age: '30'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    name: 'Rohit',
    age: 30
  });
});

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    welcomeMessage: 'Welcome back, nigga!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    message: 'Unable to get data',
    status: 'error'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port:3000');
});
