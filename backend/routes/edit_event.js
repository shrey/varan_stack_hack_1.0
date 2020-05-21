const router = require('express').Router()
const mongo = require('mongodb');


router.put('/', async (req, res, next) => {


		//Database Connection
		mongo.MongoClient.connect('mongodb://localhost:5000', (error, client)=>{
			
			var db = client.db('varan');
			db.collection('event').findOne({_id : new mongo.ObjectId(req.body._id)}, (err, event)=>{
				
				if(err)
				{
					//console.log("Internal Server Error");
					res.status(200).json({"msg" : "Internal Server Error"});
				}
				else
				{
					//changes in Event

					var name,description;
					if(req.body.name != undefined)
						name = req.body.name;
					else
						name = event.name;

					if(req.body.description != undefined)
						description = req.body.description;
					else
						description = event.description


					//console.log("User Registered");
					var query = {
						$set : {
							name : name,
							description : description
						}
					}

					db.collection('event').updateOne({_id : new mongo.ObjectId(req.body._id)}, query, (error, update)=>{
					
						if(error)
							res.status(200).json({"msg" : "Internal Server Error"});
						else
							res.status(200).json({"msg" : "Event Updated"});
					});
				}
			});
		});

});

module.exports = router;
