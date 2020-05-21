var router = require('express').Router();
var mongo = require('mongodb')

const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost'

router.get('/', (req, res, next)=>{

	mongo.MongoClient.connect(MONGO_URL, (error, client)=>{
	
		if(error)
			res.status(200).json({"msg" : "Internal Server Error"});
		else{
			var event_db = client.db('varan').collection('event');

			event_db.find({}).toArray((err, events)=>{
			
				var home_events = new Array();

				for(var i = 0; i < events.length; i++)
				{

					var data = {
						_id : events[i]._id,
						name : events[i].name,
						date : events[i].date,
						image : events[i].image,
						location : events[i].location
					}

					if(home_events == undefined)
					{
						home_events = [data];
					}
					else
					{
						home_events.push(data);
					}
				}

				console.log("EVENTS: ",home_events);
				res.status(200).json(home_events);
			});
		}
	});
});

module.exports = router;
