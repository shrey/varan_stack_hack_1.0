var router = require('express').Router();
var mongo = require('mongodb')

const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost'

router.get('/', (req, res, next)=>{

	mongo.MongoClient.connect(MONGO_URL, (error, client)=>{

		if(error)
			res.status(200).json({"msg" : "Internal Server Error"});
		else{
			var user_db = client.db('varan').collection('user');

			user_db.find({}).toArray((err, users)=>{


				var self = 0;
				var corporate = 0;
				var group = 0;
				var others = 0;

				for(var i = 0; i < users.length; i++)
				{
					var type = users[i].registration_type;

					if(type == "self")
					{
						self += 1;
					} else{
						if(type == "group"){
							group += 1;
						} else {
							if(type == "corporate"){
								corporate += 1;
							}
							if(type == "others"){
								others += 1;
							}
						}
					}
				}

				var data = {
					self : self,
					group : group,
					corporate : corporate,
					others: others
				};

//				console.log("EVENTS: ",home_events);
				res.status(200).json(data);
			});
		}
	});
});

module.exports = router;
