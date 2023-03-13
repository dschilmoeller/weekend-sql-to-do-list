const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const PORT = process.env.PORT || 5000;
const toDoRouter = require('./routes/todo.router.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/todolist', toDoRouter)


// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000

app.listen( PORT, () => {
  console.log( 'Listening on port', PORT );
})