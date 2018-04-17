<template>
	<div>
	<nav-bar/>
	<div class="feed">
		<h1>Checked Out</h1>
		<div class="checkedOut">
			<ul class="computers">
				<li v-for="computer in checkedOutComputers" class="item-body">
					<ol class="ordered-list">
						<li><b>Make:</b>&nbsp;{{computer.make}}</li>
						<li><b>Model:</b>&nbsp;{{computer.model}}</li>
						<li><b>OS:</b>&nbsp;{{computer.os}}</li>
						<li><b>Screen Size:</b>&nbsp;{{computer.screen}}</li>
						<li><b>Processor:</b>&nbsp;{{computer.processor}}</li>
						<li><b>RAM:</b>&nbsp;{{computer.ram}}</li>
						<li><b>Storage Size:</b>&nbsp;{{computer.storageSize}} &nbsp;<b>Type:</b> &nbsp;{{computer.storageType}}</li>
						<li><b>Graphics Card:</b>&nbsp;{{computer.graphics}}</li>
						<li><b>Description:</b>&nbsp;{{computer.description}}</li>
						<div v-if="computer.checkedout">
							<li><b>Checked Out By:</b>&nbsp;{{computer.person}}</li>
						</div>
					</ol>
					<button v-on:click="returnComputer(computer)" class="check-out">Return</button>
					<!-- <button v-on:click=deleteComputer(computer) class="delete">X</button> -->
				</li>
			</ul>
			<ul class="items">
				<li v-for="item in checkOutItems" class="item-body">
					<ol class="ordered-list">
						<li><b>Make:</b>&nbsp;{{item.make}}</li>
						<li><b>Model:</b>&nbsp;{{item.model}}</li>
						<li><b>Description:</b>&nbsp;{{item.description}}</li>
						<div v-if="item.checkedout">
							<li><b>Checked Out By:</b>&nbsp;{{item.person}}</li>
						</div>
					</ol>
					<button v-on:click="returnItem(item)" class="check-out">Return</button>
					<!-- <button v-on:click=deleteItem(item) class="delete">X</button> -->
				</li>
			</ul>
		</div>
		<h1>Available Inventory</h1>
		<div class="inventory">
			<ul class="computers">
				<li v-for="computer in availableComputers" class="item-body">
					<ol class="ordered-list">
						<li><b>Make:</b>&nbsp;{{computer.make}}</li>
						<li><b>Model:</b>&nbsp;{{computer.model}}</li>
						<li><b>OS:</b>&nbsp;{{computer.os}}</li>
						<li><b>Screen Size:</b>&nbsp;{{computer.screen_size}}</li>
						<li><b>Processor:</b>&nbsp;{{computer.processor}}</li>
						<li><b>RAM:</b>&nbsp;{{computer.ram}}</li>
						<li><b>Storage Size:</b>&nbsp;{{computer.hdd}} &nbsp;<b>Type:</b> &nbsp;{{computer.hdd_type}}</li>
						<li><b>Graphics Card:</b>&nbsp;{{computer.graphics}}</li>
						<li><b>Description:</b>&nbsp;{{computer.description}}</li>
						<div v-if="computer.checkedout">
							<li><b>Checked Out By:</b>&nbsp;{{computer.name}}</li>
						</div>
					</ol>
					<button v-on:click="checkOutComputer(computer)" class="check-out">Check Out</button>
					<!-- <button v-on:click=deleteComputer(computer) class="delete">X</button> -->
				</li>
			</ul>
			<ul class="items">
				<li v-for="item in availableItems" class="item-body">
					<ol class="ordered-list">
						<li><b>Make:</b>&nbsp;{{item.make}}</li>
						<li><b>Model:</b>&nbsp;{{item.model}}</li>
						<li><b>Description:</b>&nbsp;{{item.description}}</li>
						<div v-if="item.checkedout">
							<li><b>Checked Out By:</b>&nbsp;{{item.name}}</li>
						</div>
					</ol>
					<button v-on:click="checkOutItem(item)" class="check-out">Check Out</button>
					<!-- <button v-on:click=deleteItem(item) class="delete">X</button> -->
				</li>
			</ul>
		</div>
	</div>
	<footer-bar/>
	</div>
</template>

<script>
	export default {
		name: 'UserFeed',
		data() {
			return{

			}
		},
		created: function(){
			this.$store.dispatch('getCheckedOut');
			this.$store.dispatch('getAvailableComputers');
			this.$store.dispatch('getAvailableItems');
		},
		computed: {
			checkedOut: function(){
				this.$store.dispatch('getCheckedOut');
			},
			available: function(){
				this.$store.dispatch('getAvailableComputers');
				this.$store.dispatch('getAvailableItems');
			}
		},
		methods: {
			checkOutComputer: function(computer) {
				this.$store.dispatch('checkOutComputer', {
					id: computer.id,
					make: computer.make,
					model: computer.model,
					os: computer.os,
					screen_size: computer.screen_size,
					processor: computer.processor,
					ram: computer.ram,
					hdd: computer.hdd,
					hdd_type: computer.hdd_type,
					graphics: computer.graphics,
					checkedout: true,
					user_id: this.$store.user.id,
					name: this.$store.user.name,
				});
			},
			checkOutItem: function(item){
				this.$store.dispatch('checkOutItem', {
					id: item.id,
					make: item.make,
					model: item.model,
					description: item.description,
					checkedout: true,
					user_id: this.$store.user.id,
					name: this.$store.user.name,
				});
			},

			// return functions opperate the same as checked out
			// 4294967295 is max value of an usigned int, the data type
			// being used.
			returnComputer: function(computer){
				this.$store.dispatch('checkOutComputer', {
					id: computer.id,
					make: computer.make,
					model: computer.model,
					os: computer.os,
					screen_size: computer.screen_size,
					processor: computer.processor,
					ram: computer.ram,
					hdd: computer.hdd,
					hdd_type: computer.hdd_type,
					graphics: computer.graphics,
					checkedout: false,
					user_id: 4294967295,
					name: '',
				})
			},
			returnItem: function(item){
				this.$store.dispatch('checkOutItem', {
					id: item.id,
					make: item.make,
					model: item.model,
					description: item.description,
					checkedout: false,
					user_id: 4294967295,
					name: '',
				});
			},
		},
	}
</script>

<style scoped>
	body {
	    font-family: 'Rubik', sans-serif;
	    background: #fffff0;
	}

	h1{
		font-family: Gotham, "Helcetica Neue", Helcetica, Arial, "sans-serrif";
		font-size: 2vw;
		text-align: center;	
	}

	h2{
		font-family: Gotham, "Helcetica Neue", Helcetica, Arial, "sans-serrif";
		font-size: 1.5vw;
		text-align: center;
	}

	ul {
	    list-style: none;
	}

	li {
	    background: #f3f3f3;
	    display: flex;
	}

	.computers{
		text-align: center;
		align-content: center;
		display: block;
		margin: 0 auto;
	}

	.item-body{
		width: 80vw;
		margin: 0 auto;
		margin-top: 1.5vw;
		text-align: center;
		align-content: center;
	}

	.ordered-list{
		text-align: center;
		margin: 1vw 0;

	}

	.ordered-list li{
		font-family: Gotham, "Helcetica Neue", Helcetica, Arial, "sans-serrif";
		text-align: center;
		font-size: 1vw;
	}

	.controls{
		align-content: center;
		text-align: center;
	}

	button{
		font-family: Gotham, "Helcetica Neue", Helcetica, Arial, "sans-serrif";
		font-size: 1vw;
	}

	.delete{
		height: 1.5vw;
		float: right;
		top: 0;
		right: 0;
		margin-right: 1vw;
		margin-top: 1vw;
		margin-left: 1vw;
	}

	.check-out{
		height: 1.5vw;
		margin-left: auto;
		margin-top: 1vw;
	}
</style>