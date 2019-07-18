const express = require('express');
const routes = require('./app/routes');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');


const app = express();

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/pokelink';
mongoose.connect(mongoDB, { useNewUrlParser: true })
.then(() => {
  console.log('Connection to database has been established successfully.');
})
.catch(err => {
  console.log('Unable to connect to the database:', err);
});

app.use(cors({origin:true,credentials: true}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})