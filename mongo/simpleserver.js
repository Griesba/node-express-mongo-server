var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017';
// Use connect method to connect to the Server
MongoClient.connect(url,  { useUnifiedTopology: true }, function (err, client) {
	
	const dbName = 'conFusion';

	//const adminDb = client.db(dbName).admin();

	var conFusionDb = client.db(dbName);
	var collection = conFusionDb.collection("dishes");

	assert.strictEqual(err,null); // if err is not null it will failed
	console.log("Connected correctly to server");
	
	collection.insertOne( 
		{name: "Uthapizza", description: "test"}, 
		function(err,result){
			assert.strictEqual(err,null);
			console.log("After Insert:");
			console.log(result.ops);// ops contains metadata on inserted document
		
			// find({}) with empty params means findAll
			collection.find({}).toArray(function(err,docs){
				assert.strictEqual(err,null);
				console.log("Found:");
				console.log(docs);				
				
				conFusionDb.dropCollection("dishes", function(err, result){
				assert.strictEqual(err,null);
				/*It's important to close the database, otherwise it will remain opened*/
				client.close();
				});
			});
	});
});