var router = require('express').Router()
var mongo = require('mongodb')

const MONGO_URL = 'mongodb://localhost:5000'

router.get('/:id', (req, res, next)=>{

	mongo.MongoClient.connect(MONGO_URL, (req, res, next)=>{
	
		var event_db = client.db('varan').collection('event')

		event_db.findOne({_id : new mongo.ObjectId(req.params.id)}, (err, event)=>{
		
			if(event == null)
			{
				res.status(200).json({"msg" : "Event Doesn't Exist"});
			}
			else{
				res.status(200).json(event);
			}
		});
	});
});

module.exports = router;
