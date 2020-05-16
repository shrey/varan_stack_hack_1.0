var router = require('express').Router()
var mongo = require('mongodb')

const MONGO_URL = 'mongodb://localhost:5000'

router.post('/', (req, res, next)=>{

	mongo.MongoClient.connect(MONGO_URL, (error, client)=>{
		var admin = client.db('varan').collection('admin')
		
		admin.findOne({key : req.body.key}, (err, admin)=>{
			
			if(admin != null)
			{
				req.session.logged = true;
				res.status(200).json({"msg" : "Logged In"});
			}
			else
				res.status(200).json({"msg" : "Email/Password Incorrect"});
		});
	});
});

module.exports = router;
