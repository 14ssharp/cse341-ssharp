const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000; 

const app = express();

const prove01Routes = require('./routes/prove01-routes');

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .use(bodyParser({ extended: false })) 
  .set('view engine', 'ejs')
  .use('/', prove01Routes)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));