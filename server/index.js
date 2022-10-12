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
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW


app.use(express.static('dist'));
app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // "*" means allow connection from any request url.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// create a middleware
app.use('/posts', ()=>{
console.log("Authentication")
});

// verify token at the root route
app.get('/auth', function(req, res){
    // read token from header
    const idToken = req.headers.authorization;
    //console.log('header**** :', idToken);
   //const idToken = "eyJhbGciOiJSUzIidToken****** eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk5NjJmMDRmZWVkOTU0NWNlMjEzNGFiNTRjZWVmNTgxYWYyNGJhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmFkYmFuay1jZDM2ZiIsImF1ZCI6ImJhZGJhbmstY2QzNmYiLCJhdXRoX3RpbWUiOjE2NjU1OTU4NjIsInVzZXJfaWQiOiJQenNackh2eWpBWUN5TkhSanRhTEt1ZGFQd2wxIiwic3ViIjoiUHpzWnJIdnlqQVlDeU5IUmp0YUxLdWRhUHdsMSIsImlhdCI6MTY2NTU5NTg2MiwiZXhwIjoxNjY1NTk5NDYyLCJlbWFpbCI6InNhbUBtaXQuZWR1IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNhbUBtaXQuZWR1Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.G6BXjYRdAUHVYMNz5uwh4vjs58UHhRvJh4QZByl0f6OwBO217iwR5bi9Gq4nZXW9GTpY_DU1Tiw0JWPoZUrHsmrJKDOxDx3_MNlmCAiF-RWsM0wregPz5NGUTK23XCXVpoTwTjkBDmutGZ7ScjY6qN2baFMGJ1PRlLOeJTp0p2pDrupKQwi4-y3-vkmcFQknIBIHyrpiNc28_iy5_uoJcNIZPfZDs3QQxlKS7fb9vbDC9QrCi7knbI7gTROnmPrlt3mWhwWBXwkkjyHgNyB_Y87Z5e_k1bUiBuno8eEgNKWtw8mFE5D6ExeYhT6ZBKVGJbEmifw3y4RZMhFk55qC1g1NiIsImtpZCI6Ijk5NjJmMDRmZWVkOTU0NWNlMjEzNGFiNTRjZWVmNTgxYWYyNGJhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmFkYmFuay1jZDM2ZiIsImF1ZCI6ImJhZGJhbmstY2QzNmYiLCJhdXRoX3RpbWUiOjE2NjU1OTE1MzEsInVzZXJfaWQiOiJtRGdlRERaZTJBYVYxanNkZll1ZGsxUjloUGIyIiwic3ViIjoibURnZUREWmUyQWFWMWpzZGZZdWRrMVI5aFBiMiIsImlhdCI6MTY2NTU5MTUzMSwiZXhwIjoxNjY1NTk1MTMxLCJlbWFpbCI6InNhcmFobGVlQG1pdC5lZHUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2FyYWhsZWVAbWl0LmVkdSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.bufIsT1KXxKpVCFiWC9Tfq3sJk41m_MN6nqhlrxdjJ28VfgOegaOcRjRQDHgNAxm3fuB1aNxc7x0t2PROT81Y26dvsxDhP5nrmTAn-TiGtlIk2ydz7Pp0OBwp5hqxfz-MC3alGxvq-UjvMly7p1S798hV-exb0fV-2s-aQz5ZmEy4wR9l-WIa1LGQ6k4KeGXM2fRvyWdaCpimiufB07Cv8vZcb9mzTiG0RL4bXJLVMmu-5XYcxpB7rUEhnjY-b_cwWAsMT4xPg6ZWtLPM3GJMySnYn1DJBMmdYRdrq3IY0afe3URF426fwvkhlAn7ksjc3MRqDY1MRpFojDChcVOxQ";
   // verify token
  getAuth().verifyIdToken(idToken)
        .then(function(decodedToken){
            console.log('decodedtoken: ', decodedToken.email);
            res.send({"auth":true, "email":decodedToken.email});
        }).catch(function(error){
            console.log('error: ', error);
            res.send({"auth":false});
        });
      
});

// Create New User 
app.get('/account/create/:firstName/:lastName/:phone/:email/:admin/:transact', (req, res) => {
    dal.create(req.params.firstName, req.params.lastName, req.params.phone, req.params.email, req.params.admin, req.params.transact)
        .then((user)=>{
            console.log(user);
            if(user){
            res.send(user);}
            else{res.send("There is already an account associated with this email")}
        });
});

app.post('/newUser', (req, res) =>{
    console.log(req.body);
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
                res.send("unsuccessful");
            }else{res.send(docs);}
        })      
         
});


app.get('/account/updateAccount/:email/:amount', async function(req, res){
    await dal.updateAccount(req.params.email, req.params.amount).then((docs)=>{
        console.log(docs);
        res.send(docs);
  
    });
});


app.listen(port, function () {
 console.log('App listening on port: ' + port);
})

