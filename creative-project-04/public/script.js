var app = new Vue({
	el: '#app',
	data: {
		items: [],
		computers: [],
		make: '',
		model: '',
		os: '',
		screen: '',
		processor: '',
		ram: 0,
		storageSize: 0,
		storageType: '',
		graphics: '',
		description: '',
		ramOptions: [
			{id: "2", label: "2 GB", value: 2},
			{id: "4", label: "4 GB", value: 4},
			{id: "8", label: "8 GB", value: 8},
			{id: "16", label: "16 GB", value: 16}
		],
		sizeOptions: [
			{id: "128", label: "128 GB", value: 128},
			{id: "256", label: "256 GB", value: 256},
			{id: "500", label: "500 GB", value: 500},
			{id: "750", label: "750 GB", value: 750},
			{id: "1000", label: "1 TB", value: 1000}
		],
		person: '',
		typeOptions: [
			{id: "hdd", label: "HDD", value: "HDD"},
			{id: "ssd", label: "SSD", value: "SSD"}
		],
		show: 'all',
	},
	created: function(){
		this.getAll();
	},
	computed: {
		availableItems: function(){
			this.items.filter(function(item){
				return !item.checkedout;
			});
			this.computers.filter(function(computer){
				return !computer.checkedout;
			});
		},
		filteredItems: function(){
			if(this.show === 'checkedout'){
				return this.items.filter(function(item){
					return item.checkedout;
				});
			}
			if(this.show === 'available'){
				return this.items.filter(function(item){
					return !item.checkedout;
				});
			}

			return this.items;
		},
		filteredComputers: function(){
			if(this.show === 'checkedout'){
				return this.computers.filter(function(computer){
					return computer.checkedout;
				});
			}
			if(this.show === 'available'){
				return this.computers.filter(function(computer){
					return !computer.checkedout;
				});
			}

			return this.computers;
		}
	},
	methods: {
		showAll: function() {this.show = 'all';},
		showCheckedOut: function() {this.show = 'checkedout';},
		showAvailable: function() {this.show = 'available';},
		getAll: function(){
			this.getItems();
			this.getComputers();
		},
		getItems: function(){
			axios.get("/api/items").then(response =>{
				this.items = response.data;
				return true;
			}).catch(err =>{
				console.log(err);
			});
		},
		getComputers: function(){
			axios.get("/api/computers").then(response =>{
				this.computers = response.data;
				return true;
			}).catch(err =>{
				console.log(err);
			})
		},
		addItem: function() {
			axios.post("/api/items", {
				make: this.make,
				model: this.model,
				description: this.description,
				checkedout: false,
			}).then(response => {
				this.make = '';
				this.model = '';
				this.description = '';
				this.getItems();
				return true;
			}).catch(err => {
				console.log(err);
			});
		},
		addComputer: function(){
			axios.post("/api/computers", {
				make: this.make,
				model: this.model,
				os: this.os,
				screen: this.screen,
				processor: this.processor,
				ram: this.ram,
				storageSize: this.storageSize,
				storageType: this.storageType,
				graphics: this.graphics,
				description: this.description,
				checkedout: false,
			}).then(response => {
				this.make = '';
				this.model = '';
				this.os = '';
				this.screen = '';
				this.processor = '';
				this.ram = 0;
				this.storageSize = 0;
				this.storageType = '';
				this.graphics = '';
				this.description = '';
				this.getComputers();
				return true;
			}).catch(err => {
				console.log(err);
			});
		},
		checkOutComputer: function(computer){
			var isPerson = this.getPerson();
			if(isPerson){
				axios.put("/api/computers/" + computer.id, {
					make: computer.make,
					model: computer.model,
					os: computer.os,
					screen: computer.screen,
					processor: computer.processor,
					ram: computer.ram,
					storageSize: computer.storageSize,
					storageType: computer.storageType,
					graphics: computer.graphics,
					description: computer.description,
					checkedout: true,
					person: this.person,
				}).then(response => {
					this.person = '';
					return true;
				}).catch(err => {
					console.log(err);
				});
			}
		},
		checkOutItem: function(item){
			var isPerson = this.getPerson();
			if(isPerson){
				axios.put("/api/items/" + item.id, {
					make: item.make,
					model: item.model,
					description: item.description,
					checkedout: true,
					person: this.person,
				}).then(response => {
					this.person = '';
					return true;
				}).catch(err => {
					console.log(err);
				});
			}
		},
		deleteComputer: function(computer){
			if(confirm("Are you sure you want to delete this computer?")){
				axios.delete("/api/computers/" + computer.id).then(response => {
					this.getComputers();
					return true;
				}).catch(err => {
					console.log(err);
				});
			}
		},
		deleteItem: function(item){
			if(confirm("Are you sure you want to delete this item?")){
				axios.delete("/api/items/" + item.id).then(response => {
					this.getItems();
					return true;
				}).catch(err => {
					console.log(err);
				});	
			}
		},
		getPerson: function(){
			this.person = prompt("Who is checking out?");
			if(this.person == null || this.person == ''){
				return false;
			}
			else{
				return true;
			}
		},
		returnComputer: function(computer){
			axios.put("/api/computers/" + computer.id, {
				make: computer.make,
				model: computer.model,
				os: computer.os,
				screen: computer.screen,
				processor: computer.processor,
				ram: computer.ram,
				storageSize: computer.storageSize,
				storageType: computer.storageType,
				graphics: computer.graphics,
				description: computer.description,
				checkedout: false,
				person: '',
			}).then(response => {
				return true;
			}).catch(err => {
				console.log(err);
			});
		},
		returnItem: function(computer){
			axios.put("/api/items/" + item.id, {
				make: item.make,
				model: item.model,
				description: item.description,
				checkedout: false,
				person: '',
			}).then(response => {
				return true;
			}).catch(err => {
				console.log(err);
			});
		},
	}
})