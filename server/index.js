const express = require('express');
const path = require('path');
var cors = require('cors');
const { apply } = require('file-loader');
const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

app.use(express.static('dist'));
app.use(cors());

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.get('/', (req, res) => {
 res.send('Hello World from the server!');
});

// Create New User 
app.get('/account/create/:name/:email/:password', (req, res) => {
    res.send({
        name: req.params.name,
        email: req.params.email,
        password: req.params.password 
    })
});

// login user
app.get('/account/login/:email/:password', (req, res) => {
    res.send({
        email: req.params.email,
        password: req.params.password
    })
});

// All accounts 
app.get('/account/all', (req, res) => {
    res.send({
        name: 'peter',
        email: 'peter@mit.edu',
        password: 'secret22',
    })
});

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});