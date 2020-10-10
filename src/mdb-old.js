const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'node';

const client=new MongoClient(url,{ useUnifiedTopology: true });

// insert
const insertDocuments = function(db, callback) {
    // Get the documents collection
const collection = db.collection('cars');

    // Insert some documents
collection.insertMany([
    {name : "wagon r",type : 'hatchback',price : 550000}
], function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);

    console.log("Inserted 1 documents in collection");
    callback(result);
});
}

// find
const findDocuments = function(db, callback) {
   
    // Get the documents collection
    const collection = db.collection('cars');
   
     // Find some documents
    collection.find({name:'alto'}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}




// Use connect method to connect to the server
client.connect( (err, client)=>{
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  client.close();
  
//   insertDocuments(db, function() {
//     client.close();
//   });

// findDocuments(db,()=>{
//     client.close();
// })


});