var router = require('express').Router()
var mongo = require('mongodb')
var { check, validationResult } = require('express-validator');

const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost'

router.post('/:event_id', 
[
	check('name').isAlpha().isLength({min : 1}),
	check('mobile_no').isNumeric().isLength({min : 10, max : 10}),
	check('email').isEmail(),
],
(req, res, next)=>{

	const error = validationResult(req);
	if (!error.isEmpty()) {
		var error_array = error.array();
		console.log("Error: ", error.array());
		//res.render('form', {errors: error.array()})
		res.status(200).json(error_array);
	}
	else{
		var event_id = req.params.event_id;

		var data = {
			name : req.body.name,
			email : req.body.email,
			image_url : req.body.image_url, 
			registration_type : req.body.registration_type,
			tickets : req.body.tickets,
			registration_date : new Date(),
			mobile_no : req.body.mobile_no,
		}

		mongo.MongoClient.connect(MONGO_URL, (error, client)=>{
		
			var user_db = client.db('varan').collection('user')
			var event_db = client.db('varan').collection('event')
			
			var user_mail;

			user_db.insertOne(data, (err, user)=>{
				if(err)
					res.status(200).json({"msg" : "Internal Server Error"});
				else
				{
					//console.log('USER ', user);
					user_id = user.ops[0]._id
				}
			});

			event_db.findOne({ _id : new mongo.ObjectId(event_id)}, (err_event, event)=>{
				
				var user_event = event.users;
				var exist = false;
				if(user_event == undefined)
				{
					user_event = [{
						_id : user_id,
						name : req.body.name,
						mail : req.body.email
						}];
				}
				else{
					for(var i = 0; i < user_event.length; i++)
					{
						if( user_mail == user_event[i]._mail)
						{
							exist = true;
							break;
						}
					}
					if(exist != true){
					
						user_event.push({
							_id : user_id,
							name : req.body.name,
							mail : req.body.email
						});
					}
					else{
						res.status(200).json({"msg" : "User Already Registered"});
					}
				}
				
				if(exist != true){
					event_db.updateOne({ _id : new mongo.ObjectId(event_id)}, { $set : { users : user_event } }, (err, update)=>{
				
						res.status(200).json({"msg" : "User Registered"});
					});
				}
			});
		});
	}
});

module.exports = router;
