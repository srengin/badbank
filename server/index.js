import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cors from 'cors';
import * as dal from './dal.js';
const app = express();
import { getAuth } from 'firebase-admin/auth';
import { admin } from './admin.js';


const port = process.env.PORT || 3000;
//const DIST_DIR = path.join(__dirname, '../dist'); // NEW
//const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW


//app.use(express.static('dist'));
app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // "*" means allow connection from any request url.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// create a middleware
app.use('/account', (req, res, next)=>{
    const idToken = req.headers.authorization;
    getAuth().verifyIdToken(idToken)
        .then(function(decodedToken){
            console.log('decodedtoken: ', decodedToken.email);
            next();
            
        }).catch(function(error){
            console.log('error: ', error);
            res.send({"auth":false});
        });
      
});

app.get('/', (req, res) =>{
    res.send("hello world");
})

// Create New User 
app.get('/create/:firstName/:lastName/:phone/:email/:admin/:transact', (req, res) => {
    dal.create(req.params.firstName, req.params.lastName, req.params.phone, req.params.email, req.params.admin, req.params.transact)
        .then((user)=>{
            console.log(user);
            if(user){
            res.send(user);}
            else{res.send({"error":"There is already an account associated with this email"})}
        });
});



// login user
app.get('/account/login/:email/:password', (req, res) => {
    res.send({
        email: req.params.email,
        password: req.params.password
    })
});


app.get('/account/all', (req, res) => {

    dal.all()
        .then((docs)=>{
            console.log(docs);
            res.send(docs);
        });
});

app.get('/account/findOne/:email', async function(req, res){
   
        await dal.findOne(req.params.email).then((docs)=>{
            console.log("customer info: ", docs);
            if(!docs){
                res.send({"error":"unsuccessful"});
            }else{res.send(docs);}
        })      
         
});


app.get('/account/updateAccount/:email/:amount/:transact', async function(req, res){
    await dal.updateAccount(req.params.email, req.params.amount, req.params.transact).then((docs)=>{
        console.log(docs);
        res.send(docs);
  
    });
});


app.listen(port, function () {
 console.log('App listening on port: ' + port);
})

