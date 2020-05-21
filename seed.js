var mongo = require('mongodb')

const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost'

var data = [
	{
		image : "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		name : "A Tech Fest",
		description : "A Tech Fest"
	},
	{
		name : "Non Tech Fest",
		description : "A Non Fest",
		image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpJgM83tVoaGZ6IvN3-CQWvoAs_FbsVhTq9_OoSDkTyjgPlLTY&usqp=CAU"
	}
]

mongo.MongoClient.connect(MONGO_URL, (error, client)=>{

	client.db('varan').collection('event').insertMany(data, (err, ins)=>{
	
		if(err)
			throw err;
		else
			console.log("NO. of documents inserted: ",ins.insertedCount);
	});
});
