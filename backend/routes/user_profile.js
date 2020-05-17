var router = require('express').Router()
var mongo = require('mongodb')

var MONGO_URL = 'mongodb://localhost:5000'

router.get('/:id', (req, res, next)=>{

	mongo.MongoClient.connect(MONGO_URL, (error, client)=>{
	
		var user_db = client.db('varan').collection('user')

		user_db.findOne({ _id : req.params.id }, (err, user)=>{
		
			if(user == null)
			{
				res.status(200).json({"msg" : "User Doesn't Exist"});
			}
			else{
				res.status(200).json(user);
			}
		});
	});
});

module.exports = router;