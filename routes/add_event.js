var router = require('express').Router()
var mongo = require('mongodb')

const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost'

router.post('/', (req, res, next)=>{
		var event_data = {
			name : req.body.name,
			description : req.body.description,
			image : req.body.image,
			date : req.body.date,
			location : req.body.location,
			coordinates : {
				lat : req.body.lat,
				lng : req.body.lng
			},
			likes : 0,
			dislikes : 0,
			visited : 0,
			users : new Array(),
			comments : new Array()
		}
		
		mongo.MongoClient.connect(MONGO_URL, (error, client)=>{
			
			var event_db = client.db('varan').collection('event')

			event_db.insertOne(event_data, (err, insert_event)=>{
			
				if(err)
					res.status(200).json({"msg" : "Internal Server Error"});
				else
					res.status(200).json({"msg" : "Event Created" });

			});
		});

	
});

module.exports = router;
