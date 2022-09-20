
const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Establish and verify connection
      const dbo = client.db("myproject");
      await dbo.command({ ping: 1 }).then(()=>console.log("Connected successfully to server"));
      
      var name = 'user' + Math.floor(Math.random()*10000);
      var email = name + '@gmail.com';

      // insert into customer table
      var collection = dbo.collection('customers');
      var doc = {"name":name, "email": email};
      collection.insertOne(doc, function(err, result){
      console.log(doc.name + ' Document insert')
      });
      var customers = await dbo
        .collection('customers')
        .findOne({}, function(err, result) {
            //if (err) throw err;
            console.log(result);
            return result;
        });
      console.log("The end " + customers);
    } finally {
      // Ensures that the client will close when you finish/error
      
      await client.close();
    }
  }
run().catch(console.dir);

/**MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected')

    // database Name
    const dbName = 'myproject';
    const db = client.db(dbName);

    // new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    // insert into customer table
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result){
        console.log('Document insert');
    });
});*/