var router = require('express').Router();
var mongo = require('mongodb')

const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost'

router.get('/:id',(req, res, next)=>{

	mongo.MongoClient.connect(MONGO_URL, (error, client)=>{
	
		var event_db = client.db('varan').collection('event');

		event_db.deleteOne({ _id : new mongo.ObjectID(req.params.id)  },(err, del)=>{
		
			if(err)
				res.status(200).json({"msg" : "Error in deleting Event"});
			else
				res.status(200).json({"msg" : "Event Deleted"});
		});
	});
});

module.exports = router;
