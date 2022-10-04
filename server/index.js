const express = require('express');
const path = require('path');
var cors = require('cors');
var dal = require('./dal.js');
const { apply } = require('file-loader');
const app = express();
const admin = require('./admin');
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW


app.use(express.static('dist'));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // "*" means allow connection from any request url.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// verify token at the root route
app.get('/auth', function(req, res){
    // read token from header
    const idToken = req.headers.authorization;
    console.log('header:', idToken);

    // vertify token
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken){
            console.log('decodedtoken: ', decodedToken);
            res.send('Authentication Success!');
        }).catch(function(error){
            console.log('error: ', error);
            res.send('Authentication Fail!');
        });
});

// Create New User 
app.get('/account/create/:name/:email/:password', (req, res) => {
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user)=>{
            console.log(user);
            res.send(user);
        });
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
    dal.all()
        .then((docs)=>{
            console.log(docs);
            res.send(docs);
        });
});

app.get('/account/findOne', async function(req, res){
    try{
        await dal.findOne("jason@mit.edu").then((docs)=>{
            console.log("customer info: ", docs);
            res.send(docs)
        })
    }catch(error){
        res.send(error);
        console.log("error: ", error);
    }

});


app.get('/account/updateAccount', async function(req, res){
    await dal.updateAccount("peter@mit.edu", 789).then((docs)=>{
        console.log(docs);
        if(docs.modifiedCount !== 1 || docs.matchedCount === 0){
            res.send("Transaction Error, please try again later or contact your administrator");
        }else{
            dal.findOne("peter@mit.edu")
                .then((result)=> {
                    let accountUpdated = "Success new balance is " + result.balance;
                    res.send(accountUpdated);
                })
            
        }
    });
});

app.listen(port, function () {
 console.log('App listening on port: ' + port);
})