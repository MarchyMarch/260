const express = require('express');
const bodyParser = require('body-parser');

// Set up an api app for items and computers
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// define item and computer array
// set the computer and item ids and start at 0
let items = [];
let itemID = 0;

let computers = [
	{make: 'Lenovo', model: 'ThinkPad T550', os: 'Linux Mint', screen: '15-inch', processor: 'i7', ram: 16, storageSize: 500, storageType: 'SSD', graphics: 'integrated', description: 'best computer'}
];
let computerID = 0;

// Set up the CRUD for items
app.get('/api/items', (req, res) => {
	console.log("Items requested at " + new Date().toLocaleString());
	res.send(items);
});

app.post('/api/items', (req, res) =>{
	console.log("Item added at " + new Date().toLocaleString());
	itemID = itemID + 1;
	let item = {id:id, make:req.body.make, model:req.body.model, description:req.body.description, checkedout:req.body.checkedout, person:req.body.person};
	items.push(item);
	res.send(item);
});

app.put('/api/items/:id', (req, res) => {
	let id = parseInt(req.params.id);
	let itemsMap = items.map(item => {return item.id});
	let index = itemsMap.indexOf(id);
	let item = items[index];
	item.make = req.body.make;
	item.model = req.body.model;
	item.description = req.body.description;
	item.checkedout = req.body.checkedout;
	res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
	let id = parseInt(req.params.id);
	let removeIndex = items.map(item => {return item.id}).indexOf(id);
	if(removeIndex === -1){
		res.status(404).send("The item does not exist");
		return;
	}
	items.splice(removeIndex, 1);
	res.sendStatus(200);
});

// Set up CRUD for computers
app.get('/api/computers', (req, res) => {
	console.log("Computers requested at " + new Date().toLocaleString());
	res.send(computers);
})

app.post('/api/computers', (req, res) => {
	console.log("Computer added at " + new Date().toLocaleString());
	computerID = computerID + 1;
	let computer = {id:id, make:req.body.make, model:req.body.model, os:req.body.os, screen:req.body.screen, processor:req.body.processor, ram:req.body.ram, storageSize:req.body.storageSize, storageType:req.body.storageType, graphics:req.body.graphics, description:req.body.description, checkedout:req.body.checkedout, person:req.body.person};
	computers.push(computer);
	res.send(computer);
});

app.put('/api/computers/:id', (req, res) => {
	let id = parseInt(req.params.id);
	let computersMap = computers.map(item => {return item.id});
	let index = computersMap.indexOf(id);
	let computer = computers[index];
	computer.make = req.body.make;
	computer.model = req.body.model;
	computer.os = req.body.os;
	computer.screen = req.body.screen;
	computer.processor = req.body.processor;
	computer.ram = req.body.ram;
	computer.storageSize = req.body.storageSize;
	computer.storageType = req.body.storageType;
	computer.graphics = req.body.graphics;
	computer.description = req.body.description;
	computer.checkedout = req.body.checkedout;
	res.send(computer);
});

app.delete('/api/computers/:id', (req, res) => {
	let id = parseInt(req.params.id);
	let removeIndex = computers.map(item => {return item.id}).indexOf(id);
	if(removeIndex === -1){
		res.status(404).send("The item does not exist");
		return;
	}
	computers.splice(removeIndex, 1);
	res.sendStatus(200);
});

app.listen(5000, () => console.log('Server started and listening on port 5000!'));