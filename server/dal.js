const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject)=>{
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result){
            err ? reject(err) : resolve(doc);
        });
    })
}

// read all users
function all(){
    return new Promise((resolve, reject)=>{
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs){
                err ? reject(err) : resolve(docs);
            });
    })
}

// read/get a specific user's information
function findOne(email){
    return new Promise((resolve, reject)=>{
        const customer = db
            .collection('users')
            .findOne({email})
            .then((result) =>  result===null ? reject("Account not found") : resolve(result));
            
    });
};

function updateAccount(email, amount){
    return new Promise((resolve, reject)=>{
        const customer = db
            .collection('users')
            .updateOne(
                {email},
                { $inc: {balance:amount}})
            .then(function(docs){
                resolve(docs);

            });
})};

module.exports = {create, all, findOne, updateAccount};