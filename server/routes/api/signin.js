const User =  require('../../models/User');
const UserSession = require('../../models/UserSession');
module.exports = (app) => {
	/*
	 *SignUp
	 */

	app.post('/api/account/signup',(req,res,next) =>{
	 	const { body } = req;
	 	const {
	 		firstName,
	 		lastName,
	 		password,
	 		birhday,
	 		address,
	 		sex
	 	} = body;

	 	let {
	 		email
	 	} = body;

	 	if (!firstName){
	 		return res.send({
	 			success: false,
	 			message: 'Error Missing first name'
	 		});
	 	}

	 	if (!lastName){
	 		return res.send({
	 			success: false,
	 			message: 'Error Missing last name'
	 		});
	 	}

	 	if (!email){
	 		return res.send({
	 			success: false,
	 			message: 'Error Missing email'
	 		});
	 	}

	 	if (!password){
	 		return res.send({
	 			success: false,
	 			message: 'Error Missing password'
	 		});
	 	}

	 	email = email.toLowerCase();

	 	User.find({
	 		email: email
	 	},(err, previousUsers) => {
	 		if(err){
	 			return res.send({
		 			success: false,
		 			message: 'Error:Server error'
		 		});
	 		}else if(previousUsers.length>0){
	 			return res.send({
		 			success: false,
		 			message: 'Error: Account already exist.'
		 		});
	 		}

	 		const newUser = new User();
	 		newUser.email = email;
	 		newUser.firstName =  firstName;
	 		newUser.lastName =  lastName;
	 		newUser.birhday =  birhday;
	 		newUser.address =  address;
	 		newUser.sex =  sex;
	 		newUser.password =  newUser.generateHash(password);
	 		newUser.save((err, user) => {
	 			if(err){
	 				return res.send({
			 			success: false,
			 			message: 'Error:Server error'
			 		});
	 			}

	 			return res.send({
		 			success: true,
		 			message: 'Signed Up'
		 		});
	 		});

	 	});
	});


	app.post('/api/account/signuptest',(req,res,next) =>{
	 	const { body } = req;

	 	let {
	 		email
	 	} = body;


	 	if (!email){
	 		return res.send({
	 			success: false,
	 			message: 'Error: Missing email'
	 		});
	 	}


	 	email = email.toLowerCase();

	 	User.find({
	 		email: email
	 	},(err, previousUsers) => {
	 		if(err){
	 			return res.send({
		 			success: false,
		 			message: 'Error:Server error'
		 		});
	 		}else if(previousUsers.length>0){
	 			return res.send({
		 			success: false,
		 			message: 'Error: Account already exist.'
		 		});
	 		}
	 		return res.send({
	 			success: true,
	 			message: 'Available User'
	 		});
	 	});
	});

	app.post('/api/account/signin', (req, res, next) => {
	 	const { body } = req;
	 	const {
	 		password
	 	} = body;
	 	let {
	 		email
	 	} = body;

	 	if(!email){
	 		return res.send({
	 			success: false,
	 			message: 'Error: Email cannot be blank.'
	 		});
	 	}

	 	if(!password){
	 		return res.send({
	 			success: false,
	 			message: 'Error: Password cannot be blank.'
	 		});
	 	}
	 	email = email.toLowerCase();

	 	User.find({
	 		email: email
	 	},(err, users) => {
	 		if(err){
 				return res.send({
		 			success: false,
		 			message: 'Error:Server error'
		 		});
 			}
 			if(users.length != 1){
 				return res.send({
 					success: false,
 					message: 'Unregistered User!'
 				});
 			}

 			const user =  users[0];
 			if(!user.validPassword(password)){
 				return res.send({
 					success: false,
 					message: 'Invalid Password!'
 				});
 			}
 			//When Correct!
 			const userSession = new UserSession();
 			userSession.userId = user._id;
 			userSession.save((err,doc) => {
 				console.log(err)
 				if(err){
	 				return res.send({
			 			success: false,
			 			message: 'Error:Server(session) error'
			 		});
	 			}

	 			return res.send({
		 			success: true,
		 			message: 'Valid Sign In',
		 			token: doc._id
		 		});
 			});
	 	});
	 });




	app.post('/api/account/verify',(req,res,next) =>{
		//Get the token
		console.log(req)
		const { query } = req;
		const { token } = query;
		UserSession.find({
			_id: token,
			isDeleted: false
		},(err, seesions) => {
			if(err){
 				return res.send({
		 			success: false,
		 			message: 'Error:Server error'
		 		});
 			}

 			if(sessions.length != 1){
 				return res.send({
		 			success: false,
		 			message: 'Error:Invalid'
		 		});
 			}else{
 				return res.send({
		 			success: true,
		 			message: 'Good'
		 		});
 			}
		});

	});

	app.post('/api/account/logout',(req,res,next) =>{
		//Get the token
		const { query } = req;
		const { token } = query;

		UserSession.findOneAndUpdate({
			_id: token,
			isDeleted: false
		}, {
			$set:{
				isDeleted:true
			}
		}, null, (err, seesions) => {
			if(err){
 				return res.send({
		 			success: false,
		 			message: 'Error:Server error'
		 		});
 			}

 			return res.send({
	 			success: true,
	 			message: 'Good'
	 		});
		});

	});
};