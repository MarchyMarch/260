// Express set up
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

// Login
app.post('/api/login', (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send("Missing required fields");
  knex('users').where('username',req.body.username).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:{username:user.username,name:user.name,id:user.id}});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

// Register
app.post('/api/users', (req, res) => {
	if(!req.body.username || !req.body.password || !req.body.name || !req.body.email){
		return res.status(400).send("Missing required fields");
	}

	knex('users').where('username', req.body.username).first().then(user => {
		if(user !== undefined){
			res.status(403).send("Username is taken");
			throw new Error('abort');
		}
		return bcrypt.hash(req.body.password, saltRounds);
	}).then(hash => {
		return knex('users').insert({username: req.body.username, name: req.body.name, 
			email: req.body.email, hash: hash});
	}).then(ids => {
		return knex('users').where('id', ids[0]).first();
	}).then(user => {
		res.status(200).json({user:user});
		return;
	}).catch(error =>{
		if(error.message !== 'abort'){
			console.log(error);
			res.status(500).json({error});
		}
	});
});

// Get items for the user
app.get('/api/users/:id/items', (req, res) => {
	let id = parseInt(req.params.id);
	knex('users').join('items', 'users.id', 'items.user_id')
		.where('users.id', id)
		.then(items =>{
			res.status(200).json({items:items});
		}).catch(error => {
			res.status(500).json({error});
		});
});

// Get computers for user
app.get('/api/users/:id/computers', (req, res) => {
	let id = parseInt(req.params.id);
	knex('users').join('computers', 'users.id','computers.user_id')
		.where('users.id', id)
		.then(computers => {
				res.status(200).json({computers:computers});
			}).catch(error => {
				res.status(500).json({error});
			});
});

// Checkout an item
app.post('/api/users/:id/items/:item_id', (req, res) => {
	let id = parseInt(req.params.id);
	let item_id = parseInt(req.params.item_id);
	knex('users').where('id',id).first().then(user => {
	return knex('items').where('id', item_id)
		.update({user_id:req.body.user_id, checked_out:req.body.checked_out, name:req.body.name});	
	}).then(ids => {
		return knex('items').where('user_id',id);
	}).then(items => {
		res.status(200).json({items:items});
		return;
	}).catch(error => {
		console.log(error);
		res.status(500).json({error});
	});
});


// Cheackout a computer
app.post('/api/users/:id/computers', (req, res) => {
	let id = parseInt(req.params.id);
	let computer_id = parseInt(req.body.id);
	knex('users').where('id',id).first().then(user => {
		return knex('computers').where('id', computer_id)
		.update({user_id:req.body.user_id, checked_out:req.body.checked_out, name:req.body.name});
	}).then(ids => {
		return knex('computers').where('user_id',id);
	}).then(computers => {
		res.status(200).json({computers:computers});
		return;
	}).catch(error => {
		console.log(error);
		res.status(500).json({error});
	});
});

// Return an item
app.post('/api/users/:id/items/:item_id/return', (req, res) => {
	let id = parseInt(req.params.id);
	let item_id = parseInt(req.params.item_id);
	knex('users').where('id',id).first().then(user => {
	return knex('items').where('id', item_id)
		.update({user_id:req.body.user_id, checked_out:req.body.checked_out, name:req.body.name});	
	}).then(ids => {
		return knex('items').where('checked_out', false);
	}).then(items => {
		res.status(200).json({items:items});
		return;
	}).catch(error => {
		console.log(error);
		res.status(500).json({error});
	});
});

// Return a computer
app.post('/api/users/:id/computers/return', (req, res) => {
	let id = parseInt(req.params.id);
	let computer_id = parseInt(req.body.id);
	knex('users').where('id',id).first().then(user => {
		return knex('computers').where('id', computer_id)
		.update({user_id:req.body.user_id, checked_out:req.body.checked_out, name:req.body.name});
	}).then(ids => {
		return knex('computers').where('checked_out', false);
	}).then(computers => {
		res.status(200).json({computers:computers});
		return;
	}).catch(error => {
		console.log(error);
		res.status(500).json({error});
	});
});

// Get all available computers
app.get('/api/computers', (req, res) => {
	knex('computers').where('checked_out', false).then(computers => {
		res.status(200).json({computers:computers});
		return;
	}).catch(error => {
		console.log(error);
		res.status(500).json({error});
	});
});

// Get all available items
app.get('/api/items', (req, res) => {
	knex('items').where('checked_out', false).then(items => {
		res.status(200).json({items:items});
		return;
	}).catch(error => {
		console.log(error);
		res.status(500).json({error});
	});
});

// Add a computer
app.post('/api/computers', (req, res) => {
	if(!req.body.make || !req.body.model || !req.body.os || !req.body.screen_size || !req.body.processor
		|| !req.body.ram || !req.body.hdd || !req.body.hdd_type || !req.body.graphics || !req.body.description){
		return res.status(400).send("Missing fields");
	}
	knex('computers').insert({make:req.body.make, model:req.body.model, os:req.body.os, screen_size:req.body.screen_size,
		processor:req.body.processor, ram:req.body.ram, hdd:req.body.hdd_type, graphics:req.body.graphics,
		description:req.body.description, checked_out:req.body.checked_out, user_id:req.body.user_id
	}).then(ids => {
		return knex('computers').where('id', ids[0]).first();
	}).then(computer => {
		return res.status(200).json({computer:computer});
	}).catch(error => {
		console.log(error);
		res.status(500).json({error});
	});
});

// Add an item
app.post('/api/items', (req, res) => {
	if(!req.body.make || !req.body.model || !req.body.description){
		return res.status(400).send("Missing fields");
	}
	knex('items').insert({make:req.body.make, model:req.body.model, description:req.body.description,
		checked_out:req.body.checked_out, user_id:req.body.user_id
	}).then(ids => {
		return knex('items').where('id', ids[0]).first();
	}).then(item => {
		return res.status(200).json({item:item});
	}).catch(error => {
		console.log(error);
		res.status(500).json({error});
	});
});

// Delete a computer
app.delete('/api/computers/:id', (req,res) => {
	let id = parseInt(req.params.id);
	
	knex('computers').where('id', id).del().then(id =>{
		res.status(200);
		return true;
	}).catch(error => {
		console.log(error);
		res.status(500).json({error});
	});
});

// Delete an item
app.delete('/api/items/:id', (req,res) =>{
	let id = parseInt(req.params.id);
	
	knex('items').where('id', id).del().then(id =>{
		res.status(200);
		return true;
	}).catch(error => {
		console.log(error);
		res.status(500).json({error});
	});
});


app.listen(3030, () => console.log('Server is listening on port 3030'));