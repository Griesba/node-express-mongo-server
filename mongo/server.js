var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
//DB operations
var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017';

// Use connect method to connect to the Server
MongoClient.connect(url,  { useUnifiedTopology: true }, function (err, client) {
    const dbName = 'conFusion';
    
    var conFusionDb = client.db(dbName);
    
    assert.strictEqual(null, err);
    
    console.log("Connected correctly to server");

    dboper.insertDocument(conFusionDb, { name: "Vadonut", description: "Test" }, "dishes",
         function (result) {
            console.log(result.ops);

			//
            dboper.findDocuments(conFusionDb, "dishes", function (docs) {
                
                console.log(docs);// check if the insertion is done with success
                
                //  the tird parameter is the collection, the forth is the callback
                dboper.updateDocument(conFusionDb, 
                    { name: "Vadonut" },
                    { description: "Updated Test" }, 
                    "dishes", // the collection to update
                    function (result) {
                        console.log(result.result);

						//check if insertion is done with success
                        dboper.findDocuments(conFusionDb, "dishes", function (docs) {
                            console.log(docs)

                            conFusionDb.dropCollection("dishes", function (result) {
                                console.log(result);

                                client.close();
                            });
                        });
                    });
            });
        });
});